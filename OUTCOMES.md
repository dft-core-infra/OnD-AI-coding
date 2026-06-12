# TeamOne On-Device AI Coding Engagement Outcomes

## What This Engagement Produces

By the end of the engagement, two categories of output exist in this repository:

**Challenge Submissions** (`submissions/`)  
Each participant's weekly deliverables — working code, tools, and applications — plus structured notes from their direct experience across different hardware and tooling combinations. These are the evidence that the work happened.

**Collective Findings** (`findings/`)  
Four documents co-authored progressively by participants during the engagement:

| Document | What It Answers |
|:---|:---|
| [HARDWARE-TIERS.md](findings/HARDWARE-TIERS.md) | What Corporate hardware tiers can actually run, based on what participants experienced |
| [USE-CASE-MATRIX.md](findings/USE-CASE-MATRIX.md) | Which AI coding tasks work locally, which require cloud, and under what hardware conditions |
| [DEPLOYMENT-TEMPLATE.md](findings/DEPLOYMENT-TEMPLATE.md) | A validated reference setup for current-gen Corporate hardware — copy-paste ready |
| [ASSESSMENT.md](findings/ASSESSMENT.md) | A direct, evidence-based assessment for Corporate colleagues, SMEs, and managers who were not in this engagement |

These documents are the institutional reason this engagement has value beyond the individuals who participated.

---

## How Work Is Defined

The engagement runs across five phases:

| Phase | Duration | Theme | Output |
|:---|:---|:---|:---|
| Week 0 | 17 days | Preparation | GitHub/org access, tooling setup, foundational reading |
| Week 1 | 7 days | Make it work | First working local AI deliverable + Week 1 NOTES.md |
| Week 2 | 7 days | Make it better | IDE-connected workflow deliverable + Week 2 NOTES.md |
| Week 3 | 7 days | Make it practical | Real-world scripting/automation deliverable + Week 3 NOTES.md |
| Week 4 | 7 days | Make it real | MVP application + Week 4 NOTES.md + collective ASSESSMENT.md |

Each week has pre-specified deliverable criteria. The challenge scope is fixed — there is no agreement needed on what to build each week. This is deliberate: in a virtual, async format, open-ended scoping is where momentum dies. Participants work within the definition.

The `NOTES.md` template in each submission folder defines exactly what structured experience to document. Filling it in is part of the deliverable, not an optional reflection. It is how individual work becomes collective output.

---

## How Work Is Organized and Distributed

### Participation Model

#### CHALLENGES
 - Activities for Weeks 1–3 are individual.
 - Activites for Week 4 start immediately after kick off, can be Solo but Duo is recommended.

#### OUTCOMES
Participants split ownership of the findings documents. All participants collaborate on all of them. Owner means coordinator for that document — not technical lead.

### Ownership and Collaboration

Each activity in the engagement has an **Owner** and **Collaborators**, following the TeamOne methodology. Ownership is distributed across activities so that work is distributed and all participants have similar opportunity to lead.

**Challenge submissions:** The submitting participant is the Owner. The review and merge is handled by the coordinator or a designated peer reviewer.

**Outcomes/Findings documents:** Each document has one Owner responsible for coherence and merging contributions. All other participants are Collaborators contributing through PRs from their weekly NOTES.md.

Ownership assignments for findings documents are made at or before Week 1:

| Document | Owner | Collaborators |
|:---|:---|:---|
| HARDWARE-TIERS.md | TBD | All participants |
| USE-CASE-MATRIX.md | TBD | All participants |
| DEPLOYMENT-TEMPLATE.md | TBD | All participants |
| ASSESSMENT.md | TBD | All participants — synthesized at Week 4 kickoff |

Owners are responsible for the document's completeness and quality at the end of the engagement. Collaborators are responsible for contributing their observations after each weekly submission.

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

- ASSESSMENT.md is drafted collaboratively by the group
- Any gaps in HARDWARE-TIERS.md and USE-CASE-MATRIX.md are identified and owners are confirmed
- MVP scope and Duo pairing for Week 4 is confirmed

Attendance is expected. Participants who cannot attend coordinate async within 24 hours.

### Completion Criteria

| Deliverable | Complete When |
|:---|:---|
| Weekly challenge submission (Weeks 1–4) | PR merged, marked 👍 Validated |
| NOTES.md (per submission) | Filled in and included in the merged PR |
| HARDWARE-TIERS.md | All hardware tiers represented by at least one participant have observations |
| USE-CASE-MATRIX.md | At least one participant entry per validated use case |
| DEPLOYMENT-TEMPLATE.md | Reference setup confirmed by at least one participant |
| ASSESSMENT.md | All sections completed, reviewed by at least two participants |
| Overall engagement | All participants have at least one validated submission; all findings documents marked ✅ |

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
