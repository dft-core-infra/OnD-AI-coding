# NOTES: Design Rationale & Technical References

This document shows our work—why we made specific choices, what we tested, what we deliberately didn't include.

**For:** Curious readers who want to understand the reasoning, and future maintainers who need to know what assumptions we made.

---

## Scope & Audience

### Who This Serves

**Primary:** Field IT Professionals from diverse backgrounds (IT support, network, telecoms, infrastructure, sometimes app development/support) who are adding local AI coding to their professional toolkit. Many have deep expertise in their domains but may not have developer backgrounds or git experience.

**Secondary:** Developers (familiar with opencode, just need LM Studio connection), Infrastructure Architects, Software Architects, Specialists/SMEs, IT Team Managers.

### What They'll Do With This

**Daily practical tasks:**
- Generate PowerShell scripts for automation (user provisioning, system config, batch operations)
- Troubleshoot Windows error messages without sending logs externally
- Write documentation for systems they support

**Why these use cases:** They justify the setup time with immediate, recurring value. Privacy matters (local models, no cloud), and the capabilities directly enhance their existing work.

---

## Hardware Landscape

### Current Reality

**Most widely deployed:** Non-AI devices with iGPU (non-AI optimized) and 16GB RAM. This is the baseline most IT professionals currently have.

**Most recent (target profile):** Windows AI systems with NPU/AI iGPU and 32GB unified RAM. Ryzen AI and Intel Lunar Lake represent best performance.

**Less common:** macOS with modern Apple silicon, some AI-optimized. Not primary focus but worth acknowledging.

### Documentation Strategy

**Primary path:** Focus on 32GB Windows systems with 35B models (Qwen 3.6, Gemma 4). These are MoE architecture with lower quantization options and MTP optimizations.

**Sidebar notes:** Throughout documentation, sidebars provide 16GB alternatives (9B models max, since systems need to run other software concurrently).

**Rationale:** Keep main flow clean and optimized for target hardware while acknowledging most readers currently have 16GB systems. Both audiences find what they need without clutter.

---

## Model Selection

### Qwen 3.6 35B (Primary Recommendation)

**Why this model:**
- MoE (Mixture of Experts) architecture provides strong reasoning
- Lower quantization options available (q4_k_m recommended)
- MTP (Multi-Token Prediction) optimizations improve efficiency
- Excellent code generation capability
- Well-supported in LM Studio ecosystem

**Memory footprint:** ~18-20GB RAM when loaded with q4_k_m quantization.

**Verification:** Check HuggingFace model cards and LM Studio model search for current availability. Model names evolve; use `lms search qwen 3.6 35b` for exact identifiers.

**Alternative (similar capability):** Gemma 4 (similar size), also benefits from MoE and quantization options.

### 9B Models (16GB Alternative)

**Why 9B specifically:** Systems need to run OS, browser, development tools alongside the model. 9B models (~5-6GB footprint) leave adequate headroom. 13B+ models risk memory pressure.

**Recommended options:**
- Qwen 2.5 9B: Good general capability, similar architecture to 35B variant
- Gemma 9B: Fast inference, strong on script generation

---

<div align="center">
<img src="assets/cory-dna-strand-flying.png" alt="Team member exploring system architecture" width="220"/>
</div>

## Configuration Defaults

### Context Window: 32768 tokens

**Rationale:** 
- Handles most coding tasks (full files, reasonable context)
- Conservative for 32GB RAM with other applications running
- Going higher (e.g., 65536) risks system paging under load
- These are tested defaults, not theoretical maximums

**Trade-off:** Some tasks benefit from larger context (analyzing multiple large files). On dedicated systems, you might push higher. For multi-application environments, 32k is the reliable sweet spot.

**Sources:** Testing on 32GB systems, cross-referenced with LM Studio memory guidance and llama.cpp documentation on context/memory relationships.

### Concurrency: 1

**Rationale:**
- Single request at a time prevents memory fragmentation
- With 35B model on 32GB RAM, parallel requests compete for memory
- Sequential processing is actually faster (no context switching overhead)
- More predictable performance

**Trade-off:** Can't process multiple requests simultaneously. For single-user, interactive coding tasks, this isn't a limitation.

**Sources:** Observation of memory behavior under load, LM Studio parallel request documentation.

### Single-Active-Model Policy

**Rationale:**
- 35B model at q4_k_m: ~18-20GB RAM
- Loading second large model: Exceeds safe memory threshold
- Result: System paging, severe performance degradation
- This is RAM physics, not arbitrary restriction

**The unload/load sequence:**
```powershell
lms unload --all
Start-Sleep -Seconds 3  # Memory reclaim
lms load <new-model> --context-length 32768 --max-parallel 1
```

**Why the sleep:** OS needs moment to reclaim memory. Without delay, second load starts before first model's memory is fully released.

**Sources:** Windows memory management behavior, practical testing.

---

## Backend: Vulkan

### Why Vulkan Isn't Emphasized

**Reality:** On modern Ryzen AI and Intel Lunar Lake systems, Vulkan is the automatic default for hardware acceleration. LM Studio handles this without configuration.

**Previous mistake:** Earlier documentation obsessed over Vulkan setup, treating it as fragile and complex. That was wrong. It just works.

**When Vulkan matters:** If someone has driver issues, that's a driver problem (update from manufacturer), not something we can solve with config checks.

**Authoritative reference:** LM Studio docs on hardware acceleration. Query those for backend troubleshooting, not this guide.

---

## Technology Stack Rationale

### Why LM Studio

**Strengths:**
- Robust model discovery and download
- Intuitive CLI + GUI (choose your tool)
- OpenAI-compatible API server (works with many clients)
- Well-documented
- Works reliably on Windows

**What it provides:** Model engine half of the solution.

### Why opencode

**Strengths:**
- Standard tool (widely available, free)
- Developers already know it
- Designed specifically for coding workflows (not generic chat)
- Easy to learn for IT Pros

**What it provides:** Coding workflow interface that connects to LM Studio.

**Why this separation:** Decoupling engine (LM Studio) from interface (opencode) means you can use other tools with the same LM Studio server. Flexibility.

---

## What We Deliberately Excluded

### Ollama

**Status:** Deferred to future iteration.

**Why deferred:** Haven't tested Ollama integration thoroughly enough to provide the same quality of verified instructions we're giving for LM Studio. Honesty over completionism.

**Not because Ollama is bad:** Just because we can only document what we've actually validated.

### Multi-Model Workflows

**Status:** Not covered in this guide.

**Why:** Single-model-at-a-time is the tested, stable path for 32GB systems. Multi-model orchestration adds complexity and memory pressure.

**Alternative:** If you need multiple models, run multiple instances on different systems, or invest in more RAM.

### Elaborate Backend Configuration

**Why not:** We don't own LM Studio or Vulkan. Documenting their internals would be speculation that goes stale. Point to authoritative docs instead.

**What we do document:** How to connect opencode to LM Studio. The integration recipe, not the implementation internals.

### Developer Workflow Assumptions

**Critical omission:** We do NOT assume familiarity with git, version control, or developer conventions. Field IT Pros may not have this background.

**When needed:** If git or dev concepts are necessary, explain briefly or link to authoritative sources. Accessibility without condescension.

---

## Verification & Testing

### Commands We Ran

| Command | Purpose | Expected Output |
|:---|:---|:---|
| `lms --version` | Verify installation | Version string displays |
| `lms server status` | Check server | Server running, port shown |
| `lms ps` | Check loaded models | One model "loaded", memory usage visible |
| `opencode --version` | Verify opencode install | Version string displays |
| `opencode "test request"` | Test connection | Model responds appropriately |

### What "Tested" Means

These commands and configurations work on Windows 11 24H2 systems with 32GB RAM, Ryzen AI / Intel Lunar Lake hardware, updated drivers. 

**Not universal claims:** Different hardware, different OS versions, different driver versions may behave differently. These are verified on the specified configuration.

**Your responsibility:** Verify commands work on YOUR system. Use `--help` flags, check authoritative docs, test before relying on scripts.

---

## Common Failure Modes & Fixes

### Model Won't Download

**Symptoms:** `lms get` command fails or times out.

**Check:**
- Internet connection active
- Sufficient disk space (~20GB+ free)
- Model identifier correct (use `lms search` to verify)
- LM Studio daemon running

**Fix:** Retry with correct model identifier, check connection, free up disk space.

### opencode Can't Connect

**Symptoms:** opencode times out or reports connection refused.

**Check:**
- LM Studio server running: `lms server status`
- Endpoint in opencode.json matches server port
- Firewall not blocking localhost connections

**Fix:** Start server (`lms server start`), verify endpoint URL, check firewall rules.

### System Paging During Inference

**Symptoms:** Disk activity during requests, sluggish system, slow responses.

**Check:**
- Task Manager: RAM usage near 100%
- Multiple models loaded: `lms ps` (should be one)
- Context window too high for available RAM

**Fix:** Unload extra models, reduce context_window to 16384, close unnecessary applications, or switch to smaller model (9B).

### Model Loads But Doesn't Respond

**Symptoms:** `lms ps` shows "loaded" but opencode requests fail or hang.

**Check:**
- Model name in opencode.json exactly matches `lms ps` output (case-sensitive)
- context_window in opencode.json doesn't exceed model's loaded context length
- Terminal shows error messages

**Fix:** Match model names exactly, align context settings, check logs for specific errors.

---

## Hardware Recommendations (Grounded)

### Best Performance

**Ryzen AI systems:** AMD's AI-optimized processors with integrated NPU/iGPU. Vulkan acceleration automatic.

**Intel Lunar Lake:** Intel's latest architecture with AI acceleration. Similar Vulkan support.

**Both provide:** Good performance for 35B models at q4_k_m quantization, reliable hardware acceleration, Windows 11 support.

### Adequate Performance

**Recent AMD/Intel with 32GB:** Even without AI-specific optimizations, modern integrated graphics + adequate RAM runs these models acceptably. 

**Performance difference:** AI-optimized hardware is faster, but not required. Standard modern hardware (2022+) with 32GB RAM works.

### Insufficient

**16GB systems without adjustment:** Can't run 35B models reliably. Must use 9B alternatives.

**Older hardware with 32GB:** May lack necessary driver support for Vulkan acceleration. Check manufacturer for driver updates.

---

## Assumptions Baked Into This Guide

**Windows 11:** 24H2 or recent build. Older builds may lack certain features or driver support.

**Updated drivers:** GPU drivers from 2024 or later. Older drivers may not expose Vulkan properly.

**Administrator access:** Needed for winget installations, potentially for LM Studio server configuration.

**Disk space:** ~25GB free minimum (model downloads + LM Studio + working room).

**Internet connection:** Required for model downloads. After download, can work offline.

**English:** Commands, errors, documentation assume English system locale. Localization may vary.

---

<div align="center">
<img src="assets/cory-force-user.png" alt="Team member demonstrating expert mastery" width="200"/>
</div>

## For Future Maintainers

**This document represents:** What we knew and tested as of the current iteration. Technology evolves.

**When updating:**
- Verify commands still work (APIs change, CLIs evolve)
- Update model recommendations (new models release, old ones deprecated)
- Test on current hardware (what works today may not work identically in 2 years)
- Keep the honest tone (admit what's verified vs uncertain)

**What not to do:**
- Don't invent configuration that doesn't exist in official tools
- Don't guess at implementation details we don't own
- Don't optimize for comprehensive coverage at expense of accuracy
- Don't assume developer knowledge in primary audience

**When uncertain:** State clearly what needs verification, point to authoritative docs, describe how to find answers. Better honest uncertainty than false confidence.

---

## Authoritative References

**LM Studio:**
- Official docs: https://lmstudio.ai/docs
- Model search: Use `lms search` for current model availability
- CLI reference: `lms --help` and subcommand help flags

**opencode:**
- Project repository: Check official opencode documentation for schema
- Configuration: opencode's own docs are authoritative on config keys
- CLI reference: `opencode --help`

**Model information:**
- Qwen models: HuggingFace model cards (qwen org)
- Gemma models: Google/HuggingFace documentation
- GGUF format: llama.cpp documentation

**Windows resources:**
- Memory management: Microsoft Learn documentation
- Driver updates: Manufacturer sites (AMD, Intel)

**Don't trust this document over official sources.** When conflict exists, official documentation wins. This guide documents integration, not tool internals.

---

<div align="center">

**See it in action:** [USE_CASES.md](USE_CASES.md) for practical examples.

**Back to basics:** [QUICKSTART.md](QUICKSTART.md) | [SETUP.md](SETUP.md) | [CONFIG.md](CONFIG.md)

---

<img src="assets/DIGITAL_Foundations_logo.png" alt="Team One Digital Foundations" height="100" style="vertical-align: middle;"/> <img src="assets/DFT Logo - Full Fox - Orange.png" alt="Technology Core Infra" height="100" style="vertical-align: middle;"/>

</div>
