# Use-Case Matrix — On-Device AI Coding

Which AI coding tasks work locally, which don't, and at what hardware tier/model setup?

**Rating scale:**
- ✅ Works well — reliable, production-usable output with normal review
- ⚠️ Works with caveats — usable but requires more iteration, direct chat workflow, or slower throughput
- ❌ Not recommended — quality too low, frequent timeouts, crashes, or fails to run / fit in RAM
- 🔲 Not tested in this engagement

**Last updated by:** Gent Gashi (TeamOne 2026 / On-Device AI Coding)

---

## 1. Measured Performance Results (Inference Speed)

*Note: Measured speeds reflect average performance on small prompts using LM Studio / OpenCode. Longer contexts lead to a mild, gradual slowdown in throughput.*

| Hardware Platform | RAM | Model | Throughput (Tokens/sec) | Status / Feasibility |
|:---|:---:|:---|:---:|:---:|
| **Lenovo T14s Gen6** (Intel Core Ultra 7 258V) | 32GB | **Qwen3.6-27B** | `2.38` | ⚠️ Caveat (Good quality, slow, tight RAM headroom under heavy multitasking) |
| **Lenovo T14s Gen6** (Intel Core Ultra 7 258V) | 32GB | **Gemma4-12B** | `9.82` | ✅ OK (Good balance of speed, capability, and general stability, less crashes) |
| **Lenovo T14s Gen6** (Intel Core Ultra 7 258V) | 32GB | **Gemma4-4B** | `17.88` | ✅ OK (Fastest, highly stable for daily use) |
| **Lenovo T14S Gen3** (Intel Core i5-1235U) | 16GB | **Qwen3.6-27B** | `N/A` | ❌ Fails (Does not fit in RAM; model alone exceeds available memory) |
| **Lenovo T14S Gen3** (Intel Core i5-1235U) | 16GB | **Gemma4-12B** | `3.37` | ⚠️ Caveat (Usable speed; occasional memory strain / app crashes under load) |
| **Lenovo T14S Gen3** (Intel Core i5-1235U) | 16GB | **Gemma4-4B** | `7.51` | ✅ OK (Stable baseline for 16GB legacy hardware) |

*The speeds of the models by running a small prompt are shown in the table below (average of several small prompts), however once the prompt is bigger and the context is longer, it usually leads in a mild, gradual slowdown vs. the short prompts. Token throughput scales with RAM/hardware generation and model size, as expected — Gen6 roughly 2-3x faster than Gen3 on the same model.*

---

## 2. Use-Case Matrix

Ratings reflect actual practical experience testing across **Lenovo T14s Gen6 (32GB)** and **Lenovo T14S Gen3 (16GB)** using LM Studio (chat interface) and OpenCode (IDE integration).

| Use Case | Gen6 (32GB)<br>Qwen3.6-27B | Gen6 (32GB)<br>Gemma4-12B | Gen6 (32GB)<br>Gemma4-4B | Gen3 (16GB)<br>Qwen3.6-27B | Gen3 (16GB)<br>Gemma4-12B | Gen3 (16GB)<br>Gemma4-4B |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **PowerShell script generation** (standard patterns) | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Python automation scripts** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Error / log troubleshooting** | ✅ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ |
| **Code explanation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Infrastructure documentation** | ✅ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ |
| **Single-file web app generation** (Tetris-type) | ✅ | ✅ | ⚠️ | ❌ | ⚠️ | ❌ |
| **IDE-connected iterative coding** (Agentic / OpenCode) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **CLI tool with error handling** | ✅ | ✅ | ⚠️ | ❌ | ⚠️ | ⚠️ |
| **API integration code** (well-known APIs) | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| **API integration code** (niche / recent APIs) | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| **Multi-file refactoring** | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| **Complex architectural design** | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| **Security-sensitive code review** | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ |

---

## 3. Cloud vs. Local — Participant Observations

*Assessment of when local AI was the right choice vs. when cloud access was necessary based on actual testing on Lenovo T14s Gen6 (32GB) and T14S Gen3 (16GB).*

- **When Local AI Excelled:**
  - Standard scripting (PowerShell, Python), log analysis, and code explanations work  well locally. Data stays strictly on-device, fulfilling security and compliance requirements.
  - **Gemma4-4B** running on Gen6 (17.88 tok/s) and Gen3 (7.51 tok/s) provides good response times for standalone snippet generation and fast code lookups without relying on cloud or network connectivity.

- **When Cloud Access was Needed / Preferred:**
  - **IDE & Agentic Workflows:** IDE integrations (e.g., OpenCode) using local LLMs consistently fail due to context overhead, tool-calling timeouts, and multi-file processing bottlenecks. Agentic coding workflows strongly favor cloud models with fast API endpoints and high concurrency.
  - **Complex Multi-File Refactoring & Niche APIs:** Smaller 4B models lack the parametric knowledge for niche/recent APIs, while 27B models are too slow (2.38 tok/s) to iterate quickly on multi-file projects, and tend to crash / timeout very often.

---

## 4. Detailed Participant Observations

### Hardware Ceiling & Memory Limits
- **16GB RAM is a hard constraint:** **Qwen3.6-27B** cannot be loaded on the Lenovo T14S Gen3 (16GB) as the weights exceed total system memory.
- **32GB RAM enables full local model flexibility:** The T14s Gen6 (32GB) runs the models from 4B to 27B , though running 27B/12B models alongside heavy background enterprise applications can lead to occasional system instability or application crashes.

### Script Generation & Standard Tasks
- Short, well-known coding patterns (PowerShell, basic Python scripts, boilerplate) perform reliably across all tested configurations. Even the lightweight **Gemma4-4B** on 16GB hardware generates production-usable scripts with minimal review.

### Error Troubleshooting & Documentation
- **Qwen3.6-27B** and **Gemma4-12B** provide superior context comprehension and depth for multi-step error log diagnosis and complex infrastructure documentation.
- **Gemma4-4B** handles basic syntax errors and routine log parsing well, but struggles with nuanced edge cases or long log outputs due to context compression trade-offs.

### IDE Workflow vs. Standalone Chat
- **The Agentic Bottleneck:** Pairing local models with IDE-connected agentic tools (e.g., OpenCode) introduces frequent timeouts and incomplete operations across all models. This is primarily a bottleneck of local inference speed paired with iterative tool-calling loops rather than a model intelligence defect.
- **Workaround:** For best results, copy and paste code directly into **LM Studio’s standalone chat interface**, which avoids agentic execution overhead and executes reliably.

### Stability vs. Capability Trade-Off & Daily Recommendation
- **Recommended Daily Configuration:** **Gemma4-4B** is recommended as the default always-on model for both 16GB and 32GB setups. It delivers solid stability and rapid response times (7- 20 tok/s).
- **Heavy Task Offloading:** Reserve **Qwen3.6-27B** and **Gemma4-12B** on 32GB hardware for dedicated, complex tasks when other memory-heavy application load is minimal.

---

> For technical details on model quantization, capability trade-offs, and context window limits, see [CAVEATS.md](../CAVEATS.md).