# Week 2 Notes — ehenkleuribe

## Setup
- **IDE used:** VS Code
- **AI coding extension / tool:** OpenCode
- **Model used:** Changed to QWEN3.6 27B GUUF Q4_K_M
- **Any configuration changes from Week 1:** I changed hardware from my old gen2 laptop to a gen6 laptop with 32GB RAM and an NPU

## Features Added
1. Score keeping
2. Next piece preview
(add more if applicable)

## Experience
- **How did working in an IDE differ from chat UI in Week 1:**
    Sometimes, I wasnt able to select the code from the terminal, so I had to start over. That didnt happen when using the LMStudio interface
- **What the local model did well in this workflow:**
    QWEN3.6-27B worked great and was able to debug the error on the code on its own and fix them. After 3 rounds of debbuging, the game was in a playable state.
- **Where it fell short or needed manual correction:**
    This hardware (T14s gen6) was able to process 1.9 T/s, so generating the game and the debuging took some time.
- **Estimated time spent with AI assistance vs. manual editing:**
    It took the AI aprox 30 min from the first prompt to the playable version of the game.

## Observations for the Assessment
- **Is IDE-connected local AI a viable daily coding workflow on your hardware? Why / why not:**
    It could be, but it consumes additional resources. If the apps do not require compiling of integration with GIT, it would be easier to just use the LMStudio interface.
- **Compared to cloud AI coding tools you've used (if any) — what's the practical gap:**
    The time it takes to get an answer is a lot higher than using cloud tools. Also, cloud tools are better trained and will probably yield a better response in less time.