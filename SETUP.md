# SETUP — LM Studio Daemon & Model Configuration

This document covers the procedural setup for LM Studio Daemon, model management, and opencode configuration on a 32GB RAM system.

---

## 1. LM Studio CLI Setup

### 1.1 Start Daemon

```powershell
lms start
```

**Expected output**: Daemon listening on port 1234 (or configured port).

### 1.2 Stop Daemon

```powershell
lms stop
```

### 1.3 Check Daemon Status

```powershell
lms status
```

**Expected**: Daemon running, port accessible.

---

## 2. Model Management with Constraints

### 2.1 Download Model

```powershell
lms get Qwen/Qwen3.6-35B-Instruct-GGUF --quant q4_k_m
```

### 2.2 Load Model with Context/Concurrency Limits

```powershell
lms load Qwen/Qwen3.6-35B-Instruct-GGUF --context-length 32768 --parallel-requests 1
```

**Note**: These constraints (32k context, 1 concurrency) are required for 32GB RAM stability.

### 2.3 Unload Model

```powershell
lms unload --all
```

### 2.4 Verify Loaded Models

```powershell
lms list
```

**Expected**: One model showing `loaded` status. No secondary models.

---

## 3. opencode Configuration

### 3.1 Configure opencode.json

See [`CONFIG.md`](CONFIG.md) for the full schema and model definitions.

### 3.2 Enforce Single Active Model

Configure `opencode.json` with:

```json
{
  "engine": {
    "concurrency": 1,
    "context_window": 32768
  }
}
```

See [`CONFIG.md`](CONFIG.md) for full schema.

---

## 4. Verification Checklist

| Check | Command | Expected |
|:---|:---|:---|
| Daemon running | `lms status` | Running, port accessible |
| Model loaded | `lms list` | One model showing `loaded` |
| Single model state | `opencode status` | One model resident, no secondary |

---

<div align="center">

*Ready for configuration? Head to [CONFIG.md](CONFIG.md) to set up opencode.*

</div>
