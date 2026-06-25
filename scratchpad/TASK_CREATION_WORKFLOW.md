# Challenge Task Creation Workflow

**Purpose:** Standardized process for creating batch challenge tasks (Weeks 2-4) without experimentation. Documents Week 1 workflow, lessons learned, and reusable patterns.

---

## Quick Reference: Week 1 Success Pattern

✅ All 7 Week 1 tasks created and assigned in ~15 minutes
- Issues: #43–#49
- All assigned to respective participants
- All added to Project Board (iteration: Week 1)
- Deliverables validated

---

## Phase 1: Task Template Preparation

### Step 1: Define Task Content Structure

Each challenge task requires:
1. **Title:** `[Week N] {username} - Setup Challenge: {title}`
2. **Assignee:** The GitHub username of the participant
3. **Body:** Multi-line description with:
   - Challenge objective
   - Deliverables/requirements
   - Resources and links
   - Marking criteria (1-5 scale per dimension)
   - Submission format (PR to submissions/week-N/)

### Step 2: Create Body File Template

**Location:** Temporary .txt files in workspace root (e.g., `.git/week1_{username}_body.txt`)

**Content Structure:**
```
{Challenge Objective}

## Deliverables

- Requirement 1
- Requirement 2
- Requirement 3

## Resources

- [Link 1](url)
- [Link 2](url)

## Marking Criteria

Use these 1-5 scales:

### Functionality
- 1: Non-functional or incomplete
- 5: Fully functional, polished

### Use of On-Device AI
- 1: Minimal or no on-device AI usage
- 5: Sophisticated use of local model

### Creativity
- 1: Basic, minimal originality
- 5: Innovative, original approach

### Practical Value
- 1: Limited real-world application
- 5: High practical utility

## Submission

1. Create PR to `submissions/week-N/{your-username}/`
2. Include `NOTES.md` with observations
3. Link your submission in this issue

See [submissions/week-N/README.md](../submissions/week-N/) for template.
```

---

## Phase 2: Issue Creation

### Step 3: Create Issues via `gh issue create`

**Command Pattern:**
```bash
gh issue create \
  --repo dft-core-infra/OnD-AI-coding \
  --title "[Week N] {username} - Setup Challenge: {title}" \
  --assignee {username} \
  --body-file "path/to/week{N}_{username}_body.txt"
```

**Key Parameters:**
- `--body-file`: **Critical** for multi-line content (avoids PowerShell escaping issues)
- `--assignee`: Must match exact GitHub username
- `--repo`: Always `dft-core-infra/OnD-AI-coding`
- ~~`--label`~~ Omit labels (GitHub repo labels not yet configured)

### Step 4: Collect Issue URLs

After creating each issue, capture the returned URL:
```
https://github.com/dft-core-infra/OnD-AI-coding/issues/{number}
```

Save these for Phase 3.

---

## Phase 3: Project Board Synchronization

### Step 5: Add Issues to Project Board

**Individual Command:**
```bash
gh project item-add 4 \
  --owner dft-core-infra \
  --url "https://github.com/dft-core-infra/OnD-AI-coding/issues/{number}"
```

**Batch Command (Recommended):**
```bash
gh project item-add 4 --owner dft-core-infra \
  --url "https://github.com/dft-core-infra/OnD-AI-coding/issues/44" && \
gh project item-add 4 --owner dft-core-infra \
  --url "https://github.com/dft-core-infra/OnD-AI-coding/issues/45" && \
gh project item-add 4 --owner dft-core-infra \
  --url "https://github.com/dft-core-infra/OnD-AI-coding/issues/46"
# ... etc for all issues
```

**Key Parameters:**
- `4` = Project board ID (dft-core-infra/projects/4)
- `--owner dft-core-infra` = Required
- `--url` with full GitHub URL = Required format

---

## Lessons Learned & Gotchas

### ✅ What Works

1. **Body Files for Complex Content**
   - Multi-line descriptions with links, lists, formatting
   - Avoids PowerShell escaping nightmares
   - File cleanup via `.git/` staging (not tracked)

2. **Batch Operations > Sequential**
   - Create all body files
   - Create all issues (6+ at once)
   - Add all to project board in one batch command
   - ~15 minutes for 7 tasks vs. 45+ minutes if done sequentially

3. **URL-based Project Board Linking**
   - `--url` parameter with full GitHub link works reliably
   - ~~`--id` flag~~ Don't use (deprecated/unreliable)

### ❌ What Doesn't Work

1. **Inline Multi-line `--body` Text**
   - PowerShell escaping fails with newlines and special chars
   - Use `--body-file` instead

2. **Label Specification**
   - `--label` flag fails if labels not pre-created
   - Workaround: Omit labels on create; add manually if needed

3. **GitHub Markdown Parsing**
   - Ensure gantt blocks have closing ``` backticks
   - Multi-line content in body files: use raw text, not escaped

### 🔍 Verification Steps

After task creation batch:

```bash
# Verify all tasks created
gh issue list --repo dft-core-infra/OnD-AI-coding --search "Week N" --state open

# Verify assignments (per participant)
gh issue list --repo dft-core-infra/OnD-AI-coding --assignee {username} --search "Week N"

# Verify project board sync
gh project item-list 4 --owner dft-core-infra --format json | grep -i "week N"
```

---

## For Future Weeks: Week 2–4 Process

### Week 2 Challenge (Enhanced Tetris)

**Template Location:** `scratchpad/CHALLENGE_TASKS_REFERENCE.md` → Week 2 section

**Timeline:**
- Creation: ~July 3, 2026 (after Week 1 concludes)
- Due: July 8, 2026
- Participants: All 7 (individual)

**Process:**
1. Use body text from `CHALLENGE_TASKS_REFERENCE.md` → Week 2
2. Create 7 body files: `.git/week2_{username}_body.txt`
3. Run 7x `gh issue create` commands
4. Batch add to project board

### Week 3 Challenge (CLI/Automation Tool)

**Timeline:**
- Creation: ~July 9, 2026 (after Week 2 concludes)
- Due: July 16, 2026
- Participants: All 7 (individual)

**Process:** Same as Week 2 (use `CHALLENGE_TASKS_REFERENCE.md` → Week 3)

### Week 4 Challenge (Demo MVP)

**Timeline:**
- Creation: ~July 17, 2026 (after Week 3 concludes)
- Due: July 24, 2026
- Participants: All 7 (solo or duo, recommended)

**Process:** Same, but document duo pairing in body text

---

## Commands Cheat Sheet

### Create Single Issue
```bash
gh issue create --repo dft-core-infra/OnD-AI-coding \
  --title "[Week N] {username} - Challenge: {title}" \
  --assignee {username} \
  --body-file "path/to/body.txt"
```

### Add Multiple to Project Board (Batch)
```bash
gh project item-add 4 --owner dft-core-infra --url "{issue_url_1}" && \
gh project item-add 4 --owner dft-core-infra --url "{issue_url_2}" && \
gh project item-add 4 --owner dft-core-infra --url "{issue_url_3}"
```

### Verify Project Board Iteration
```bash
gh project item-list 4 --owner dft-core-infra --limit 100 --format json | \
  jq '.items[] | select(.content.title | contains("Week N")) | {title: .content.title, iteration: .fieldValues[0].name}'
```

### List All Week N Tasks
```bash
gh issue list --repo dft-core-infra/OnD-AI-coding --search "Week N" --state open --json number,title,assignees
```

---

## File Cleanup

After task creation, remove temporary body files:

```bash
# Manual cleanup (if keeping them is useful for reference)
rm .git/week{N}_*.txt

# Or keep in .gitignore and commit (body files are not version-controlled content)
```

---

## Owner Acknowledgment

**Process Validated By:** dvasquez (agent-assisted creation)  
**Date:** June 22, 2026  
**Status:** ✅ Ready for Weeks 2–4 Replication  
**Reference:** Issues #43–49 (Week 1 Challenge Tasks)
