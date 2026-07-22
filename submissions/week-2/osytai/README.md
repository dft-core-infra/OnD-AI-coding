# Week 2 Submissions — Coding Experience Challenge

# Tetris Pro 🕹️

A modern, high-performance arcade Tetris game built entirely with modern vanilla JavaScript and HTML5 Canvas. Designed with a dark cyber-grid aesthetic, fluid keyboard interactions, and instant load capability.

---

## 🚀 Overview

**Tetris Pro** delivers a responsive, zero-dependency, pure client-side arcade puzzle experience. It leverages raw 2D canvas grids, instant state updates, and persistent state management to bring classic block-stacking action directly to the web browser.

---

## ✨ Highlighted Key Features

*   **⚡ Triple-Canvas Pipeline:** Features distinct, isolated rendering nodes for the main game grid, the upcoming "Next Piece" preview, and the tactical "Hold" piece buffer.
*   **👻 Predictive Ghost Piece:** Real-time vertical projections display an outlined preview at the lowest valid placement point, enabling hyper-fast, high-level tactical drops.
*   **🧩 True Matrix Physics:** Full support for standard geometric rotation, immediate soft drops, and instantaneous spacebar hard drops.
*   **🥾 Wall-Kick Boundaries:** Integrated horizontal recovery algorithms test alternate coordinate offsets if an edge-rotation collision occurs, preventing pieces from freezing or breaking bounds.
*   **📈 Dynamic Scaling & Persistence:** Level-up mechanics automatically compress the drop interval timer down as lines are cleared. High scores are securely retained using `localStorage`.

---

## 🛠️ Tech Stack

*   **Frontend Interface:** Semantic HTML5, CSS3 Custom Properties (Flexbox/Grid layout layouts).
*   **Game Engine:** Pure Vanilla JavaScript (ECMAScript 6+).
*   **Graphics Middleware:** Raw HTML5 Canvas 2D Context (`CanvasRenderingContext2D`).
*   **State Persistence:** Web Storage API (`localStorage`).

---

## 🎮 Controls

| Action | Primary Key | Alternative Key |
| :--- | :--- | :--- |
| **Move Left / Right** | `←` / `→` | — |
| **Rotate Piece** | `↑` | — |
| **Soft Drop** | `↓` | — |
| **Hard Drop** | `Spacebar` | — |
| **Hold / Swap Piece** | `Shift` | `C` / `c` |
| **Pause / Resume Game** | `P` / `p` | UI Button |
| **Restart Game** | `R` / `r` | UI Button |

---

## 🚀 Getting Started

Because **Tetris Pro** is engineered entirely out of vanilla client-side components, it requires zero local compiler setups, external package networks, or server runtimes.

### Option A: Local Development Launch
1. Clone this repository to your local directory:
   ```bash
   git clone https://github.com/osytai/OnD-AI-coding
   cd tetris-pro