# CONFIG: opencode Configuration Reference

This document defines the `opencode.json` configuration for local AI coding with LM Studio.

**When to use this:** After QUICKSTART works and you want to customize model settings, switch models, or understand configuration options.

---

## Minimal Working Configuration

Copy this into your project root as `opencode.json`:

```json
{
  "engine": {
    "provider": "lmstudio",
    "endpoint": "http://localhost:1234",
    "context_window": 32768,
    "max_parallel": 1
  },
  "models": {
    "default": "qwen-3.6-35b-instruct"
  },
  "logging": {
    "level": "info",
    "log_path": "./logs/opencode.log"
  }
}
```

**This configuration:**
- Points opencode at your local LM Studio server
- Sets 32GB-safe memory limits  
- Specifies which model to use
- Enables basic logging

> **Copy-paste ready:** This should work as-is. If you get errors, verify model name matches what's loaded in LM Studio (`lms ps`).

---

## Schema Reference

### `engine` Section

Controls how opencode connects to the AI model.

| Key | Type | Required | Description |
|:---|:---|:---|:---|
| `provider` | string | Yes | Set to `"lmstudio"` for local LM Studio server |
| `endpoint` | string | Yes | LM Studio API URL (default: `http://localhost:1234`) |
| `context_window` | integer | Yes | Token context limit (recommend `32768` for 32GB RAM) |
| `max_parallel` | integer | Yes | Concurrent requests (set `1` for single-model stability) |

**Why these matter:**

- **provider:** Tells opencode you're using LM Studio (not OpenAI, Anthropic, etc.)
- **endpoint:** Where to send API requests. Update if you configured LM Studio on different port.
- **context_window:** Maximum tokens in a request. Must match or be less than what you used when loading model in LM Studio. Higher values use more RAM.
- **max_parallel:** How many requests simultaneously. For 32GB with large model, `1` prevents memory contention.

> **Don't exceed your model's capabilities:** If you loaded model with `--context-length 32768`, don't set context_window higher than 32768 in opencode config.

### `models` Section

Defines which model(s) are available.

| Key | Type | Description |
|:---|:---|:---|
| `default` | string | Model name to use by default |
| `[custom-name]` | object | Additional model definitions (optional) |

**Simple configuration (recommended):**
```json
{
  "models": {
    "default": "qwen-3.6-35b-instruct"
  }
}
```

**Model name:** Should match the name shown in `lms ps`. If unsure, run `lms ps` and copy the model identifier from the output.

**Multiple models (advanced):**

If you want to switch between models:

```json
{
  "models": {
    "default": "qwen-3.6-35b-instruct",
    "lightweight": {
      "name": "qwen-2.5-9b-instruct",
      "description": "Faster, lower memory option"
    }
  }
}
```

Then use: `opencode --model lightweight "your request"`

**Remember:** With 32GB RAM, only load one model at a time in LM Studio. The config can list multiple options, but you manually switch which is loaded.

### `logging` Section

Optional logging configuration.

| Key | Type | Description |
|:---|:---|:---|
| `level` | string | Log verbosity: `"error"`, `"warn"`, `"info"`, `"debug"` |
| `log_path` | string | Where to write logs (relative or absolute path) |

**Recommended for troubleshooting:**
```json
{
  "logging": {
    "level": "info",
    "log_path": "./logs/opencode.log"
  }
}
```

**Log levels:**
- `error`: Only errors (minimal)
- `info`: Errors + request/response summaries (recommended)
- `debug`: Everything (verbose, useful for troubleshooting)

---

## Model Switching Workflow

<img src="assets/Droid.png" alt="Automated workflow" width="80" align="right"/>

When you want to switch models, you need to coordinate between LM Studio and opencode:

### Step 1: Unload Current Model (LM Studio)

```powershell
lms unload --all
```

**Wait a moment** for memory to be released (2-3 seconds).

### Step 2: Load New Model (LM Studio)

```powershell
lms load <new-model-name> --context-length 32768 --max-parallel 1
```

**Verify load:**
```powershell
lms ps
# Expected: New model showing "loaded", old model gone
```

### Step 3: Update Configuration (opencode)

If using simple config, update the model name:

```json
{
  "models": {
    "default": "new-model-name"
  }
}
```

Or use the `--model` flag if you have multiple defined:
```powershell
opencode --model lightweight "your request"
```

### Step 4: Verify Switch

```powershell
opencode "test with simple request"
```

**Expected:** Response from new model (behavior may differ based on model size/training).

---

## Model Recommendations

### For 32GB Systems (Primary)

**Qwen 3.6 35B** (q4_k_m quantization)
- Strong reasoning and planning capability
- MoE architecture for efficiency
- Excellent code generation
- ~18-20GB RAM footprint

**Model identifier to check:**  
```powershell
lms search "qwen 3.6 35b"
# Look for: qwen/qwen-3.6-35b-instruct-gguf
```

### For 16GB Systems (Alternative)

**Qwen 2.5 9B** (q4_k_m quantization)
- Good code generation in smaller package
- ~5-6GB RAM footprint
- Leaves room for OS and other applications

**Gemma 9B** (alternative)
- Fast inference
- Good for script generation and quick tasks
- ~5-6GB RAM footprint

> **16GB constraint:** System needs room for OS, browser, tools. 9B models leave adequate headroom. 13B+ models risk memory pressure.

---

<div align="center">
<img src="assets/cory-007.png" alt="Mission-critical configuration" width="180"/>

*Precision matters - critical configuration ahead*
</div>

## Configuration Don'ts

**Don't invent keys.** opencode has a specific schema. If a key isn't documented (either here or in official opencode docs), it won't work. Reality over wishful thinking.

**Don't guess model names.** Use `lms ps` or `lms search` to find exact identifiers. Typos in model names cause connection failures.

**Don't exceed memory limits.** If you set `context_window: 65536` on a 32GB system with 35B model, expect crashes or paging. Respect the tested defaults.

**Don't skip the unload step.** When switching models, always unload first. Loading a second large model exhausts RAM.

---

## Verification Checklist

<img src="assets/cory-police.png" alt="Configuration verification" width="150" align="right"/>

After configuration changes:

- [ ] `opencode --help` runs without error (config parse successful)
- [ ] `lms ps` shows model matching your config
- [ ] Test request completes: `opencode "write hello world in PowerShell"`
- [ ] Logs appear if you enabled logging (check log_path)
- [ ] `lms ps` still shows only one model (no extras leaked in)

**All checked?** Your configuration is working.

---

## Common Configuration Issues

**"Cannot connect to endpoint":**
- Verify LM Studio server running: `lms server status`
- Check endpoint URL matches server port
- Test with curl: `curl http://localhost:1234/v1/models`

**"Model not found":**
- Run `lms ps` and verify model name exactly matches config
- Model names are case-sensitive
- Check for typos

**Slow responses:**
- Verify `max_parallel: 1` in config
- Check `lms ps` for multiple loaded models (should be one)
- Reduce `context_window` if requests are very long

**Configuration not taking effect:**
- opencode reads config on startup—restart your terminal
- Check for syntax errors in JSON (use JSONlint or similar)
- Verify file is named exactly `opencode.json` (no `.txt` extension)

---

<div align="center">
<img src="assets/cory-force-user.png" alt="Team member demonstrating expert mastery" width="200"/>
</div>

## Advanced: Multiple Environments

If you work on different projects with different model requirements:

**Option 1: Project-local configs**

Create `opencode.json` in each project directory:
```
project-a/
  opencode.json  (uses 35B model)
  
project-b/
  opencode.json  (uses 9B model)
```

opencode reads the local config when you run commands in that directory.

**Option 2: Profile flags**

Some opencode versions support `--config` flag:
```powershell
opencode --config ./configs/heavy-model.json "request"
```

Check `opencode --help` to see if your version supports this.

---

<div align="center">

**Want deeper technical rationale?** See [NOTES.md](NOTES.md) for design decisions and authoritative references.

**Ready to see it in action?** Check [USE_CASES.md](USE_CASES.md) for practical examples.

---

<img src="assets/DIGITAL_Foundations_logo.png" alt="Team One Digital Foundations" height="100" style="vertical-align: middle;"/> <img src="assets/DFT Logo - Full Fox - Orange.png" alt="Technology Core Infra" height="100" style="vertical-align: middle;"/>

</div>
