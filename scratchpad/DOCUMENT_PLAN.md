# DOCUMENTATION PLAN: Windows 11 Local AI Coding Setup

## What This Is

A recipe from zero to basics: how IT professionals add local AI coding capabilities to their toolkit using LM Studio + opencode on Windows 11. 

This is professional skill-building. We're helping people with diverse backgrounds—IT support, network engineers, telecoms specialists, infrastructure architects, sometimes application developers and support—expand their capabilities with practical AI tools. Not hobbyist tinkering; career-building skills for daily work: generating scripts, troubleshooting systems, documenting infrastructure.

The scope is intentional: enough to get started effectively and understand what's happening, not comprehensive coverage of every option. Zero to confident basics.

## Who This Serves

**Primary audience:** Field IT Pros who may or may not have a developer background. Some have never touched source control or git. They're smart professionals learning a new domain, not beginners fumbling in the dark. They deserve documentation that respects their existing expertise (networking, systems, infrastructure) while clearly explaining the "why" at each step in this new domain.

**Critical assumption to avoid:** Don't assume familiarity with developer workflows, git terminology, or coding conventions. When these concepts are necessary, explain them briefly or link to authoritative sources. The goal is accessibility without condescension.

**Secondary audiences:** Developers (who already know opencode), Infrastructure Architects, Software Architects, Specialists/SMEs, and IT Team Managers. The documentation should work for all of them, but it's optimized for the Field IT Pro learning this for the first time.

**What they'll actually do with this:** Daily work that justifies the setup time. Generate PowerShell scripts for automation (user provisioning, system configuration, batch operations). Troubleshoot Windows error messages by asking a local AI that doesn't send diagnostic data to the cloud. Write documentation for systems they support. These aren't hypothetical use cases—these are the practical tasks that make this worth learning.

## The Quality Bar

**The promise:** If documentation is clear, engaging, and beautiful—meaningful contrary to fluffy, grounded contrary to generic or speculative or AI-sounding—this audience will happily follow it, no question.

This is about trust. Meet the quality bar and these professionals will succeed. They're capable; they just need documentation that respects that capability. Beautiful means:

1. **Graphically beautiful**: Visual design matters. Clean layout, professional formatting, thoughtful use of headers, lists, code blocks, spacing. Not just good writing—good presentation.
2. **Good hierarchy**: Easy to scan, obvious progression, clear navigation. A professional should be able to find what they need in seconds.
3. **Confident voice**: This person knows what they're talking about, no hedging or hand-waving. Authority earned through specificity and tested experience.
4. **Precise language**: No wasted words, every sentence earns its place. Efficiency respects the reader's time.
5. **Animated tone**: Energetic, alive, engaging—not flat or robotic. Write like a human who's genuinely excited to share something that works.

## The Technology Stack

**LM Studio** provides robust model discovery, download, and execution. It has intuitive server functionality, CLI configuration, and a chat GUI with advanced features like tool calling. It's the model engine—the half that runs and serves the AI models.

**opencode** is the other half: the coding workflow interface that connects to LM Studio's served models. Easy to use, widely available (standard tool, not obscure), free. Developers in the audience already know opencode—they just need to connect it to LM Studio. Field IT Pros are learning it for the first time—so don't assume familiarity, but also don't over-explain to the point of insulting developer readers.

Together, LM Studio (model engine) + opencode (workflow interface) enable local AI coding on capable hardware without cloud dependencies or data leaving the organization.

## Hardware Reality

**Most widely deployed:** Non-AI devices with iGPU (non-AI optimized) and 16GB RAM. This is the current baseline. These systems need to run other software too—not just the AI model—so 9B models are the recommended maximum to avoid resource contention.

**Most recent (target profile):** Windows AI systems with NPU/AI iGPU and 32GB unified RAM. This is where Qwen 3.6 35B and Gemma 4 (similar size) shine—MoE architecture, lower quantization options available, MTP optimizations. Best performance on Ryzen AI or Intel Lunar Lake hardware.

**Less common:** macOS with relatively modern hardware, some instances with AI-optimized recent Apple silicon. Not the primary focus but worth acknowledging.

**Backend note:** Vulkan works well as the automatic default on Windows (Ryzen AI, Lunar Lake). It just works; don't make it a big deal or obsess over implementation details.

**Documentation strategy:** Focus on the 32GB / 35B model path as the main thread, with sidebar notes for 16GB / 9B alternatives. Keep the primary flow clean and optimized for the target hardware while acknowledging that most readers currently have 16GB systems. Sidebars let both audiences find what they need without clutter.

## Conservative Safe Defaults

- **Context window:** 32768 tokens
- **Concurrency:** 1  
- **Single-active-model:** Unload/load sequence required for 32GB stability (genuine RAM physics, not ceremony)

These are tested, known-to-work settings for 32GB systems running other software concurrently. Not placeholders, not theoretical maximums—real recommendations that provide stable operation. They're conservative (you might push higher on a dedicated system) but they work reliably in typical multi-application environments.

## Documentation Structure

### Core Documents (How They Connect)

**`README.md`** — The welcoming front door. Shows what's possible, gives the big picture, points to next steps. Visual, energizing, professional. This is where someone decides whether to invest their time. Links clearly to QUICKSTART for "I want to try this" and to NOTES for "I want to understand this."

**`QUICKSTART.md`** — Pure CLI recipe, copy-paste friendly. Zero to running model in minimal steps. This is the fast path: if you just want it working, start here. Command-line driven; query authoritative docs for LM Studio and opencode specifics. Only include GUI steps if essential settings have no CLI option. References SETUP when deeper understanding is needed.

**`SETUP.md`** — LM Studio daemon setup and model configuration details. QUICKSTART tells you what to run; SETUP explains how the pieces work and what to do when you need to customize or troubleshoot. How to start/stop the daemon, configure context/concurrency, integrate with opencode. Real commands, real paths, no invented config keys. This is where someone goes after QUICKSTART succeeds and they want to understand their system better.

**`CONFIG.md`** — The `opencode.json` reference with real model names (exact Qwen 3.6 35B quantization string, exact Gemma 4B identifier—no placeholders). Explains what each setting does, includes the unload/load sequence for single-model stability. Practical reference for customization and tuning.

**`NOTES.md`** — Design rationale, assumptions, what we deliberately didn't include. For curious readers and future maintainers. Hardware recommendations (Ryzen AI, Lunar Lake), model choices (why MoE, quants, MTP matter), verification evidence, realistic troubleshooting. This is where the "why" lives for people who want deeper understanding.

### Sample Use Case Documents

To complete the "getting started" experience, include practical walkthroughs that demonstrate immediate value:

1. **Generate a PowerShell script** for a specific IT task (user provisioning, system configuration, batch operations). Show the actual workflow: describe the task, ask the AI, refine the output, use the result. Make it real and specific.

2. **Troubleshoot a Windows error message** using local AI. Walk through taking an error message from Event Viewer or a failed process, asking the local model for diagnostic help, and understanding the response. Show why local AI beats web searching or sending logs externally.

Both simple enough to follow without prerequisites, concrete enough to show "oh, THIS is why I spent time setting this up." These are the victory moments that convert setup effort into daily utility.

## What We're NOT Doing

**Ollama:** Deferred to future iteration. Be honest about scope rather than half-documenting or pretending equivalence.

**Multi-model workflows:** Focused is better than comprehensive-but-unreliable. Single-model-at-a-time on 32GB is the tested path.

**Elaborate backend explanations:** Vulkan is the automatic default on modern AMD/Intel hardware. Don't make it dramatic. If someone needs backend troubleshooting, that's a driver issue—point them to manufacturer docs, not implementation details we don't own.

**Sample hardware specifics:** Previous editor contaminated the docs with weird details about their test rig. Avoid that. Focus on what matters: RAM requirements, CPU/GPU capabilities, not specific OEM branding or serial numbers.

## Tone and Voice Guidelines

**Respect their expertise:** These are professionals with deep knowledge in other domains. Acknowledge they're smart people learning a new area, not beginners who need hand-holding.

**Explain the "why":** They want to understand, not just follow commands blindly. One-sentence explanations of why each setting matters (prevents crashes, improves stability, etc.) build confidence and understanding.

**Be animated:** Energetic, engaging, alive. Not flat, not robotic, not "naturally-sounding" AI generation. Write like someone who's genuinely excited to share something that works.

**Stay grounded:** Specific model names, real commands, tested configurations. No generic placeholders, no speculation, no "this should work" hand-waving. If you don't know, query the authoritative docs or state clearly what needs verification.

**CLI-first:** Terminal commands are reproducible, scriptable, clear. GUI screenshots go stale. Trust the reader to copy-paste and adapt.

## The Reader's Journey (Write for Different Moments)

**Initial skepticism:** Someone arrives curious but maybe skeptical. "Can this actually work on my hardware?" They scan README to see if this is legitimate, professional, worth their time. Visual design and confident tone matter here—this is the credibility gate.

**Eager to try:** They jump into QUICKSTART because they want to see results before investing more time. They're in "show me" mode. Copy-paste commands, immediate feedback, clear success indicators. Speed and clarity win here.

**Building understanding:** If it works, they're energized and want to understand what just happened. That's when they read SETUP and CONFIG to grasp the system and customize it. They're in "teach me" mode now. Explanations of "why" build competence and confidence.

**Long-term reference:** Months later, when troubleshooting edge cases or adapting to new requirements, they return to NOTES for deeper "why" and design rationale. They're experienced users now, looking for authoritative reasoning rather than hand-holding.

Write for each of these moments and mental states. Different needs, different tones, different levels of detail—all in service of the same reader at different points in their journey.

## Previous Editor's Failures (Avoid These)

The last version was:
- Naturally-sounding but robotic (AI-generated feel)
- Distracted on objectives (lost focus on what matters)
- Weirdly specific (sample hardware details, Vulkan obsession)
- Not detailed when needed (vague about actual commands and configurations)

This version must be different: focused on objectives, specific where it matters (real commands, real model names), not specific where it doesn't (implementation details we don't own), and detailed where needed (the actual setup steps).

## What "Meaningful Contrary to Fluffy" Means

Every sentence should earn its place. No padding, no AI-sounding elaboration, no "as you can see" or "it should be noted" filler. Direct, purposeful, grounded in reality.

If it's not helping the reader accomplish the task or understand why it matters, cut it.

## Success Criteria

When you're done, read what you wrote:

- Does it sound like helping a competent professional learn something new, or like defending yourself from an auditor?
- Can someone copy-paste every command and config and have it work, or are there placeholders?
- Does it respect the reader's intelligence while still explaining the "why"?
- Is it animated and engaging, or flat and robotic?
- Is it graphically beautiful with clear hierarchy?
- Is every detail grounded in tested reality, not speculation?

If yes to the first half of each question, you've succeeded.

## For Whoever Implements This

You might be future-me, or someone new. Either way:

**This isn't scripture.** If you discover better models, cleaner commands, or realize something's obsolete—change it. Update this plan. That's how it improves.

**Honesty over polish.** Straight talk about what works, what's untested, where uncertainty exists. "This might work but we haven't verified it" beats hand-waving.

**The reader's on your side.** They chose to try something ambitious. Your job: get them to victory cleanly, not gatekeep or prove complexity.

**Copy-paste must work.** Real values only. Placeholders are where understanding dies. If you don't know the exact value, say so clearly and describe how to find it—but never ship `<placeholder>` in final docs.

**Query the authoritative sources.** For LM Studio specifics, check LM Studio docs. For opencode, check opencode docs. Don't invent, assume, or speculate. We document the integration recipe, not the implementation internals of tools we don't maintain.

Good luck. You've got this.
