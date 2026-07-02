# Assessment — On-Device AI Coding for Corporate IT

**For:** Corporate colleagues, SMEs, managers, citizen developers, and technology enthusiasts  
**Written by:** Participants of the On-Device AI Coding engagement  
**Status:** 🔲 Draft — to be completed during Week 4

> This document synthesizes what a group of Corporate IT professionals learned by actually running local AI models on Corporate hardware and building real things with them. It is evidence-based, not theoretical.

---

## What We Did

A small cohort ran a 4-week hands-on engagement:
- Set up local AI inference engines on their own Corporate devices
- Used local AI models to generate code, automate tasks, and build small applications
- Worked across multiple hardware tiers present in the Corporate fleet
- Documented what worked, what didn't, and why

The detailed technical findings are in:
- [Hardware Tiers](HARDWARE-TIERS.md) — what each device class can actually run
- [Use-Case Matrix](USE-CASE-MATRIX.md) — which tasks work locally vs. require cloud
- [Deployment Template](DEPLOYMENT-TEMPLATE.md) — the validated reference setup

---

## The Short Answer

*(Participants: complete this section in Week 4 — 3-5 sentences summarizing the overall finding)*

---

## What On-Device AI Coding Is

Local AI coding means running an AI language model directly on your device — no internet connection, no cloud service, no data leaving your machine. You interact with it through a chat interface or through your code editor, asking it to generate scripts, explain errors, write documentation, or build small applications.

The key tradeoffs vs. cloud AI:

| | Local (On-Device) | Cloud AI |
|:---|:---|:---|
| **Data privacy** | Data stays on device | Data sent to external servers |
| **Cost** | Hardware investment, then free | Per-use or subscription |
| **Speed** | Slower (hardware-dependent) | Faster (datacenter hardware) |
| **Capability** | Good for established patterns | Better for complex/recent tasks |
| **Availability** | Works offline | Requires connectivity |
| **Control** | Full — your model, your settings | Provider-dependent |

---

## Who This Is For

**Strong fit — on-device AI coding makes sense if you:**
- Regularly generate scripts, automation, or documentation as part of your work
- Work with sensitive data, internal systems, or non-public infrastructure details
- Have current-gen Corporate hardware (32GB, AI-optimized)
- Want to reduce dependency on cloud AI subscriptions for high-volume repetitive tasks

**Weaker fit — on-device may frustrate you if you:**
- Primarily work with cutting-edge or niche frameworks and APIs
- Need the most capable AI models for complex reasoning tasks
- Are on legacy 16GB hardware with competing workloads
- Need instant responses for time-sensitive work

---

## Hardware Reality in the Corporate Fleet

*(Participants: fill in the hardware distribution you observed and what each tier can do — draw from HARDWARE-TIERS.md)*

---

## What Worked in Practice

*(Participants: list the use cases the cohort validated as working reliably)*

---

## What Didn't Work, or Worked Poorly

*(Participants: list the use cases where local AI was insufficient — be specific about why)*

---

## Recommendations

*(Participants: complete in Week 4)*

### For IT Professionals on Current-Gen Hardware
- 

### For IT Professionals on Legacy Hardware
- 

### For Managers Evaluating Adoption
- 

### For a Future Cohort Running This Engagement Again
- 

---

## How to Get Started

If you want to try this yourself:
1. Check which hardware tier you're on → [HARDWARE-TIERS.md](HARDWARE-TIERS.md)
2. See what use cases apply to your work → [USE-CASE-MATRIX.md](USE-CASE-MATRIX.md)
3. Follow the setup guide → [QUICKSTART.md](../QUICKSTART.md)
4. See realistic examples → [USE_CASES.md](../USE_CASES.md)
5. Understand the tradeoffs before you commit → [CAVEATS.md](../CAVEATS.md)
