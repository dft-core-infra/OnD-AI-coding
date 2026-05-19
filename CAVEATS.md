# CAVEATS: Reality Check

The cloud AI coding market is shifting. Provider restrictions tighten, rate limits shrink, costs climb. Coding use cases hit these walls first—the bubble may be about to burst. Local AI looks increasingly attractive: your data stays private, no per-request costs, no arbitrary caps, full control over your tools.

All true. And worth pursuing for many professionals.

But local AI for coding isn't a drop-in replacement for cloud models. It's a different capability tier with different economics. Hardware isn't free, quantization trades quality for fit, and smaller models have real knowledge gaps. If you're investing in AI-capable hardware and learning this stack, you deserve an honest assessment of what you're getting.

This document provides that assessment. Not to discourage—local AI coding delivers genuine value—but to tune expectations so you make informed decisions.

---

<div align="center">
<img src="assets/CORY Socratic 2.png" alt="Honest dialogue about expectations" width="200"/>
</div>

## Use Cases: What Works Well, What Struggles

**Neutral Assessment:**

Local models excel at well-defined, bounded coding tasks: generating scripts from clear specifications, explaining code patterns, refactoring within visible context, documenting systems you can describe completely. Tasks where the answer is deterministic or the pattern is well-established in training data.

They struggle with: complex multi-file reasoning across large codebases, generating correct usage of obscure or recently-released APIs, maintaining coherent context across long iterative sessions, nuanced architectural decisions requiring deep domain knowledge. Tasks that benefit from massive training data recency or sophisticated reasoning chains.

**Privacy/Benefits Perspective:**

The tasks that work well locally are exactly the high-volume, repetitive work where cloud API costs and rate limits hurt most. Generate dozens of similar scripts, explain unfamiliar code repeatedly, document systems methodically—these are the daily coding tasks that justify the local setup. You're not sending proprietary code snippets to external servers, and you can run unlimited requests at 2 AM without worrying about quota.

For the complex cases where local models struggle, you still have the option to selectively use cloud APIs—but you're choosing when to share code externally rather than having every request go to the cloud by default.

**Cautionary Perspective:**

If your primary use case is cutting-edge framework assistance, complex distributed system design, or tasks requiring deep reasoning about novel problem domains, local models will frustrate you. The capability gap is real. Budget for supplementing with cloud access for critical tasks, or accept that some work will take longer and require more iteration than it would with GPT-4 or Claude Opus.

> **Common Misconception:** "Local models are nearly as capable as cloud models for coding."
> 
> **Reality:** Quantized local models running on consumer hardware are 1-2 generations behind frontier cloud models in raw capability. They're competent, not cutting-edge. Manage expectations accordingly.

---

## Quantization: The Quality/Fit Tradeoff

<img src="assets/AI Cory - Concerned.png" alt="Quality tradeoff warning" width="180" align="right"/>

**Neutral Assessment:**

Our recommended configuration uses q4_k_m quantization to fit a 35B parameter model into 32GB RAM. This is a deliberate quality tradeoff. **Quantization below Q6 is yellow warning territory for coding work specifically**—while it may perform well for general text tasks, coding demands precision in structured outputs (correct syntax, valid API calls, proper tool use).

Q4_k_m degrades inference quality compared to higher quantization levels or full-precision models. You'll see this in occasionally malformed JSON, less reliable tool calling, subtle errors in generated code that require more review. The model has the knowledge but the quantized weights introduce noise in retrieval and reasoning.

Q6 quantization would preserve more quality but won't fit a 35B model in 32GB RAM. You'd need to drop to a 9B model (less intrinsic knowledge) or invest in 64GB+ RAM systems.

**Privacy/Benefits Perspective:**

Q4_k_m is the pragmatic choice for 32GB systems wanting the knowledge breadth of a 35B model. Yes, it's yellow zone for coding quality, but it's *your* yellow-zone model running locally with zero external data exposure and no usage costs. For script generation, code explanation, and documentation tasks, the quality hit is manageable and often worth the privacy/control tradeoff.

You can also test higher quantizations if you have the RAM, or use smaller models at Q6 for quality-critical tasks while keeping the 35B model for knowledge-breadth work.

**Cautionary Perspective:**

Understand that this configuration makes a quality compromise to fit hardware constraints. If coding quality is mission-critical—if errors in generated code create significant debugging overhead or if you're generating production code with high reliability requirements—q4_k_m may cost you more time in review and correction than it saves in generation.

Consider whether 32GB systems are the right target, or whether investing in 64GB+ to run Q6 quantization makes more economic sense for your use case. The hardware cost is upfront and one-time; the quality-hit tax compounds over every use.

> **Common Misconception:** "Quantization is just a space-saving optimization with minimal impact."
> 
> **Reality:** Quantization is a quality/capability tradeoff. Lower quantization = smaller models that fit in less RAM but with degraded reasoning, especially for structured outputs like code. It's not free compression.

---

<div align="center">
<img src="assets/cora_coffe_1.png" alt="Take a moment to absorb the technical details" width="180"/>

*Heavy technical section ahead - take your time*
</div>

## Memory: The Real Bottleneck

<img src="assets/cory-dna-strand-flying.png" alt="Technical deep-dive" width="200" align="right"/>

**Neutral Assessment:**

**Installed RAM is the fundamental constraint** for local AI, not GPU/NPU compute capability. A 35B model at q4_k_m consumes ~18-20GB of system memory when loaded. Your OS, browser, IDE, and other tools need the remaining headroom. Going beyond your RAM capacity triggers system paging—disk swapping—which makes inference unusably slow.

Even within RAM limits, **memory bandwidth is the limiting factor for inference speed**, not compute throughput. The model weights must be streamed from RAM through the memory bus to the processor for each token generated. Faster compute (better GPU/NPU) can't overcome slow memory bus speeds. This is why AI-optimized hardware focuses on unified memory architectures and high-bandwidth RAM, not just adding more AI accelerators.

**Architectural mitigations exist but have costs:**
- **MoE (Mixture of Experts)** reduces active parameter count per token, easing compute and bandwidth pressure, but the full model still occupies RAM
- **MTP (Multi-Token Prediction) and Speculative Decoding** improve throughput by predicting multiple tokens per inference pass, but increase memory working set requirements
- **Quantization** reduces memory footprint but degrades quality (see previous section)

There's no free lunch. Every optimization trades one constraint for another.

**Privacy/Benefits Perspective:**

Once you've invested in adequate RAM (32GB for our recommended setup, 64GB+ for higher quality), the memory constraint is fixed and predictable. You know exactly what you can run. Cloud models don't expose these constraints—you just hit arbitrary rate limits or pay surge pricing during high-demand periods. Local models give you consistent, deterministic performance within your hardware envelope.

Memory bandwidth limitations also benefit from hardware you control. Upgrading to faster RAM (DDR5, higher MHz) or systems with better memory architecture (unified memory, higher bandwidth) improves your local inference performance. You can't upgrade cloud provider infrastructure.

**Cautionary Perspective:**

If you're working with RAM constraints (16GB systems, heavily multitasking environments), you'll spend significant time managing model loading/unloading, choosing smaller models than you'd prefer, or closing applications to free memory. The cognitive overhead of memory management becomes a tax on your workflow.

32GB is the realistic minimum for comfortable local AI coding work with capable models. 16GB systems force you into 9B models with noticeably less knowledge breadth, or constant tradeoffs between AI and other tools. Budget for adequate RAM or accept these limitations.

---

## Hardware Investment: Upfront Costs vs. Cloud Subscriptions

<img src="assets/CORY PC Cat.png" alt="Infrastructure investment reality" width="200" align="right"/>

**Neutral Assessment:**

AI-optimized hardware carries a premium over general-purpose systems:
- **Consumer laptops:** AI-capable systems (Ryzen AI, Intel Lunar Lake with 32GB RAM) cost $200-500 more than equivalent non-AI hardware
- **Workstations:** AI-optimized configurations with 64GB+ RAM and proper cooling add $500-1500 to baseline costs
- **Edge AI hardware:** Purpose-built inference devices vary widely, from $200 hobbyist boards to $2000+ professional edge servers

Compare this to cloud API costs:
- Heavy coding usage (dozens of requests daily) can run $50-200/month on cloud APIs, especially as providers tighten free tiers and raise prices
- Break-even on a $1000 hardware premium: 5-20 months of cloud subscription costs
- But hardware also needs periodic replacement (3-5 year refresh cycles)

The economics depend heavily on your usage intensity and how long you keep hardware.

**Privacy/Benefits Perspective:**

Hardware investment is upfront and visible, but then you own the capability. No usage metering, no surprise bills, no service degradation when providers change terms. You can run unlimited requests, experiment freely, use AI tools as much as needed without optimizing for cost per request.

For teams or professionals with sustained high-volume coding AI usage, the hardware investment pays off quickly. For organizations with data sensitivity requirements, the privacy benefit alone may justify costs regardless of break-even math.

You're also investing in general-purpose computing power—the RAM and processing capability benefit all your work, not just AI. A 32GB AI-capable laptop is a better development machine overall than a 16GB non-AI system.

**Cautionary Perspective:**

If you're a casual user (occasional script generation, infrequent coding assistance), spending $1000+ on AI hardware may never break even against cloud API costs. Cloud's pay-per-use model is economically efficient for light usage—you only pay for what you consume.

Hardware also depreciates and requires replacement. Cloud costs are ongoing, but so is hardware refresh. If you keep a laptop for 3 years and then replace it, factor the AI hardware premium into total cost of ownership across that period.

Be honest about your usage patterns before committing to hardware investment. Light users are better served by cloud APIs with local for privacy-sensitive work only. Heavy users benefit from local-first with cloud supplement for complex tasks.

---

## Performance: Speed and Responsiveness

<img src="assets/cory-007.png" alt="Performance precision" width="160" align="right"/>

**Neutral Assessment:**

Local inference speed depends on your hardware, model size, and quantization level. On AI-optimized hardware (Ryzen AI, Intel Lunar Lake) with hardware acceleration, expect:
- **First token latency:** 1-3 seconds for a 35B model (time to start generating a response)
- **Throughput:** 10-30 tokens/second depending on model, quantization, and hardware

Cloud models typically respond faster (sub-second first token, higher throughput) due to datacenter-class hardware and optimized serving infrastructure. The difference is most noticeable on long generations—a 500-token response takes 15-50 seconds locally vs. 5-15 seconds on cloud.

Context processing (ingesting your code before generating) also takes time locally. Large contexts (multiple files, long sessions) add latency before generation begins.

**Privacy/Benefits Perspective:**

Local inference happens on your machine—no network latency, no request queuing behind other users, no variable cloud responsiveness. Once the model is loaded, performance is consistent and predictable. You're never waiting for a busy API endpoint or dealing with degraded service during peak hours.

For iterative workflows where you're making many small requests (explain this function, refactor that block), the lack of network round-trip overhead can make local feel more responsive despite lower raw throughput. You're also not paying attention to rate limits or trying to batch requests to optimize API costs.

**Cautionary Perspective:**

If you're accustomed to cloud model responsiveness, local inference will feel slow. Waiting 30 seconds for a code generation that would take 10 seconds on GPT-4 is noticeable. Over dozens of requests per day, those extra seconds compound into real workflow friction.

The performance gap is largest for long, complex generations. If you're generating extensive code, detailed documentation, or working with large contexts, local models will test your patience. Consider whether the privacy/cost benefits outweigh the time cost of slower inference.

---

## Capability Gaps: Knowledge and Reasoning

**Neutral Assessment:**

A 35B parameter model, even unquantized, has less knowledge breadth and reasoning capability than frontier cloud models like GPT-4 (rumored ~1.7T parameters) or Claude Opus (unknown but large). The gap shows up in:
- **Knowledge recency:** Local models trained months ago don't know about frameworks/APIs released since training cutoff
- **Specialized domains:** Less training data on niche technologies means lower-quality assistance in those areas
- **Complex reasoning:** Multi-step architectural decisions, subtle bug diagnosis, and nuanced design tradeoffs benefit from larger models' reasoning capacity

Quantization (q4_k_m) further degrades these capabilities compared to the base model's potential.

**Privacy/Benefits Perspective:**

For established technologies with stable APIs and well-documented patterns (PowerShell, Python standard library, common frameworks), local models perform well because these domains are heavily represented in training data. The knowledge gap matters less when working in mature ecosystems.

You can also supplement local models with targeted research—official docs, Stack Overflow, GitHub examples—for areas where model knowledge is weak. This is slower than asking a cloud model with better knowledge coverage, but keeps your code and context local.

**Cautionary Perspective:**

If you work extensively with cutting-edge frameworks, rapidly-evolving APIs, or niche technologies, the local model's knowledge staleness and smaller training corpus will hinder you. You'll spend more time correcting hallucinated API usage, filling knowledge gaps, and cross-referencing documentation.

For these use cases, cloud models' larger scale and more recent training make a substantial productivity difference. Budget for hybrid workflows—use local for general coding, cloud APIs for specialized/recent domain assistance—or accept slower progress on cutting-edge work.

---

## Context Windows: Working Memory Limits

**Neutral Assessment:**

Our recommended configuration uses a 32,768 token context window—the amount of text (code, conversation history, documentation) the model can "see" at once. This is conservative for 32GB RAM stability when running other applications.

32k tokens is sufficient for:
- Moderate-sized files (a few hundred lines of code)
- Focused refactoring tasks within visible scope
- Documentation of specific subsystems
- Conversations with reasonable history

It's constraining for:
- Large files or multiple files simultaneously (enterprise codebases)
- Long iterative sessions where conversation history accumulates
- System-wide architectural analysis

Cloud models increasingly offer 100k-200k+ token contexts, enabling analysis across entire small codebases or extended conversations without context management.

**Privacy/Benefits Perspective:**

32k context is workable for most daily coding tasks. You learn to scope work appropriately—refactor functions, not whole modules; document specific components, not entire architectures; work iteratively with context resets when needed.

The constraint also enforces good practice: focusing on well-scoped tasks, maintaining clear boundaries, working incrementally. This can actually improve code quality compared to sprawling multi-file changes suggested by large-context models.

**Cautionary Perspective:**

If your work regularly involves large codebases, complex refactoring across many files, or extended debugging sessions requiring full system context, the 32k limit will frustrate you. You'll spend time managing what fits in context, chunking work awkwardly, or losing conversation history mid-task.

Cloud models' larger contexts genuinely enable workflows that aren't practical locally. Understand this limitation before committing to local-only workflows.

---

## Maintenance and Updates

**Neutral Assessment:**

Local AI requires ongoing maintenance that cloud services handle transparently:
- **Model updates:** New model versions release regularly; you must manually download, test, and switch
- **Software updates:** LM Studio, opencode, and dependencies need periodic updates
- **Compatibility:** Model formats, API schemas, and tool integrations can break across updates
- **Storage management:** Models consume 10-20GB each; managing disk space and model library requires attention

Cloud APIs update transparently (for better or worse—breaking changes happen, but you don't manage the infrastructure).

**Privacy/Benefits Perspective:**

You control when and how to update. No forced API migrations, no surprise model changes mid-project, no service deprecations on provider timelines. If a model version works for your needs, you can keep using it indefinitely.

Model management also becomes a skill—you learn what works, build a curated library, optimize for your use cases. This expertise transfers across projects and environments.

**Cautionary Perspective:**

If you want "install and forget" tools, local AI isn't that. You're the sysadmin for your AI infrastructure. Model downloads take time, testing new versions is work, and compatibility issues will occur.

For professionals already comfortable with developer tools, infrastructure management, and periodic system maintenance, this is familiar overhead. For others, it's a learning curve and ongoing attention tax that cloud services avoid.

---

## Living Document Note

This assessment reflects current knowledge and tested configurations. Real-world usage will surface nuances, edge cases, and evolving best practices. Expect this document to grow as experience accumulates—both confirming these caveats and identifying where they're overstated or incomplete.

If you're using this setup, your experience matters. Honest feedback refines guidance for everyone.

---

<div align="center">

**Related reading:**

[NOTES.md](NOTES.md) for technical rationale and design decisions

[SETUP.md](SETUP.md) to understand how the pieces work together

[CONFIG.md](CONFIG.md) for optimization options within constraints

---

<img src="assets/DIGITAL_Foundations_logo.png" alt="Team One Digital Foundations" height="100" style="vertical-align: middle;"/> <img src="assets/DFT Logo - Full Fox - Orange.png" alt="Technology Core Infra" height="100" style="vertical-align: middle;"/>

</div>
