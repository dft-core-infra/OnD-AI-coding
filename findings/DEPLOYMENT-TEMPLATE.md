# Deployment Template — On-Device AI Coding

A validated, copy-paste-ready reference configuration for on-device AI coding on Corporate current-gen hardware (Tier 1).

**Validated by:** *(participants confirm/update during engagement)*  
**Target hardware:** 32GB RAM + AI iGPU/NPU

> This document is completed during the engagement. Its purpose is to give a Corporate colleague on current-gen hardware one authoritative place to start — confirmed by people who actually ran it, not assembled from docs alone. Until validation is complete, treat entries here as in-progress.

---

## Stack

*(Participants: fill in the inference engine, model, IDE, and AI coding interface you validated on Tier 1 hardware. Include exact version or identifier.)*

| Component | What Was Used | Notes |
|:---|:---|:---|
| OS | | |
| Inference engine | | |
| Model | | |
| IDE | | |
| AI coding interface / extension | | |
| API endpoint | | |

---

## Setup Commands

*(Participants: add the exact sequence of commands that got the stack running. Commands should be copy-paste ready.)*

```powershell
# Add validated setup commands here
```

---

## Configuration File(s)

*(Participants: add any configuration files needed to connect the IDE or coding interface to the inference engine. Include exact values that were confirmed to work.)*

```json
// Add validated configuration here
```

---

## Validated Use Cases

*(Participants: mark the use cases you confirmed work reliably on this stack)*

- [ ] PowerShell script generation (standard patterns)
- [ ] Python automation scripts
- [ ] Error / log troubleshooting
- [ ] Code explanation
- [ ] Infrastructure documentation
- [ ] Single-file web app generation
- [ ] IDE-connected iterative coding
- [ ] CLI tool with error handling

---

## Known Limitations on This Stack

*(Participants: add limitations you confirmed through actual use)*

- Context window of 32k limits analysis of large multi-file codebases
- Single-model policy: must unload before loading a second model
- Model knowledge cutoff — recent APIs may not be in training data

---

## Alternative: Tier 4 (16GB) Configuration

For Corporate devices with 16GB RAM, the primary stack won't fit. Use:

| Component | 16GB Alternative |
|:---|:---|
| Model | Qwen 2.5 9B (q4_k_m) — ~5-6GB footprint |
| Context window | 16,384 tokens (reduce if system paging occurs) |
| All other settings | Same as above |

**Capability difference:** See [USE-CASE-MATRIX.md](USE-CASE-MATRIX.md) Tier 4 column.

---

## Participant Confirmations

*(Add your handle, hardware, and date when you confirm this template works as described)*

| Participant | Hardware | Date | Notes |
|:---|:---|:---|:---|
| | | | |
