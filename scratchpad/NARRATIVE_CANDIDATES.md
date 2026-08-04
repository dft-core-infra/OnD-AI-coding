# Narrative Candidates from Findings

## Purpose

This is an inventory of distinct participant-derived material in `findings/` that is not already represented, or is only represented at a less specific level, in the current top-level documentary flow.

It is not an edit plan. A listed item is a candidate for future editorial consideration only after its source, scope, and placement have been reviewed. Findings remain the source of record.

## Candidate Contributions

### Evidence and Scope

| Contribution | Source | Why It Is Distinct |
|---|---|---|
| The findings distinguish direct measurement, participant observation, unvalidated tiers, and untested work. | [Hardware tiers](../findings/HARDWARE-TIERS.md), methodology note; [assessment](../findings/ASSESSMENT.md), tier map and coverage gap | The top-level guidance discusses tested configurations, but does not consistently expose this evidence boundary. This distinction prevents readers from treating future-looking or untested claims as validated results. |
| API integration work is explicitly recorded as not tested. | [Assessment](../findings/ASSESSMENT.md), "Known coverage gap" and evidence ledger; [use-case matrix](../findings/USE-CASE-MATRIX.md), API rows | The main documents discuss API limitations generally, but do not state that this specific use case remains an open evidence gap. |
| The findings provide a reusable benchmark method: fixed prompts, three runs, median generated-output tokens per second, and a warning not to compare different speed metrics. | [Use-case matrix](../findings/USE-CASE-MATRIX.md), sections 5 and 6 | This is a contribution method rather than generic advice. It lets later contributors extend the evidence without overwriting earlier measurements. |
| The benchmark includes task-specific acceptance criteria, such as refusing a misleading prompt hint and preserving missing values in the data-cleaning task. | [Use-case matrix](../findings/USE-CASE-MATRIX.md), "Evaluation Guidance" | The use-case examples show possible outputs; they do not define how a future tester should judge whether an answer is correct. |

### Observed Workflows

| Contribution | Source | Why It Is Distinct |
|---|---|---|
| The tested distinction is between one-shot local IDE generation, which succeeded as a validation step, and iterative agentic IDE work, which timed out across the tested configurations. | [Assessment](../findings/ASSESSMENT.md), "What Worked in Practice" and "What Does Not Work"; [use-case matrix](../findings/USE-CASE-MATRIX.md), IDE workflow observations | The existing main documentation presents local coding tools and setup, but does not preserve this precise workflow boundary and the evidence behind it. |
| Standalone chat is documented as the practical iterative fallback when local agentic tooling fails. | [Assessment](../findings/ASSESSMENT.md), "What Does Not Work"; [use-case matrix](../findings/USE-CASE-MATRIX.md), "IDE Workflow vs. Standalone Chat" | This is a field-derived operating practice, not a generic tool preference. |
| A 16GB participant workflow includes closing browser/background applications, keeping prompts tight, and clearing sessions to avoid freezing. | [Hardware tiers](../findings/HARDWARE-TIERS.md), Tier 4 participant finding; [assessment](../findings/ASSESSMENT.md), legacy-hardware recommendations | Top-level documentation explains memory pressure, but this captures the concrete day-to-day behavior participants used under constraint. |
| On the recent standard Intel platform, heavy code lookup lag led to a specific practice: segment complex work into standalone logic steps and clear chat sessions frequently. | [Hardware tiers](../findings/HARDWARE-TIERS.md), Tier 3 participant finding | This is a qualitative, hardware-specific workflow adaptation that is not expressed in the current general guidance. |
| Legacy devices were evaluated as unsuitable for real local debugging and multi-file context, with cloud endpoints identified as the practical route. | [Hardware tiers](../findings/HARDWARE-TIERS.md), Tier 5 participant finding | The top-level caveats describe limitations in general terms; this is a direct participant conclusion about the lower end of the fleet. |

### Measured Results and Decision Support

| Contribution | Source | Why It Is Distinct |
|---|---|---|
| Measured throughput ranges for named hardware/model combinations: 2.38 to 17.88 generated tokens per second. | [Assessment](../findings/ASSESSMENT.md), measured-throughput table; [use-case matrix](../findings/USE-CASE-MATRIX.md), section 1 | The main guidance discusses relative performance without carrying the engagement's actual measurements. |
| The evidence differentiates a model that can load from one that is useful to iterate with; the 27B test is recorded as loadable on one 32GB system but too slow and memory-intensive to recommend for dependable work. | [Assessment](../findings/ASSESSMENT.md), "What Does Not Work" and evidence ledger | This is a useful decision criterion that avoids treating successful loading as successful workflow validation. |
| The assessment converts findings into decision-oriented categories: tasks suited to local work, tasks better routed to cloud, and conditions requiring a hybrid workflow. | [Assessment](../findings/ASSESSMENT.md), evidence ledger and recommendations | Top-level documents discuss tradeoffs, but this is the collective synthesis of participant results into an adoption decision aid. |

### Reproducibility and Alternatives

| Contribution | Source | Why It Is Distinct |
|---|---|---|
| The deployment reference records the exact platform and validation date for one reproducible setup: ThinkPad Gen 5, Core Ultra 7 155U, 32GB, Intel Arc/Xe graphics, Windows 11 24H2, July 2026. | [Deployment template](../findings/DEPLOYMENT-TEMPLATE.md), document information and reference test platform | The general setup documentation does not identify the concrete platform on which this particular configuration was validated. It should remain clearly framed as one reference, not a default. |
| The deployment reference supplies a Continue configuration alongside the OpenCode configuration. | [Deployment template](../findings/DEPLOYMENT-TEMPLATE.md), Continue configuration | The top-level configuration material focuses on OpenCode. This is a documented alternative integration path. |
| The one-shot validation command is paired with an expected successful outcome. | [Deployment template](../findings/DEPLOYMENT-TEMPLATE.md), validation test | Existing checklists ask readers to test a connection, but this gives a simple acceptance signal for a named reference configuration. |

## Additions from Second Discovery Pass

### Measurement Controls

| Contribution | Source | Why It Is Distinct |
|---|---|---|
| The benchmark controls for session state: close unrelated compute-heavy applications, run one unmeasured warm-up generation, and start a new conversation for every measured prompt. | [Use-case matrix](../findings/USE-CASE-MATRIX.md), "Benchmark Procedure" | The first-pass inventory records the prompts and speed calculation. These controls explain how contributors avoid contaminating a comparison with background load, cold-start behavior, or inherited conversation context. |
| A usable measurement record includes the runtime and version, model file/version and quantization, context length, offload and batching settings, generated-token count, generation time, and the testing mode (standalone chat or IDE/agentic integration). | [Use-case matrix](../findings/USE-CASE-MATRIX.md), "What Contributors Should Record" | This is the evidence metadata needed to interpret a result later. It is more specific than the benchmark procedure itself and preserves the conditions behind a participant's result. |

### Single-Participant Observation Requiring Explicit Scope

| Contribution | Source | Why It Is Distinct |
|---|---|---|
| A Tier 2 participant reported that the newer T14 Gen 6 was responsive enough for local 7B-14B coding work, enterprise content caches, and localized RAG pipelines. | [Hardware tiers](../findings/HARDWARE-TIERS.md), Tier 2 participant finding | This use case is not represented in the top-level guidance or the collective assessment. It is worth preserving as a participant contribution, but any future narrative use must label it as a single observation rather than a cohort-wide conclusion. |

## Reconciliation Notes

These are not candidate narrative additions. They must be resolved against source evidence before any material is promoted beyond its findings document.

- The Tier 2 hardware identity differs between [Hardware tiers](../findings/HARDWARE-TIERS.md) (AMD Ryzen AI) and [Assessment](../findings/ASSESSMENT.md) / [Use-case matrix](../findings/USE-CASE-MATRIX.md) (Intel Core Ultra 7 258V).
- The Tier 4 processor is described as Intel i7 in [Hardware tiers](../findings/HARDWARE-TIERS.md) and Intel Core i5-1235U in [Use-case matrix](../findings/USE-CASE-MATRIX.md).
- Quantization references vary. The use-case matrix records the Qwen 27B benchmark as Q8_0, while other findings and top-level material use q4_k_m in reference guidance. Measurements should retain their recorded configuration and not be generalized without clarification.

## Excluded from This Inventory

- Material already represented at comparable specificity in the top-level documents.
- General hardware or model recommendations without a distinct participant observation, measured result, or reproducibility practice.
- Any proposed rewrite, deletion, or reclassification of participant contributions.
