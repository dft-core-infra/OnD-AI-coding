# Week 2 Notes — DiegoPICT

## Setup
- **IDE used:** VS Code + WSL
- **AI coding extension / tool:** Pi Coding Agent (terminal-based) with local model backends via Unsloth Studio and LM Studio
- **Model used:** Gemma 4 12B and Qwen 3.6 27B (combined workflow)
- **Any configuration changes from Week 1:** Moved from single-file flow to a web-hosted Flask app structure (`templates/` + `static/`) with persistent score storage and LAN access testing from other devices.

## Features Added
1. Added a persistent leaderboard backed by TinyDB, exposed via `GET /api/scores` and `POST /api/scores`.
2. Added post-game score submission UI (name input + submit action + confirmation state), with leaderboard auto-refresh.
3. Added welcome screen + game entry flow and high-score preview on the landing page.
4. Enabled hosted local gameplay so the app can be played from other devices on my home LAN.

## Experience
- **How did working in an IDE differ from chat UI in Week 1:** IDE workflow was faster and more practical for full implementation because I could iterate code, run server, inspect logs, and test browser behavior in one place.
- **What the local model did well in this workflow:** Gemma 4 12B (Unsloth Studio) generated a working baseline web-hosted app on first try; overall model assistance was strong for scaffolding, wiring endpoints, and quick UI integration.
- **Where it fell short or needed manual correction:** Pi Coding Agent timed out multiple times and required manual retries; Gemma 12B frequently struggled with tool calling (wrong/failed command generation for file edits and related actions), especially during longer sessions.
- **Estimated time spent with AI assistance vs. manual editing:** ~70% AI-assisted, ~30% manual retries, debugging, and cleanup.

## Observations for the Assessment
- **Is IDE-connected local AI a viable daily coding workflow on your hardware? Why / why not:** Yes, with caveats. It is viable and productive, but reliability depends heavily on model size/capability and tool-calling stability at local inference speeds.
- **Compared to cloud AI coding tools you've used (if any) — what's the practical gap:** Local setup gives better control/privacy and excellent responsiveness for simple tasks, but cloud tools are generally more consistent on complex multi-step tool use. Practical takeaway: a hybrid local strategy worked best here (small model for quick edits, larger model fallback when tool calling repeatedly fails).
