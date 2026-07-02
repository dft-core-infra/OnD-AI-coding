# Optimizing Llama.CPP

In this guide, you will explore ways to optimize llama.cpp to squeeze out the maximum capability and achieve better performance.

`Llama.cpp` is software that is updated daily, constantly incorporating a multitude of features to deliver better performance and achieve the greatest possible flexibility when loading local models on your system. In the following guide, we will analyze and explain the different parameters so that you can find the best configuration for your setup.

If you have already installed `llama.cpp` and have it running, the next step is to optimize it to ensure it takes full advantage of your hardware and responds as quickly as possible. If you haven't done so yet, head over to the llama.cpp installation article before continuing.

## 1. `llama.cpp` Parameters

My favorite is the `Qwen 3.6 35B MoE` (Mixture of Experts) model. I downloaded it quantized to `IQ2_XXS` in `GGUF` format, so it occupies about `10GB`. This is perfect for a `16GB` graphics card, leaving a `6GB` margin for other resources like context:

```bash
llama-server -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf
```

From this point forward, we will add new options line by line, which you will need to modify according to your hardware or scenario. At the same time, we will use the `llama-bench` command with these exact parameters to run benchmarks. This helps determine whether we are improving or worsening performance:

```bash
llama-bench -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf

| model                     |      size | back |  test |             t/s |
|---------------------------| --------: | ---- | ----: | --------------: |
| qwen35moe 35B.A3B IQ2_XXS | 10.01 GiB | CUDA | pp512 | 2436.40 ± 27.86 |
| qwen35moe 35B.A3B IQ2_XXS | 10.01 GiB | CUDA | tg128 |   116.87 ± 3.31 |
```

You will see something similar to this. The most important columns are the last two:

- `pp512` prefill: This is the processing of input tokens (speed when understanding your prompt).
- `tg128` decode: This is the processing of output tokens (speed when responding).

The **prefill** phase is always very fast, while the decode phase is slower (and usually the most heavily scrutinized). In this test, notice that it gives us `116 tokens/sec`. We can use this as a reference while testing other models to see which ones yield better speeds, and then evaluate the quality of their answers.

Another way to test model speed is to execute `llama-server` and open the server at http://localhost:8080 to run real test prompts. When it responds, the `tokens/second` metrics will appear right underneath.

## 2. Main Options

| Long | Short | Description | Default |
| --- | --- | --- | --- |
| `--n-gpu-layers` | `-ngl` | Layers loaded into the GPU. `-1` uses the maximum possible. | `-1` |
| `--fit-target` | `-fitt` | Opposite of the above. Instructs to use the maximum capacity except for the specified MB. | `-` |
| `--fit-ctx` | `-fitc` | Complements the above. Additionally, reserves a specific size in KB for context. | `-` |
| `--fit` | `-fit` | With `-fit` on, it automatically adjusts the previous parameters. | `on` |
| `--flash-attn` | `-fa` | Activates Flash Attention to reduce VRAM usage on modern GPUs. | `on` |
| `--no-warmup` | - | Avoids the initial model warmup phase. | `-` |
| `--mlock` | - | Never offloads the model to disk; keeps it locked in RAM. | `-` |
| `--mmap` / `--no-mmap` | - | Decides whether to load the model entirely into RAM or not. | `--mmap` |

- **`--n-gpu-layers` or `-ngl`**: This is one of the most important parameters. It specifies how many layers are offloaded to the GPU. By default, it is set to `-1`, which tries to utilize the GPU fully. If you have a smaller graphics card, you can specify a precise number of layers, such as `-ngl 40`, to manage the layer count and force the rest to process on the CPU (slower).
- **`--fit-target` or `-fitt`**: An alternative to the above. Instead of indicating the exact layers to use, you instruct it to use the maximum possible while keeping a specified amount of MB free and reserved.
- **`--fit-ctx` or `-fitc`**: A complement to the above used to reserve space for context. For example: `-fitc 16384` reserves 16K specifically for the context.
- **`--flash-attn` or `-fa`**: Aims to reduce VRAM usage and improve speed when using long contexts. If you have a modern GPU, it should support this and noticeably boost performance.
- **`--no-warmup`**: By default, `llama.cpp` performs a preliminary test run to "warm up" the model. Disabling this is not recommended, but doing so can reduce the initial wait time if you don't mind potentially worse initial performance results.
- **`--mlock`**: Forces the operating system to lock the model in physical RAM instead of swapping or compressing it to disk.
- **`--mmap` or `--no-mmap`**: With `--mmap` (default), the model isn't loaded 100% into RAM instantly; instead, it maps files and loads parts only as they are used. With `--no-mmap`, it loads entirely into RAM before moving to the GPU.

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf \
  --fit-target 512 \
  --fit-ctx 131072 \
  --fit off \
  --flash-attn on \
  --mlock --mmap
```

In this setup, we have activated Flash Attention, reserved 128K for context, and kept a 512MB buffer free on the GPU. Additionally, we adjusted the CPU behavior so it closely monitors when the GPU is idle to feed it the next batch of data immediately.

## 3. Context

The context is where the conversational history with our agents is stored. Having adequate space for this information is crucial; otherwise, the model will not respond accurately. The parameters of interest are:

| Long | Short | Description | Default |
| --- | --- | --- | --- |
| `--ctx-size` | `-c` | Indicates the context size in bytes. | `0` (model max) |
| `--cache-type-k` | `-ctk` | Indicates the quantization type for context keys (K-cache). | `f16` |
| `--cache-type-v` | `-ctv` | Indicates the quantization type for context values (V-cache). | `f16` |
| `--cache-reuse` | - | Reuses tokens if text fragments are repeated. Disabled by default. | `0` |

With `--ctx-size`, we set a custom size for the context window. Every model has a maximum native context size. For example, Qwen 3.6 35B supports a maximum of 256KB. If you don't supply a value, it attempts to use the maximum possible. Furthermore, with `-ctk` and `-ctv`, you can apply quantization to the context cache to save even more VRAM:

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf \
  --fit-target 512 --fit-ctx 131072 --fit off \
  --flash-attn on --mlock --mmap \
  --ctx-size 131072 -ctk q4_0 -ctv q4_0 --cache-reuse 256
```

## 4. Processing

Another fundamental element of `llama.cpp` is how tokens and information are processed and distributed. You can fine-tune its execution pipeline using these parameters:

| Long | Short | Description | Default |
| --- | --- | --- | --- |
| `--cont-batching` | `-cb` | Optimizes and groups data together whenever possible. | `-cb` |
| `--parallel` | `-np` | Sets the number of slots for parallel tasks. | `auto` |
| `--batch-size` | `-b` | Maximum number of tokens to process during the prefill phase. | `2048` |
| `--ubatch-size` | `-ub` | Splits the batch size into smaller chunks to make GPU processing easier. | `512` |
| `--poll` | - | With 100, it constantly checks if the GPU finished to immediately send more data. | `50` |

- **`-np`**: If you have enough VRAM available, you can increase this to `2` or more to alternate between parallel request slots. However, keep in mind that each slot maintains its own separate cache, causing VRAM consumption to surge. The `-cb` parameter is highly beneficial when `-np` values are greater than `1` (though it remains advantageous to keep active regardless).
- **`-b` and `-ub`**: Dictate the chunk sizes handled by `llama.cpp` during data digestion.
- **`--poll`**: Setting this to `100` makes the CPU poll constantly to check if the GPU has finished its current tasks. This sends the next queue of data instantly and optimizes execution timelines. Lower values reduce polling frequency, saving CPU processing overhead but potentially delaying response times slightly.

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf \
  --fit-target 512 --fit-ctx 131072 --fit off \
  --flash-attn on --mlock --mmap \
  --ctx-size 131072 -ctk q4_0 -ctv q4_0 --cache-reuse 256 \
  -b 4096 -ub 1024 --poll 100
```

## 5. Reasoning

Some LLM models incorporate Thinking or Reasoning behaviors. Before generating a final reply, they trigger a reasoning loop where they evaluate logic paths. The relevant parameters for this feature include:

| Long | Short | Description | Default |
| --- | --- | --- | --- |
| `--reasoning` | `-rea` | Enables (`on`) or disables (`off`) reasoning capabilities. | `auto` |
| `--reasoning-budget` | - | Restricts the maximum number of reasoning tokens. `-1` means unlimited. | `-1` |

Reasoning is active by default because it generally improves the precision of responses and surfaces relevant data prematurely. Even so, it can be shut down using `-rea off`. The most critical variable here is `--reasoning-budget`, which limits reasoning to a strict token threshold.

For instance, `--reasoning-budget 1024` caps the model at `1024` tokens for thinking (it can finish early, but cannot exceed this limit). If it hits the ceiling, the internal thought processes are cut short, and the model outputs its final answer using whatever logic it formulated up to that exact moment. Values under `512` generate swift replies, `512-1024` provide balanced performance, around `4096` offer deep analytical reasoning, and `-1` grants unlimited thinking freedom where the model decides when to stop.

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf \
  --fit-target 512 --fit-ctx 131072 --fit off \
  --flash-attn on --mlock --mmap \
  --ctx-size 131072 -ctk q4_0 -ctv q4_0 --cache-reuse 256 \
  -b 4096 -ub 1024 --poll 100 \
  --reasoning-budget 2048
```

## 6. Temperature

Model hyperparameters allow you to customize the output characteristics produced by an LLM. The most famous configuration is temperature: low values force the model to deliver deterministic and conservative answers (consistently identical or highly similar), whereas high values encourage creative, random, and diverse output generation.

The most notable of these sampling parameters are:

| Long | Description | Default | Disabled | Coding | Reasoning |
| --- | --- | --- | --- | --- | --- |
| `--temp` | Temperature: Randomness. Lower = more deterministic. | `0.80` | `0` | `-` | `0.61` |
| `--top-k` | Keeps only the top K most probable tokens (removes highly improbable tokens). | `40` | `0` | `20` | `20` |
| `--top-p` | Accumulates tokens up to a cumulative probability threshold (e.g., top 95%). | `0.95` | `1` | `0.95` | `0.95` |
| `--min-p` | Minimum probability threshold relative to the leading token. Third filter. | `0.05` | `0` | `0` | `0` |
| `--repeat-penalty` | Penalizes tokens that have already appeared recently. | `1` | `1` | `1` | `1` |
| `--presence-penalty` | Similar to repeat penalty, but directly OpenAI API-compatible. | `0` | `0` | `0` | `1.5` |
| `--frequency-penalty` | Penalizes tokens more aggressively the more frequently they appear. | `0` | `0` | `0` | `0` |

Model repositories on platforms like Hugging Face typically outline specific best practice recommendations to alter these parameters depending on your specific goal: general tasks, programming, deep reasoning, etc.

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS.gguf \
  --fit-target 512 --fit-ctx 131072 --fit off \
  --flash-attn on --mlock --mmap \
  --ctx-size 131072 -ctk q4_0 -ctv q4_0 --cache-reuse 256 \
  -b 4096 -ub 1024 --poll 100 \
  --reasoning-budget 2048 \
  --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0
```

## 7. Speculative Decoding

This technique speeds up text generation without degrading output quality. It relies on utilizing a small, fast draft model to propose several tokens at once. Then, the large primary model verifies these tokens in parallel in a single forward pass. If the draft successfully guesses the predictions, text generation speeds up significantly.

The first options do not require a separate external draft model file:

| Long | Requires draft | Description |
| --- | --- | --- |
| `--spec-type none` | ❌ | Disables speculative decoding (default behavior). |
| `--spec-type ngram-simple` | ❌ | Searches for repeated text sequences in the context window and proposes them. |
| `--spec-type ngram-map-k` | ❌ | Same as above, but optimized with a hash table lookup. |
| `--spec-type ngram-map-k4v` | ❌ | Same as above, but specifically optimized for very long context lengths. |
| `--spec-type ngram-mod` | ❌ | An N-gram approach with variable lookup length. More precise. |
| `--spec-type ngram-cache` | ❌ | Uses an external cache file filled with precalculated N-grams. |
| `--spec-type draft-simple` | ✅ | The draft model proposes tokens, and the large model verifies them concurrently. |
| `--spec-type draft-eagle3` | ✅ | A speculative decoding variant utilizing the EAGLE3 architecture. More efficient. |
| `--spec-type draft-mtp` | MTP | Multi-Token Prediction. Automatically predicts multiple future tokens. |
| `--spec-draft-n-min` | - | Minimum number of draft tokens. Set to 8 for `ngram-*`. Set to 2 for `MTP`. |
| `--spec-draft-n-max` | - | Maximum number of draft tokens. Set to 16 for `ngram-*`. Set to 3 for `MTP`. |

The last 3 options require a small helper draft architecture. Crucially, MTP includes the draft mechanism directly embedded within the primary model file itself, making the performance cost of drafting practically non-existent.

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS-MTP.gguf \
  --fit-target 512 --fit-ctx 131072 --fit off \
  --flash-attn on --mlock --mmap \
  --ctx-size 131072 -ctk q4_0 -ctv q4_0 --cache-reuse 256 \
  -b 4096 -ub 1024 --poll 100 \
  --reasoning-budget 2048 \
  --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 \
  --spec-type draft-mtp --spec-draft-n-min 1 --spec-draft-n-max 3
```

Speculative decoding is most noticeable in dense models, though it still provides subtle improvements in MoE architectures.

## 8. Others

A few other practical network configuration parameters include:

| Long | Description | Default |
| --- | --- | --- |
| `--port` | The network port where the local server listens. | `8080` |
| `--host` | The IP address where the server binds. | `127.0.0.1` |

If port `8080` is already bound by another application on your computer, you can modify it using `--port`. Furthermore, remember that if you are hosting `llama.cpp` as a server and wish to call it from another device on the same local network, you must expose it by binding to IP `0.0.0.0` via `--host`:

```bash
llama-server \
  -m Qwen3.6-35B-A3B-UD-IQ2_XXS-MTP.gguf \
  --fit-target 512 --fit-ctx 131072 --fit off \
  --flash-attn on --mlock --mmap \
  --ctx-size 131072 -ctk q4_0 -ctv q4_0 --cache-reuse 256 \
  -b 4096 -ub 1024 --poll 100 \
  --reasoning-budget 2048 \
  --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 \
  --spec-type draft-mtp --spec-draft-n-min 1 --spec-draft-n-max 3 \
  --port 8999 --host 0.0.0.0
```