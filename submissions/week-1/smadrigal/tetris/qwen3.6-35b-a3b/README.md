# Model Details 

| Property | Value |
| --- | --- |
| **Model** | `qwen/qwen3.6-35b-a3b` |
| **File** | `Qwen3.6-35B-A3B-Q4_K_M.gguf` |
| **Format** | `GGUF` |
| **Quantization** | `Q4_K_M` |
| **Arch** | `qwen35moe` |
| **Capabilities** | Vision, Tool use, Reasoning |
| **Domain** | `llm` |
| **Size on disk** | `22.07 GB` |

# Prompt used

```
Generate a complete, fully playable Tetris game contained in a single HTML file with all HTML, CSS, and JavaScript embedded. Do not use any external libraries, frameworks, assets, CDNs, or additional files. The game must run immediately by simply opening the HTML file in any modern web browser.
Gameplay Requirements
 Implement the official Tetris gameplay as closely as practical.
 Include all 7 standard tetrominoes:
 I
 O
 T
 S
 Z
 J
 L
 Pieces should spawn correctly and rotate properly.
 Detect collisions accurately.
 Lock pieces when they land.
 Clear completed lines.
 Spawn the next piece automatically.
 Detect game over when new pieces cannot spawn.
 Allow restarting the game after game over.
Controls
Keyboard controls:
 Left Arrow → Move left
 Right Arrow → Move right
 Down Arrow → Soft drop
 Up Arrow → Rotate clockwise
 Space → Hard drop
 P → Pause/Resume
 R → Restart game
Controls should feel responsive and support continuous movement when keys are held.
Scoring
Display a live scoreboard including:
 Current score
 Level
 Total lines cleared
 High score (stored using localStorage)
Example scoring:
 Single line: 100 × level
 Double: 300 × level
 Triple: 500 × level
 Tetris (4 lines): 800 × level
Increase the level every 10 cleared lines.
As the level increases:
 Falling speed should increase gradually.
UI Requirements
Create a clean, modern interface with:
 Dark theme
 Rounded corners
 Soft shadows
 Modern typography
 Responsive layout
 Smooth animations
The layout should include:
 Main game board
 Score panel
 Next piece preview
 Held piece preview
 Current level
 Lines cleared
 High score
 Pause indicator
 Game Over overlay with Restart button
Everything should remain usable on smaller browser windows.
Visual Effects
When one or more lines are cleared:
 Animate the completed line(s) before removing them.
 Use a satisfying flash or fade effect lasting approximately 150–300 ms.
 After the animation, remove the line(s).
 Blocks above should smoothly shift downward.
Also include:
 Smooth falling animation
 Soft landing effect
 Subtle button hover effects
 Fade-in Game Over overlay
Hold Mechanic
Implement the standard Hold feature.
 Press C to hold the current piece.
 Only allow one hold per piece until it locks.
 Display the held piece beside the board.
Piece Preview
Show at least:
 The next upcoming piece
Bonus:
 Show the next 3–5 upcoming pieces.
Randomization
Use the modern 7-bag randomizer instead of purely random selection to ensure fair gameplay.
Rotation
Implement a robust rotation system that prevents pieces from rotating into occupied cells or outside the board.
Bonus:
Implement the Super Rotation System (SRS) wall kicks.
Performance
 Use requestAnimationFrame where appropriate.
 Keep rendering efficient.
 Avoid unnecessary DOM manipulation.
 Maintain smooth gameplay at 60 FPS.
Code Quality
 Write clean, well-structured, well-commented JavaScript.
 Organize the code into logical classes or modules within the single file.
 Avoid duplicated logic.
 Use descriptive variable and function names.
Technical Constraints
 Output exactly one standalone HTML file.
 Do not include placeholder code.
 Do not omit any required functionality.
 Do not require internet access.
 Do not require installation or build tools.
 The game should be immediately playable after opening the HTML file.
Deliverable
Return only the complete HTML document enclosed in a single html code block, with no explanations or additional text. The game should be polished, visually appealing, feature-complete, and comparable in quality to a modern browser-based Tetris implementation.
```