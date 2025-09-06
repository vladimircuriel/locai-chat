import type { Model } from '@lib/models/model.model'

const MODELS: Model[] = [
  // Llama family (Meta)
  {
    id: 'Llama-3-8B-Instruct',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'meta',
  },
  {
    id: 'Llama-3.1-70B-Instruct',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'meta',
  },
  {
    id: 'Llama-3.1-8B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'meta',
  },
  {
    id: 'Llama-3.1-8B-Instruct',
    quantization: ['q0f16', 'q3f16_0', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'meta',
  },
  {
    id: 'Llama-3.2-1B-Instruct',
    quantization: ['q0f16', 'q0f32', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'meta',
  },
  {
    id: 'Llama-3.2-3B-Instruct',
    quantization: ['q0f16', 'q0f32', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'meta',
  },

  // Hermes family
  {
    id: 'Hermes-2-Pro-Llama-3-8B',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'mistral',
  },
  {
    id: 'Hermes-2-Theta-Llama-3-70B',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'mistral',
  },
  {
    id: 'Hermes-2-Theta-Llama-3-8B',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'mistral',
  },
  {
    id: 'Hermes-3-Llama-3.1-8B',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'mistral',
  },
  {
    id: 'Hermes-3-Llama-3.2-3B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'mistral',
  },

  // Phi family (Microsoft)
  {
    id: 'Phi-3-mini-128k-instruct',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'microsoft',
  },
  {
    id: 'Phi-3.5-mini-instruct',
    quantization: ['q0f16', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'microsoft',
  },
  {
    id: 'Phi-3.5-vision-instruct',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'microsoft',
  },
  {
    id: 'Phi-4-mini-instruct',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'microsoft',
  },

  // Mistral family
  {
    id: 'Mistral-7B-Instruct-v0.3',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'mistral',
  },

  // Qwen family
  {
    id: 'Qwen1.5-0.5B-Chat',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'qwen',
  },
  {
    id: 'Qwen1.5-1.8B-Chat',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'qwen',
  },
  {
    id: 'Qwen2-0.5B-Instruct',
    quantization: ['q0f16', 'q0f32', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'qwen',
  },
  {
    id: 'Qwen2-1.5B-Instruct',
    quantization: ['q0f16', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'qwen',
  },
  {
    id: 'Qwen2-72B-Instruct',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'qwen',
  },
  {
    id: 'Qwen2-7B-Instruct',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'qwen',
  },

  // DeepSeek family (DeepSeek)
  {
    id: 'DeepSeek-R1-Distill-Llama-70B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },
  {
    id: 'DeepSeek-R1-Distill-Llama-8B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },
  {
    id: 'DeepSeek-R1-Distill-Qwen-1.5B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },
  {
    id: 'DeepSeek-R1-Distill-Qwen-14B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },
  {
    id: 'DeepSeek-R1-Distill-Qwen-32B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },
  {
    id: 'DeepSeek-R1-Distill-Qwen-7B',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },
  {
    id: 'DeepSeek-V2-Lite-Chat',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'deepseek',
  },

  // Gemma family (Google)
  {
    id: 'gemma-2-27b-it',
    quantization: ['q0f16', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-2-2b-it',
    quantization: ['q0f16', 'q0f32', 'q4f16_0', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-2-2b-jpn-it',
    quantization: ['q0f16', 'q0f32', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-2-9b-it',
    quantization: ['q0f16', 'q3f16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-3-12b-it',
    quantization: ['q0bf16', 'q0f16', 'q0f32', 'q4bf16_0', 'q4bf16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-3-1b-it',
    quantization: ['q0bf16', 'q0f16', 'q0f32', 'q4bf16_0', 'q4bf16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-3-27b-it',
    quantization: ['q0bf16', 'q0f16', 'q0f32', 'q4bf16_0', 'q4bf16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
  {
    id: 'gemma-3-4b-it',
    quantization: ['q0bf16', 'q0f16', 'q0f32', 'q4bf16_0', 'q4bf16_1', 'q4f16_1', 'q4f32_1'],
    origin: 'HuggingFace',
    owner: 'google',
  },
]

export default MODELS
