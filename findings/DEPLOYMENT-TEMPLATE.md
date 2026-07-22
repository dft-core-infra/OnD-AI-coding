# Deployment Reference Template
# Local AI Coding Assistant Deployment on Windows

## Document Information

| Item | Value |
|----------|----------|
| Document Type | Deployment Reference Template |
| Purpose | Reproducible local AI coding environment |
| Platform | Windows 11 |
| Status | Validated Reference Configuration, July 2026 |

---

# 1. Purpose

This document provides a validated deployment procedure for implementing a fully local AI coding assistant using open-source Large Language Models (LLMs), local inference engines, and IDE like Visual Studio Code.

The target outcome is an AI-assisted development environment that operates entirely on local hardware without requiring cloud-hosted AI services, to give a corporate colleague on current-gen hardware one authoritative place to start. 


---

# 2. Reference Test Platform

The following deployment was validated on:

```text
Device:
Lenovo ThinkPad Gen 5

Processor:
Intel Core Ultra 7 155U

Memory:
32 GB

GPU:
Intel Arc / Xe Integrated Graphics

Operating System:
Windows 11 24H2
```

---

# 3. Software Components

While many different components were evaluated (i.e, Ollama, llama.cpp, Cline), below are the main ones verified:

| Component | Purpose |
|----------|----------|
| LM Studio | Inference engine for model management and local API endpoint |
| OpenCode | AI coding assistant |
| VS Code | IDE |
| Gemma-4-12B , Qwen3.6-27B | LLM models |
| Continue | AI coding IDE extension |

---


# 4. Installations

## Install LM Studio

```powershell
winget install ElementLabs.LMStudio --accept-package-agreements --accept-source-agreements
```

Verify installation:

```powershell
lms --version
```

---

### Start Server

```powershell
lms server start
```

Verify:

```powershell
lms server status
```

---

### Search and download Models

```powershell
lms get qwen
```
a list of LLMs will show to select from, use a variant with q4_k_m quantization.

---

### Load Model

Example:

```powershell
lms load qwen/qwen3.6-35b-a3b --context-length 32768 --parallel 1
```

Verify:

```powershell
lms ps
```

---


## Install NodeJS

Download:

```text
https://nodejs.org/en/download
```

Verify:

```powershell
node -v
npm -v
```

---

## Install and configure OpenCode

```powershell
npm install -g opencode-ai
```

Verify:

```powershell
opencode --version
```

---

Create:

```text
%USERPROFILE%\.config\opencode\opencode.json
```

Configuration:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "lmstudio": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "LM Studio",
      "options": {
        "baseURL": "http://localhost:1234/v1"
      },
      "models": {
        "qwen": {}
      }
    }
  },
  "model": "lmstudio/qwen"
}
```

---

## Validation Test

```powershell
opencode run "write a hello world PowerShell script"
```

Expected:

```text
Successfully generated script
```

---


# 12. VS Code Integration

## Install and configure Continue

Open:

```text
VS Code → Extensions
```

Search:

```text
Continue
```

Install.

### Provider

```text
OpenAI
```

### Base URL

```text
http://localhost:8080/v1
```

### API Key

```text
dummy
```

### Model

Set to the exact model ID returned by:

```text
http://localhost:8080/v1/models
```

Example:

```text
gemma-4-12b-it-qat
```

---





