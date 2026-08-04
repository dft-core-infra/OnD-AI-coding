# V1 Narrative Optimization

## Meta-Objective

Shape the repository's main documentation into a repeatable, practical recipe for people starting local AI coding from zero.

The release should make the useful first-time-reader flow easy to recognize without removing, minimizing, or obscuring the engagement record.

## Editorial Rules

1. Treat the README as a narrative guide, not a complete index with every document at equal weight.
2. Orient a first-time reader to the whole repository before presenting the practical route and deeper material.
3. Keep links to all major engagement material in the README. They must remain discoverable and valued, but should not interrupt the primary learning flow.
4. Preserve participant-authored contributions to the main documentation. They are evidence and part of the documentary narrative, not cleanup targets.
5. Retain temporary files, exercise submissions, and notes in the repository. They may be linked as supporting material, but are not required steps for a first-time reader.
6. Do not use hardware capacity, a model family, or a single tool as the repository's defining intent. Specific configurations are scenarios and evidence, not the meta-objective.
7. Prefer concise, concrete, evidence-backed prose. Identify original generic, repetitive, promotional, speculative, or AI-sounding content only as candidates for an approval-gated proposal; do not remove or rewrite it automatically.
8. Do not alter participant content merely to make the narrative smoother. Any edit that affects participant-authored material requires a clear, evidence-based reason and careful review.
9. Distinguish between the release's main guidance and the engagement's supporting record through structure, headings, and link placement, not through deletion or concealment.

## Intended README Narrative

1. What the repository contains and how its documentation fits together.
2. The practical getting-started route.
3. Deeper guidance, tradeoffs, and reference material.
4. Engagement evidence and additional documentation, including findings, outcomes, challenges, submissions, and notes.

## Findings-Based Change Plan

This plan records actual findings in the current documents. Each item is a candidate for a future, document-level proposal; none authorizes an edit by itself.

### 1. Make the README's Opening an Orientation, Not a Reference-Stack Claim

**Finding:** The first screen labels the repository "Local AI Coding on Windows 11," displays a "RAM-32GB Focus" badge, and says that the documentation covers a specific 32GB Windows stack. The completed participant assessment documents a wider evidence base: tested 16GB and 32GB devices, an unvalidated 64GB tier, and differing viable workflows.

**Candidate change:** Keep the current Windows/reference-stack material visible, but move configuration-specific framing out of the opening orientation or explicitly identify it as a documented scenario rather than the repository's subject.

**Motive:** A reader should first understand what the repository contains: a practical guide plus participant-produced evidence. A single configuration should not accidentally read as the repository's intent or universal entry condition.

**Affected document:** `README.md` only.

### 2. Reconcile the README Workflow Diagram with the Completed Assessment

**Finding:** The README's central diagram defines the workflow as `opencode` calling an LM Studio server. The completed participant assessment and use-case matrix report that iterative IDE/agentic workflows with OpenCode failed across tested configurations, while standalone LM Studio chat was the reliable iterative workflow; one-shot OpenCode use remained viable.

**Candidate change:** Replace or qualify the central diagram and its accompanying narrative so it does not present an IDE-integrated loop as the default proven workflow. Link readers to the findings for the evidence and retain one-shot IDE use only where the assessment supports it.

**Motive:** The main entry document should not contradict the evidence produced by participants or make a newcomer start with the workflow the engagement found unreliable.

**Affected documents:** `README.md`; any later technical-guide proposal only if the same unsupported workflow claim appears there.

### 3. Separate Orientation Links from Next-Step Links in the README

**Finding:** The README's single "Documentation Structure" table lists setup, technical references, engagement governance, findings, and submission instructions as equal "When to Read" items. It then separately provides a Quick Start and another "Start Setup" link.

**Candidate change:** Keep every current link, but group the existing list into a small number of clearly named purposes: getting started, understanding and adapting the setup, and engagement record/additional documentation. Preserve findings in the visible documentary route rather than treating them as archival.

**Motive:** The reader can understand the whole repository without being asked to decide whether a setup guide, a submission guide, and an outcome-tracking document are equivalent next steps.

**Affected document:** `README.md` only.

### 4. Remove Only Proven Redundancy in the README

**Finding:** "Why This Matters," "What This Covers," and "Who This Serves" repeat the same core claims: IT professionals, practical scripting/troubleshooting/documentation tasks, and local/private use. The opening slogan and closing italic line repeat the same privacy-and-empowerment framing.

**Candidate change:** Propose a compact consolidation of these passages, retaining the audience, practical uses, and privacy rationale while removing only duplicated wording and generic slogans.

**Motive:** The README can make its case once, then spend its attention on the repository map and the evidence-backed guidance.

**Affected document:** `README.md` only.

### 5. Treat the Quick Start as a Technical-Accuracy Review, Not a Narrative Cleanup

**Finding:** The README's abbreviated command block uses `--parallel-requests 1`; `QUICKSTART.md` uses `--parallel 1`; `SETUP.md` and `CONFIG.md` use `--max-parallel 1`. The documents also show different `opencode` configuration formats. The participant assessment's validated setup uses another concrete command sequence and distinguishes standalone chat from one-shot IDE validation.

**Candidate change:** Do not simplify or rewrite these instructions during the narrative pass. Create a separate, evidence-and-documentation-verified technical proposal after the README decision, identifying one supported command/configuration path and where the assessment constrains it.

**Motive:** Inconsistent commands make a recipe non-repeatable, but guessing at a correction would be worse than leaving them untouched pending verification.

**Affected documents:** `README.md`, `QUICKSTART.md`, `SETUP.md`, `CONFIG.md`, and possibly `findings/DEPLOYMENT-TEMPLATE.md`; each must be proposed and approved separately.

### 6. Preserve the Participant Documentary Stream and Improve Its Visibility Through Accurate Labels

**Finding:** `findings/ASSESSMENT.md` is marked completed and contains the clearest synthesis of participant results, limitations, and recommendations. `findings/README.md` still labels the same family of documents as "In progress" or "Draft after Week 4." The README already calls findings the engagement's institutional output.

**Candidate change:** Review `findings/README.md` after the README work and propose status-label updates that match the actual completion state, without rewriting findings content or participant conclusions.

**Motive:** Accurate status labels strengthen participant work and let readers distinguish completed evidence from future contribution guidance.

**Affected document:** `findings/README.md` only.

### 7. Keep Submissions, Notes, Challenges, and Outcomes Reachable Without Making Them Prerequisites

**Finding:** Challenges and submissions document the engagement workflow; NOTES.md records background rationale and troubleshooting; OUTCOMES.md records the engagement's governing structure. They are all already linked from the README, but the equal-weight table obscures their relationship to the main guide.

**Candidate change:** Retain each README link and use the link-grouping proposal in item 3 to describe its role accurately. Do not move, delete, or rewrite the underlying files as part of narrative optimization.

**Motive:** The release preserves the full record and respects contributors while making clear which material helps a new reader begin and which documents explain the engagement behind the evidence.

**Affected document:** `README.md` only.

## Proposed Review Order

1. Prepare one complete, no-edit candidate diff for `README.md` covering items 1-4 and 7.
2. Apply it only after explicit approval, then validate links and Markdown.
3. Prepare a separate candidate diff for `findings/README.md` covering item 6.
4. Perform technical instruction verification for item 5 before proposing any changes to technical guides.

## Scope Boundaries

### In Scope

- README information architecture and link hierarchy.
- Clarity and concision of original main-path documentation.
- A coherent sequence for readers beginning local AI coding.
- Clear placement of main guidance, evidence, and supporting engagement material.

### Out of Scope Unless Explicitly Agreed

- Removing participant submissions, notes, findings, challenges, outcomes, or temporary material.
- Rewriting participant-authored contributions for stylistic consistency.
- Treating any one hardware configuration as the repository's purpose or default audience.
- Changing technical guidance without first verifying the relevant commands and configuration against current authoritative documentation.

## Working Questions

- Which concrete README passages or link groups interrupt orientation without improving it?
- Which original passages warrant a precise, approval-gated optimization proposal?
- Which technical instructions need validation before any correction is proposed?
