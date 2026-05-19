# SETUP: Understanding the System

QUICKSTART got you running. This document explains how the pieces work together, so you can troubleshoot, customize, and adapt the setup to your needs.

---

## How LM Studio Works

**LM Studio** is your model engine. It handles:

1. **Discovery:** Search available models across repositories
2. **Download:** Pull GGUF-format models to local storage  
3. **Server:** Run an OpenAI-compatible API server that serves loaded models
4. **Management:** Load, unload, monitor models via CLI or GUI

**Why LM Studio:** Robust, well-documented, works reliably on Windows. The CLI (`lms`) gives you scriptable control. The GUI provides advanced features like tool calling.

---

## How opencode Works

**opencode** is your coding workflow interface. It:

1. Connects to LM Studio's API server
2. Sends coding requests with appropriate context
3. Handles responses and integrates them into your workflow

**Why opencode:** Standard tool (developers already know it), easy to use, free, widely available. It's designed for coding tasks—not a generic chat interface.

**For developers:** You've probably used opencode before. This setup just points it at your local LM Studio server instead of a cloud API.

**For IT Pros:** Think of opencode as a specialized command-line tool that talks to the AI model running in LM Studio.

---

## The LM Studio Server

### Starting and Stopping

```powershell
# Start server (runs in background)
lms server start

# Check status
lms server status

# Stop server
lms server stop
```

**What "server" means:** LM Studio runs a local HTTP server (default port 1234) that implements the OpenAI API spec. Other tools (like opencode) connect to this server to use the loaded model.

**Port configuration:** If 1234 conflicts with other software, configure alternate port in LM Studio settings. Update your `opencode.json` endpoint to match.

---

## Model Management

### Searching for Models

```powershell
# Search by name
lms search qwen

# Search for specific architecture
lms search "35b instruct"
```

**What to look for:** Model name, parameter count (35B, 9B), quantization (q4_k_m), format (GGUF).

### Downloading Models

```powershell
lms get <model-identifier> --quant <quantization>
```

**Example:**
```powershell
lms get qwen/qwen-3.6-35b-instruct-gguf --quant q4_k_m
```

**Quantization explained:** q4_k_m means 4-bit quantization with medium quality. It's the sweet spot for 32GB RAM—good quality, manageable size (~18-20GB for 35B models).

**Where models are stored:** LM Studio manages storage automatically. Location configurable in LM Studio settings.

### Loading Models with Configuration

```powershell
lms load <model-name> --context-length 32768 --max-parallel 1
```

**Why context-length 32768:**  
This context window size (32k tokens) handles most coding tasks without exhausting RAM. Going higher risks system paging when other applications are running. It's a conservative default that works reliably.

**Why max-parallel 1:**  
Single request at a time prevents memory fragmentation. With 32GB RAM and a 35B model, parallel requests compete for memory and degrade performance. Sequential processing is faster and more stable.

> **16GB users:** Same limits apply. The 9B model is smaller but still benefits from sequential processing.

### Checking Loaded Models

```powershell
lms ps
```

**Interpretation:**
- **Loaded:** Model is in memory, ready to serve requests
- **Memory usage:** Shows RAM consumption (should be ~18-20GB for q4_k_m 35B)
- **Requests:** Shows active request count

**Single-model verification:** Only one model should show "loaded" status. If you see multiple models, unload extras:

```powershell
lms unload <model-name>
```

### Unloading Models

```powershell
# Unload specific model
lms unload <model-name>

# Unload all models
lms unload --all
```

**When to unload:** Before loading a different model, before shutting down, or if experiencing memory pressure.

**Memory flush:** After unloading, RAM returns to system pool (may take a few seconds for OS to reclaim).

---

## opencode Configuration

### Basic Configuration File

Create `opencode.json` in your working directory or home directory:

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
  }
}
```

**Configuration precedence:** 
1. Project-local `opencode.json` (current directory)
2. User global config (`~/.opencode/config.json`)
3. Built-in defaults

**Provider:** Set to `lmstudio` to connect to LM Studio's API server.

**Endpoint:** Where LM Studio server is listening. Update if you configured non-default port.

**context_window and max_parallel:** Match the constraints you used when loading the model in LM Studio. These tell opencode what limits to respect.

> **Configuration schema:** See CONFIG.md for complete schema documentation. Only use documented keys—don't invent configuration that doesn't exist.

---

## Verification Checklist

**After setup, verify:**

1. **LM Studio server running:**
   ```powershell
   lms server status
   # Expected: Server active, port accessible
   ```

2. **Model loaded:**
   ```powershell
   lms ps
   # Expected: One model "loaded", ~18-20GB RAM for 35B
   ```

3. **opencode connection:**
   ```powershell
   opencode "test connection with simple greeting"
   # Expected: Model responds appropriately
   ```

4. **Single-model state:**
   ```powershell
   lms ps
   # Expected: Still only one model loaded (no extras)
   ```

**All passing?** You have a working local AI coding environment.

---

## Common Adjustments

### Switching Models

```powershell
# Unload current
lms unload --all

# Wait for memory reclaim (2-3 seconds)
Start-Sleep -Seconds 3

# Load different model
lms load <new-model> --context-length 32768 --max-parallel 1

# Verify switch
lms ps
```

### Reducing Memory Footprint

If experiencing memory pressure:

1. **Lower context window:** Try 16384 instead of 32768
2. **Use smaller quantization:** q3_k_m uses less RAM (quality tradeoff)
3. **Switch to smaller model:** 9B instead of 35B (performance tradeoff)

**Monitor with Task Manager:** Watch RAM usage during inference. If you see disk activity during requests, you're paging—adjust settings.

### Improving Response Time

If responses feel slow:

1. **Verify single model:** `lms ps` should show one model only
2. **Check GPU utilization:** Modern Ryzen AI / Lunar Lake should use hardware acceleration automatically
3. **Reduce context if not needed:** Shorter context = faster processing

---

## What's Happening Under the Hood

**When you run an opencode command:**

1. opencode reads your request and configuration
2. It formats the request into an API call
3. Sends HTTP request to LM Studio's server (localhost:1234)
4. LM Studio routes request to loaded model
5. Model generates response using GPU acceleration (Vulkan on AMD/Intel)
6. LM Studio returns response to opencode
7. opencode displays result

**Why this architecture:** Separation between workflow (opencode) and engine (LM Studio) means you can use other tools with the same LM Studio server. It's not locked to one client.

---

## Troubleshooting

**LM Studio commands not found:**
- Restart terminal after installation
- Verify LM Studio is in PATH: `where lms`
- Reinstall if needed: `winget uninstall ElementLabs.LMStudio`, then reinstall

**opencode can't connect:**
- Verify LM Studio server running: `lms server status`
- Check endpoint in opencode.json matches server port
- Test server directly: `curl http://localhost:1234/v1/models`

**Model loads but responses fail:**
- Check model actually loaded: `lms ps`
- Verify context_window in opencode.json matches load command
- Look for error messages in terminal output

**System becomes sluggish during inference:**
- Check Task Manager: RAM usage should not hit 100%
- If paging (disk activity), reduce context window or use smaller model
- Close unnecessary applications to free RAM

**More detailed troubleshooting:** See NOTES.md Risk Register for specific failure modes and resolutions.

---

## Monitoring GPU Usage

When inference is running, monitor system resources to verify healthy operation:

<div align="center">
<img src="assets/Screenshot 2026-05-16 190313.png" alt="Task Manager GPU monitoring during inference" width="700"/>

*Example: Task Manager showing GPU utilization and memory usage during model inference*
</div>

**What to look for:**
- **GPU utilization:** Should show activity during inference (percentage varies by request complexity)
- **Memory usage:** High RAM usage is normal (~18-20GB for 35B model, ~29-31GB system total)
- **Temperature:** Should remain within safe range (typically under 80°C for sustained load)
- **Dedicated vs Shared memory:** On integrated graphics systems, watch shared memory allocation

> **Note:** Screenshot shows NVIDIA discrete GPU; your Ryzen AI or Intel Lunar Lake system will show integrated GPU instead. Monitoring principles remain the same.

---

<div align="center">

**Ready to customize?** See [CONFIG.md](CONFIG.md) for detailed configuration options.

**Want to understand the design?** Read [NOTES.md](NOTES.md) for rationale and references.

---

<img src="assets/DFT Logo - Full Fox - Orange.png" alt="Technology Core Infra" width="100"/>

</div>
