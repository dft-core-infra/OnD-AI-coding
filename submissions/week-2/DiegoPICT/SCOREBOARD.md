# Scoreboard Implementation Plan

This document outlines the plan for implementing a persistent scoreboard in the Neon Tetris game.

## Coding Principles
- Less Code is More
- Simple UI with consistent theme
- Is Mobile-aware, when mobile in portrait is detected, it suggest landscape
- Dont bloat, bandaid, if you get in trouble stop/ask.

## Objectives
- Allow players to submit their scores when the game ends.
- Suggest a random fun default short player name from a randomized list in the savegame json - this is to make the UI as simple and unobtrusive as possible desktop/mobile
- Persist scores across server restarts.
- Display a leaderboard of high scores to players.
- Maintain the "Neon" aesthetic in the scoreboard UI.
- Ultra simplified UI 

## Implementation Plan

### 1. Data Storage (JSON-based)
For the initial implementation, we will use a simple JSON file to store scores. This avoids the overhead of a full database while providing persistence.
- **File:** `data/scores.json`
- **Structure:**
  ```json
  {
    "scores": [],
    "default_names": ["Arthur", "Ford", "Zaphod", "Trillian", "Marvin", "Slartibartle", "Heart", "Beeblebrox"]
  }
  ```

### 2. Backend API (Flask)
We will add two new routes to `main.py`:
- **GET `/api/scores`**: Returns the top 10 scores from the JSON file.
- **POST `/api/scores`**: Receives a JSON object containing the player's name and score, validates the input, then appends it to the file (sorted by score descending).

### 3. Frontend Integration (JavaScript)
We will update `static/js/game.js` to:
- **Fetch Scores:** Call the `/api/scores` endpoint when the game page loads and display the results.
- **Submit Score:** When `gameOver` is true, show an input field for the player's name and a "Submit" button.
- **Handle Submission:** Use `fetch()` to send the name and score to the `/api/scores` endpoint and then refresh the leaderboard.

### 4. UI/UX Enhancements
- **Leaderboard Component:** Create a new section in `templates/game.html` to display the scores.
- **Styling:** Use the existing neon theme (cyan accents, dark background) for the scoreboard container.
- **Animations:** Add a slight fade-in effect when the leaderboard is updated.

## Roadmap Checklist
- [x] Create `data/scores.json` and basic schema.
- [x] Implement `GET /api/scores` in `main.py`.
- [x] Implement `POST /api/scores` in `main.py`.
- [ ] Update `game.js` to fetch and display scores on load.
- [ ] Add "Game Over" score submission UI to `game.html`.
- [ ] Connect "Submit" button to the backend API.
- [ ] Style the leaderboard to match the Neon theme.
- [x] Add scoreboard to homepage (`templates/index.html`).

## Recent Progress
- Initialized `data/scores.json` with Douglas Adams character names.
- Created `save_controller.py` using `tinydb` for score management.
- Implemented `/api/scores` endpoints in `main.py`.
- Added scoreboard display and auto-loading logic to `templates/index.html`.
