/**
 * CECS 553 Machine Vision - Quiz 1 Mastery Engine & Exam Simulator (Ultimate Edition)
 * Grounded in: Prof. Shabnam Sodagari's Lecture Slides, MIT 6.S191 Lectures 1 & 3, Bonus Module 1
 * Features:
 *   1. Study & Review Mode: 100 verified questions, filters, search, "Test Yourself" hide-answer toggle
 *   2. Practice Quiz Mode: Fisher-Yates double-jumbling (questions & options), Form 882-E Scantron simulator
 *   3. 3D Active Recall Flashcards: Spacebar flip, confidence tracking (Mastered vs Need Review)
 *   4. Interactive 2D Convolution & Pooling Visualizer: step-by-step kernel sliding & arithmetic sandbox
 *   5. Full Multi-Layer CNN Pipeline Calculator: MNIST Lab 2 verification (124,670 params) & custom models
 *   6. Web Audio API Sound Synthesizer & Web Speech API Text-to-Speech (TTS) Read Aloud
 *   7. Comprehensive Keyboard Shortcuts System (1-4, A-D, Arrows, Space, F, S, C, V, H, M, T, K, Esc)
 *   8. Printable Diagnostic Performance & Mastery Report
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Audio Synthesizer (Web Audio API - Zero External Files)
  // =========================================================================
  class SoundManager {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.2);
      });
    }

    playWrong() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    }

    playVictory() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.2, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.35);
      });
    }
  }

  const sound = new SoundManager();

  // =========================================================================
  // 2. Text-To-Speech (TTS) Read-Aloud Engine (Web Speech API)
  // =========================================================================
  class SpeechManager {
    constructor() {
      this.enabled = true;
      this.synth = window.speechSynthesis || null;
    }

    toggle() {
      this.enabled = !this.enabled;
      if (!this.enabled && this.synth) {
        this.synth.cancel();
      }
      return this.enabled;
    }

    speak(text) {
      if (!this.enabled || !this.synth) return;
      this.synth.cancel(); // Stop any currently speaking audio

      const cleanText = text.replace(/⌊|⌋|Σ|×|→|•|&bull;/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Select high-quality English voice if available
      const voices = this.synth.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (preferred) {
        utterance.voice = preferred;
      }

      this.synth.speak(utterance);
    }

    stop() {
      if (this.synth) {
        this.synth.cancel();
      }
    }
  }

  const speech = new SpeechManager();

  // =========================================================================
  // 3. Confetti Particle Canvas Engine
  // =========================================================================
  function launchConfetti(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth || 600;
    canvas.height = 250;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
    const particles = [];

    for (let i = 0; i < 85; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.75) * 15,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.rotation += p.rSpeed;
          p.life -= p.decay;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });
      if (alive) {
        requestAnimationFrame(render);
      } else {
        container.innerHTML = '';
      }
    }
    requestAnimationFrame(render);
  }

  // =========================================================================
  // 4. Double Shuffle (Fisher-Yates) Algorithm
  // =========================================================================
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // =========================================================================
  // 5. LocalStorage Bookmarks & Mastery Manager
  // =========================================================================
  const STORAGE_KEY_BOOKMARKS = 'cecs553_saved_questions';
  const STORAGE_KEY_MASTERED = 'cecs553_mastered_questions';

  function getStorageSet(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function saveStorageSet(key, set) {
    try {
      localStorage.setItem(key, JSON.stringify([...set]));
    } catch (e) {
      console.error(`Could not save ${key} to localStorage`, e);
    }
  }

  let bookmarkedIds = getStorageSet(STORAGE_KEY_BOOKMARKS);
  let masteredIds = getStorageSet(STORAGE_KEY_MASTERED);

  function toggleBookmark(questionId) {
    if (bookmarkedIds.has(questionId)) {
      bookmarkedIds.delete(questionId);
    } else {
      bookmarkedIds.add(questionId);
    }
    saveStorageSet(STORAGE_KEY_BOOKMARKS, bookmarkedIds);
    updateStatsCounters();
  }

  function toggleMastered(questionId, isMastered) {
    if (isMastered) {
      masteredIds.add(questionId);
    } else {
      masteredIds.delete(questionId);
    }
    saveStorageSet(STORAGE_KEY_MASTERED, masteredIds);
    updateStatsCounters();
  }

  function updateStatsCounters() {
    const bEl = document.getElementById('bookmarkedCount');
    if (bEl) bEl.textContent = bookmarkedIds.size;
    const mEl = document.getElementById('masteredCount');
    if (mEl) mEl.textContent = masteredIds.size;
    const qEl = document.getElementById('totalQuestionsCount');
    if (qEl && window.COURSE_QUESTIONS) qEl.textContent = window.COURSE_QUESTIONS.length;
  }

  // =========================================================================
  // 6. Application State
  // =========================================================================
  const state = {
    currentMode: 'study', // 'study' | 'practice' | 'flashcards'
    
    // Study View Filters
    studySearchTerm: '',
    studyActiveCategory: 'ALL',
    studyActiveDifficulty: 'ALL',
    testYourselfMode: false,
    allExplanationsExpanded: false,

    // Practice Quiz Configuration
    quizConfig: {
      count: 30,
      scope: 'ALL',
      feedback: 'instant', // 'instant' | 'exam'
      timer: 0 // seconds
    },

    // Active Practice Session
    activeQuiz: {
      isActive: false,
      questions: [],
      currentIndex: 0,
      userAnswers: {},
      flagged: new Set(),
      startTime: null,
      timerSecondsRemaining: 0,
      timerInterval: null,
      missedQuestionIds: []
    },

    // 3D Flashcards Session
    flashcards: {
      deck: [],
      currentIndex: 0,
      isFlipped: false
    },

    // 2D Visualizer State
    viz: {
      kernelType: 'sobelH',
      stepRow: 0,
      stepCol: 0,
      autoPlayInterval: null,
      inputMatrix: [
        [10, 10, 10,  0,  0],
        [10, 10, 10,  0,  0],
        [10, 10, 10,  0,  0],
        [10, 10, 10,  0,  0],
        [10, 10, 10,  0,  0]
      ],
      outputMatrix: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    }
  };

  // =========================================================================
  // 7. Study & Review View Logic
  // =========================================================================
  function renderStudyCards() {
    const container = document.getElementById('studyCardsContainer');
    if (!container || !window.COURSE_QUESTIONS) return;

    const term = state.studySearchTerm.toLowerCase().trim();
    const cat = state.studyActiveCategory;
    const diff = state.studyActiveDifficulty;

    const filtered = window.COURSE_QUESTIONS.filter(q => {
      // Category filter
      if (cat === 'BOOKMARKED' && !bookmarkedIds.has(q.id)) return false;
      if (cat === 'Module 1' && q.module !== 'Module 1') return false;
      if (cat === 'Module 2' && q.module !== 'Module 2') return false;
      if (cat === 'Data Augmentation' && q.category !== 'Data Augmentation') return false;
      if (cat === 'Parameter Counting' && q.category !== 'Parameter Counting') return false;
      if (cat === 'Stride & Padding' && q.category !== 'Stride & Padding') return false;
      if (cat === 'CNN Architectures' && q.category !== 'CNN Architectures') return false;
      if (cat === 'Generative Models' && q.category !== 'Generative Models') return false;
      if (cat === 'Lab & Notebooks' && q.category !== 'Lab & Notebooks' && q.category !== 'Debiasing & VAEs') return false;
      if (cat === 'Debiasing & VAEs' && q.category !== 'Debiasing & VAEs') return false;

      // Difficulty filter
      if (diff !== 'ALL' && q.difficulty !== diff) return false;

      // Text search filter
      if (term) {
        const inPrompt = q.question.toLowerCase().includes(term);
        const inOpts = q.options.some(opt => opt.toLowerCase().includes(term));
        const inExp = (
          (q.explanation.summary || '').toLowerCase().includes(term) ||
          (q.explanation.whyCorrect || '').toLowerCase().includes(term) ||
          (q.explanation.whyWrong || '').toLowerCase().includes(term) ||
          (q.explanation.keyConcept || '').toLowerCase().includes(term)
        );
        const inCat = q.category.toLowerCase().includes(term);
        return inPrompt || inOpts || inExp || inCat;
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted); background: var(--surface-glass); border-radius: var(--radius-lg); border: 1px solid var(--surface-glass-border);">
          <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</p>
          <h3 style="color: #ffffff; font-size: 1.25rem;">No matching questions found</h3>
          <p style="margin-top: 0.25rem;">Try adjusting your search query, difficulty, or category filter chip.</p>
        </div>
      `;
      return;
    }

    const isHiding = state.testYourselfMode;

    container.innerHTML = filtered.map(q => {
      const isSaved = bookmarkedIds.has(q.id);
      const isExpanded = state.allExplanationsExpanded;
      const letters = ['A', 'B', 'C', 'D'];

      const optionsHtml = q.options.map((opt, optIdx) => {
        const isCorrect = opt === q.correctAnswer;
        return `
          <div class="study-option-item ${isCorrect ? 'correct-answer' : ''}">
            <span class="option-letter">${letters[optIdx]}</span>
            <span class="option-text">${escapeHtml(opt)}</span>
            ${isCorrect ? '<span class="check-badge">✓ Verified Answer</span>' : ''}
          </div>
        `;
      }).join('');

      return `
        <article class="study-card ${isHiding ? 'hide-answers' : ''}" id="study-q-${q.id}" data-id="${q.id}">
          <div class="card-top-bar">
            <div class="badge-group">
              <span class="q-number-badge">#${q.id}</span>
              <span class="module-tag">${escapeHtml(q.module)}</span>
              <span class="category-tag">${escapeHtml(q.category)}</span>
              <span class="diff-tag">${escapeHtml(q.difficulty || 'Intermediate')}</span>
            </div>
            <div class="card-actions-right">
              <button class="icon-action-btn card-listen-btn" data-id="${q.id}" title="Read aloud (Listen)">
                <span>🔊</span>
              </button>
              <button class="icon-action-btn card-copy-btn" data-id="${q.id}" title="Copy question">
                <span>📋</span>
              </button>
              <button class="bookmark-icon-btn ${isSaved ? 'bookmarked' : ''}" data-id="${q.id}" title="${isSaved ? 'Remove from saved' : 'Save for review'}">
                <span class="star-icon">${isSaved ? '★' : '☆'}</span>
              </button>
            </div>
          </div>

          <h3 class="study-prompt">${escapeHtml(q.question)}</h3>

          ${isHiding ? '<div class="test-reveal-banner">👁️ Click here to reveal answer and test yourself</div>' : ''}

          <div class="study-options-list">
            ${optionsHtml}
          </div>

          <div class="explanation-accordion ${isExpanded ? 'open' : ''}">
            <button class="accordion-toggle-btn" data-id="${q.id}">
              <span>💡 In-Depth Explanation & Slide Reference</span>
              <span class="arrow-indicator">▼</span>
            </button>
            <div class="accordion-body">
              <p class="explain-summary">${escapeHtml(q.explanation.summary)}</p>
              <div class="explain-section">
                <strong>Why This Answer Is Correct:</strong>
                <p>${escapeHtml(q.explanation.whyCorrect)}</p>
              </div>
              <div class="explain-section">
                <strong>Distractor Analysis (Why Others Are Wrong):</strong>
                <p>${escapeHtml(q.explanation.whyWrong)}</p>
              </div>
              ${q.explanation.keyConcept ? `
                <div class="explain-key">
                  <span class="key-tag">Key Formula / Slide Rule</span>
                  <p>${escapeHtml(q.explanation.keyConcept)}</p>
                </div>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card event listeners
    container.querySelectorAll('.bookmark-icon-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        toggleBookmark(id);
        sound.playClick();
        renderStudyCards();
      });
    });

    container.querySelectorAll('.card-listen-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        const q = window.COURSE_QUESTIONS.find(item => item.id === id);
        if (q) {
          speech.speak(`${q.question}. The correct answer is: ${q.correctAnswer}. ${q.explanation.summary}`);
        }
      });
    });

    container.querySelectorAll('.card-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        const q = window.COURSE_QUESTIONS.find(item => item.id === id);
        if (q) {
          navigator.clipboard.writeText(`${q.question}\nAnswer: ${q.correctAnswer}\n${q.explanation.summary}`);
          e.currentTarget.innerHTML = '<span>✅</span>';
          setTimeout(() => { e.currentTarget.innerHTML = '<span>📋</span>'; }, 1500);
        }
      });
    });

    container.querySelectorAll('.accordion-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const accordion = e.currentTarget.closest('.explanation-accordion');
        if (accordion) {
          accordion.classList.toggle('open');
          sound.playClick();
        }
      });
    });

    // Test Yourself reveal click
    container.querySelectorAll('.test-reveal-banner').forEach(banner => {
      banner.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.study-card');
        if (card) {
          card.classList.remove('hide-answers');
          banner.style.display = 'none';
          sound.playCorrect();
        }
      });
    });
  }

  function setupStudyViewEvents() {
    const searchInput = document.getElementById('studySearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const catFilters = document.getElementById('categoryFilters');
    const diffFilters = document.getElementById('difficultyFilters');
    const toggleAllBtn = document.getElementById('toggleAllExplanationsBtn');
    const testYourselfToggle = document.getElementById('testYourselfToggle');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.studySearchTerm = e.target.value;
        if (clearBtn) {
          clearBtn.style.display = state.studySearchTerm ? 'block' : 'none';
        }
        renderStudyCards();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.studySearchTerm = '';
        if (searchInput) searchInput.value = '';
        clearBtn.style.display = 'none';
        renderStudyCards();
      });
    }

    if (catFilters) {
      catFilters.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          catFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          e.currentTarget.classList.add('active');
          state.studyActiveCategory = e.currentTarget.getAttribute('data-category');
          sound.playClick();
          renderStudyCards();
        });
      });
    }

    if (diffFilters) {
      diffFilters.querySelectorAll('.diff-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          diffFilters.querySelectorAll('.diff-chip').forEach(c => c.classList.remove('active'));
          e.currentTarget.classList.add('active');
          state.studyActiveDifficulty = e.currentTarget.getAttribute('data-diff');
          sound.playClick();
          renderStudyCards();
        });
      });
    }

    if (testYourselfToggle) {
      testYourselfToggle.addEventListener('change', (e) => {
        state.testYourselfMode = e.target.checked;
        sound.playClick();
        renderStudyCards();
      });
    }

    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        state.allExplanationsExpanded = !state.allExplanationsExpanded;
        toggleAllBtn.querySelector('span').textContent = state.allExplanationsExpanded 
          ? 'Collapse All Explanations' 
          : 'Expand All Explanations';
        sound.playClick();
        renderStudyCards();
      });
    }
  }

  // =========================================================================
  // 8. Practice Quiz Engine (Double Jumbled Questions & Options)
  // =========================================================================
  function setupPracticeSetupEvents() {
    // Question count buttons
    const countSelector = document.getElementById('quizCountSelector');
    if (countSelector) {
      countSelector.querySelectorAll('.selector-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          countSelector.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
          const target = e.currentTarget;
          target.classList.add('active');
          state.quizConfig.count = parseInt(target.getAttribute('data-count'), 10);
          sound.playClick();
        });
      });
    }

    // Scope selector
    const scopeSelector = document.getElementById('quizScopeSelector');
    if (scopeSelector) {
      scopeSelector.querySelectorAll('.selector-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          scopeSelector.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
          const target = e.currentTarget;
          target.classList.add('active');
          state.quizConfig.scope = target.getAttribute('data-scope');
          sound.playClick();
        });
      });
    }

    // Feedback style selector
    const styleSelector = document.getElementById('quizStyleSelector');
    if (styleSelector) {
      styleSelector.querySelectorAll('.selector-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          styleSelector.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
          const target = e.currentTarget;
          target.classList.add('active');
          state.quizConfig.feedback = target.getAttribute('data-feedback');
          sound.playClick();
        });
      });
    }

    // Timer selector
    const timerSelector = document.getElementById('quizTimerSelector');
    if (timerSelector) {
      timerSelector.querySelectorAll('.selector-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          timerSelector.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
          const target = e.currentTarget;
          target.classList.add('active');
          state.quizConfig.timer = parseInt(target.getAttribute('data-timer'), 10);
          sound.playClick();
        });
      });
    }

    // Start Quiz button
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        sound.playClick();
        startPracticeQuiz();
      });
    }
  }

  function startPracticeQuiz(customQuestionPool = null) {
    let pool = customQuestionPool;

    if (!pool) {
      pool = window.COURSE_QUESTIONS.filter(q => {
        if (state.quizConfig.scope === 'Module 1') return q.module === 'Module 1';
        if (state.quizConfig.scope === 'Module 2') return q.module === 'Module 2';
        return true;
      });
    }

    // 1. Shuffle questions with Fisher-Yates
    let shuffledQuestions = shuffleArray(pool);

    // Slice to selected count
    const targetCount = customQuestionPool ? pool.length : Math.min(state.quizConfig.count, shuffledQuestions.length);
    shuffledQuestions = shuffledQuestions.slice(0, targetCount);

    // 2. DOUBLE JUMBLE: Shuffle the 4 options of EACH question independently
    shuffledQuestions = shuffledQuestions.map(q => {
      return {
        ...q,
        options: shuffleArray(q.options)
      };
    });

    // Reset active quiz state
    state.activeQuiz.isActive = true;
    state.activeQuiz.questions = shuffledQuestions;
    state.activeQuiz.currentIndex = 0;
    state.activeQuiz.userAnswers = {};
    state.activeQuiz.flagged.clear();
    state.activeQuiz.startTime = Date.now();
    state.activeQuiz.missedQuestionIds = [];

    // Switch view visibility
    document.getElementById('practiceSetupCard').style.display = 'none';
    document.getElementById('quizResultsCard').style.display = 'none';
    document.getElementById('activeQuizContainer').style.display = 'flex';

    initQuizTimer();
    renderScantronSheet();
    renderActiveQuestion();
  }

  function initQuizTimer() {
    if (state.activeQuiz.timerInterval) {
      clearInterval(state.activeQuiz.timerInterval);
      state.activeQuiz.timerInterval = null;
    }

    const timerDisplay = document.getElementById('timerDisplay');
    const timerClock = document.getElementById('timerClock');

    if (state.quizConfig.timer > 0) {
      timerDisplay.style.display = 'flex';
      state.activeQuiz.timerSecondsRemaining = state.quizConfig.timer;

      const updateClock = () => {
        const remaining = state.activeQuiz.timerSecondsRemaining;
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        timerClock.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (remaining <= 120) {
          timerDisplay.className = 'timer-badge danger';
        } else if (remaining <= 300) {
          timerDisplay.className = 'timer-badge warning';
        } else {
          timerDisplay.className = 'timer-badge';
        }

        if (remaining <= 0) {
          clearInterval(state.activeQuiz.timerInterval);
          sound.playWrong();
          alert('⏱️ Time has expired! Submitting your Scantron now.');
          submitPracticeQuiz();
        } else {
          state.activeQuiz.timerSecondsRemaining--;
        }
      };

      updateClock();
      state.activeQuiz.timerInterval = setInterval(updateClock, 1000);
    } else {
      timerDisplay.style.display = 'none';
    }
  }

  function renderActiveQuestion() {
    const qIndex = state.activeQuiz.currentIndex;
    const currentQ = state.activeQuiz.questions[qIndex];
    const totalQ = state.activeQuiz.questions.length;

    // Status tracker
    document.getElementById('currentQuestionNum').textContent = qIndex + 1;
    document.getElementById('totalQuizQuestions').textContent = totalQ;
    const progressPercent = ((qIndex + 1) / totalQ) * 100;
    document.getElementById('quizProgressBar').style.width = `${progressPercent}%`;

    const answeredCount = Object.keys(state.activeQuiz.userAnswers).length;
    document.getElementById('answeredPillCount').textContent = `${answeredCount}/${totalQ}`;

    // Tags
    document.getElementById('activeQuestionModule').textContent = currentQ.module;
    document.getElementById('activeQuestionCategory').textContent = currentQ.category;
    document.getElementById('activeQuestionDifficulty').textContent = currentQ.difficulty || 'Intermediate';

    // Bookmark & TTS button
    const bookmarkBtn = document.getElementById('activeBookmarkBtn');
    const isSaved = bookmarkedIds.has(currentQ.id);
    bookmarkBtn.querySelector('.star-icon').textContent = isSaved ? '★' : '☆';
    bookmarkBtn.classList.toggle('bookmarked', isSaved);
    bookmarkBtn.onclick = () => {
      toggleBookmark(currentQ.id);
      sound.playClick();
      bookmarkBtn.querySelector('.star-icon').textContent = bookmarkedIds.has(currentQ.id) ? '★' : '☆';
      bookmarkBtn.classList.toggle('bookmarked', bookmarkedIds.has(currentQ.id));
    };

    const listenBtn = document.getElementById('activeListenBtn');
    listenBtn.onclick = () => {
      speech.speak(currentQ.question);
    };

    // Prompt text
    document.getElementById('activeQuestionText').textContent = currentQ.question;

    // Render 4 options
    const container = document.getElementById('activeOptionsContainer');
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    const chosenAnswer = state.activeQuiz.userAnswers[currentQ.id];
    const isInstant = state.quizConfig.feedback === 'instant';
    const hasAnswered = chosenAnswer !== undefined;

    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-choice-btn';
      btn.setAttribute('data-option', opt);
      btn.setAttribute('data-index', idx);

      const isSelected = chosenAnswer === opt;
      const isCorrect = opt === currentQ.correctAnswer;

      if (isSelected) {
        btn.classList.add('selected');
      }

      if (isInstant && hasAnswered) {
        if (isCorrect) {
          btn.classList.add('reveal-correct');
        } else if (isSelected) {
          btn.classList.add('reveal-wrong');
        }
      }

      btn.innerHTML = `
        <span class="choice-bubble">${letters[idx]}</span>
        <span class="choice-text">${escapeHtml(opt)}</span>
      `;

      btn.addEventListener('click', () => {
        selectPracticeAnswer(currentQ, opt);
      });

      container.appendChild(btn);
    });

    // Explanation Box
    const explainBox = document.getElementById('activeExplanationBox');
    if (isInstant && hasAnswered) {
      explainBox.style.display = 'block';
      document.getElementById('activeExplainSummary').textContent = currentQ.explanation.summary;
      document.getElementById('activeExplainWhyCorrect').textContent = currentQ.explanation.whyCorrect;
      document.getElementById('activeExplainWhyWrong').textContent = currentQ.explanation.whyWrong;

      const keyWrap = document.getElementById('activeExplainKeyWrapper');
      if (currentQ.explanation.keyConcept) {
        keyWrap.style.display = 'block';
        document.getElementById('activeExplainKey').textContent = currentQ.explanation.keyConcept;
      } else {
        keyWrap.style.display = 'none';
      }
    } else {
      explainBox.style.display = 'none';
    }

    // Navigation Controls
    const prevBtn = document.getElementById('prevQuestionBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const submitBtn = document.getElementById('submitExamBtn');
    const flagBtn = document.getElementById('flagQuestionBtn');

    prevBtn.disabled = qIndex === 0;

    const isFlagged = state.activeQuiz.flagged.has(currentQ.id);
    flagBtn.classList.toggle('flagged', isFlagged);
    flagBtn.querySelector('span').textContent = isFlagged ? '🚩 Flagged' : '🚩 Flag for Review (F)';

    if (qIndex === totalQ - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'flex';
    } else {
      nextBtn.style.display = 'flex';
      submitBtn.style.display = 'none';
    }

    syncScantronActiveRow();
  }

  function selectPracticeAnswer(question, selectedOption) {
    const isInstant = state.quizConfig.feedback === 'instant';
    const isCorrect = selectedOption === question.correctAnswer;

    state.activeQuiz.userAnswers[question.id] = selectedOption;

    if (isInstant) {
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } else {
      sound.playClick();
    }

    updateScantronBubble(question.id, selectedOption);
    renderActiveQuestion();
  }

  // =========================================================================
  // 9. Scantron Simulator Sheet (Form 882-E)
  // =========================================================================
  function renderScantronSheet() {
    const grid = document.getElementById('scantronGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const questions = state.activeQuiz.questions;
    const letters = ['A', 'B', 'C', 'D'];

    questions.forEach((q, idx) => {
      const row = document.createElement('div');
      row.className = 'scantron-row';
      row.id = `scantron-row-${idx}`;
      row.setAttribute('data-index', idx);

      const chosenOpt = state.activeQuiz.userAnswers[q.id];
      const isFlagged = state.activeQuiz.flagged.has(q.id);

      let bubblesHtml = letters.map((letter, optIdx) => {
        const optText = q.options[optIdx];
        const isFilled = chosenOpt === optText;
        return `<span class="scantron-bubble ${isFilled ? 'filled' : ''}" data-opt="${escapeHtml(optText)}">${letter}</span>`;
      }).join('');

      row.innerHTML = `
        <span class="scantron-q-num">${idx + 1}.</span>
        <div class="scantron-row-bubbles">
          ${bubblesHtml}
        </div>
        ${isFlagged ? '<span class="scantron-flag-dot">🚩</span>' : ''}
      `;

      row.addEventListener('click', (e) => {
        const bubble = e.target.closest('.scantron-bubble');
        if (bubble) {
          const optVal = bubble.getAttribute('data-opt');
          if (optVal) {
            selectPracticeAnswer(q, optVal);
          }
        }
        state.activeQuiz.currentIndex = idx;
        renderActiveQuestion();
        sound.playClick();
      });

      grid.appendChild(row);
    });
  }

  function syncScantronActiveRow() {
    const currIdx = state.activeQuiz.currentIndex;
    const grid = document.getElementById('scantronGrid');
    if (!grid) return;

    grid.querySelectorAll('.scantron-row').forEach((row, idx) => {
      if (idx === currIdx) {
        row.classList.add('current-active');
        row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        row.classList.remove('current-active');
      }
    });
  }

  function updateScantronBubble(questionId, selectedOption) {
    const idx = state.activeQuiz.questions.findIndex(q => q.id === questionId);
    if (idx === -1) return;

    const row = document.getElementById(`scantron-row-${idx}`);
    if (!row) return;

    const q = state.activeQuiz.questions[idx];
    const bubbles = row.querySelectorAll('.scantron-bubble');

    bubbles.forEach((bubble, optIdx) => {
      if (q.options[optIdx] === selectedOption) {
        bubble.classList.add('filled');
      } else {
        bubble.classList.remove('filled');
      }
    });
  }

  function setupActiveQuizControls() {
    const prevBtn = document.getElementById('prevQuestionBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const submitBtn = document.getElementById('submitExamBtn');
    const flagBtn = document.getElementById('flagQuestionBtn');
    const abandonBtn = document.getElementById('abandonQuizBtn');
    const finishFromScantronBtn = document.getElementById('finishFromScantronBtn');
    const scantronToggleBtn = document.getElementById('scantronToggleBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.activeQuiz.currentIndex > 0) {
          state.activeQuiz.currentIndex--;
          sound.playClick();
          renderActiveQuestion();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.activeQuiz.currentIndex < state.activeQuiz.questions.length - 1) {
          state.activeQuiz.currentIndex++;
          sound.playClick();
          renderActiveQuestion();
        }
      });
    }

    if (flagBtn) {
      flagBtn.addEventListener('click', () => {
        const currQ = state.activeQuiz.questions[state.activeQuiz.currentIndex];
        if (state.activeQuiz.flagged.has(currQ.id)) {
          state.activeQuiz.flagged.delete(currQ.id);
        } else {
          state.activeQuiz.flagged.add(currQ.id);
        }
        sound.playClick();
        renderScantronSheet();
        renderActiveQuestion();
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', confirmAndSubmitQuiz);
    }

    if (finishFromScantronBtn) {
      finishFromScantronBtn.addEventListener('click', confirmAndSubmitQuiz);
    }

    if (abandonBtn) {
      abandonBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to exit this quiz session? Your progress will be discarded.')) {
          exitActiveQuiz();
        }
      });
    }

    if (scantronToggleBtn) {
      scantronToggleBtn.addEventListener('click', () => {
        sound.playClick();
        const drawer = document.getElementById('scantronDrawer');
        if (drawer) {
          drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          drawer.style.boxShadow = '0 0 25px rgba(99, 102, 241, 0.6)';
          setTimeout(() => { drawer.style.boxShadow = ''; }, 1000);
        }
      });
    }
  }

  function confirmAndSubmitQuiz() {
    const total = state.activeQuiz.questions.length;
    const answered = Object.keys(state.activeQuiz.userAnswers).length;
    const unanswered = total - answered;

    let msg = 'Are you ready to submit your Scantron exam?';
    if (unanswered > 0) {
      msg = `⚠️ Warning: You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}.\nDo you still wish to submit?`;
    }

    if (confirm(msg)) {
      submitPracticeQuiz();
    }
  }

  function exitActiveQuiz() {
    if (state.activeQuiz.timerInterval) {
      clearInterval(state.activeQuiz.timerInterval);
      state.activeQuiz.timerInterval = null;
    }
    state.activeQuiz.isActive = false;
    document.getElementById('activeQuizContainer').style.display = 'none';
    document.getElementById('quizResultsCard').style.display = 'none';
    document.getElementById('practiceSetupCard').style.display = 'block';
  }

  function submitPracticeQuiz() {
    if (state.activeQuiz.timerInterval) {
      clearInterval(state.activeQuiz.timerInterval);
      state.activeQuiz.timerInterval = null;
    }

    state.activeQuiz.isActive = false;

    const questions = state.activeQuiz.questions;
    let correctCount = 0;
    const missed = [];
    const categoryStats = {};

    questions.forEach(q => {
      const userChoice = state.activeQuiz.userAnswers[q.id];
      const isCorrect = userChoice === q.correctAnswer;

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;

      if (isCorrect) {
        correctCount++;
        categoryStats[q.category].correct++;
      } else {
        missed.push(q);
      }
    });

    state.activeQuiz.missedQuestionIds = missed.map(q => q.id);

    const total = questions.length;
    const percent = Math.round((correctCount / total) * 100);
    const timeSpentSec = Math.floor((Date.now() - state.activeQuiz.startTime) / 1000);
    const mins = Math.floor(timeSpentSec / 60);
    const secs = timeSpentSec % 60;
    const timeStr = `${mins}m ${secs}s`;

    let grade = 'F';
    let headline = 'Needs More Review';
    let status = 'Review Needed';

    if (percent >= 93) {
      grade = 'A+';
      headline = 'Outstanding Mastery! 🎉';
      status = 'Exam Ready';
    } else if (percent >= 90) {
      grade = 'A';
      headline = 'Excellent Understanding! 👏';
      status = 'Exam Ready';
    } else if (percent >= 85) {
      grade = 'B+';
      headline = 'Solid Preparedness! 👍';
      status = 'Proficient';
    } else if (percent >= 80) {
      grade = 'B';
      headline = 'Good Effort, Minor Gaps! 💡';
      status = 'Proficient';
    } else if (percent >= 70) {
      grade = 'C';
      headline = 'Review Missed Questions 🔍';
      status = 'Developing';
    }

    if (percent >= 80) {
      sound.playVictory();
      launchConfetti('confettiContainer');
    } else {
      sound.playWrong();
    }

    document.getElementById('activeQuizContainer').style.display = 'none';
    const resultsCard = document.getElementById('quizResultsCard');
    resultsCard.style.display = 'block';

    document.getElementById('resultsScorePercent').textContent = `${percent}%`;
    document.getElementById('resultsGradeLetter').textContent = `Grade: ${grade}`;
    document.getElementById('resultsHeadline').textContent = headline;
    document.getElementById('resultsSummaryText').textContent = `You scored ${correctCount} out of ${total} (${percent}%) on this randomized Scantron session.`;

    document.getElementById('metricPoints').textContent = `${correctCount} / ${total}`;
    document.getElementById('metricAccuracy').textContent = `${percent}.0%`;
    document.getElementById('metricTime').textContent = timeStr;
    const statusEl = document.getElementById('metricExamStatus');
    statusEl.textContent = status;
    statusEl.className = `metric-value ${percent >= 80 ? 'success' : 'warning'}`;

    // Category breakdown
    const catBarsContainer = document.getElementById('categoryBreakdownBars');
    catBarsContainer.innerHTML = Object.entries(categoryStats).map(([catName, stat]) => {
      const catPct = Math.round((stat.correct / stat.total) * 100);
      let fillClass = 'high';
      if (catPct < 60) fillClass = 'low';
      else if (catPct < 80) fillClass = 'medium';

      return `
        <div class="breakdown-row">
          <div class="breakdown-info">
            <span class="breakdown-cat-name">${escapeHtml(catName)}</span>
            <span class="breakdown-cat-score">${stat.correct}/${stat.total} (${catPct}%)</span>
          </div>
          <div class="breakdown-track">
            <div class="breakdown-fill ${fillClass}" style="width: ${catPct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Missed questions retake
    const retakeMissedBtn = document.getElementById('retakeMissedBtn');
    if (missed.length > 0) {
      retakeMissedBtn.style.display = 'inline-flex';
      document.getElementById('missedCountNum').textContent = missed.length;
      retakeMissedBtn.onclick = () => {
        sound.playClick();
        startPracticeQuiz(missed);
      };
    } else {
      retakeMissedBtn.style.display = 'none';
    }

    const retakeAllBtn = document.getElementById('retakeAllBtn');
    retakeAllBtn.onclick = () => {
      sound.playClick();
      startPracticeQuiz();
    };

    const printBtn = document.getElementById('printReportBtn');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }

    const reviewBtn = document.getElementById('reviewExamAnswersBtn');
    const reviewContainer = document.getElementById('resultsDetailedReviewContainer');
    reviewContainer.style.display = 'none';

    reviewBtn.onclick = () => {
      sound.playClick();
      if (reviewContainer.style.display === 'none') {
        renderDetailedReviewCards(questions);
        reviewContainer.style.display = 'block';
        reviewContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        reviewContainer.style.display = 'none';
      }
    };
  }

  function renderDetailedReviewCards(questions) {
    const container = document.getElementById('reviewCardsContainer');
    if (!container) return;

    container.innerHTML = questions.map((q, idx) => {
      const userChoice = state.activeQuiz.userAnswers[q.id];
      const isCorrect = userChoice === q.correctAnswer;

      return `
        <article class="review-item-card ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="card-top-bar">
            <div class="badge-group">
              <span class="q-number-badge">Q${idx + 1}</span>
              <span class="category-tag">${escapeHtml(q.category)}</span>
            </div>
            <span style="font-weight: 700; font-size: 0.85rem; color: ${isCorrect ? '#34d399' : '#fb7185'};">
              ${isCorrect ? '✓ Correct (+1 pt)' : '✗ Incorrect (0 pts)'}
            </span>
          </div>

          <h4 class="review-q-title">${escapeHtml(q.question)}</h4>

          <div class="review-user-ans ${isCorrect ? 'correct-choice' : 'wrong-choice'}">
            <strong>Your Selection:</strong> ${userChoice ? escapeHtml(userChoice) : '<em>(Blank / Unanswered)</em>'}
          </div>

          ${!isCorrect ? `
            <div class="review-correct-ans">
              <strong>Verified Correct Answer:</strong> ${escapeHtml(q.correctAnswer)}
            </div>
          ` : ''}

          <div class="active-explanation-card" style="margin-top: 1rem; margin-bottom: 0;">
            <div class="explanation-badge">
              <span class="badge-icon">💡</span>
              <span>Detailed Breakdown</span>
            </div>
            <p class="explain-summary">${escapeHtml(q.explanation.summary)}</p>
            <div class="explain-section">
              <strong>Why This Is Correct:</strong>
              <p>${escapeHtml(q.explanation.whyCorrect)}</p>
            </div>
            <div class="explain-section">
              <strong>Distractor Analysis:</strong>
              <p>${escapeHtml(q.explanation.whyWrong)}</p>
            </div>
            ${q.explanation.keyConcept ? `
              <div class="explain-key">
                <span class="key-tag">Key Formula / Slide Rule</span>
                <p>${escapeHtml(q.explanation.keyConcept)}</p>
              </div>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  // =========================================================================
  // 10. 3D Active Recall Flashcards Engine
  // =========================================================================
  function initFlashcards() {
    if (!window.COURSE_QUESTIONS) return;
    state.flashcards.deck = [...window.COURSE_QUESTIONS];
    state.flashcards.currentIndex = 0;
    state.flashcards.isFlipped = false;
    renderCurrentFlashcard();

    const cardContainer = document.getElementById('activeFlashcard');
    const flipBtn = document.getElementById('fcFlipActionBtn');
    const prevBtn = document.getElementById('fcPrevBtn');
    const nextBtn = document.getElementById('fcNextBtn');
    const shuffleBtn = document.getElementById('shuffleDeckBtn');
    const reviewBtn = document.getElementById('fcNeedReviewBtn');
    const masteredBtn = document.getElementById('fcMasteredBtn');

    function toggleFlip() {
      state.flashcards.isFlipped = !state.flashcards.isFlipped;
      const inner = document.getElementById('flashcardInner');
      if (inner) {
        inner.classList.toggle('flipped', state.flashcards.isFlipped);
      }
      sound.playClick();
    }

    if (cardContainer) cardContainer.addEventListener('click', toggleFlip);
    if (flipBtn) flipBtn.addEventListener('click', toggleFlip);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.flashcards.currentIndex > 0) {
          state.flashcards.currentIndex--;
          state.flashcards.isFlipped = false;
          sound.playClick();
          renderCurrentFlashcard();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.flashcards.currentIndex < state.flashcards.deck.length - 1) {
          state.flashcards.currentIndex++;
          state.flashcards.isFlipped = false;
          sound.playClick();
          renderCurrentFlashcard();
        }
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        state.flashcards.deck = shuffleArray(state.flashcards.deck);
        state.flashcards.currentIndex = 0;
        state.flashcards.isFlipped = false;
        sound.playVictory();
        renderCurrentFlashcard();
      });
    }

    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const q = state.flashcards.deck[state.flashcards.currentIndex];
        toggleMastered(q.id, false);
        sound.playWrong();
        if (state.flashcards.currentIndex < state.flashcards.deck.length - 1) {
          state.flashcards.currentIndex++;
          state.flashcards.isFlipped = false;
          renderCurrentFlashcard();
        }
      });
    }

    if (masteredBtn) {
      masteredBtn.addEventListener('click', () => {
        const q = state.flashcards.deck[state.flashcards.currentIndex];
        toggleMastered(q.id, true);
        sound.playCorrect();
        if (state.flashcards.currentIndex < state.flashcards.deck.length - 1) {
          state.flashcards.currentIndex++;
          state.flashcards.isFlipped = false;
          renderCurrentFlashcard();
        }
      });
    }
  }

  function renderCurrentFlashcard() {
    const q = state.flashcards.deck[state.flashcards.currentIndex];
    const total = state.flashcards.deck.length;
    if (!q) return;

    const inner = document.getElementById('flashcardInner');
    if (inner) inner.classList.toggle('flipped', state.flashcards.isFlipped);

    document.getElementById('flashcardProgress').textContent = `${state.flashcards.currentIndex + 1} / ${total}`;

    // Front
    document.getElementById('fcFrontCategory').textContent = q.category;
    document.getElementById('fcFrontDifficulty').textContent = q.difficulty || 'Intermediate';
    document.getElementById('fcFrontText').textContent = q.question;

    // Back
    document.getElementById('fcBackCategory').textContent = q.category;
    document.getElementById('fcBackAnswer').textContent = q.correctAnswer;
    document.getElementById('fcBackSummary').textContent = q.explanation.summary;

    const keyWrap = document.getElementById('fcKeyWrapper');
    if (q.explanation.keyConcept) {
      keyWrap.style.display = 'block';
      document.getElementById('fcBackKey').textContent = q.explanation.keyConcept;
    } else {
      keyWrap.style.display = 'none';
    }

    document.getElementById('fcPrevBtn').disabled = state.flashcards.currentIndex === 0;
    document.getElementById('fcNextBtn').disabled = state.flashcards.currentIndex === total - 1;
  }

  // =========================================================================
  // 11. Interactive 2D Convolution & Pooling Visualizer Sandbox
  // =========================================================================
  const KERNELS = {
    sobelH: [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1]
    ],
    sobelV: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ],
    laplacian: [
      [ 0,  1,  0],
      [ 1, -4,  1],
      [ 0,  1,  0]
    ],
    boxBlur: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  };

  function setupVisualizer() {
    const kernelSelect = document.getElementById('vizKernelSelect');
    const stepBtn = document.getElementById('vizStepBtn');
    const autoPlayBtn = document.getElementById('vizAutoPlayBtn');
    const resetBtn = document.getElementById('vizResetBtn');

    // Tabs
    document.querySelectorAll('.viz-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.viz-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.viz-tab-content').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const contentId = e.currentTarget.getAttribute('data-tab');
        const content = document.getElementById(contentId);
        if (content) content.classList.add('active');
        sound.playClick();
      });
    });

    if (kernelSelect) {
      kernelSelect.addEventListener('change', (e) => {
        state.viz.kernelType = e.target.value;
        resetVisualizer();
      });
    }

    if (stepBtn) {
      stepBtn.addEventListener('click', () => {
        stepVisualizer();
        sound.playClick();
      });
    }

    if (autoPlayBtn) {
      autoPlayBtn.addEventListener('click', () => {
        if (state.viz.autoPlayInterval) {
          clearInterval(state.viz.autoPlayInterval);
          state.viz.autoPlayInterval = null;
          autoPlayBtn.textContent = '▶ Auto Play';
        } else {
          autoPlayBtn.textContent = '⏸ Pause';
          state.viz.autoPlayInterval = setInterval(() => {
            stepVisualizer();
          }, 700);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetVisualizer();
        sound.playClick();
      });
    }

    renderVisualizerGrids();
    renderPoolVisualizer();
  }

  function resetVisualizer() {
    if (state.viz.autoPlayInterval) {
      clearInterval(state.viz.autoPlayInterval);
      state.viz.autoPlayInterval = null;
      document.getElementById('vizAutoPlayBtn').textContent = '▶ Auto Play';
    }
    state.viz.stepRow = 0;
    state.viz.stepCol = 0;
    state.viz.outputMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    renderVisualizerGrids();
    document.getElementById('vizMathFormula').textContent = 'Click "Step Forward" to slide the kernel across the input matrix.';
  }

  function stepVisualizer() {
    const K = KERNELS[state.viz.kernelType];
    const r = state.viz.stepRow;
    const c = state.viz.stepCol;

    // Compute element-wise dot product
    let sum = 0;
    let mathTerms = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const val = state.viz.inputMatrix[r + i][c + j];
        const weight = K[i][j];
        sum += val * weight;
        mathTerms.push(`(${val}&times;${weight})`);
      }
    }

    state.viz.outputMatrix[r][c] = sum;

    // Update UI formula
    document.getElementById('vizInputCoords').textContent = `Patch at (${r}, ${c}) to (${r+2}, ${c+2})`;
    document.getElementById('vizOutputCoords').textContent = `Output Cell (${r}, ${c}) = ${sum}`;
    document.getElementById('vizMathFormula').innerHTML = `
      <strong>Output(${r}, ${c})</strong> = ${mathTerms.slice(0, 5).join(' + ')} + ... = <strong>${sum}</strong>
    `;

    renderVisualizerGrids();

    // Advance coordinates
    state.viz.stepCol++;
    if (state.viz.stepCol >= 3) {
      state.viz.stepCol = 0;
      state.viz.stepRow++;
      if (state.viz.stepRow >= 3) {
        state.viz.stepRow = 0; // Loop back
      }
    }
  }

  function renderVisualizerGrids() {
    const inGrid = document.getElementById('vizInputGrid');
    const kGrid = document.getElementById('vizKernelGrid');
    const outGrid = document.getElementById('vizOutputGrid');
    if (!inGrid || !kGrid || !outGrid) return;

    const r = state.viz.stepRow;
    const c = state.viz.stepCol;
    const K = KERNELS[state.viz.kernelType];

    // 5x5 Input
    inGrid.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const isPatch = (i >= r && i < r + 3 && j >= c && j < c + 3);
        const cell = document.createElement('div');
        cell.className = `matrix-cell ${isPatch ? 'active-patch' : ''}`;
        cell.textContent = state.viz.inputMatrix[i][j];
        inGrid.appendChild(cell);
      }
    }

    // 3x3 Kernel
    kGrid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        cell.textContent = K[i][j];
        kGrid.appendChild(cell);
      }
    }

    // 3x3 Output
    outGrid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const isCurrent = (i === r && j === c);
        const cell = document.createElement('div');
        cell.className = `matrix-cell ${isCurrent ? 'current-output' : 'filled-output'}`;
        cell.textContent = state.viz.outputMatrix[i][j];
        outGrid.appendChild(cell);
      }
    }
  }

  function renderPoolVisualizer() {
    const poolIn = document.getElementById('vizPoolInputGrid');
    const poolOut = document.getElementById('vizPoolOutputGrid');
    if (!poolIn || !poolOut) return;

    const poolInputData = [
      [12, 20, 30,  0],
      [ 8, 12,  2, 14],
      [34, 70, 11, 44],
      [56, 18, 25, 90]
    ];

    poolIn.innerHTML = '';
    const maxCoords = [[0, 1], [0, 2], [2, 1], [3, 3]]; // (0,1)=20, (0,2)=30, (2,1)=70, (3,3)=90

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const isMax = maxCoords.some(([mi, mj]) => mi === i && mj === j);
        const cell = document.createElement('div');
        cell.className = `matrix-cell ${isMax ? 'pool-max' : ''}`;
        cell.textContent = poolInputData[i][j];
        poolIn.appendChild(cell);
      }
    }

    poolOut.innerHTML = '';
    const poolOutputData = [
      [20, 30],
      [70, 90]
    ];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell pool-max';
        cell.textContent = poolOutputData[i][j];
        poolOut.appendChild(cell);
      }
    }
  }

  // =========================================================================
  // 12. Interactive CNN Dimension & Parameter Calculator Logic
  // =========================================================================
  function setupCalculator() {
    document.querySelectorAll('.calc-tab-btn').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.calc-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.calc-tab-content').forEach(c => c.classList.remove('active'));

        const targetTab = e.currentTarget;
        targetTab.classList.add('active');
        const contentId = targetTab.getAttribute('data-tab');
        const targetContent = document.getElementById(contentId);
        if (targetContent) targetContent.classList.add('active');
        sound.playClick();
      });
    });

    // Tab 1: Spatial Dimension: O = floor((W - K + 2P)/S) + 1
    const wInput = document.getElementById('calcInputW');
    const kInput = document.getElementById('calcKernelK');
    const pInput = document.getElementById('calcPaddingP');
    const sInput = document.getElementById('calcStrideS');
    const spatialResult = document.getElementById('calcSpatialResult');
    const spatialSteps = document.getElementById('calcSpatialSteps');

    function calculateSpatial() {
      const W = parseFloat(wInput.value) || 0;
      const K = parseFloat(kInput.value) || 0;
      const P = parseFloat(pInput.value) || 0;
      const S = parseFloat(sInput.value) || 1;

      if (S <= 0 || K > W + 2 * P) {
        spatialResult.textContent = 'Invalid dimensions';
        spatialSteps.textContent = 'Kernel size exceeds padded input or stride <= 0';
        return;
      }

      const O = Math.floor((W - K + 2 * P) / S) + 1;
      spatialResult.innerHTML = `${O} &times; ${O}`;
      spatialSteps.textContent = `⌊(${W} - ${K} + 2×${P}) / ${S}⌋ + 1 = ⌊${W - K + 2 * P} / ${S}⌋ + 1 = ${O}`;
    }

    [wInput, kInput, pInput, sInput].forEach(inp => {
      if (inp) inp.addEventListener('input', calculateSpatial);
    });

    // Tab 2: Conv Layer Parameters: (Kw * Kh * Cin + (bias ? 1 : 0)) * Cout
    const kwInput = document.getElementById('calcKernelW');
    const khInput = document.getElementById('calcKernelH');
    const cinInput = document.getElementById('calcInChannels');
    const coutInput = document.getElementById('calcOutFilters');
    const biasCheck = document.getElementById('calcIncludeBias');
    const convResult = document.getElementById('calcConvResult');
    const convSteps = document.getElementById('calcConvSteps');

    function calculateConv() {
      const Kw = parseFloat(kwInput.value) || 0;
      const Kh = parseFloat(khInput.value) || 0;
      const Cin = parseFloat(cinInput.value) || 0;
      const Cout = parseFloat(coutInput.value) || 0;
      const hasBias = biasCheck.checked;

      const weights = Kw * Kh * Cin * Cout;
      const biases = hasBias ? Cout : 0;
      const total = weights + biases;

      convResult.textContent = total.toLocaleString();
      convSteps.textContent = `Weights: (${Kw}×${Kh}×${Cin}) × ${Cout} = ${weights.toLocaleString()} | Biases: ${biases} | Total: ${total.toLocaleString()}`;
    }

    [kwInput, khInput, cinInput, coutInput, biasCheck].forEach(inp => {
      if (inp) inp.addEventListener('input', calculateConv);
    });

    // Tab 3: Dense Layer Parameters: (Nin + 1) * Nout
    const denseIn = document.getElementById('calcDenseIn');
    const denseOut = document.getElementById('calcDenseOut');
    const denseResult = document.getElementById('calcDenseResult');
    const denseSteps = document.getElementById('calcDenseSteps');

    function calculateDense() {
      const Nin = parseFloat(denseIn.value) || 0;
      const Nout = parseFloat(denseOut.value) || 0;

      const weights = Nin * Nout;
      const biases = Nout;
      const total = weights + biases;

      denseResult.textContent = total.toLocaleString();
      denseSteps.textContent = `Weights: ${Nin.toLocaleString()} × ${Nout.toLocaleString()} = ${weights.toLocaleString()} | Biases: ${biases.toLocaleString()} | Total: ${total.toLocaleString()}`;
    }

    [denseIn, denseOut].forEach(inp => {
      if (inp) inp.addEventListener('input', calculateDense);
    });
  }

  // =========================================================================
  // 13. Header Navigation & Modals Logic
  // =========================================================================
  function setupHeaderNavigation() {
    const studyNavBtn = document.getElementById('navStudyBtn');
    const practiceNavBtn = document.getElementById('navPracticeBtn');
    const flashcardNavBtn = document.getElementById('navFlashcardBtn');

    const studyView = document.getElementById('studyModeView');
    const practiceView = document.getElementById('practiceModeView');
    const flashcardView = document.getElementById('flashcardModeView');

    function switchMode(newMode) {
      state.currentMode = newMode;
      sound.playClick();

      [studyNavBtn, practiceNavBtn, flashcardNavBtn].forEach(b => b.classList.remove('active'));
      [studyView, practiceView, flashcardView].forEach(v => v.classList.remove('active'));

      if (newMode === 'study') {
        studyNavBtn.classList.add('active');
        studyView.classList.add('active');
        renderStudyCards();
      } else if (newMode === 'practice') {
        practiceNavBtn.classList.add('active');
        practiceView.classList.add('active');
      } else if (newMode === 'flashcards') {
        flashcardNavBtn.classList.add('active');
        flashcardView.classList.add('active');
        renderCurrentFlashcard();
      }
    }

    if (studyNavBtn) studyNavBtn.addEventListener('click', () => switchMode('study'));
    if (practiceNavBtn) practiceNavBtn.addEventListener('click', () => switchMode('practice'));
    if (flashcardNavBtn) flashcardNavBtn.addEventListener('click', () => switchMode('flashcards'));

    // Sound toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const isSoundOn = sound.toggle();
        soundIcon.textContent = isSoundOn ? '🔊' : '🔇';
        soundToggleBtn.querySelector('.btn-tooltip').textContent = isSoundOn ? 'Sound FX (M)' : 'Muted (M)';
        if (isSoundOn) sound.playClick();
      });
    }

    // TTS toggle
    const ttsToggleBtn = document.getElementById('ttsToggleBtn');
    const ttsIcon = document.getElementById('ttsIcon');
    if (ttsToggleBtn) {
      ttsToggleBtn.addEventListener('click', () => {
        const isTtsOn = speech.toggle();
        ttsIcon.textContent = isTtsOn ? '🗣️' : '🤐';
        ttsToggleBtn.querySelector('.btn-tooltip').textContent = isTtsOn ? 'Read Aloud (T)' : 'Voice Off (T)';
        sound.playClick();
      });
    }

    // Modals
    const modals = [
      { btn: 'calcToggleBtn', modal: 'calcModal', close: 'closeCalcBtn' },
      { btn: 'visualizerToggleBtn', modal: 'visualizerModal', close: 'closeVisualizerBtn' },
      { btn: 'cheatSheetBtn', modal: 'cheatSheetModal', close: 'closeCheatSheetBtn' },
      { btn: 'shortcutsBtn', modal: 'shortcutsModal', close: 'closeShortcutsBtn' }
    ];

    modals.forEach(({ btn, modal, close }) => {
      const bEl = document.getElementById(btn);
      const mEl = document.getElementById(modal);
      const cEl = document.getElementById(close);

      if (bEl && mEl) {
        bEl.addEventListener('click', () => {
          sound.playClick();
          mEl.style.display = 'flex';
        });
      }
      if (cEl && mEl) {
        cEl.addEventListener('click', () => {
          mEl.style.display = 'none';
        });
      }
      if (mEl) {
        mEl.addEventListener('click', (e) => {
          if (e.target === mEl) {
            mEl.style.display = 'none';
          }
        });
      }
    });
  }

  // =========================================================================
  // 14. Global Keyboard Shortcuts Handler
  // =========================================================================
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is typing in search input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      const key = e.key.toUpperCase();

      // Escape closes any open modal
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
        return;
      }

      // Hotkey: C -> Calculator
      if (key === 'C') {
        const m = document.getElementById('calcModal');
        if (m) m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
        return;
      }

      // Hotkey: V -> Visualizer
      if (key === 'V') {
        const m = document.getElementById('visualizerModal');
        if (m) m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
        return;
      }

      // Hotkey: H -> Cheat Sheet
      if (key === 'H') {
        const m = document.getElementById('cheatSheetModal');
        if (m) m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
        return;
      }

      // Hotkey: K -> Shortcuts Guide
      if (key === 'K') {
        const m = document.getElementById('shortcutsModal');
        if (m) m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
        return;
      }

      // Hotkey: M -> Toggle Sound
      if (key === 'M') {
        const btn = document.getElementById('soundToggleBtn');
        if (btn) btn.click();
        return;
      }

      // Hotkey: T -> Toggle Read Aloud
      if (key === 'T') {
        const btn = document.getElementById('ttsToggleBtn');
        if (btn) btn.click();
        return;
      }

      // FLASHCARDS MODE SHORTCUTS
      if (state.currentMode === 'flashcards') {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          const flipBtn = document.getElementById('fcFlipActionBtn');
          if (flipBtn) flipBtn.click();
          return;
        }
        if (e.key === 'ArrowRight' || key === 'N') {
          const nextBtn = document.getElementById('fcNextBtn');
          if (nextBtn && !nextBtn.disabled) nextBtn.click();
          return;
        }
        if (e.key === 'ArrowLeft' || key === 'P') {
          const prevBtn = document.getElementById('fcPrevBtn');
          if (prevBtn && !prevBtn.disabled) prevBtn.click();
          return;
        }
      }

      // PRACTICE QUIZ SHORTCUTS
      if (state.currentMode === 'practice' && state.activeQuiz.isActive) {
        const currentQ = state.activeQuiz.questions[state.activeQuiz.currentIndex];
        if (!currentQ) return;

        // 1/A, 2/B, 3/C, 4/D -> Select Option
        const optMapping = {
          '1': 0, 'A': 0,
          '2': 1, 'B': 1,
          '3': 2, 'C': 2,
          '4': 3, 'D': 3
        };

        if (optMapping[key] !== undefined) {
          const optIdx = optMapping[key];
          if (currentQ.options[optIdx]) {
            selectPracticeAnswer(currentQ, currentQ.options[optIdx]);
          }
          return;
        }

        // F -> Toggle Flag
        if (key === 'F') {
          const flagBtn = document.getElementById('flagQuestionBtn');
          if (flagBtn) flagBtn.click();
          return;
        }

        // S -> Scroll Scantron
        if (key === 'S') {
          const sBtn = document.getElementById('scantronToggleBtn');
          if (sBtn) sBtn.click();
          return;
        }

        // Navigation
        if (e.key === 'ArrowRight' || key === 'N') {
          const nextBtn = document.getElementById('nextQuestionBtn');
          if (nextBtn && nextBtn.style.display !== 'none') nextBtn.click();
          return;
        }
        if (e.key === 'ArrowLeft' || key === 'P') {
          const prevBtn = document.getElementById('prevQuestionBtn');
          if (prevBtn && !prevBtn.disabled) prevBtn.click();
          return;
        }
      }
    });
  }

  // =========================================================================
  // 15. Utility Helpers
  // =========================================================================
  function escapeHtml(text) {
    if (!text) return '';
    return text
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 16. Initialization
  // =========================================================================
  function init() {
    updateStatsCounters();
    setupHeaderNavigation();
    setupStudyViewEvents();
    setupPracticeSetupEvents();
    setupActiveQuizControls();
    setupCalculator();
    setupVisualizer();
    initFlashcards();
    setupKeyboardShortcuts();

    renderStudyCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
