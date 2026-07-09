\# Week 2 Notes — OKHALEEL



\## Setup

\- \*\*IDE used:\*\* VS Code

\- \*\*AI coding extension / tool:\*\* Coding Agents (Zoo Code, Cline, and Continue) connected to LLMs via (LM Studio, Ollama, llama.cpp)

\- \*\*Model used:\*\* Tested both Gemma-4 12B and Qwen-3.6 27B

\- \*\*Any configuration changes from Week 1:\*\* The idea was to use the working code I got from week1 and enhance it with more functions/UI. 



\## Features Added (tried to add, but did not work so far)

* A welcome landing page with Play button
* Select a player name
* Option to save the score
* Show a leaderboard with top scores



\## Experience

\- \*\*How did working in an IDE differ from chat UI in Week 1:\*\* It is easier to work with, provides better capabilities, and allows user to test and refine.

\- \*\*What the local model did well in this workflow:\*\* When tested with Qwen-27B, it was very slow about 1 tok/s. Gemma-4 12B was better with about 2.4 tok/s but still times out and could not finish the requested updates.

\- \*\*Where it fell short or needed manual correction:\*\* The performance was not accepted as I waited for several hours in some cases, but the generation process stopped suddenly. I was able to fix some errors related to the cnx window, tried a lot of different combinations in settings such as context windows, threads, GPU offloads, etc.. 

What I noticed is that most of the time-outs happen when the agent started editing the existing html file or creating a new file, so part of my troubleshooting was confirming the access permissions (IDE and agent), for example: added a yaml file called permissions with Read (\*) and Write (\*) 

\- \*\*Estimated time spent with AI assistance vs. manual editing:\*\* 90% troubleshooting and trying different options/settings.



\## Observations for the Assessment

\- \*\*Is IDE-connected local AI a viable daily coding workflow on your hardware? Why / why not:\*\* No, it did not work for me. very very slow, and unstable.

\- \*\*Compared to cloud AI coding tools you've used (if any) — what's the practical gap:\*\* Of course privacy and cost saving are the main advantages for local coding, but it is limited to small/simple tasks. Cloud tools are much faster, mature, and gives more predictable results.

