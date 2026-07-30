# Week 1 Notes — rico-unicef

## Hardware
- **Device type:** Macbook Air M4 laptop (Personal)
- **RAM:** 16GB
- **GPU / AI acceleration:** 8-core Apple Silicon GPU (Unified Memory) 
- **OS:** macOS Tahoe Version 26.4.1

## Setup
- **Inference engine used:** LM Studio
- **Model used:** Gemma 4 12B Instruct (Q4_K_M Quantization)
- **Time to get running (approx):** approx 20 mins to get running including engine installation and model download; about 10mins from thinking to generating the code; total of approx 3 hours (even more) to debug and come up with a working tetris game

## Experience
- **What worked well:** The M4's unified memory architecture allowed the 12B model to run okay (but quite slow). Gemma 4 was instruction-compliant when prompted to output only raw code
- **What was harder than expected:** Generation of a fully working HTML code of a Tetris Game. The HTML code that was originally generated was not fully functioning -- while the initial screen shows up, the game does not start when the "Start Game" button is clicked. I asked the model to debug the code and it generated again a modified HTML code, but the same result. What I did next was to create a new chat and pasted the generated code, and asked the model to act as Senior Software Developer and asked it to debug the code.  
- **Did you hit any blockers? How did you resolve them:** Yes. the model, while it was able to perform the task (i.e., generate HTML code for a tetris game), the generated code was not functioning as expected. So I had to instruct the model to debug several times, and also tried variations of prompts before generating HTML code of a functioning tetris game. Also encountered generated HTML code with chain of thought texts (e.g., "Actually,...", "Wait!...", etc.) -- So I had to include in the prompt to exclude this kind of texts. Another blocker that I encountered was the context length, but it was easily contained by adjusting the context length setting.

## Observations for the Assessment
- **Would you recommend this setup to a colleague on the same hardware? Why / why not:** Not for Coding as the model (Gemma 4) failed a lot of times in generating working code even with different workarounds for debugging. But for brainstorming, the output was great. For coding, better to try a different and smaller local model like the QWen 3.5 9B series (I tried this and the token per second is higher than of Gemma4 12B's).
- **Any use cases this hardware/model combo seems well-suited for:** I just tested the hardware/model combo with code generation and brainstorming (e.g., implementation of a local AI model in an office process automation). While it this might be able to produce working code for simple apps (after several tries using different prompts), better to use the model in other use cases like brainstorming and planning. The combo is also good for summarization (give a URL and the model will summarize the content of that URL).
- **Any use cases it clearly won't handle:** Complex app development/coding
