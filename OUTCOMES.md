# TeamOne On-Device AI Coding Engagement Outcomes

## What This Engagement Produces

By the end of the engagement, two categories of output exist in this repository:

**Challenge Submissions** (`submissions/`)  
Each participant's weekly deliverables — working code, tools, and applications — plus structured notes from their direct experience across different hardware and tooling combinations. These are the evidence that the work happened.

**Collective Findings** (`findings/`)  
Six discrete outcomes grouped into four institutional documents, co-authored progressively by participants during the engagement:

**Outcomes** (Work items assigned to individual Owners):

| Outcome | Group | What It Answers |
|:---|:---|:---|
| 1. Hardware Tiers Baseline | HARDWARE-TIERS.md | What Corporate hardware tiers can actually run, based on what participants experienced |
| 2. Use-Case Viability Map | USE-CASE-MATRIX.md | Which AI coding tasks work locally vs cloud — by tier and capability |
| 3. Hardware Constraints & Tradeoffs | USE-CASE-MATRIX.md | Performance, latency, and accuracy tradeoffs for each task-tier pairing |
| 4. Deployment Reference Template | DEPLOYMENT-TEMPLATE.md | A validated reference setup for current-gen Corporate hardware — copy-paste ready |
| 5. Evidence Synthesis | ASSESSMENT.md | Aggregated participant findings, patterns, and insights across hardware and workflow tiers |
| 6. Corporate Adoption Recommendation | ASSESSMENT.md | Direct assessment and recommendation for Corporate colleagues, SMEs, and procurement decisions |

**Documents** (Containers for outcomes 1–4; outcomes 5–6 synthesized at Week 4):

- [HARDWARE-TIERS.md](findings/HARDWARE-TIERS.md) — Outcome 1
- [USE-CASE-MATRIX.md](findings/USE-CASE-MATRIX.md) — Outcomes 2 & 3
- [DEPLOYMENT-TEMPLATE.md](findings/DEPLOYMENT-TEMPLATE.md) — Outcome 4
- [ASSESSMENT.md](findings/ASSESSMENT.md) — Outcomes 5 & 6 (synthesized at Week 4 closure)

These documents are the institutional reason this engagement has value beyond the individuals who participated.

---

## How Work Is Defined

The engagement runs across five phases:

| Phase | Duration | Theme | Output |
|:---|:---|:---|:---|
| Week 0 | 24 days | Preparation | GitHub/org access, tooling setup, foundational reading |
| Week 1 | 7 days | Make it work | First working local AI deliverable + Week 1 NOTES.md |
| Week 2 | 6 days | Make it better | IDE-connected workflow deliverable + Week 2 NOTES.md |
| Week 3 | 8 days | Make it practical | Real-world scripting/automation deliverable + Week 3 NOTES.md |
| Week 4 | 8 days | Make it real | MVP application + Week 4 NOTES.md + collective ASSESSMENT.md |

Each week has pre-specified deliverable criteria. The challenge scope is fixed — there is no agreement needed on what to build each week. This is deliberate: in a virtual, async format, open-ended scoping is where momentum dies. Participants work within the definition.

The `NOTES.md` template in each submission folder defines exactly what structured experience to document. Filling it in is part of the deliverable, not an optional reflection. It is how individual work becomes collective output.

---

## How Work Is Organized and Distributed

### Participation Model

#### CHALLENGES
 - Activities for Weeks 1–3 are individual.
 - Activites for Week 4 start immediately after kick off, can be Solo but Duo is recommended.

#### OUTCOMES
Participants split ownership of 6 discrete outcomes grouped into 4 documents. All participants collaborate as Contributors on all outcomes. Owner means coordinator for that outcome — responsible for document coherence, completeness, and merging contributions from all participants.

**Outcomes 1–4** are built progressively as Owners receive and merge participant contributions throughout Weeks 1–3.

**Outcomes 5–6** are synthesized at Week 4 closure by their respective Owners from all participant contributions.

### Ownership and Collaboration

Each activity in the engagement has an **Owner** and **Contributors**, following the TeamOne methodology. Ownership is distributed across activities so that work is distributed and all participants have similar opportunity to lead.

**Challenge submissions:** The submitting participant is the Owner. The review and merge is handled by the coordinator or a designated peer reviewer.

**Outcomes/Findings documents:** Ownership of the 6 outcomes (shown in the table above) is assigned at Week 1 kickoff (June 25). Each Owner coordinates contributions from all 6 other participants and is responsible for that outcome's completeness and quality by engagement end. Contributors provide input and evidence that Owners synthesize into final form.

---

## How Progress Is Tracked

The [GitHub Project Board](https://github.com/orgs/dft-core-infra/projects/4) is the single source of truth for engagement health. It tracks all weekly tasks per participant as: **Todo → In Progress → Done**.

Participants update their issue status as they work. The project board is how the coordinator identifies who is blocked before that person goes quiet in a virtual format.

Findings document progress is visible directly in the repository. Each PR to a findings document is a discrete unit of progress. Documents carry status markers (🔲 In progress / ✅ Complete) that owners update as sections fill in.

**No other tracking system. No status update emails. The repo is the record.**

---

## How the Engagement Closes

### Week 4 Closure Session

A live virtual session closes the experience-gathering phase and opens collective synthesis. At this session:

- Outcomes 5 & 6 (Evidence Synthesis + Corporate Recommendation) are drafted collaboratively
- Any gaps in Outcomes 1–4 (Hardware Tiers, Viability Map, Constraints, Template) are identified and filled
- MVP scope and Duo pairing for Week 4 is confirmed
- Final review of all 6 outcomes for completeness

Attendance is expected. Participants who cannot attend coordinate async within 24 hours.

### Completion Criteria

| Deliverable | Complete When |
|:---|:---|
| Weekly challenge submission (Weeks 1–4) | PR merged, marked 👍 Validated |
| NOTES.md (per submission) | Filled in and included in the merged PR |
| Outcome 1: Hardware Tiers Baseline | All hardware tiers represented by at least one participant have observations |
| Outcome 2: Use-Case Viability Map | At least one participant entry per validated use case (local and cloud) |
| Outcome 3: Hardware Constraints & Tradeoffs | Performance and latency data captured for each task-tier pairing |
| Outcome 4: Deployment Reference Template | Reference setup confirmed and validated by at least one participant |
| Outcome 5: Evidence Synthesis | Aggregated findings from all contributions, patterns identified |
| Outcome 6: Corporate Adoption Recommendation | Recommendation drafted, reviewed, and approved by at least two contributors |
| Overall engagement | All participants have at least one validated submission; all 6 outcomes marked ✅ |

### What "Not Achieved" Looks Like

If a participant's hardware cannot complete a challenge, or a use case doesn't work on a given setup — a completed `NOTES.md` documenting the attempt and outcome is a valid and complete contribution. "Not applicable on this hardware" and "not achievable at this tier" are workable outcomes. They belong in the findings as evidence.

An engagement where participants discover that some hardware tiers cannot viably run this stack is a successful engagement. That finding has direct value for Corporate hardware planning and procurement conversations.

---

## Reading This Repo

| If you are... | Start with... |
|:---|:---|
| A participant in this engagement | [CHALLENGES.md](CHALLENGES.md) → [QUICKSTART.md](QUICKSTART.md) → [submissions/](submissions/README.md) |
| A Corporate colleague evaluating the concept | [findings/ASSESSMENT.md](findings/ASSESSMENT.md) |
| An IT professional wondering if this applies to your hardware | [findings/HARDWARE-TIERS.md](findings/HARDWARE-TIERS.md) |
| Someone who wants to replicate this setup | [findings/DEPLOYMENT-TEMPLATE.md](findings/DEPLOYMENT-TEMPLATE.md) → [QUICKSTART.md](QUICKSTART.md) |
| Interested in the technical detail and caveats | [CAVEATS.md](CAVEATS.md) → [NOTES.md](NOTES.md) |
