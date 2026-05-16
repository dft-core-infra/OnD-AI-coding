<div align="center">

# Windows 11 Local Coding Setup

### 32GB RAM · LM Studio + opencode

<div style="margin: 20px 0;">
  <img src="https://img.shields.io/badge/OS-Windows%2011%2024H2-blue?style=for-the-badge&logo=windows" alt="Windows 11" />
  <img src="https://img.shields.io/badge/Engine-opencode-purple?style=for-the-badge" alt="opencode" />
</div>

**CLI-first local LLM orchestration for 32GB RAM systems.**  
Run a 35B model locally on your rig with LM Studio and opencode.

</div>

---

## 🎯 Meta-Objectives

| Objective | Detail |
|:---|:---|
| **Enable Local Coding** | LM Studio + opencode for single-model inference |
| **GPU-Accelerated Inference** | Hardware-accelerated inference via LM Studio |
| **Single-Active-Model** | Only one model resident in memory at a time |
| **CLI-First** | All setup via Windows Terminal — no GUI required |

---

## 🏗 Architecture

```mermaid
graph LR
    A[User] -->|opencode CLI| B[opencode.json]
    B -->|Architect Mode| C[LM Studio Model]
    C -->|unload| D[Memory Manager]
    D -->|load| C
    C -->|GPU| E[Hardware]
    style C fill:#4A90E2,color:#fff
    style D fill:#2C3E50,color:#fff
    style E fill:#E74C3C,color:#fff
```

**Key Constraints:**
- **Single Active Model**: Only one model resident in memory at a time
- **32k Context / 1 Concurrency**: Required for 32GB RAM stability

---

## 📁 Documentation Structure

| File | Purpose |
|:---|:---|
| [`QUICKSTART.md`](QUICKSTART.md) | Step-by-step CLI setup guide |
| [`SETUP.md`](SETUP.md) | LM Studio Daemon setup and model configuration |
| [`CONFIG.md`](CONFIG.md) | `opencode.json` schema & lifecycle |
| [`NOTES.md`](NOTES.md) | Design rationale & authoritative references |

---

## ⚡ Quick Links

- [Start Setup](QUICKSTART.md) — Get running in 5 minutes
- [Configure opencode](CONFIG.md) — Memory policy & model definitions
- [Technical Notes](NOTES.md) — Context limits, concurrency, and constraints

---

<div align="center">

*Optimize. Iterate. Deploy.*

</div>
