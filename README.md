<h1 align="center">
   LocAI - Local Multi-Model AI
</h1>


<p align="center"> 
  <img width="430" alt="Vector" src="https://github.com/user-attachments/assets/8fc35a35-6954-438f-b8c3-ffbe8f5fb23d" />
</p>


<div align="center">  
  <img src="https://img.shields.io/badge/Astro-000000?style=for-the-badge&logo=astro&logoColor=white" />  
  <img src="https://img.shields.io/badge/React-00D8FF?style=for-the-badge&logo=react&logoColor=white" />  
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />  
  <img src="https://img.shields.io/badge/WebGPU-5A31F4?style=for-the-badge&logo=webgpu&logoColor=white" />  
  <img src="https://img.shields.io/badge/IndexedDB-005A9C?style=for-the-badge&logo=googlechrome&logoColor=white" />  
  <img src="https://img.shields.io/badge/ServiceWorker-404040?style=for-the-badge&logo=serviceworker&logoColor=white" />  
  <img src="https://img.shields.io/badge/LocalStorage-F0DB4F?style=for-the-badge&logo=javascript&logoColor=black" />  
  <img src="https://img.shields.io/badge/WebLLM-1A1A1A?style=for-the-badge&logo=github&logoColor=white" />  
</div>

---

**LocAI** is a fully client-side AI chat application that lets you download, run, and switch between multiple large language models directly in your browser—no signup or remote server required. It caches model weights and conversation history in IndexedDB, uses a Service Worker for offline support, and leverages WebGPU for accelerated inference. Every chat stays private on your device, and your last-used model, open conversation, and slider settings persist across reloads.

## Table of Contents

- [Features](#features)
- [Application](#application)
- [Tools Used](#tools-used)
- [Installation](#installation)
- [Areas for Improvement](#areas-for-improvement)

## Features

- **Client-Side Inference**: Download and run large language models entirely in your browser via WebGPU—no remote servers or API keys required.

- **Multi-Model Support**: Browse, select, and switch between a growing catalog of MLC-AI models (e.g. Qwen2, Llama-3, Phi-3, Gemma-2) from the <https://mlc.ai/models> directory.

- **Offline-First**: Service Worker caches assets and model weights for offline use; once downloaded, models load instantly without network.

- **Persistent Chats**: Conversations and messages are stored in IndexedDB; your chat history, open conversation, and slider settings persist across page reloads.

- **Real-Time Streaming**: Partial responses stream in with live rendering and auto-formatted code blocks; dynamic sliders control temperature, top-p, penalties, max tokens, and choice count.

- **WebGPU Enforcement**: Detects and blocks unsupported browsers (Firefox, Safari); guides users to Chrome/Chromium with WebGPU enabled.

- **Responsive UI**: Modernized design with custom components (no external UI library), adaptive layout for desktop and mobile, and accessible modals for Info, Model Selection, Advanced Settings, and WebGPU errors.

- **Localhost Mode**: Last‐used model and last open chat automatically reloaded from localStorage for seamless restarts.

- **Privacy & Security**: All data remains on-device—clearing browser storage removes everything, ensuring zero-trust, zero-signup privacy.

## Application

https://github.com/user-attachments/assets/62283bfd-570b-42f8-9b3e-75c24fdac6ff

A more extensive showcase is available in [my portfolio](https://vladimircuriel.com/posts/2_locai/)!

## Tools Used

- ![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white&style=flat-square) **Astro 5**: Static-site generator powering the modern, lightning-fast frontend.

- ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square) **React 19**: UI library for building interactive chat components.

- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) **TypeScript**: Adds static typing across components, hooks, and data models.

- ![WebGPU](https://img.shields.io/badge/WebGPU-5A31F4?style=flat-square) **WebGPU**: Browser API for GPU-accelerated inference of LLMs.

- ![IndexedDB](https://img.shields.io/badge/IndexedDB-005A9C?logo=googlechrome&logoColor=white&style=flat-square) **IndexedDB**: Client-side storage of model weights and conversation history.

- ![Service Worker](https://img.shields.io/badge/ServiceWorker-404040?style=flat-square) **Service Worker (PWA)**: Offline caching of assets and model files.

- ![LocalStorage](https://img.shields.io/badge/LocalStorage-F0DB4F?logo=javascript&logoColor=black&style=flat-square) **LocalStorage**: Persists last-used model, open chat, and slider settings.

- ![WebLLM](https://img.shields.io/badge/WebLLM-1A1A1A?style=flat-square) **@mlc-ai/web-llm**: Library for loading and running LLMs in the browser.

- ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white&style=flat-square) **Framer Motion**: Animations and transitions for a polished UX.

- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square) **Tailwind CSS**: Utility-first styling across the app.

- ![React Markdown](https://img.shields.io/badge/React_Markdown-000000?style=flat-square) **react-markdown** + **remark-gfm**: Rendering of markdown formatted responses and code blocks.

- ![Syntax Highlighter](https://img.shields.io/badge/SyntaxHighlighter-000000?style=flat-square) **react-syntax-highlighter**: Code formatting and highlighting during streaming.

- ![PNPM](https://img.shields.io/badge/PNPM-F69220?logo=pnpm&logoColor=white&style=flat-square) **pnpm**: Fast, disk-efficient package manager.

- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white&style=flat-square) **GitHub Actions**: CI/CD workflows for builds, tests, and deploys to GitHub Pages.

## Installation

### Prerequisites

- **Docker**

### Steps

1. **Clone the repository**:

```bash
git clone https://github.com/vladimircuriel/locai-chat
```

2. **Navigate to the project directory**:

```bash
cd locai-chat
```
   
3. **Run the commands**:

```bash
docker build -t locai:latest .
```

```bash
docker run -p 4321:4321 locai:latest
```
4. **Access the application**:

Open your browser and visit `http://localhost:4321` to access the user interface.

## Areas for Improvement

- Models must be re-downloaded when switching quantization or major versions, leading to extra wait and disk use.  
- Very large models can exhaust device RAM/VRAM and may crash or hang browsers on lower-end hardware.  
- Chat history in IndexedDB is unencrypted and tied to the browser; no built-in export or sync across devices.  
- Mobile browsers with experimental or missing WebGPU support are blocked entirely—no lightweight fallback.  
- No built-in search or filtering within long conversation histories.  
- Context window is limited by model token capacity; very long chats may lose early context when truncated.  
- No support for custom prompts or system-level instruction templates beyond a single “system” message.  
- No collaborative or multi-user features—every session is isolated to the local device.  
- Lack of model fine-tuning or personalization options; you’re limited to public pre-trained checkpoints.  
- Clearing browser storage (IndexedDB/localStorage) deletes all chats and model caches without warning.  
