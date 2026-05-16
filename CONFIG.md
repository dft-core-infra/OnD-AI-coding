# CONFIG — opencode.json Specification

This document defines the `opencode.json` schema for orchestrating the Architect model with Vulkan acceleration on 32GB RAM systems.

---

## 1. Minimal Configuration

Copy this into your project root as `opencode.json`:

```json
{
  "engine": {
    "concurrency": 1,
    "context_window": 32768,
    "single_resident": true,
    "unload_on_switch": true,
    "backend": "vulkan"
  },
  "models": {
    "architect": {
      "id": "<lm-studio-model-id>",
      "quantization": "<quantization-string>",
      "backend": "lms",
      "description": "Deep reasoning & planning — parameter-rich architecture mode"
    }
  },
  "logging": {
    "level": "info",
    "log_path": "./logs/opencode.log"
  }
}
```

> **Note**: Replace `<lm-studio-model-id>` and `<quantization-string>` with exact values from [`NOTES.md`](NOTES.md).

---

## 2. Schema Reference

### `engine` — Inference Controls

| Key | Type | Default | Required | Description | Source |
|:---|:---|:---|:---|:---|:---|
| `concurrency` | int | `1` | Yes | Max parallel inference threads | opencode docs |
| `context_window` | int | `32768` | Yes | Token context length limit | opencode docs |
| `single_resident` | bool | `true` | Yes | Enforce one model in memory | opencode docs |
| `unload_on_switch` | bool | `true` | Yes | Auto-unload previous model | opencode docs |
| `backend` | string | `"vulkan"` | Yes | Inference backend | opencode docs |

### `models` — Model Definitions

| Key | Type | Description |
|:---|:---|:---|
| `architect.id` | string | LM Studio model identifier |
| `architect.quantization` | string | Quantization string (e.g., `q4_k_m`) |
| `architect.backend` | string | Inference engine (`lms`) |
| `architect.description` | string | Human-readable description |

---

## 3. Lifecycle — Unload/Load Sequence

Execute this sequence when switching models:

```powershell
# 1. Unload current model
lms unload --all

# 2. Wait for VRAM flush (2-3 seconds)
Start-Sleep -Seconds 3

# 3. Load new model with constraints
lms load <model-id> --context-length 32768 --parallel-requests 1

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
- [ ] Vulkan backend detected via `lms info --gpu`

---

<div align="center">

*Need the technical rationale? Head to [NOTES.md](NOTES.md) for authoritative documentation.*

</div>
