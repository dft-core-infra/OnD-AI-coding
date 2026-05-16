# SETUP — Vulkan & LM Studio Configuration

This document covers the procedural setup required to run Vulkan-accelerated inference on your system with 32GB RAM.

---

## 1. Vulkan Prerequisites

### 1.1 Verify Vulkan ICD Files

Confirm Vulkan Installable Client Driver (ICD) files exist on your system:

```powershell
Get-ChildItem -Path "C:\Windows\System32\vk_icd*.json" | Select-Object Name, Length
```

**Expected**: AMD Vulkan ICD file (e.g., `vk_icd_amd64.json`).

**If missing**: Install the latest AMD Vulkan Runtime from [AMD Drivers](https://www.amd.com/en/support).

### 1.2 Verify Vulkan Runtime

```powershell
lms info --gpu
```

**Expected**: Vulkan listed as the active backend with GPU compute units detected.

---

## 2. LM Studio CLI Setup

### 2.1 Start Daemon

```powershell
lms start
```

**Expected output**: Daemon listening on port 1234 (or configured port).

### 2.2 Stop Daemon

```powershell
lms stop
```

### 2.3 Check Daemon Status

```powershell
lms status
```

**Expected**: Daemon running, port accessible.

---

## 3. Model Management with Constraints

### 3.1 Download Model

```powershell
lms get <model-id> --quant <quantization>
```

Use exact model ID and quantization from [`NOTES.md`](NOTES.md).

### 3.2 Load Model with Context/Concurrency Limits

```powershell
lms load <model-id> --context-length 32768 --parallel-requests 1
```

**Note**: If CLI lacks these flags, configure via LM Studio config file. See [`NOTES.md`](NOTES.md) for source.

### 3.3 Unload Model

```powershell
lms unload --all
```

### 3.4 Verify Loaded Models

```powershell
lms list
```

**Expected**: One model showing `loaded` status. No secondary models.

---

## 4. opencode Configuration

### 4.1 Set Backend

Ensure opencode uses the Vulkan backend:

```powershell
# Set via opencode.json (see CONFIG.md)
# Or via environment variable if supported:
$env:OPENCODE_BACKEND = "vulkan"
```

### 4.2 Enforce Single Active Model

Configure `opencode.json` with:

```json
{
  "engine": {
    "single_resident": true,
    "unload_on_switch": true
  }
}
```

See [`CONFIG.md`](CONFIG.md) for full schema.

---

## 5. Verification Checklist

| Check | Command | Expected |
|:---|:---|:---|
| Vulkan ICD exists | `Get-ChildItem vk_icd*.json` | AMD ICD file present |
| Vulkan backend active | `lms info --gpu` | Vulkan listed as backend |
| Daemon running | `lms status` | Running, port accessible |
| Model loaded | `lms list` | One model showing `loaded` |
| Single model state | `opencode status` | One model resident, no secondary |

---

<div align="center">

*Ready for configuration? Head to [CONFIG.md](CONFIG.md) to set up opencode.*

</div>
