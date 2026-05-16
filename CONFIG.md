# CONFIG — opencode.json Specification

This document defines the `opencode.json` schema for orchestrating the Architect model on 32GB RAM systems.

---

## 1. Minimal Configuration

Copy this into your project root as `opencode.json`:

```json
{
  "engine": {
    "concurrency": 1,
    "context_window": 32768
  },
  "models": {
    "architect": {
      "id": "Qwen/Qwen3.6-35B-Instruct-GGUF",
      "quantization": "q4_k_m",
      "backend": "lms",
      "description": "Deep reasoning & planning — parameter-rich architecture mode"
    },
    "build": {
      "id": "lmstudio-community/gemma-4b-instruct-q4_k_m.gguf",
      "quantization": "q4_k_m",
      "backend": "lms",
      "description": "Fast code assistance — lightweight build mode model"
    }
  },
  "logging": {
    "level": "info",
    "log_path": "./logs/opencode.log"
  }
}
```

---

## 2. Schema Reference

### `engine` — Inference Controls

| Key | Type | Default | Required | Description |
|:---|:---|:---|:---|:---|
| `concurrency` | int | `1` | Yes | Max parallel inference threads |
| `context_window` | int | `32768` | Yes | Token context length limit |

### `models` — Model Definitions

| Key | Type | Description |
|:---|:---|:---|
| `architect.id` | string | LM Studio model identifier |
| `architect.quantization` | string | Quantization string (e.g., `q4_k_m`) |
| `architect.backend` | string | Inference engine (`lms`) |
| `architect.description` | string | Human-readable description |
| `build.id` | string | LM Studio model identifier |
| `build.quantization` | string | Quantization string (e.g., `q4_k_m`) |
| `build.backend` | string | Inference engine (`lms`) |
| `build.description` | string | Human-readable description |

---

## 3. Lifecycle — Unload/Load Sequence

Execute this sequence when switching models:

```powershell
# 1. Unload current model
lms unload --all

# 2. Wait for VRAM flush (2-3 seconds)
Start-Sleep -Seconds 3

# 3. Load new model with constraints
lms load Qwen/Qwen3.6-35B-Instruct-GGUF --context-length 32768 --parallel-requests 1

# 4. Verify single model state
opencode status
```

**Expected after step 4**: Only the new model is resident. No secondary models loaded.

---

## 4. Definition of Done

Verify completion with this checklist:

- [ ] Architect model downloads successfully via `lms get`
- [ ] Architect model loads with context=32768, concurrency=1
- [ ] `opencode status` shows architect model loaded
- [ ] `opencode status` shows no secondary models
- [ ] `lms list` confirms only one model in `loaded` state

---

<div align="center">

*Need the technical rationale? Head to [NOTES.md](NOTES.md) for authoritative documentation.*

</div>
