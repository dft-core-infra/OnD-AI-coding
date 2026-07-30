# Outcome Tasks Design

Six outcome tasks, designed for action-focused GitHub issues. Each task is a discrete deliverable grouped into one of four findings documents.

---

## Outcome 1: Hardware Tiers Baseline

**Document:** `findings/HARDWARE-TIERS.md`

**Objective:** Define what each Corporate hardware tier can actually run, based on direct participant experience across the engagement.

**What You'll Do:**
1. Open HARDWARE-TIERS.md for contributions from all 6 participants
2. Each participant adds their observations directly to the document via PR (organized by tier: 16GB, 32GB, GPU, etc.)
3. Review and merge PRs, ensuring observations are specific and grounded in actual experience
4. Update document structure as needed to keep it coherent

**Complete When:**
- All hardware tiers with participant evidence are documented
- Observations are specific, not generic
- At least one participant has contributed observations for each tier
- Document is marked ✅ when complete

**Timeline:** Active Weeks 1–3 (participants contribute progressively as they test hardware)

---

## Outcome 2: Use-Case Viability Map

**Document:** `findings/USE-CASE-MATRIX.md` (first section)

**Objective:** Map which AI coding tasks are viable locally vs require cloud, across all hardware tiers tested during the engagement.

**What You'll Do:**
1. Establish the matrix structure in USE-CASE-MATRIX.md: rows = use cases (Tetris, enhancements, CLI tools), columns = hardware tiers
2. Participants fill in their cells directly via PRs: **Local**, **Cloud**, **Partial**, or **N/A**
3. Review PRs and merge entries as they come in from participants
4. Keep matrix organized and consistent

**Complete When:**
- Matrix populated with viability data for all tested use cases
- Each use case has at least one tier entry
- Matrix is marked ✅ when complete

**Timeline:** Active Weeks 1–3 (participants add findings as they test)

---

## Outcome 3: Hardware Constraints & Tradeoffs

**Document:** `findings/USE-CASE-MATRIX.md` (second section)

**Objective:** Document the performance, latency, and accuracy tradeoffs when running AI coding tasks on each hardware tier.

**What You'll Do:**
1. Create performance tradeoff sections in USE-CASE-MATRIX.md (latency, throughput, accuracy, etc.)
2. Participants contribute performance observations directly: "On 16GB tier, Tetris generation takes X seconds vs Y seconds on cloud"
3. Review and merge PRs with performance data
4. Organize tradeoff entries by task-tier pairing

**Complete When:**
- Performance data captured for each meaningful task-tier pairing
- Tradeoffs are explicit (e.g., "slower but acceptable" vs "too slow to use")
- Section marked ✅ when complete

**Timeline:** Active Weeks 1–3 (participants add findings as they benchmark)

---

## Outcome 4: Deployment Reference Template

**Document:** `findings/DEPLOYMENT-TEMPLATE.md`

**Objective:** Create a validated, copy-paste-ready reference setup for deploying on-device AI coding tools on current-gen Corporate hardware.

**What You'll Do:**
1. Open DEPLOYMENT-TEMPLATE.md for setup contributions from all 6 participants
2. Participants contribute their validated setup directly: commands, versions, hardware requirements, workarounds
3. Identify the most common/successful pattern across contributions via PRs
4. Consolidate into a reference template: hardware requirements → environment setup → model install → first run
5. Ensure steps are specific with exact commands and versions

**Complete When:**
- Template is complete and specific (not generic)
- At least one participant has validated it works end-to-end
- All critical steps documented with versions and commands
- Document marked ✅ when complete

**Timeline:** Active Weeks 1–3 (participants contribute validated setups progressively)

---

## Outcome 5: Evidence Synthesis

**Document:** `findings/ASSESSMENT.md` (first section)

**Objective:** Synthesize all participant findings, identify patterns, and articulate the collective insights about on-device AI coding viability for Corporate.

**What You'll Do:**
1. Review completed Outcomes 1–4 documents (Hardware Tiers, Use-Case Map, Constraints, Template)
2. Identify cross-cutting patterns from all participant contributions (e.g., "16GB tier consistently struggles with X", "cloud offloading used for Y")
3. Draft narrative synthesis: what worked, what didn't, why, and implications
4. Ensure synthesis is grounded in the evidence documents—someone reading ASSESSMENT.md can trace back to the evidence

**Complete When:**
- Key patterns identified and clearly articulated
- Synthesis clearly traces back to evidence in Outcomes 1–4
- Gaps or unknowns explicitly noted
- Document marked ✅ when complete

**Timeline:** Drafted at Week 4 closure session (~July 17)

---

## Outcome 6: Corporate Adoption Recommendation

**Document:** `findings/ASSESSMENT.md` (second section)

**Objective:** Deliver a direct, evidence-based recommendation to Corporate decision-makers about whether and how to adopt on-device AI coding.

**What You'll Do:**
1. Using the synthesis from Outcome 5, draft a clear recommendation
2. Cover: yes/no/conditional, rationale grounded in evidence, hardware implications, risk factors, next steps
3. Write for Corporate audience (SMEs, managers, procurement)—not technical detail
4. Get feedback from at least 2 other participants via PR review
5. Finalize and merge

**Complete When:**
- Recommendation is clear and actionable
- Rationale explicitly tied to evidence from Outcomes 1–5
- At least 2 participants have reviewed and approved
- Written for Corporate decision-makers
- Document marked ✅ when complete

**Timeline:** Drafted at Week 4 closure session (~July 17)

---

## Task Creation Workflow

Each outcome task will be created as a GitHub Issue and assigned to a participant at the June 25 kickoff:

- **Title format:** `[Outcome N] {Title}` (e.g., `[Outcome 1] Hardware Tiers Baseline`)
- **Assignment:** One Owner per outcome
- **Body:** Details and guidance from above
- **Project:** Added to Project Board → Outcome Track (new track, or main track?)
- **Timeline:** Due dates differ:
  - Outcomes 1–4: Due July 16 (end of Week 3)
  - Outcomes 5–6: Due July 24 (end of Week 4)

---

## Key Principles

- **No NOTES.md dependency:** Participants contribute directly to findings documents via PRs
- **No copy-paste:** Contributions stay in the document, no intermediate processing
- **PR-driven:** Each PR from a participant is tracked by the Owner
- **Progressive building:** Outcomes 1–4 build gradually Weeks 1–3 as participants test and contribute
- **Synthesis at closure:** Outcomes 5–6 synthesized from complete Outcomes 1–4 at Week 4 closure
- **Owner coordination:** Owner merges PRs, ensures coherence, updates document status
