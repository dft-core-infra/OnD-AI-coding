# Week 1 Notes — ehenkleuribe

## Hardware
- **Device type:** Corporate Standard Lenovo T14s Gen2
- **RAM:** 16GB RAM
- **GPU / AI acceleration:** Intel Iris XE
- **OS:** Windows 11 24H2

## Setup
- **Inference engine used:** LM Studio
- **Model used:** 
        qwen2.5-7b-instruct - Tried to download tetris from the web        	
        glm-4-9b-0414 - Generated code but without HTML format. I would need to invest some time to format the code correctly.        	
        google/gemma-4-e4b - Generate code, the game interface shows but the game itself wont start
- **Time to get running (approx):** First model took 2 hours, the others were faster (Research on which to install took most of the time)

## Experience
- **What worked well:** After initial setup, all the tools worked well with each other.
- **What was harder than expected:** Setting up all the tools on UNICEF Standard Hardware required modifiying local policies.
- **Did you hit any blockers? How did you resolve them:** 
        Windows was configured to disable execution of PowerShell scripts, which complicated the initial setup.
        My current hardware has 16GB RAM, which limited the models that could run.

## Observations for the Assessment
- **Would you recommend this setup to a colleague on the same hardware? Why / why not:**
        No. 16GB RAM is not enough to run a competent model and still have resources left to use the laptop correctly.
- **Any use cases this hardware/model combo seems well-suited for:**
        Extremely simple tasks could probably run, but loading any model would still make the system slow and unstable.
- **Any use cases it clearly won't handle:**
        Complex models and complex tasks are not recommended on this hardware
