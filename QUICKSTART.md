# QUICKSTART: Get Running Fast

<div align="center">
<img src="assets/Droid.png" alt="Automation assistant icon" width="100"/>
</div>

**Goal:** Get LM Studio serving a model and opencode connected in under 10 minutes.

**For:** 16GB/32GB Windows 11 systems (Ryzen AI, Intel Lunar Lake preferred). 

> **16GB users:** May work on a case-by-case basis (HW limitations). Please pay attention to the info in the sidebars.

All commands run in **Windows Terminal** (PowerShell).

---

## Prerequisites

- Windows 11 (recent build, 24H2 or later recommended)
- 32GB RAM (16GB RAM supported with limitations, check sidebars)
- Updated GPU drivers (Ryzen AI / Intel Lunar Lake / compatible)
- Administrator access for winget installation

---

## Step 1: Install LM Studio

```powershell
winget install ElementLabs.LMStudio --accept-package-agreements --accept-source-agreements
```

**Verify installation:**

```powershell
lms --version
```

**Expected:** Version string displays. If command not found, restart terminal or add LM Studio to PATH.

> **Note:** The `lms` command-line interface provides all model management. The GUI is available but not required for this setup.

---

## Step 2: Start the LM Studio Server

```powershell
lms server start
```

**Verify server running:**

```powershell
lms server status
```

**Expected:** Server running, listening on a port (typically 1234).

> **Troubleshooting:** If port conflict occurs, LM Studio docs show how to configure alternate ports.

---

## Step 3: Download the Model

For 32GB systems, we recommend Qwen 3.6 35B with MoE architecture and optimized quantization:

```powershell
lms get qwen/qwen-3.6-35b-instruct-gguf --quant q4_k_m
```

> **Verification note:** The exact model identifier may vary. Check available models with `lms search qwen`. Use the Qwen 3.6 35B variant with q4_k_m quantization.

> **16GB sidebar:** For 16GB systems, use a 9B model instead:  
> `lms get qwen/qwen-2.5-9b-instruct-gguf --quant q4_k_m`

**Download takes time.** The model is ~18-20GB. Progress displays in terminal.

<div align="center">
<img src="assets/cora_coffe_1.png" alt="Team member taking coffee break" width="200"/>

*This is a good time to grab coffee. Model downloads take a few minutes.*
</div>

---

## Step 4: Load Model with Stability Settings

```powershell
lms load qwen/qwen-3.6-35b-instruct-gguf --context-length 32768 --max-parallel 1
```

**Why these settings:**
- `--context-length 32768`: Tested context window size that works reliably on 32GB with other applications running
- `--max-parallel 1`: Single request at a time prevents memory contention

**Verify model loaded:**

```powershell
lms ps
```

**Expected:** One model showing "loaded" status. Memory usage visible.

> **16GB sidebar:** Same command, just reference the 9B model name instead.

---

## Step 5: Install opencode

```powershell
# Verify you have node/npm first
node --version

# Install opencode globally
npm install -g @anthropic-ai/opencode
```

> **Don't have Node.js?** Download from [nodejs.org](https://nodejs.org/) (LTS version recommended).

> **Developer note:** If you already have opencode installed, verify version is current: `opencode --version`

**Verify installation:**

```powershell
opencode --version
```

---

## Step 6: Connect opencode to LM Studio

Create `opencode.json` in your project directory (or use global config):

```json
{
  "engine": {
    "provider": "lmstudio",
    "endpoint": "http://localhost:1234",
    "context_window": 32768,
    "max_parallel": 1
  }
}
```

> **Configuration note:** These keys match opencode's documented schema. For full schema, see CONFIG.md.

**Test the connection:**

```powershell
opencode "write a hello world PowerShell script"
```

**Expected:** opencode connects to LM Studio, sends request, returns generated script.

**Success looks like:** Model responds with PowerShell code. Response time varies (10-30 seconds typical for first request).

---

## Step 7: Verify Single-Model Setup

<img src="assets/cory-police.png" alt="Security verification" width="150" align="right"/>

```powershell
lms ps
```

**Confirm:** Only one model shows "loaded" status. This is important for 32GB stability.

**Why it matters:** Loading multiple large models simultaneously exhausts RAM and causes system paging. Single-model operation keeps inference fast and stable.

---

## Next Steps

**It works?** Great. Now:

1. **Understand what you built:** Read [SETUP.md](SETUP.md) for how LM Studio + opencode work together
2. **See it in action:** Check [USE_CASES.md](USE_CASES.md) for PowerShell generation and troubleshooting examples  
3. **Customize:** Read [CONFIG.md](CONFIG.md) when you want to tune settings or switch models
4. **Reality check:** Read [CAVEATS.md](CAVEATS.md) for honest assessment of what you're getting—tradeoffs, costs, and limitations
5. **Start the challenge:** Read [CHALLENGES.md](CHALLENGES.md) for the weekly challenge program — your setup just completed Week 1's prerequisite

**Having issues?** See [NOTES.md](NOTES.md) troubleshooting section for common problems and solutions.

---

## Ollama (Future)

Ollama integration is planned but not documented yet. Focus on LM Studio for now—it's tested and works reliably for this configuration. Ollama guidance will be added when we can provide the same quality of verified instructions.

---

<div align="center">

<img src="assets/AIN Green Stream - Survey Thanks.jpg" alt="Team celebration - Good job completing setup" width="800"/>

**You're set up. Time to put it to work.**

[See Use Cases →](USE_CASES.md) | [Understand the Setup →](SETUP.md)

---

<img src="assets/DIGITAL_Foundations_logo.png" alt="Team One Digital Foundations" height="100" style="vertical-align: middle;"/> <img src="assets/DFT Logo - Full Fox - Orange.png" alt="Technology Core Infra" height="100" style="vertical-align: middle;"/>

</div>
