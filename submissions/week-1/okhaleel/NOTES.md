# Week 1 Notes — [OKHALEEL]

## Hardware
- **Device type:** (UNICEF standard laptop - Gen5 Intel(R) Core(TM) Ultra 7 155U (1.70 GHz))
- **RAM:** 32GB
- **GPU / AI acceleration:** Standard/built-in GPU
- **OS:** Windows 11 24H2

## Setup
- **Inference engine used:** LM Studio
- **Model used:** qwen3.6-35b-a3b
- **Time to get running (approx):** 29m

## Experience
- **What worked well:** The setup and the generation of a working/runnable single HTML file from the first attempt.
- **What was harder than expected:** Addressing perforamce issues 
- **Did you hit any blockers? How did you resolve them:** I noticed some commands/syntax needed correction, so I updated them. I also tried different setups to explore the impact on performance. LMS with Qwen-35b 29m and the file worked fine 4.8 t/s, Qwen-9b 27m (but the game did not run), Gemma-4-12B-QAT 58m 2.7 t/s game ran but not functioning correctly.
I also tried some CPU/GPU tweakings such as numbre of GPU offload layers, set processor affinity but did not noticed much difference.
Researched why the NPU was not utilized.. the understanding I got was that tools such as LMS, llama.cpp, Ollama have no NPU support, they only use CPU/GPU. NPU works with specific models such as OpenVINO, ONNX Runtime, and Intel NPU SDK. It activates only for specific AI workloads, not general use. Also that NPU advantage is efficiency (battery/heat) not performance, so it is NOT faster than GPU for LLMs.

## Observations for the Assessment
- **Would you recommend this setup to a colleague on the same hardware? Why / why not:** yes, but higher specs would be better
- **Any use cases this hardware/model combo seems well-suited for:** Basic apps, generating scripts
- **Any use cases it clearly won't handle:** Large development, Advanced Apps