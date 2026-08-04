# Findings Enrichment Inventory

## Purpose

This inventory proposes small GitHub-rendered alerts that enrich the existing documentary path with participant evidence from `findings/`.

The underlying documents remain intact. Each alert is optional, placed only where it changes a reader's decision or practice, and links to the findings document that remains the source of record.

## Presentation Pattern

Use GitHub-native alerts, without custom HTML or images.

```md
> [!TIP]
> **Field note:** Short, evidence-backed operational advice.
> See [the findings](...) for scope and context.
```

Use `TIP` for a practical, tested practice and `WARNING` for a meaningful evidence-backed limitation. Do not add alerts merely to decorate a page.

## Proposed Alerts

| ID | Destination and Placement | Type | Proposed Content | Evidence and Motive |
|---|---|---|---|---|
| E1 | `QUICKSTART.md`, after the first successful local request in Step 6 | TIP | **Field note:** Treat a successful one-shot request as a connection check, not proof that an iterative IDE agent will be reliable. In engagement testing, one-shot local generation worked, while iterative agentic workflows timed out across the tested configurations. For longer back-and-forth work, use the local chat interface and keep the task focused. | [Assessment](../findings/ASSESSMENT.md), "What Worked in Practice" and "What Does Not Work"; [use-case matrix](../findings/USE-CASE-MATRIX.md), IDE workflow observations. This qualifies the existing connection test without changing its purpose. |
| E2 | `QUICKSTART.md`, after the Step 7 single-model verification | TIP | **Field note:** If the system slows down or freezes, reduce competing load before assuming the model is broken: close background applications, keep prompts narrow, and clear or restart long sessions. These were practical participant workarounds on constrained devices. | [Hardware tiers](../findings/HARDWARE-TIERS.md), Tier 3 and Tier 4 participant findings. This makes existing memory guidance more actionable without adding a hardware recommendation. |
| E3 | `SETUP.md`, after "How opencode Works" | WARNING | **Field note:** The engagement validated local IDE connection and one-shot generation, but not dependable iterative agentic use. Use the interface for bounded tasks; for iterative local work, standalone chat was the reliable participant-tested fallback. | [Assessment](../findings/ASSESSMENT.md), workflow findings; [use-case matrix](../findings/USE-CASE-MATRIX.md), "IDE Workflow vs. Standalone Chat." This corrects reader expectations at the point where the tool's role is introduced. |
| E4 | `SETUP.md`, after "Reducing Memory Footprint" | TIP | **Field note:** A model loading successfully is not the same as a usable working setup. Participant testing found that larger models could load on some machines yet be too slow or memory-intensive for dependable iteration. Test the kind of task you actually plan to do. | [Assessment](../findings/ASSESSMENT.md), measured throughput and "What Does Not Work." This adds a decision test rather than asserting a new threshold. |
| E5 | `USE_CASES.md`, after "Common Patterns Across Use Cases" | TIP | **Field note:** The strongest participant-tested local tasks were bounded: standard scripts, code explanation, error/log troubleshooting, and documentation. Keep the first request self-contained, review the result, then refine it in small steps. | [Assessment](../findings/ASSESSMENT.md), "What Worked in Practice"; [use-case matrix](../findings/USE-CASE-MATRIX.md), task ratings. This anchors the existing prompt/refinement advice in the collective evidence. |
| E6 | `USE_CASES.md`, after "Limitations to Understand" | WARNING | **Field note:** The engagement did not test API integration code. Treat generated guidance for either common or recent APIs as unvalidated until you check current official documentation and test it in your environment. | [Assessment](../findings/ASSESSMENT.md), "Known coverage gap"; [use-case matrix](../findings/USE-CASE-MATRIX.md), API rows marked not tested. This adds a precise evidence boundary where the document discusses model knowledge limits. |
| E7 | `CAVEATS.md`, after the opening framing and before "Use Cases" | TIP | **Field note:** The findings distinguish direct measurements, participant observations, unvalidated hardware tiers, and untested tasks. Read the linked evidence at that level of confidence rather than treating every recommendation as equally validated. | [Hardware tiers](../findings/HARDWARE-TIERS.md), methodology note; [assessment](../findings/ASSESSMENT.md), tier map and coverage gaps. This replaces no existing caveat; it helps readers interpret the evidence responsibly. |
| E8 | `CAVEATS.md`, after the "Capability Gaps" section | WARNING | **Field note:** In the engagement, multi-file refactoring, complex architecture work, security-sensitive review, and iterative local IDE agents were not dependable local workflows. Use local tools as assistance for bounded work and retain review or a different workflow for these cases. | [Assessment](../findings/ASSESSMENT.md), "What Does Not Work" and evidence ledger; [use-case matrix](../findings/USE-CASE-MATRIX.md), task ratings. This turns broad capability caveats into an evidence-backed workflow boundary. |
| E9 | `NOTES.md`, in "Verification & Testing," after "What Tested Means" | TIP | **Field note:** When adding a result, record the model file and quantization, runtime and version, context and batching settings, generated-token count, generation time, and whether the test used chat or an IDE integration. These details make another participant's measurement interpretable. | [Use-case matrix](../findings/USE-CASE-MATRIX.md), "What Contributors Should Record." This supplements the existing maintainership guidance with a concrete evidence practice. |
| E10 | `NOTES.md`, in "Verification & Testing," after "Commands We Ran" | TIP | **Field note:** For comparable local measurements, run a warm-up first, start a fresh conversation for each measured prompt, repeat each prompt three times, and report the median generated-output speed. Keep prompt-ingestion and output/decode speed distinct. | [Use-case matrix](../findings/USE-CASE-MATRIX.md), benchmark procedure. This preserves the participant-created method for future testing without putting benchmark detail in the quick start. |

## Deliberately Excluded

- A balloon for every hardware tier, model, or throughput number. The findings tables are better suited to that detail.
- Any claim dependent on unresolved hardware identities or conflicting quantization records.
- Generic privacy, cost, model-quality, or memory advice already present in the main path.
- The single-participant content-cache/RAG observation, because it is not supported by the collective assessment and would require unusually prominent scope labeling.
- Technical command or configuration corrections. Those need a separate verification pass against current tool documentation before any proposal.

## Proposed Application Order

1. `QUICKSTART.md`: E1-E2
2. `SETUP.md`: E3-E4
3. `USE_CASES.md`: E5-E6
4. `CAVEATS.md`: E7-E8
5. `NOTES.md`: E9-E10

Apply only after reviewing a complete proposed diff for each document. No alert is a mandate to edit its destination.
