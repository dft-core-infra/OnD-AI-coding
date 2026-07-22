# Hardware Tiers — On-Device AI Coding

This document maps Corporate hardware tiers to practical on-device AI coding capability. It is built from participant experience during the engagement and validated against the [technical documentation](../NOTES.md).

**Last updated by:** @osytai (Week 1)

---

## Tier Summary

| Tier | RAM | AI Acceleration | Max Recommended Model | Coding Usability |
|:---|:---|:---|:---|:---|
| **Tier 1 — AI Optimized** | 64GB+ | Next-Gen NPU + High-Bandwidth GPU | 70B+ (highly quantized) / 35B | ✅ Ideal Target |
| **Tier 2 — Current Gen** | 32GB | NPU + AI iGPU (Ryzen AI) | 35B (q4_k_m) | ✅ Primary target |
| **Tier 3 — Recent Standard** | 32GB | Standard iGPU (Core Ultra 7 155U) | 14B–32B | ⚠️ Usable, slower |
| **Tier 4 — Standard 16GB** | 16GB | Intel i7 iGPU | 9B max | ⚠️ Constrained |
| **Tier 5 — Legacy 16GB** | 16GB | Older / Legacy integrated | 3B–7B | ❌ Marginal for coding |

---

## Tier 1 — AI Optimized 64GB Laptops

**Representative hardware:** Next-gen workstation platforms featuring 64GB RAM and high-performance NPU ($\ge$ 50 TOPS)  
**Corporate context:** Forward-looking standard for advanced technical and AI development roles  

### Participant Findings
*(After your Week 1 submission, add what you ran and what you observed. Include inference engine, model, key settings, and performance. Format: `- @username [Week N]: your entry`)*

---

## Tier 2 — Current Gen (ThinkPad T14 Gen 6)

**Representative hardware:** ThinkPad T14 Gen 6 (AMD Ryzen AI, 32GB RAM, integrated AI GPU)  
**Corporate context:** Current baseline procurement standard  

### Participant Findings
*(After your Week 1 submission, add what you ran and what you observed. Include inference engine, model, key settings, and performance. Format: `- @username [Week N]: your entry`)*

- - @osytai [Week 1]: Testing on the newest **T14 Gen 6** platform with AMD Ryzen AI and 32GB RAM. The presence of the dedicated modern NPU keeps developer workflows highly efficient. Inference speeds for local 7B–14B models are snappy enough for real-time AI coding. It handles standard enterprise content caches and localized RAG pipelines without starving system memory.

---

## Tier 3 — Recent Standard (ThinkPad T14 Gen 5)

**Representative hardware:** ThinkPad T14 Gen 5 (Intel Core Ultra 7 155U, 32GB RAM, standard iGPU)  

### Participant Findings
*(After your Week 1 submission, add what you ran, what settings worked, and how performance compared to your expectations. Format: `- @username [Week N]: your entry`)*

- - @osytai [Week 1]: Evaluated the **T14 Gen 5** configuration running the Core Ultra 7 155U with 32GB RAM. While the 32GB capacity is crucial for system stability and successfully blocks out-of-memory crashes, the unoptimized graphics pipeline makes it suboptimal for complex programming tasks. Token generation introduces noticeable lag during heavy code lookups. You must exercise conscious prompt planning—segmenting complex blocks into standalone logic steps and clearing your chat session frequently to prevent response times from slowing down your IDE workspace.

---

## Tier 4 — Standard 16GB (ThinkPad T14 Gen 3)

**Representative hardware:** ThinkPad T14 Gen 3 (Intel Core i7, 16GB RAM)  

### Participant Findings
*(After your Week 1 submission, document what you could and couldn't run — inference engine, model, whether hardware acceleration worked, and overall usability. Format: `- @username [Week N]: your entry`)*

- - @osytai [Week 1]: Running local code assistants on the **T14 Gen 3 (i7, 16GB)** environment is nearly impossible for  development. Loading functional models requires stripping your system down—closing browser windows and stopping background Docker containers just to carve out RAM overhead. The waiting times for single-method generations are long and disruptive. It demands intense prompt micromanagement; everything must be structurally perfect since a bloated prompt will instantly choke the thread or completely freeze the environment.

---

## Tier 5 — Legacy 16GB (ThinkPad T14 Gen 2)

**Representative hardware:** ThinkPad T14 Gen 2 (16GB RAM, weakest legacy spec)  

### Participant Findings
*(Document what you ran and whether the output was useful for coding tasks. If you hit a point where it wasn't viable, describe where the limit was. Format: `- @username [Week N]: your entry`)*

- - @osytai [Week 1]: Tested the lowest corporate tier, the **T14 Gen 2 (16GB)**. This setup is fundamentally unviable for local development tasks. You are trapped using highly compressed, tiny 1B–3B parameter models. Token output speed is agonizingly slow, and the actual reasoning capability of these small models falls flat when handling real debugging or architectural refactoring. Any attempt to feed them a multi-file code context results in immediate execution failure or total system lock-ups. These devices should remain strictly mapped to cloud-based AI endpoints.

---

## Notes on Methodology

These tiers reflect what participants actually ran during the engagement — not theoretical specs. Where a tier has no observations yet, that means no participant in this cohort was on that hardware. Mark unvalidated tiers clearly.

> See [CAVEATS.md](../CAVEATS.md) for the detailed technical rationale behind quantization, memory constraints, and capability gaps.