# CECS 553 Machine Vision — Quiz 1 Mastery Engine & Exam Simulator (Ultimate Edition)

**Instructor:** Prof. Shabnam Sodagari  
**Format:** In-Person Paper Scantron (Form No. 882-E, 30 Points, No Code/Colab, Conceptual MCQs & Dimension/Parameter Calculations)  
**Modules Covered:** Module 1 (Foundations, Perceptron, Activations, Losses, Regularization), Bonus Module 1 (Data Augmentation & Image Preprocessing), Module 2 (CNNs, Kernels, Padding, Stride, Pooling, Classic Architectures, Vision Tasks), and Module 3 (Autoencoders & Generative Basics).

---

## 🚀 Live Access

The application is actively running and accessible locally at:
👉 **[http://localhost:8089](http://localhost:8089)**

*(You can also double-click `Quiz_App/index.html` in your macOS Finder to open it in Chrome or Safari with **100% offline support** and zero external dependencies).*

---

## 🌟 Complete Feature Suite

### 1. Mode 1: Study & Concept Review (Mandatory Option 1)
- **Always Visible Verified Answers:** Clearly highlights the true correct option in luminous emerald green with a checkmark badge.
- **Deep 4-Part Explanation Breakdown for Every Question:**
  - **Summary:** Quick conceptual takeaway.
  - **Why This Answer Is Correct:** Grounded in mathematical definitions and course slide theorems (MIT 6.S191 Lecture 1 & Lecture 3).
  - **Distractor Analysis:** In-depth breakdown explaining specifically why each of the other three options is incorrect.
  - **Key Formula / Slide Rule:** Reference box highlighting the governing formula or rule.
- **"Test Yourself" / Hide Answers Toggle:** Allows active self-testing directly in study mode by blurring/hiding the verified answer until the card is clicked.
- **Search & Multi-Dimensional Filtering:**
  - **Topic Chips:** Module 1, Module 2, Data Augmentation, Math & Parameters, Stride & Padding, Classic Models, Generative/Autoencoders, Saved Only.
  - **Difficulty Chips:** Basic Concepts, Intermediate, Exam Level / Math.
- **Multi-Modal Learning:**
  - 🔊 **Read Aloud (TTS):** Uses native Web Speech API to narrate questions and explanations.
  - 📋 **Copy Question:** Instant one-click copy to clipboard.
  - ⭐ **Bookmarking:** Saves questions to LocalStorage for focused revision.

### 2. Mode 2: Interactive Practice Quiz (Mandatory Option 2)
- **Complete Double-Jumbling Engine (Fisher-Yates):**
  - **Questions are randomized** on every quiz launch.
  - **All 4 Options (A, B, C, D) are ALSO randomly shuffled independently** for every single question, preventing any pattern or position memorization.
- **Flexible Exam Presets:**
  - **Question Count:** Select **10** (5-min Sprint), **15** (Half Quiz), **30** (Realistic 30-Point Class Exam), **60** (Deep Review), or **100** (Full Bank).
  - **Scope:** Full Syllabus vs. Module 1 Only vs. Module 2 Only.
  - **Feedback Styles:** 
    - *Instant Feedback:* Immediate green/red reveal with full explanation card.
    - *Strict Scantron Mode:* Replicates true exam conditions; answers remain hidden until final submission.
  - **Timer Options:** Untimed, 15 Minutes (speed run), or 30 Minutes (official class exam duration).
- **Interactive Scantron Simulator (Form 882-E):**
  - Right-hand bubble sheet showing filled bubbles, flag indicators (🚩), and blank indicators.
  - Clicking bubbles directly on the Scantron sheet marks your answer and syncs with the current question.
- **Synthesized Web Audio Effects:** Native audio chimes, clicks, buzzer cues, and victory fanfare (toggleable via the 🔊 icon or `M` key).

### 3. Mode 3: Active Recall 3D Flashcards (New!)
- Inspired by Anki and Brainscape for rapid cognitive reinforcement before testing.
- **Smooth 3D Card Flip Animation:** Click card or press **Spacebar** to flip between question and verified answer + key formula.
- **Confidence Rating Tracker:** Click "🤔 Need Review" or "✨ Mastered" to track your mastery progress in LocalStorage.
- **Shuffle Deck (🔀):** Re-randomize the flashcard order at any time.

### 4. Interactive 2D Convolution & Pooling Visualizer Sandbox (Header Icon: 👁️ / Key: `V`)
- **2D Convolution Sandbox:**
  - 5x5 Input matrix.
  - Real-time 3x3 Kernels: Sobel Horizontal (horizontal edges), Sobel Vertical (vertical edges), Laplacian (all edges), and Box Blur.
  - Step-by-Step button slides the 3x3 kernel across the 5x5 matrix, highlighting the active receptive patch, calculating the element-wise sum $\sum (X \odot K)$, and building the 3x3 output feature map cell by cell!
  - Auto-play mode with animated progression.
- **2x2 Max Pooling Sandbox:**
  - 4x4 Input grid mapped to a 2x2 output grid with stride 2, visually highlighting the maximum value in each quadrant with 0 learnable parameters!

### 5. CNN Dimension & Parameter Calculator (Header Icon: 🧮 / Key: `C`)
- **Tab 1 — Spatial Output:** Computes $O = \lfloor\frac{W - K + 2P}{S}\rfloor + 1$ with live step-by-step arithmetic.
- **Tab 2 — Conv Layer Parameters:** Computes $(K_w \times K_h \times C_{in} + \text{bias}) \times C_{out}$ with separate weight and bias breakdowns.
- **Tab 3 — Dense Layer Parameters:** Computes $(N_{in} + 1) \times N_{out}$.
- **Tab 4 — Full Multi-Layer Pipeline (MNIST Lab 2 Verification):**
  - Layer-by-layer architectural audit matching Laboratory 2:
    - Input: $28 \times 28 \times 1$
    - Conv1: 24 filters, $3 \times 3 \to 26 \times 26 \times 24$ (240 params)
    - Pool1: $2 \times 2 \to 13 \times 13 \times 24$ (0 params)
    - Conv2: 36 filters, $3 \times 3 \to 11 \times 11 \times 36$ (7,812 params)
    - Pool2: $2 \times 2 \to 5 \times 5 \times 36$ (0 params)
    - Flatten: 900 units (0 params)
    - Dense1: 128 units $\to 115,328$ params
    - Dense2: 10 units $\to 1,290$ params
    - **Total: 124,670 parameters!**

### 6. Results & Topic Mastery Dashboard
- **Score & Grade:** Radial percentage meter, points earned (e.g., 28 / 30), and official letter grade (A+, A, B+, etc.).
- **Topic Mastery Breakdown:** Color-coded progress bars evaluating your performance per category.
- **Retake Missed Questions Only:** Launches a targeted session containing *only* the questions you got wrong.
- **Comprehensive Review Mode:** Review every single question side-by-side with your selection, the verified answer, and the complete explanation.
- **Print / Save Report:** Generates a clean, formatted diagnostic performance report ready for printing or PDF export.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| :---: | :--- |
| <kbd>1</kbd> / <kbd>A</kbd> | Select Option A in Practice Quiz |
| <kbd>2</kbd> / <kbd>B</kbd> | Select Option B in Practice Quiz |
| <kbd>3</kbd> / <kbd>C</kbd> | Select Option C in Practice Quiz |
| <kbd>4</kbd> / <kbd>D</kbd> | Select Option D in Practice Quiz |
| <kbd>&rarr;</kbd> / <kbd>N</kbd> | Next Question / Next Flashcard |
| <kbd>&larr;</kbd> / <kbd>P</kbd> | Previous Question / Previous Flashcard |
| <kbd>Space</kbd> | Flip 3D Flashcard |
| <kbd>F</kbd> | Toggle Flag for Review on Scantron |
| <kbd>S</kbd> | Smoothly Scroll to Scantron Sheet |
| <kbd>C</kbd> | Open CNN Calculator Modal |
| <kbd>V</kbd> | Open Interactive 2D Visualizer Modal |
| <kbd>H</kbd> | Open Formula Cheat Sheet Modal |
| <kbd>T</kbd> | Toggle Text-to-Speech (Read Aloud) |
| <kbd>M</kbd> | Toggle Sound Effects (Mute) |
| <kbd>K</kbd> | Open Keyboard Shortcuts Guide |
| <kbd>Esc</kbd> | Close Any Open Modal Window |

---

## 📚 Question Bank Distribution (100 Questions)

| # | Topic Domain | Qs | Key Concepts Covered |
| :-: | :--- | :-: | :--- |
| **1** | **Perceptron & Activations** | 10 | Dot products, linear combinations, Sigmoid saturation, Tanh symmetry, ReLU benefits & dying neurons, Leaky ReLU, Softmax |
| **2** | **Loss Functions & Optimization** | 10 | Cross-Entropy vs. MSE, Gradient Descent learning rates, SGD, Momentum, Adam adaptive moments, chain rule |
| **3** | **Regularization & Generalization** | 10 | Dropout training vs. inference scaling, Batch Normalization with $\gamma$ and $\beta$, L1 sparsity vs. L2 weight decay, Early stopping |
| **4** | **Data Augmentation (Bonus Module 1)** | 10 | RandomFlip, RandomRotation, RandomContrast, RandomCrop, CPU async overlap with GPU, training vs. test behavior |
| **5** | **DL Mechanics & PyTorch/TF Labs** | 10 | `optimizer.zero_grad()`, `loss.backward()`, mini-batch trade-offs, `model.eval()`, `torch.no_grad()`, overfitting curves |
| **6** | **CNN Fundamentals & Receptive Fields** | 10 | Local receptive fields, weight sharing, parameter explosion in FC, VGG receptive field math (two $3\times 3 = 5\times 5$, three $3\times 3 = 7\times 7$), $1\times 1$ convs |
| **7** | **Stride & Padding Geometry** | 10 | Valid padding ($P=0$) vs. Same padding ($P=(K-1)/2$), stride arithmetic, odd vs. even dimensions, feature map reduction |
| **8** | **Trainable Parameter Counting Math** | 10 | Conv layer weights & biases, Pooling zero-parameter rule, Flatten + Dense math, deep multi-layer CNN parameter calculations |
| **9** | **Pooling Layers & Operations** | 10 | Max Pooling translation invariance, Average Pooling global context, receptive field expansion, non-learnable operations |
| **10** | **Classic Architectures, Vision & Autoencoders** | 10 | LeNet-5, AlexNet, VGG-16, ResNet skip connections $F(x)+x$, Classification vs. Detection (IoU $\ge 0.5$) vs. Segmentation, Autoencoders |

---

## 🎯 Exam Strategy Tips for Prof. Sodagari's Scantron Quiz

1. **Spatial Output Dimensions:** Remember the universal formula:
   $$O = \left\lfloor\frac{W - K + 2P}{S}\right\rfloor + 1$$
   *Don't forget the $+1$ at the end!*
2. **Conv Layer Parameter Counting:**
   $$\text{Params} = (K_w \times K_h \times C_{in} + \text{bias}) \times C_{out}$$
   *Remember: $C_{in}$ is the number of input channels, and $C_{out}$ is the number of filters.*
3. **Pooling Layers Have Exactly 0 Parameters:** Max Pooling and Average Pooling perform fixed mathematical selections without any weights or biases.
4. **ResNet Identity Shortcut:**
   $$y = F(x) + x$$
   Solves the vanishing gradient and degradation problem by providing a direct highway for gradients ($\frac{\partial y}{\partial x} = \frac{\partial F}{\partial x} + 1$).
5. **Data Augmentation Timing:** Active **strictly during training**; always disabled at evaluation/test time.
