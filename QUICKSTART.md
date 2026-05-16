# QUICKSTART — CLI Setup Guide

Get your 32GB system running with LM Studio + opencode for local inference. All commands execute in **Windows Terminal**.

> **Scope**: This guide covers LM Studio + opencode only. Ollama steps are deferred.

---

## 1. Install LM Studio

```powershell
winget install ElementLabs.LMStudio --accept-package-agreements --accept-source-agreements
```

**Checkpoint**: Verify installation.

```powershell
lms --version
```

---

## 2. Start LM Studio Daemon

```powershell
lms start
```

**Checkpoint**: Confirm daemon is running.

```powershell
lms list
```

Expected: empty model list (no models loaded yet).

---

## 3. Download Architect Model

```powershell
lms get Qwen/Qwen3.6-35B-Instruct-GGUF --quant q4_k_m
```

**Checkpoint**: Verify model downloaded.

```powershell
lms list
```

Expected: architect model in the list.

---

## 4. Load Architect Model with Constraints

```powershell
lms load Qwen/Qwen3.6-35B-Instruct-GGUF --context-length 32768 --parallel-requests 1
```

**Checkpoint**: Verify model loaded.

```powershell
lms list
```

Expected: architect model showing `loaded` status.

---

## 5. Run opencode in Architect Mode

```powershell
opencode --model architect
```

**Checkpoint**: Confirm opencode connects to LM Studio and loads the model.

---

## 6. Verify Single-Active-Model State

```powershell
opencode status
```

**Checkpoint**: Confirm only one model is resident. No build model should be loaded.

---

## 7. Switch to Build Mode (When Needed)

```powershell
lms unload --all
opencode --model build
```

**Checkpoint**: Confirm build model is loaded and architect model is unloaded.

---

## ⚠️ Ollama Placeholder

> Ollama steps are deferred to a future iteration. Do not attempt to orchestrate Ollama in this release. This section will be populated when Ollama support is re-evaluated.

---

<div align="center">

*You're set. Head to [SETUP.md](SETUP.md) for environment preparation or [CONFIG.md](CONFIG.md) for opencode configuration.*

</div>
