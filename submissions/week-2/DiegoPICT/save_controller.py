import logging
from tinydb import TinyDB, Query
from datetime import datetime

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class SaveController:
    def __init__(self, db_path='data/scores.json'):
        self.db = TinyDB(db_path)
        self.scores = self.db.table('scores')
        self.config = self.db.table('config')
        
        # Initialize config if it doesn't exist
        if not self.config.all():
            self.config.insert({'default_names': [
                "Arthur", "Ford", "Zaphod", "Trillian", 
                "Marvin", "Slartibartle", "Heart", "Beeblebrox"
            ]})

    def get_top_scores(self, limit=10):
        all_scores = self.scores.all()
        sorted_scores = sorted(all_scores, key=lambda x: x['score'], reverse=True)
        return sorted_scores[:limit]

    def add_score(self, name, score):
        new_score = {
            "name": name,
            "score": int(score),
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        logger.info(f"[DB] Inserting score: {new_score}")
        doc_id = self.scores.insert(new_score)
        logger.info(f"[DB] Score inserted with doc_id={doc_id}")
        return True

    def get_default_names(self):
        docs = self.config.all()
        if not docs:
            return []
        return docs[0].get('default_names', [])
