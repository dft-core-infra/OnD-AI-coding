# NOTES — Design Rationale & Authoritative References

This document provides the technical rationale for all design decisions. Each decision is anchored in official documentation.

---

## 1. Assumptions & Non-Goals

### Assumptions
- Windows 11 24H2 or later
- Vulkan ICD installed (AMD or compatible)
- 32GB RAM system with shared GPU memory
- LM Studio CLI (`lms`) available in PATH

### Non-Goals
- **Ollama**: Intentionally deferred. No Ollama commands in this release.
- **DirectML**: Out of scope. Vulkan is the required backend.
- **Multi-model concurrency**: Single-active-model policy is enforced.
- **GUI setup**: CLI-first approach only.

---

## 2. Design Rationale

### Vulkan Backend

**Decision**: Force Vulkan as the inference backend for LM Studio.

**Rationale**:
- Vulkan provides lower-overhead GPU access on AMD hardware
- Vulkan ICDs are consistent across Windows driver updates
- DirectML is deprecated for new deployments on AMD GPUs

**Sources**:
- [llama.cpp Vulkan Backend](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md#vulkan) — Vulkan build instructions and compatibility
- [AMD Vulkan Driver](https://gpuopen.com/learn/vulkan/) — AMD's official Vulkan driver architecture
- [LM Studio Hardware Acceleration](https://lmstudio.ai/docs/app/advanced/hardware-acceleration) — LM Studio GPU backend configuration

### Single-Active-Model Policy

**Decision**: Enforce exactly one model resident in memory at any time.

**Rationale**:
- 32GB system constraint: a 35B model at q4_k_m quantization requires ~18-20GB
- Loading two models exceeds safe memory thresholds, triggering system paging
- Single model ensures full weights remain in fast memory

**Sources**:
- [llama.cpp Memory Management](https://github.com/ggerganov/llama.cpp/blob/master/docs/memory.md) — VRAM/RAM allocation strategies
- [Windows 11 Memory Management](https://learn.microsoft.com/en-us/windows/win32/memory/memory-management) — System paging behavior

### Context Window & Concurrency

**Decision**: `context_window: 32768`, `concurrency: 1`

**Rationale**:
- 32k context provides sufficient token depth for code generation
- Concurrency 1 prevents memory fragmentation on shared memory systems

**Sources**:
- [opencode Configuration](https://github.com/opencodeai/opencode) — opencode.json schema documentation
- [LM Studio Parallel Requests](https://lmstudio.ai/docs/app/advanced/parallel-requests) — Concurrency limits and memory impact

### Model Selection

**Architect Model**: LM Studio model ID + quantization string from official documentation.

**Sources**:
- [LM Studio Model Registry](https://lmstudio.ai/models) — Official model availability and quantization options
- [Qwen Model Family](https://github.com/QwenLM/Qwen) — Official model documentation and quantization recommendations

---

## 3. Verification Evidence

### Commands Run

| Command | Expected Output | Source |
|:---|:---|:---|
| `lms --version` | Version string | LM Studio CLI `--help` |
| `lms status` | Running, port accessible | LM Studio CLI docs |
| `lms list` | One model in `loaded` state | LM Studio CLI docs |
| `lms info --gpu` | Vulkan backend detected | LM Studio CLI docs |
| `opencode status` | One model resident | opencode CLI docs |

### Vulkan ICD Verification

```powershell
Get-ChildItem -Path "C:\Windows\System32\vk_icd*.json" | Select-Object Name, Length
```

**Expected**: AMD Vulkan ICD file present. If absent, install AMD Vulkan Runtime.

---

## 4. Risk Register

| Risk | Likelihood | Mitigation | Source |
|:---|:---|:---|:---|
| Model fails to download | Low | Verify model ID + quantization in LM Studio registry | [LM Studio Models](https://lmstudio.ai/models) |
| Vulkan backend not detected | Medium | Verify Vulkan ICD files exist; reinstall AMD drivers | [AMD Drivers](https://www.amd.com/en/support) |
| opencode loads two models | Low | Enforce `single_resident: true` in opencode.json; verify with `opencode status` | [opencode docs](https://github.com/opencodeai/opencode) |
| System paging during inference | Medium | Monitor Task Manager; reduce context_window if needed | [Windows Memory](https://learn.microsoft.com/en-us/windows/win32/memory/memory-management) |
| GPU VRAM overflow | Low | Use quantized model; verify `max_resident_mb` in CONFIG.md | [llama.cpp Memory](https://github.com/ggerganov/llama.cpp/blob/master/docs/memory.md) |

---

<div align="center">

*All technical decisions are documented here with authoritative references.*

</div>
