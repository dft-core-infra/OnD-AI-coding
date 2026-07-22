# Week 1 Notes — Polly Maina

## Hardware

**Device type:** HP EliteBook X G1a 14" Next Gen AI PC  
**Processor:** AMD Ryzen AI 7 PRO 360 with Radeon 880M Graphics  
**RAM:** 64 GB  
**GPU / AI acceleration:** AMD Radeon 880M integrated GPU with Ryzen AI NPU  
**OS:** Windows 11 Enterprise 24H2

## Setup

**Inference engine used:** LM Studio

**Model used:** Qwen 3.30 - a3b Instruct GGUF (Q4_K_M)
  Size on disk :18.63GB


**Time to get running (approx):**
Around 180 minutes including LM Studio installation, model download, Git setup, repository fork, and local testing.



## Experience

### What worked well

- LM Studio installation was straightforward.
- The HP EliteBook X handled local inference smoothly with 64 GB RAM.
- Qwen generated a fully playable HTML Tetris game from a single prompt.
- GitHub fork, clone, commit, and push workflow worked well after initial setup.

### What was harder than expected

- Understanding the Git workflow as a non regular user.
- Creating branches and publishing changes to GitHub.
-
### Did you hit any blockers? How did you resolve them?

**Blocker:** LM Studio model selection and download options were initially confusing.

**Resolution:** Reviewed the project quick-start guide and experimented with different commands until the model loaded successfully.

**Blocker:** Pull Request creation was not available.

**Resolution:** Verified that the branch was successfully pushed and determined that repository permissions restricted PR creation for non-collaborators.

## Observations for the Assessment

Running modern LLMs locally is becoming practical on AI PCs with sufficient memory. The combination of LM Studio and Qwen provided a simple way to generate working code without requiring cloud services.

The exercise also highlighted that understanding Git and GitHub workflows is just as important as understanding the AI tooling itself.

## Would you recommend this setup to a colleague on the same hardware? Why / why not?

**Yes.**

The HP EliteBook X G1a with 64 GB RAM provided a good experience for simple local AI development and testing. The machine was capable of running a large language model locally while remaining responsive for normal productivity tasks.

## Any use cases this hardware/model combination seems well-suited for?

- PowerShell and scripting assistance
- Offline AI experimentation

## Any use cases it clearly would not be suited for?


## Deliverable

A single-file HTML Tetris game generated using a locally hosted language model on the device.

**Submission file:** `Tetris.html`