import logging
import traceback
from flask import Flask, render_template, request, jsonify
from save_controller import SaveController

app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
app.logger.addHandler(handler)
save_controller = SaveController()

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/')
def index():
    # Serve the welcome screen at the root URL
    return render_template('index.html')

@app.route('/game')
def game():
    default_names = save_controller.get_default_names()
    return render_template('game.html', default_names=default_names)

@app.route('/api/scores', methods=['GET'])
def get_scores():
    scores = save_controller.get_top_scores(limit=10)
    # Strip TinyDB internal _id fields from response
    clean = [{"name": s["name"], "score": s["score"], "date": s.get("date", "")} for s in scores]
    return jsonify({"scores": clean})

@app.route('/api/scores', methods=['POST'])
def post_score():
    try:
        # Log raw request details for debugging
        app.logger.info(f"[SCORE] Content-Type: {request.content_type}")
        app.logger.info(f"[SCORE] Raw data: {request.get_data(as_text=True)}")

        data = request.json

        if data is None:
            app.logger.warning("[SCORE] request.json returned None (not valid JSON)")
            return jsonify({"error": "Invalid or missing JSON body"}), 400

        app.logger.info(f"[SCORE] Parsed JSON type: {type(data).__name__}, value: {data}")

        if not isinstance(data, dict):
            app.logger.error(f"[SCORE] Expected a JSON object (dict) but got {type(data).__name__}: {data}")
            return jsonify({"error": f"Expected JSON object, got {type(data).__name__}"}), 400

        name = (data.get('name') or '').strip()
        score = data.get('score')

        app.logger.info(f"[SCORE] Extracted -> name='{name}', score={score} (type: {type(score).__name__ if score is not None else 'None'})")

        if not name or score is None:
            app.logger.warning(f"[SCORE] Validation failed: name='{name}', score={score}")
            return jsonify({"error": "Missing name or score"}), 400

        int_score = int(score)
        app.logger.info(f"[SCORE] Inserting into DB -> name='{name}', score={int_score}")
        save_controller.add_score(name, int_score)
        app.logger.info(f"[SCORE] Score saved successfully for '{name}'")
        return jsonify({"status": "success"}), 201
    except Exception as e:
        app.logger.error(f"[SCORE] Unhandled exception: {e}\n{traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the app on 0.0.0.0:5000
    app.run(host='0.0.0.0', port=5000, debug=True)
