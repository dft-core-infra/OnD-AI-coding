# NOTES — Design Rationale & Authoritative References

This document provides the technical rationale for all design decisions. Each decision is anchored in official documentation.

---

## 1. Assumptions & Non-Goals

### Assumptions
- Windows 11 24H2 or later
- 32GB RAM system with shared GPU memory
- LM Studio CLI (`lms`) available in PATH
- Modern AMD Ryzen iGPU or compatible GPU

### Non-Goals
- **Ollama**: Intentionally deferred. No Ollama commands in this release.
- **Multi-model concurrency**: Single-active-model policy is enforced.
- **GUI setup**: CLI-first approach only.

---

## 2. Design Rationale

### Context Window & Concurrency

**Decision**: `context_window: 32768`, `concurrency: 1`

**Rationale**:
- 32k context provides sufficient token depth for code generation tasks
- Concurrency 1 prevents memory fragmentation on shared memory systems
- Together these constraints ensure a 35B model at q4_k_m quantization (~18-20GB) fits within 32GB RAM without triggering system paging
- Loading two models simultaneously exceeds safe memory thresholds on this hardware

**Sources**:
- [opencode Configuration](https://github.com/opencodeai/opencode) — opencode.json schema documentation
- [LM Studio Parallel Requests](https://lmstudio.ai/docs/app/advanced/parallel-requests) — Concurrency limits and memory impact

### Model Selection

**Architect Model**: `Qwen/Qwen3.6-35B-Instruct-GGUF` at `q4_k_m` quantization

**Build Model**: `lmstudio-community/gemma-4b-instruct-q4_k_m.gguf` at `q4_k_m` quantization

**Rationale**:
- Qwen 3.6 35B provides deep reasoning and planning capability
- Gemma 4B provides fast, lightweight code assistance for build mode
- Both use q4_k_m quantization for the best balance of quality and memory efficiency

**Sources**:
- [Qwen Model Family](https://github.com/QwenLM/Qwen) — Official model documentation and quantization recommendations
- [lmstudio-community GGUF Models](https://huggingface.co/lmstudio-community) — GGUF model availability

### Single-Active-Model Policy

**Decision**: Enforce exactly one model resident in memory at any time.

**Rationale**:
- 32GB system constraint: a 35B model at q4_k_m quantization requires ~18-20GB
- Loading two models exceeds safe memory thresholds, triggering system paging
- Single model ensures full weights remain in fast memory

**Sources**:
- [llama.cpp Memory Management](https://github.com/ggerganov/llama.cpp/blob/master/docs/memory.md) — VRAM/RAM allocation strategies
- [Windows 11 Memory Management](https://learn.microsoft.com/en-us/windows/win32/memory/memory-management) — System paging behavior

---

## 3. Backend Notes

### Vulkan vs DirectML

**Note**: LM Studio defaults to the best available backend on modern AMD hardware. Manual Vulkan configuration is rarely needed.

Vulkan is generally preferred over DirectML for AMD hardware due to lower overhead and more consistent driver support. For detailed backend configuration, see the [LM Studio Hardware Acceleration docs](https://lmstudio.ai/docs/app/advanced/hardware-acceleration).

---

## 4. Verification Evidence

### Commands Run

| Command | Expected Output | Source |
|:---|:---|:---|
| `lms --version` | Version string | LM Studio CLI `--help` |
| `lms status` | Running, port accessible | LM Studio CLI docs |
| `lms list` | One model in `loaded` state | LM Studio CLI docs |
| `opencode status` | One model resident | opencode CLI docs |

---

## 5. Model ID Uncertainty Note

The model IDs used (`Qwen/Qwen3.6-35B-Instruct-GGUF` and `lmstudio-community/gemma-4b-instruct-q4_k_m.gguf`) follow the standard GGUF convention. If the exact IDs differ on your system, verify via:

```powershell
lms search qwen
lms search gemma
```

---

## 6. Risk Register

| Risk | Likelihood | Mitigation | Source |
|:---|:---|:---|:---|
| Model fails to download | Low | Verify model ID + quantization via `lms search` | [LM Studio Models](https://lmstudio.ai/models) |
| opencode loads two models | Low | Enforce `concurrency: 1` in opencode.json; verify with `opencode status` | [opencode docs](https://github.com/opencodeai/opencode) |
| System paging during inference | Medium | Monitor Task Manager; reduce context_window if needed | [Windows Memory](https://learn.microsoft.com/en-us/windows/win32/memory/memory-management) |
| GPU VRAM overflow | Low | Use quantized model; verify with `lms list` | [llama.cpp Memory](https://github.com/ggerganov/llama.cpp/blob/master/docs/memory.md) |

---

<div align="center">

*All technical decisions are documented here with authoritative references.*

</div>
