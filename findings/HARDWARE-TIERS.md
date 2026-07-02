# Hardware Tiers — On-Device AI Coding

This document maps Corporate hardware tiers to practical on-device AI coding capability. It is built from participant experience during the engagement and validated against the [technical documentation](../NOTES.md).

**Last updated by:** *(participants add their handle and week when they contribute)*

---

## Tier Summary

| Tier | RAM | AI Acceleration | Max Recommended Model | Coding Usability |
|:---|:---|:---|:---|:---|
| **Tier 1 — Current Gen** | 32GB+ | NPU + AI iGPU (Ryzen AI, Intel Lunar Lake) | 35B (q4_k_m) | ✅ Primary target |
| **Tier 2 — Recent Standard** | 32GB | Standard iGPU (no AI optimization) | 35B (q4_k_m) | ⚠️ Usable, slower |
| **Tier 3 — Legacy 32GB** | 32GB | Older iGPU / integrated only | 9B–12B | ⚠️ Limited |
| **Tier 4 — Standard 16GB** | 16GB | Any | 9B max | ⚠️ Constrained |
| **Tier 5 — Legacy 16GB** | 16GB | Older / none | 3B–7B | ❌ Marginal for coding |

---

## Tier 1 — Current Gen (32GB + NPU/AI iGPU)

**Representative hardware:** Ryzen AI Max, Intel Lunar Lake laptops with 32GB unified RAM  
**Corporate context:** Current procurement standard  

### Participant Findings
*(After your Week 1 submission, add what you ran and what you observed. Include inference engine, model, key settings, and performance. Format: `- @username [Week N]: your entry`)*

- 

---

## Tier 2 — Recent Standard (32GB, no AI optimization)

**Representative hardware:** 2022–2024 laptops/workstations with 32GB RAM, standard integrated or discrete GPU  

### Participant Findings
*(After your Week 1 submission, add what you ran, what settings worked, and how performance compared to your expectations. Format: `- @username [Week N]: your entry`)*

- 

---

## Tier 3 — Legacy 32GB

**Representative hardware:** Pre-2022 machines with 32GB RAM and limited GPU support  

### Participant Findings
*(After your Week 1 submission, document what you could and couldn't run — inference engine, model, whether hardware acceleration worked, and overall usability. Format: `- @username [Week N]: your entry`)*

- 

---

## Tier 4 — Standard 16GB

**Representative hardware:** Most current fleet devices — 16GB RAM, standard iGPU  

### Participant Findings
*(After your Week 1 submission, document what you ran, what you had to close or adjust to make it work, and whether the result was usable for coding tasks. Format: `- @username [Week N]: your entry`)*

- 

---

## Tier 5 — Legacy 16GB

**Representative hardware:** Older fleet devices — 16GB, limited GPU, older drivers  

### Participant Findings
*(Document what you ran and whether the output was useful for coding tasks. If you hit a point where it wasn't viable, describe where the limit was. Format: `- @username [Week N]: your entry`)*

- 

---

## Notes on Methodology

These tiers reflect what participants actually ran during the engagement — not theoretical specs. Where a tier has no observations yet, that means no participant in this cohort was on that hardware. Mark unvalidated tiers clearly.

> See [CAVEATS.md](../CAVEATS.md) for the detailed technical rationale behind quantization, memory constraints, and capability gaps.
