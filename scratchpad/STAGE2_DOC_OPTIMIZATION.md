# STAGE 2: Documentation Optimization Plan

This document details the targeted corrections required to realign the documentation suite with the project's meta-objectives. The primary goal is to shift the focus from a "Vulkan advocacy" piece back to a practical, authoritative, CLI-first guide for setting up LM Studio + opencode on Windows 11.

---

## 1. Global Rebalancing (The 30,000-Foot View)

### Current Flaws
- **Vulkan Obsession**: The text treats Vulkan as a highly precarious, critical configuration step rather than the reliable default backend it is in LM Studio.
- **Tone Drift**: The language reads too much like a rigid compliance mandate ("Enforce", "Mandatory") instead of an enthusiastic, practical engineering guide.
- **Incomplete Execution**: Placeholders like `<model-id>` remain in the `QUICKSTART.md` and `CONFIG.md`, which violates the requirement that the next engineer has everything they need to execute.

### The Fix
- **Demote the Backend**: Remove Vulkan from headers and primary architecture diagrams. Treat it as an implementation detail documented in `NOTES.md`.
- **Concrete Values**: Replace all `<model-id>` and `<quant>` placeholders with the exact, authoritative strings for Qwen 3.6 35B and Gemma 4B.
- **Streamline the Flow**: The operational docs (`QUICKSTART.md`, `SETUP.md`, `CONFIG.md`) must read as a seamless sequence of commands, not theoretical essays.

---

## 2. File-by-File Optimization Directives

### 2.1 README.md
*   **Remove**: "Vulkan Backend" from the main title and subtitle.
*   **Remove**: The Vulkan badge from the header.
*   **Update Diagram**: Simplify the Mermaid diagram to show: `User -> opencode -> LM Studio -> Model -> Hardware`. Do not emphasize Vulkan or memory managers here.
*   **Tone**: Revert to the enthusiastic, "lab environment" tone implied by the banner. Focus on the achievement (running a 35B model locally).

### 2.2 QUICKSTART.md
*   **Remove**: All explicit Vulkan environment variable setup commands. (LM Studio defaults to the best available backend on modern AMD hardware).
*   **Resolve Placeholders**: Inject the exact `lms` commands using real Hugging Face repository IDs (e.g., `lms get qwen/qwen-2.5-32b-instruct-gguf` or the exact LM Studio equivalent).
*   **Streamline**: Make this a pure "copy-paste-win" terminal flow. 

### 2.3 SETUP.md
*   **Reduce**: Completely remove the "Vulkan Prerequisites" (Section 1). If the user has a modern RyzeniGPU, the drivers are already present, and LM Studio handles it. 
*   **Refocus**: This file should purely cover LM Studio Daemon setup, configuring the `32768` context window, and concurrency limits via the `lms` CLI.
*   **Simplify Checklists**: Keep the verification steps focused on the model loading successfully, not checking system directories for `.json` files.

### 2.4 CONFIG.md
*   **Clean Schema**: Ensure `opencode.json` relies on native `opencode` features. Do not invent keys like `single_resident` if they aren't part of the official opencode schema. Instead, document *how* to achieve the single-model workflow using standard configuration.
*   **Concrete Examples**: The JSON snippet must use the exact model string defined in `QUICKSTART.md`.

### 2.5 NOTES.md
*   **Quarantine Backend Talk**: Move *all* discussion about why Vulkan is preferred over DirectML into a single, small subsection here. 
*   **Expand Rationale**: Focus the "Why" on the context window limits (32k) and concurrency (1) as the key to 32GB RAM stability.
*   **Clean Links**: Ensure every link provided in the Risk Register points to a real, helpful resource, not a generic landing page.

---

## 3. Execution Standard for Next Engineer
When executing this optimization:
1. Do not add new sections.
2. Only remove bloat and replace placeholders with concrete data.
3. If an exact model ID cannot be verified via `lms`, use the most standard `gguf` convention and clearly note the uncertainty in `NOTES.md`.