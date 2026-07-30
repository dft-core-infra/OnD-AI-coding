# Neon Tetris

A retro-inspired, neon-themed Tetris game built with HTML5 Canvas and served via a Python backend.

## Overview
Neon Tetris is a web-based implementation of the classic block-stacking puzzle game. It features a vibrant "Neon" aesthetic, smooth gameplay mechanics, and is designed to be served as a web application with a centralized scoreboard and a themed landing experience.

## Features
- **Core Gameplay:** Full Tetris mechanics including rotation, line clearing, and hard drops.
- **Neon Aesthetic:** High-contrast visuals with glowing effects and a dark theme.
- **Responsive Controls:** Support for both Arrow keys and WASD.
- **Welcome Screen:** A themed landing page to introduce the game.
- **Scoreboard:** A persistent leaderboard to track and display high scores.

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Canvas API).
- **Backend:** Python (Flask/FastAPI) to serve the application and manage scoreboard data.

## Getting Started

### Prerequisites
- Python 3.x
- pip (Python package manager)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd tetris
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Game
To start the server:
```bash
python main.py
```
The game will be available at `http://0.0.0.0:5000`.

## Project Structure
- `main.py`: Python backend server.
- `static/`: Contains CSS and JS assets.
- `templates/`: Contains HTML templates (Welcome screen, Game screen).
- `requirements.txt`: Python dependencies.

## Roadmap
- [ ] Migrate standalone `tetris.html` into a template-based structure.
- [ ] Create the Neon-themed Welcome Screen.
- [ ] Implement a persistent Scoreboard (SQLite or JSON-based).
- [ ] Add "Ghost Piece" preview.
- [ ] Implement dynamic difficulty (speed scaling).
