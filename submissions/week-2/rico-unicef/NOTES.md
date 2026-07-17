# Week 2 Notes — rico-unicef

## Setup
- **IDE used:** VS Code
- **AI coding extension / tool:** Continue
- **Model used:** gemma4-e4b (but also tried others like qwen3.6-27b, gemma4-12b, qwen3.5-9B, qwen2.5-coder-14b)
- **Any configuration changes from Week 1:** I used my office T14s Gen5 32GB laptop (last week I used my personal Macbook Air M4 16GB laptop)

## Features Added
1. Next Piece Preview
2. Points to Level Up


## Experience
- **How did working in an IDE differ from chat UI in Week 1:**   
    In Week 1, the interaction was largely prompt-driven using LM Studio's chat interface. The workflow was straightforward: provide a prompt, generate code, test the output, and return to the chat when debugging was needed (or create a new chat to try different prompts).  

    Week 2 felt much closer to a real-world software development workflow. Instead of generating a complete application from scratch, I tried enhancing an existing Tetris game by adding more features to it. The local model was connected to VS Code, alongwith required extensions like Continue to enable the chat with the model.  

    The experience reminded me of stories from my university professors who would compile programs, leave for a snack break, come back later, and discover the compile had failed and they had to start over again. In my case, response generation was often slow, sometimes painfully so, and I experienced several crashes, hangs, and stalled responses throughout the challenge.  

    Unlike Week 1, where the challenge was primarily generating working code, Week 2 exposed the realities of maintaining and enhancing an existing codebase using local AI.

- **What the local model did well in this workflow:**   
    The model performed best when tasks were small and well-defined, focused on a single enhancement, accompanied by very specific instructions, and constrained to only modify certain sections of the file.  

    I achieved better results when I treated the model as a coding assistant rather than a software engineer asking it to perform broad enhancements. For example, instead of saying, _"Enhance the Tetris game."_ (which I did in my initial tries and using several models), I used prompts such as, _"Here is my Tetris game. @tetris.html. Add a next-piece preview. Only give me the new or changed code with comments indicating where it should be inserted. Do not rewrite the entire file."_  

    The model was generally capable of producing usable code for the requested features when the prompt identified the exact file, specified one feature at a time, clearly defined the output format, and explicitly instructed the model not to rewrite the entire file.

    I also found that asking for only the changed code significantly improved the usefulness of the output.

- **Where it fell short or needed manual correction:**    
    Several aspects of the workflow remained challenging:  
        - Response generation was slow.  
        - The model occasionally stalled or crashed.  
        - Multiple iterations were often required.  
        - Different models had to be tested before finding one that could produce usable output.  
        - The IDE's "Apply" functionality did not reliably update the source file.  
        - Manual copy-paste operations were frequently required.  
        - Testing and validation remained largely manual.  

    One of the biggest lessons was that generating code is only one part of the workflow. The broader developer experience includes:  
        - Generating code  
        - Applying changes correctly  
        - Testing  
        - Debugging  
        - Recovering from failures (crashes, hanging, etc.)  

    The local model could often complete Step 1, but the remaining steps still required considerable human intervention. The challenge was less about whether AI could suggest code and more about whether the entire workflow could operate reliably from start to finish.

- **Estimated time spent with AI assistance vs. manual editing:**  
    The actual feature enhancements (next-piece preview and score-to-next-level indicator) were relatively simple from a coding perspective. Most of the effort was spent managing the workflow:  
        - Waiting for responses.  
        - Recovering from crashes, hangs, and stalled sessions.  
        - Testing different models.  
        - Manually applying suggested changes.  
        - Testing and validating the game after each change.  
        - Repeating prompts and refining instructions.  
    The challenge took several days to complete, not because the enhancements were technically difficult, but because the end-to-end workflow was slow and iterative.  

## Observations for the Assessment
- **Is IDE-connected local AI a viable daily coding workflow on your hardware? Why / why not:**  
    Partially, but only for small and well-scoped tasks. The local AI workflow proved capable of generating working code for targeted enhancements. I successfully completed the challenge and implemented both requested features. But I experienced painfully slow response times, crashes and hangs, unreliable file-edit integration, significant manual validation effort and multiple prompt iterations to obtain usable output.  

    For small enhancements and code snippets, the workflow is viable. But for larger development efforts involving multiple files or more complex tasks, the current experience is not reliable or efficient on my hardware. My experience reinforced the idea that successful local AI coding depends not only on the model itself but mostly on hardware capability.  

- **Compared to cloud AI coding tools you've used (if any) — what's the practical gap:**  
    Cloud AI coding:  
        - Faster response times.  
        - Better reasoning and code quality.  
        - Larger context windows.  
        - More reliable file editing and integration.  
        - Better support for multi-file projects.  
        - Less need for prompt refinement and troubleshooting.  
    By comparison, in my local setup, local AI coding requires substantially more manual effort. I spent considerable time managing workflow issues such as slow generation, crashes, stalled responses, model switching, manually applying code changes, and validating outputs.  With the hardware commonly available to many colleagues today (e.g., 16GB and 32GB memory configurations), local AI coding should not yet be considered a recommended primary use case for day-to-day software development. While it is technically possible to generate and enhance working applications, the experience is often slow, unstable, and requires significant developer intervention.  
