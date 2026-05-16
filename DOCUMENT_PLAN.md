# DOCUMENTATION PLAN: Windows 11 Vulkan Local Coding Setup

This plan defines each document, command, and compliance check required to build the LM Studio + opencode tutorial. The writer must not assume anything beyond what is spelled out here. Every implementation detail, expectation, and boundary condition is captured below so that the next engineer can execute without further clarification.

## 1. Documentation Modules (Strict Scope)
- `README.md`: Neutral entry point (no "Ryzen community" language), banner, Mermaid architecture diagram, meta-objectives, and navigation links.
- `QUICKSTART.md`: Linux-style CLI-run steps that cover LM Studio + opencode only. Add an "Ollama placeholder" section marked as "deferred" with no commands.
- `SETUP.md`: Procedural Vulkan + LM Studio setup. Include only verified commands/flags; cite sources in the notes section (not here).
- `CONFIG.md`: Verified `opencode.json` schema listing only supported keys plus the required unload/load sequence for the single-active-model policy.
- `NOTES.md`: The authoritative reference for every design decision (Vulkan backend, single-resident model policy, quantization/context/concurrency choices). Include an "Assumptions & Non-Goals" subsection to explicitly state what is intentionally deferred.

## 2. Technical Guidelines (Enforced)
- **Primary Backend**: LM Studio must use Vulkan; any other backend is out of scope for this iteration.
- **Secondary Tools**: Ollama is parked—no installation instructions beyond a stub placeholder warning that the section is intentionally postponed.
- **Single Active Model**: Document and implement the unload/load sequence so only one model is resident at a time.
- **Context/Concurrency**: Hard limits of `32768` context tokens and `1` concurrency are required for 32GB RAM stability; define where they are enforced.
- **Style**: Succinct, enthusiastic, clean tone consistent with the provided banner; restrained emoticons; avoid AI jargon and community-specific phrasing.
- **CLI-First**: Every actionable step must be a Windows Terminal command (winget, `lms`, `opencode`). No GUI hand-holding.

## 3. Implementation Blueprint for Next Engineer

### 3.1. README.md (Visuals & Navigation)
- Banner aligned to the provided image.
- Mermaid diagram illustrating: LM Studio CLI → Model Download/Load → opencode engine → Single Model in memory → Vulkan GPU.
- Meta-objectives section describing: (a) enable local coding with LM Studio + opencode, (b) enforce Vulkan, (c) maintain single-active-model constraint.
- Quick links pointing to `QUICKSTART.md`, `SETUP.md`, `CONFIG.md`, `NOTES.md`. Do not mention "Ryzen community" or specific OEM branding.

### 3.2. QUICKSTART.md (Actionable Steps)
- Begin with a one-sentence summary of the goal.
- Step 1: `winget install ElementLabs.LMStudio` (include `--accept` flags). Do **not** install Ollama here; mention in a final placeholder section that Ollama guidance will be added later.
- Step 2: Start the LM Studio CLI daemon (`lms` commands) with specific ports/flags if documented.
- Step 3: Download the architect model using the documented LM Studio CLI command (name the exact model ID + quantization string from the authoritative source).
- Step 4: Demonstrate how to set context length to `32768` and concurrency to `1` via CLI (if CLI lacks those flags, specify the manual config file/GUI field and cite source in `NOTES.md`).
- Step 5: Run `opencode --model architect` and show expected output.
- Step 6: Verify the single-active-model state with `opencode status` or the documented equivalent.
- Closing: remind the engineer to reference `SETUP.md` for environment preparation and `CONFIG.md` for opencode configuration.
- Add an "Ollama placeholder" section at the end stating: "Ollama steps deferred—will be documented in a future iteration. Do not attempt to orchestrate Ollama in this release."

### 3.3. SETUP.md (Procedural Vulkan + LM Studio Setup)
- Section 1: Vulkan prerequisites (Vulkan ICD location, driver link). Provide the exact command to confirm ICD files exist (`Get-ChildItem`), note what file names to look for, and what to do if they are absent.
- Section 2: LM Studio CLI setup (official install path). Provide exact CLI commands for starting and stopping the daemon with example output.
- Section 3: LM Studio model download/load instructions with context/concurrency configuration. Use documented flags; if CLI lacks them, describe the JSON file or environment variable that controls the limits and reference `NOTES.md` for source.
- Section 4: opencode environment variables or config steps needed to enforce single active model and Vulkan backend (e.g., `OPENCODE_BACKEND=vulkan`). Use only documented or known keys.
- Section 5: Verification checklist (expected `lms list` output, `opencode status` response, etc.). If tooling has no CLI check, cite `NOTES.md` or mention manual observation.

### 3.4. CONFIG.md (opencode.json Breakdown)
- Provide the canonical minimal JSON snippet with validated keys. Example keys: `engine`, `models`, `switch`, `logging`. Dont invent keys.
- Under `engine`, document the `context_window`, `concurrency`, `backend`, and `model_policy` values. Cite where each key is supported.
- Under `models`, specify the supported LM Studio architect model ID (e.g., `qwen3.6-35b-instruct` plus the quantization string) and the Gemma 4B build identifier.
- Include a “Lifecycle” subsection that details the exact command sequence to unload the current model, flush GPU memory, and load the next model (using only documented commands). Provide a sample script/block they can copy.
- Attach a “Definition of Done” checklist verifying: (a) architect model downloads, (b) architect model context/concurrency applied, (c) `opencode status` shows architect model loaded and build model unloaded.

### 3.5. NOTES.md (The Authority)
- Begin with “Design Rationale” that cites the official docs for each decision. Provide the exact URL and section for: Vulkan backend, single-active-model policy, context/concurrency limits, quantized model names/IDs.
- Add an “Assumptions & Non-Goals” section stating: (a) Ollama is deferred, (b) instructions assume Windows 11 24H2, (c) Vulkan ICD is installed.
- Include a “Verification Evidence” section listing commands run plus their expected outputs, referencing the docs or CLI `--help` output.
- Provide a “Risk Register” table with failure modes (e.g., Model fails to download, Vulkan backend not detected, opencode attempts to load two models) and mitigation steps.
- Link each mitigation step back to the authoritative source.
