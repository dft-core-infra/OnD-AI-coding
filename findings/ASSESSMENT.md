# Assessment — On-Device AI Coding for Corporate IT

**For:** Corporate colleagues, SMEs, managers, citizen developers, and technology enthusiasts  
**Written by:** Participants of the On-Device AI Coding engagement  
**Status:** ✅ Completed — Week 4 synthesis

> This document synthesizes what a group of Corporate IT professionals learned by actually running local AI models on Corporate hardware and building real things with them. It is evidence-based, not theoretical — every claim below traces back to a measured result or a first-hand participant observation, on named hardware, so it can be cited directly.

---

## What We Did

A small cohort ran a 4-week hands-on engagement:
- Set up local AI inference engines (LM Studio) on their own Corporate devices
- Used local AI models to generate code, automate tasks, and build small applications — both through a chat interface and through the IDE (OpenCode / VS Code + Continue)
- Worked across multiple hardware tiers present in the Corporate fleet, from 16GB legacy laptops to 32GB current-gen machines
- Measured inference speed per model per device, and rated ~13 real coding tasks as work / work-with-caveats / don't-bother
- Documented what worked, **what didn't**, and why

The detailed technical findings are in:
- [Hardware Tiers](HARDWARE-TIERS.md) — what each device class can actually run
- [Use-Case Matrix](USE-CASE-MATRIX.md) — which tasks work locally vs. require cloud, with measured tok/s
- [Deployment Template](DEPLOYMENT-TEMPLATE.md) — the validated, reproducible reference setup

---

## The Short Answer

On-device AI coding is **genuinely useful today for a specific band of well-established tasks** — script generation (PowerShell, Python), code explanation, error/log troubleshooting, and documentation — provided you are on **current-gen hardware with 32GB of RAM** and use a 4B–12B model. Its decisive advantage is that data never leaves the device, which satisfies privacy and compliance requirements that cloud AI cannot. However, it **fails at IDE-integrated *agentic* workflows** (OpenCode's iterative tool-calling loop timed out across *every* model and hardware combination tested), and it struggles with multi-file refactoring, complex architecture, and niche or recent APIs. Hardware is the binding constraint: **32GB is the practical floor for 4B–12B models; 64GB is preferable for serious use requiring models above 12B**. Although a 27B model can load on some 32GB machines, it is too slow and memory-intensive to recommend; 16GB cannot load it at all. Counter-intuitively, the fastest and most stable daily driver in testing was the *smallest* model, **Gemma4-4B**. The realistic posture is therefore **hybrid**: local for high-volume, repetitive, and sensitive work; cloud for the hardest and most cutting-edge tasks.

---

## Four Evidence Claims (grab-and-go for the repo walkthrough)

| # | Claim | Backed by | One-line evidence anchor |
|:--|:--|:--|:--|
| **1** | We validated what each hardware tier can actually do | [HARDWARE-TIERS.md](HARDWARE-TIERS.md) + measured throughput | 32GB is suitable for 4B–12B; 27B can load but is not recommended; **16GB cannot load 27B at all**; measured range 2.38–17.88 tok/s |
| **2** | We mapped which AI coding tasks are practical locally | [USE-CASE-MATRIX.md](USE-CASE-MATRIX.md) | Scripts / explanation / troubleshooting / docs ✅ — agentic IDE, multi-file, niche APIs ❌ |
| **3** | We documented the tradeoffs **honestly** (incl. failures) | "What Didn't Work" + caveats below | OpenCode agentic loop timed out on *every* config incl. 32GB; Qwen3.6-27B too slow (2.38 tok/s) to iterate |
| **4** | We produced a reusable deployment starting point | [DEPLOYMENT-TEMPLATE.md](DEPLOYMENT-TEMPLATE.md) | Validated LM Studio + OpenCode/Continue stack, reproduced on a Tier 3 / 32GB machine (Win 11) |

---

## What On-Device AI Coding Is

Local AI coding means running an AI language model directly on your device — no internet connection, no cloud service, no data leaving your machine. In this engagement, that meant **LM Studio** hosting an open-source model (e.g., Gemma4 or Qwen3.6) behind a local API endpoint, used two ways:

1. **Standalone chat** (LM Studio's own interface) — you paste code or ask a question and get an answer. *This is the workflow that worked.*
2. **IDE integration** (OpenCode, or VS Code + the Continue extension) — the assistant lives in your editor and can act on your files. *This is the workflow that broke down for iterative use.*

The key tradeoffs vs. cloud AI, with the numbers this cohort actually observed:

| | Local (On-Device) | Cloud AI |
|:---|:---|:---|
| **Data privacy** | Data stays strictly on device — meets security/compliance needs | Data sent to external servers |
| **Cost** | One-time hardware investment, then effectively free per use | Per-use or subscription |
| **Speed** | Hardware-dependent: measured ~2–18 tok/s (27B slow, 4B fast) | Near-instant, high concurrency |
| **Capability** | Reliable for established patterns; weak on niche APIs & multi-file work | Stronger for complex reasoning and recent/niche frameworks |
| **Availability** | Works fully offline | Requires connectivity |
| **Control** | Full — your model, your quantization, your context settings | Provider-dependent |

---

## Who This Is For

**Strong fit — on-device AI coding makes sense if you:**
- Regularly generate scripts, automation, or documentation as part of your work (this is exactly where local models shine)
- Work with sensitive data, internal systems, or non-public infrastructure details that shouldn't leave the device
- Have **current-gen, 32GB hardware** (Tier 2) and can stay within the recommended 4B–12B model range
- Have **64GB RAM** when serious work requires a model above 12B
- Want to cut cloud-AI subscription dependency for high-volume, repetitive tasks

**Weaker fit — on-device may frustrate you if you:**
- Primarily work with cutting-edge or niche frameworks and APIs — small local models lack the parametric knowledge, and the models that don't (27B) are too slow to iterate
- Need the most capable AI for complex reasoning, architecture, or multi-file refactoring
- Need to run 27B/30B-class models on a 32GB laptop; these models are not recommended at that memory level
- Are on **legacy 16GB hardware** with competing workloads — you're restricted to Gemma4-4B and heavy prompt micromanagement
- Rely on an in-editor agentic assistant — the iterative IDE loop is not reliable locally today
- Need instant responses for time-sensitive work

---

## Hardware Reality in the Corporate Fleet

Hardware is the single biggest determinant of whether local AI coding is viable. The cohort worked across the tiers below. **Two tiers were directly measured** (32GB current-gen and 16GB standard); the mid and legacy tiers are documented from participant experience; and **Tier 1 remains unvalidated** because no participant in this cohort was on that hardware.

### Measured throughput

Averages on small prompts using LM Studio / OpenCode; longer contexts produce a mild, gradual slowdown. Gen6 (32GB) runs roughly 2–3× faster than Gen3 (16GB) on the same model. All models tested at q4_k_m quantization.

| Hardware (RAM) | Gemma4-4B | Gemma4-12B | Qwen3.6-27B |
|:---|:---:|:---:|:---:|
| **T14s Gen6 — 32GB** | 17.88 tok/s ✅ | 9.82 tok/s ✅ | 2.38 tok/s ⚠️ |
| **T14S Gen3 — 16GB** | 7.51 tok/s ✅ | 3.37 tok/s ⚠️ | **Won't load** ❌ |

### Tier map

| Tier | RAM | Max usable model | Verdict | Validated? |
|:---|:---|:---|:---|:---|
| **Tier 1 — AI Optimized** | 64GB+ | 35B / 70B (highly quantized) | Ideal target | ❌ **Unvalidated** — no participant on this hardware |
| **Tier 2 — Current Gen** (T14 Gen 6, 32GB) | 32GB | 4B–12B recommended; 27B can load but is not recommended | ✅ **Primary target for 4B–12B** | ✅ Directly measured |
| **Tier 3 — Recent Standard** (T14 Gen 5, Core Ultra 7 155U, 32GB) | 32GB | 4B–12B recommended; models above 12B require more RAM for serious use | ⚠️ Usable within the 4B–12B range | ◑ Participant-observed — **reference platform for the [Deployment Template](DEPLOYMENT-TEMPLATE.md)** |
| **Tier 4 — Standard 16GB** (T14 Gen 3) | 16GB | ~9B (Gemma4-4B stable; 12B strained) | ⚠️ Constrained | ✅ Directly measured |
| **Tier 5 — Legacy 16GB** (T14 Gen 2) | 16GB | 1B–3B only | ❌ Marginal / unviable — map to cloud | ◑ Participant-observed |

**The practical takeaways:**
- **32GB is the practical floor for 4B–12B models.** These models are the recommended range for laptops with 32GB RAM. Models above 12B, including 27B/30B-class models, are not recommended because they are too slow and memory-intensive for dependable laptop use.
- **64GB RAM is preferable for serious work with models above 12B.** It provides the headroom required for the model, context, and normal enterprise workloads; Tier 1 remains unvalidated in this cohort.
- **16GB is a hard ceiling.** Qwen3.6-27B **exceeds total system memory and will not load**. Gemma4-4B is the only comfortably stable option; Gemma4-12B runs but strains memory and crashes under load.
- **Tier 3 (Core Ultra 7 155U, 32GB) is stable but graphics-limited.** The 32GB blocks OOM crashes, but the unoptimized iGPU pipeline causes lag on heavy lookups — segment prompts and clear sessions frequently. This is nonetheless the platform on which the reproducible deployment was validated.
- **Legacy Tier 5 should be routed to cloud endpoints.** Small 1B–3B models cannot handle real debugging or refactoring, and multi-file context causes lock-ups.

---

## What Worked in Practice

The following are **reliably production-usable with normal review** when using the recommended 4B–12B range — strongest on Gen6/32GB, and, encouragingly, several also held on Gen3/16GB with Gemma4-12B or 4B:

- **PowerShell script generation** (standard patterns) — solid across nearly every configuration, down to Gemma4-4B on 16GB.
- **Python automation scripts** — same story; reliable everywhere except the 16GB + 27B combination (which cannot run).
- **Code explanation** — consistently strong across models and tiers.
- **Error / log troubleshooting** — strong on Gemma4-12B (deeper context comprehension); adequate (⚠️) on Gemma4-4B for routine cases.
- **Infrastructure documentation** — strong on 12B models.
- **Single-file web app generation** (e.g., a Tetris-type app) — works well on Gen6 with 12B models.
- **CLI tool with error handling** — reliable on Gen6 with 12B models.
- **One-shot IDE generation** — a single non-iterative command (`opencode run "write a hello world PowerShell script"`) succeeds; the deployment reference confirms this as a validation step. It's the *iterative* agentic loop, not one-shot generation, that fails.

**Why it worked:** short, well-known coding patterns rely on parametric knowledge the models already hold, and the standalone chat workflow avoids the tool-calling overhead that breaks agentic setups. This band is also the sweet spot for the privacy/compliance benefit — the data never leaves the device.

---

## What Does Not Work, or Does Not Meet the Recommended Standard

> **Negative evidence is treated as first-class here.** Per the engagement's completion criteria in OUTCOMES.md, "not achievable on this hardware" is valid, valuable evidence — it is the substance of the honest-tradeoffs outcome and the basis of the recommendation. The failures below are findings, not gaps in the work.

- **IDE-connected iterative / agentic coding (OpenCode) — failed on every model and every hardware tier (❌).** This is the headline negative finding. Cause: limited local inference speed combined with iterative tool-calling loops → context overhead, tool-calling timeouts, and multi-file processing bottlenecks. It is a **throughput/workflow bottleneck, not a model-intelligence defect**. *Workaround:* copy code into LM Studio's standalone chat, which executes reliably.
- **Models above 12B on a 32GB laptop** — including 27B/30B-class models — are not recommended. A 27B model may load, but the measured 2.38 tok/s throughput and memory pressure make it unsuitable for dependable use.
- **Multi-file refactoring** — ⚠️ at best (Gen6 with 27B/12B); ❌ on 4B and on all 16GB configs. The 27B model is too slow (2.38 tok/s) to iterate and tends to crash/timeout; smaller models lose the thread across files.
- **Complex architectural design** — ⚠️ on Gen6 large models, ❌ elsewhere. Small models' reasoning falls flat on genuine design work.
- **Security-sensitive code review** — ⚠️ on capable models, ❌ on 4B. Usable as a second opinion, not as a sole reviewer.
- **Niche / recent APIs** — smaller 4B models lack the parametric knowledge, and the 27B model that would know more is too slow to be practical. Cloud is the right tool here.
- **Anything requiring 27B on 16GB** — impossible; the weights exceed system memory.

**Known coverage gap (untested, not failed):** **API integration code**, for both well-known and niche/recent APIs, was **not tested (🔲)** in this engagement. Treat any conclusion about API work as provisional until a future cohort measures it.

---

## Evidence Ledger — Synthesis-Ready

| Finding area | What worked | What failed | Hardware / setup | So what for Corporate |
|:---|:---|:---|:---|:---|
| **Standard scripting** (PowerShell, Python) | Production-usable output with light review | 27B on 16GB won't load; 4B needs more review on edge cases | ✅ All 32GB configs; Gemma4-4B even on 16GB (7.51 tok/s) | Safe to adopt now for daily scripting; strongest privacy win |
| **Code explanation** | Reliable everywhere it could run | — | ✅ All tiers except 16GB+27B | Low-risk quick win; good onboarding/upskilling use |
| **Error/log troubleshooting & docs** | Strong depth on 12B | 4B struggles on long logs / nuanced edge cases | Gen6 32GB, Gemma4-12B (9.82 tok/s) | Use 12B for diagnosis; keep 4B for routine parsing |
| **Single-file app / CLI w/ error handling** | Good with 12B models | ⚠️/❌ on 4B and on 16GB | Gen6 32GB, 12B | Feasible for self-contained tools, not for projects |
| **Agentic IDE coding (OpenCode loop)** | One-shot `opencode run` validates | Iterative agentic loop timed out — **every config incl. 32GB** | All hardware; not model-specific | Do **not** deploy agentic IDE locally yet; use standalone chat or cloud |
| **Multi-file refactor / architecture / security review** | At best ⚠️ on Gen6 large models | ❌ on 4B and all 16GB; 27B too slow (2.38 tok/s), crashes | Gen6 32GB marginal; everything else no | Route to cloud; local can assist, not own |
| **Niche / recent APIs** | — | 4B lacks knowledge; 27B too slow to iterate | Both tiers | Cloud is the right tool |
| **Hardware ceiling** | 32GB supports the recommended 4B–12B range | 16GB cannot load 27B; 27B/30B-class models are not recommended on 32GB | Measured on Gen6 32GB vs Gen3 16GB | Set 32GB as the floor for 4B–12B and prefer 64GB for serious use above 12B |
| **API integration code** | *Not tested* 🔲 | *Not tested* 🔲 | — | Flag as open item for the next cohort |

---

## Recommendations

### For IT Professionals on Current-Gen Hardware (32GB)
- **Run Gemma4-4B as your always-on default.** It is the fastest (17.88 tok/s on Gen6) and most stable model, and it covers the bulk of daily scripting, explanation, and lookup work.
- **Reserve Gemma4-12B for dedicated heavy tasks** (deep log diagnosis, richer documentation, single-file app generation) — and run them when memory-heavy enterprise apps are *not* competing for RAM, to avoid crashes.
- **Use LM Studio's standalone chat, not agentic IDE iteration.** One-shot `opencode run` is fine; multi-step agentic loops are not reliable.
- **Keep local work inside the proven band** — scripts, explanation, troubleshooting, docs — and send multi-file refactors, architecture, and niche-API work to cloud.

### For IT Professionals on Legacy Hardware (16GB)
- **Gemma4-4B is your only comfortably stable option** (~7.51 tok/s). Do not attempt Qwen3.6-27B — it will not load.
- **Gemma4-12B is usable but fragile** (3.37 tok/s, occasional crashes under load); treat it as occasional-use, not a daily driver.
- **Practise strict prompt hygiene:** close background/browser windows to free RAM, keep prompts tight, and clear sessions often to avoid freezing the environment.
- **Route complex, multi-file, or time-sensitive work to cloud.** On 16GB, local AI is a convenience for small tasks, not a development platform.

### For Managers Evaluating Adoption
- **Set 32GB as the minimum procurement standard for 4B–12B use, and 64GB as the preferred standard for serious local-AI use above 12B.** 16GB is meaningfully constrained and legacy 16GB is unviable.
- **Position local AI as a complement to cloud, not a replacement.** Best ROI is on high-volume, repetitive, and privacy-sensitive tasks; cloud remains necessary for cutting-edge and complex reasoning work.
- **The strongest business case is privacy/compliance** — data stays on-device — not raw capability or speed.
- **Do not expect agentic/IDE workflows to work locally yet.** Budget for cloud endpoints for those.
- **Tier 1 (64GB, high-TOPS NPU) is promising but unproven in this cohort.** Pilot it before committing to fleet-wide procurement.

### For a Future Cohort Running This Engagement Again
- **Close the coverage gaps:** test API integration code (well-known *and* niche/recent APIs), and get at least one participant onto **Tier 1 (64GB)** hardware to validate the "ideal target" claim.
- **Re-test agentic/IDE tooling** beyond OpenCode (e.g., other Continue/VS Code configurations) to confirm whether the bottleneck is universal or tool-specific.
- **Standardize measurement methodology:** record throughput at multiple context lengths (not just small prompts) and fix quantization (q4_k_m) across all runs for comparability.
- **Reconcile documentation inconsistencies** between the source docs — notably the Gen6 processor identification (Intel Core Ultra 7 258V in the Use-Case Matrix vs. AMD Ryzen AI in Hardware Tiers) and the Tier 4 chip (i7 vs. i5-1235U) — so the tier map is unambiguous.

---

## How to Get Started

If you want to try this yourself:
1. Check which hardware tier you're on → [HARDWARE-TIERS.md](HARDWARE-TIERS.md)
2. See what use cases apply to your work → [USE-CASE-MATRIX.md](USE-CASE-MATRIX.md)
3. Follow the validated setup → [DEPLOYMENT-TEMPLATE.md](DEPLOYMENT-TEMPLATE.md) (also linked as [QUICKSTART.md](../QUICKSTART.md))
4. See realistic examples → [USE_CASES.md](../USE_CASES.md)
5. Understand the tradeoffs before you commit → [CAVEATS.md](../CAVEATS.md)

**Minimal validated stack** (from the [Deployment Template](DEPLOYMENT-TEMPLATE.md), reproduced on a Tier 3 / 32GB machine, Windows 11):

```powershell
# 1. Inference engine
winget install ElementLabs.LMStudio --accept-package-agreements --accept-source-agreements
lms server start

# 2. Get a model — choose a q4_k_m quantization variant
lms get qwen
lms load google/gemma-4-12b --context-length 16384 --parallel 1  # use a 4B/12B model on 32GB; prefer 64GB for models above 12B

# 3. (Optional) IDE assistant
npm install -g opencode-ai
opencode run "write a hello world PowerShell script"            # one-shot validation
```

Then point OpenCode or the VS Code **Continue** extension at the local endpoint `http://localhost:1234/v1/`. Remember the practical guidance above: prefer the standalone chat for iterative work, and pick your model to match your RAM tier.

---

## Key Message

The main conclusion of the meeting is:

**Local AI is useful today for simple, private, or offline tasks, but it should be used in a hybrid approach alongside cloud AI for more complex tasks.**


