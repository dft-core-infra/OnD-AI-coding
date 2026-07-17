\# Week 2 Notes — gentgashi-unicef



\## Setup

\- \*\*IDE used:\*\* VS Code

\- \*\*AI coding extension / tool:\*\* Opencode

\- \*\*Model used:\*\* Same base model as Week 1 (qwen/qwen3.6-27b-a3b), but had to fall back to a smaller local model after the larger model repeatedly timed out inside the IDE workflow.

\- \*\*Any configuration changes from Week 1:\*\* Kept the single-file `tetris.html` structure rather than moving to a hosted web app; focused on extending gameplay features within the existing file.



\## Features Added

1\. Ghost piece — shows a preview outline of where the current piece will land.

2\. Scoreboard — tracks and displays score during gameplay, as well as a button to reset the score (browser cache storage only).

3\. Hold piece — allows swapping the current piece into a "hold" slot for later use.

4\. Sound effects for gameplay actions, hotkey + button to toggle on / off.



\## Experience

\- \*\*How did working in an IDE differ from chat UI in Week 1:\*\* Opencode in VS Code felt more integrated than the Week 1 chat-based flow — changes could be applied directly to the file, and it felt more like actual development flow, although with some constrains.

\- \*\*What the local model did well in this workflow:\*\* The added features were all working fine, and the game was enhanced with several new features.

\- \*\*Where it fell short or needed manual correction:\*\* The larger model with default parameters consistently timed out inside the IDE-connected workflow, and a lot of trial and error to get it running. Also I prompted to hardcode the rotation of the peices in 4x4 matrices, so each piece has 4 matrices, however the models kept producing weird rotations.

\- \*\*Estimated time spent with AI assistance vs. manual editing:\*\* Most of the coding was done by the model, few rotations of the pieces had to be fixed manually.



\## Observations for the Assessment

\- \*\*Is IDE-connected local AI a viable daily coding workflow on your hardware? Why / why not:\*\* Partially. It's workable for small, incremental coding tasks with a smaller model, but running larger models through an IDE extension on this hardware isn't reliable enough yet for consistent daily use — timeouts became a real bottleneck. Moreover, if I try to use the laptop while running the model for something else, it will just further increase the timeouts.

\- \*\*Compared to cloud AI coding tools you've used (if any) — what's the practical gap:\*\* Local setup offers better privacy and control, and I don't really need to check what I am pasting in, I know it will not end up on the internet. For small use cases it works well, and models that I can use in the chat, such as qwen3.6-27b or 35b are quite "smart". Generally these models areis responsive enough for straightforward edits, but lacks the consistency of cloud tools for longer sessions before model timeouts interrupt the workflow, especially when using with a 32GB laptop and trying a larger model.

