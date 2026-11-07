/**
 * ALGOVISION - Main Application Orchestrator
 * Connects Execution Engine, Visualizers, Multi-Language Code Viewer,
 * Controls, Comparison Benchmarks, and Quiz System.
 */

import { State } from './state.js';
import { Utils } from './core/utils.js';
import { ExecutionEngine } from './core/execution-engine.js';
import { AudioEngine } from './core/audio-engine.js';
import { AlgorithmsMeta } from './data/algorithms-meta.js';

import { SortingGenerators } from './algorithms/sorting/sorting-generators.js';
import { SearchingGenerators } from './algorithms/searching/searching-generators.js';
import { RecursionGenerators } from './algorithms/recursion/recursion-generators.js';
import { GraphGenerators } from './algorithms/graph/graph-generators.js';

import { SortingVisualizer } from './visualizers/sorting-visualizer.js';
import { SearchingVisualizer } from './visualizers/searching-visualizer.js';
import { RecursionVisualizer } from './visualizers/recursion-visualizer.js';
import { GraphVisualizer } from './visualizers/graph-visualizer.js';

import { CodeViewer } from './components/code-viewer.js';
import { Controls } from './components/controls.js';
import { ComparisonComponent } from './components/comparison.js';
import { QuizComponent } from './components/quiz.js';

class AlgoVisionApp {
  constructor() {
    this.engine = new ExecutionEngine();
    this.audioEngine = new AudioEngine();
    this.initDOMReferences();
    this.initComponents();
    this.bindGlobalEvents();
    this.loadAlgorithm(State.activeAlgorithm);
  }

  initDOMReferences() {
    this.canvasContainer = document.getElementById('visualizer-canvas-container');
    this.controlsContainer = document.getElementById('controls-container');
    this.inputConfigContainer = document.getElementById('input-config-container');
    this.codeViewerContainer = document.getElementById('code-viewer-container');
    this.comparisonContainer = document.getElementById('comparison-view-container');
    this.quizContainer = document.getElementById('quiz-view-container');

    this.sidebar = document.getElementById('app-sidebar');
    this.sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    this.sidebarSearchInput = document.getElementById('sidebar-search-input');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.themeIcon = document.getElementById('theme-icon');

    // Algorithm Info DOM
    this.titleEl = document.getElementById('algo-name-title');
    this.categoryPill = document.getElementById('algo-cat-pill');
    this.descText = document.getElementById('algo-desc-text');
    this.timeComplexityBadge = document.getElementById('badge-time-complexity');
    this.spaceComplexityBadge = document.getElementById('badge-space-complexity');
    this.legendContainer = document.getElementById('stage-legend-container');

    // Bottom Tabs DOM
    this.overviewWhat = document.getElementById('overview-what');
    this.overviewPrinciple = document.getElementById('overview-principle');
    this.overviewPros = document.getElementById('overview-pros');
    this.overviewCons = document.getElementById('overview-cons');
    this.pseudocodeText = document.getElementById('pseudocode-text');
    this.compBest = document.getElementById('comp-best');
    this.compAvg = document.getElementById('comp-avg');
    this.compWorst = document.getElementById('comp-worst');
    this.compSpace = document.getElementById('comp-space');
    this.compStable = document.getElementById('comp-stable');
    this.compInplace = document.getElementById('comp-inplace');
  }

  initComponents() {
    // 1. Visualizers
    this.sortingVisualizer = new SortingVisualizer(this.canvasContainer);
    this.searchingVisualizer = new SearchingVisualizer(this.canvasContainer);
    this.recursionVisualizer = new RecursionVisualizer(this.canvasContainer);
    this.graphVisualizer = new GraphVisualizer(this.canvasContainer, (graphData) => {
      if (State.activeCategory === 'graph') {
        this.generateAndLoadSteps();
      }
    });

    // 2. Multi-Language Code Viewer
    this.codeViewer = new CodeViewer(this.codeViewerContainer, (newLang) => {
      State.activeLanguage = newLang;
      // Re-highlight active line for the new language immediately without restarting
      const currentStep = this.engine.getCurrentStep();
      if (currentStep) {
        this.codeViewer.updateStep(currentStep, this.engine.currentStepIndex, this.engine.steps.length);
      }
    });

    // 3. Execution Engine Callbacks
    this.engine.on('stepChange', (step, index, total) => {
      if (!step) return;
      this.renderVisualizer(step);
      this.codeViewer.updateStep(step, index, total);

      // Play sound feedback
      if (['compare', 'check_relax', 'check_mid', 'heapify_check', 'compare_sub', 'inspect_neighbor'].includes(step.type)) {
        const val1 = step.state?.array?.[step.state?.highlightIndices?.[0]] || 45;
        const val2 = step.state?.array?.[step.state?.highlightIndices?.[1]] || 60;
        this.audioEngine.playCompare(val1, val2);
      } else if (['swap', 'relax', 'relax_edge', 'shift', 'insert', 'merge_place', 'heapify_swap', 'accept_edge', 'enqueue_neighbor'].includes(step.type)) {
        const val1 = step.state?.array?.[step.state?.highlightIndices?.[0]] || 70;
        const val2 = step.state?.array?.[step.state?.highlightIndices?.[1]] || 80;
        this.audioEngine.playSwap(val1, val2);
      } else if (['done', 'found', 'solved'].includes(step.type)) {
        this.audioEngine.playSuccess();
      }
    });

    // 4. Controls & Input Config
    this.controls = new Controls(
      this.controlsContainer,
      this.inputConfigContainer,
      this.engine,
      {
        onToggleSound: () => {
          return this.audioEngine.toggleMute();
        },
        onCustomArray: (arrStr) => {
          const parsed = Utils.parseCustomArray(arrStr);
          if (parsed && parsed.length >= 2) {
            State.sortingArray = parsed;
            this.generateAndLoadSteps();
          } else {
            alert('Vui lòng nhập danh sách số hợp lệ cách nhau bởi dấu phẩy hoặc khoảng trắng (Ví dụ: 45, 12, 78, 23)');
          }
        },
        onRandomArray: (size) => {
          State.sortingArray = Utils.generateRandomArray(size, 10, 95);
          this.generateAndLoadSteps();
        },
        onSearchTargetChange: (target) => {
          State.searchTarget = target;
          this.generateAndLoadSteps();
        },
        onRandomSearchArray: () => {
          State.searchingArray = Utils.generateRandomArray(10, 5, 99).sort((a, b) => a - b);
          // Pick a target from array or nearby
          State.searchTarget = State.searchingArray[Math.floor(Math.random() * State.searchingArray.length)];
          const targetInput = document.getElementById('search-target-input');
          if (targetInput) targetInput.value = State.searchTarget;
          this.generateAndLoadSteps();
        },
        onRecursionParamChange: (paramN) => {
          State.recursionParam = paramN;
          this.generateAndLoadSteps();
        },
        onGraphPresetChange: (presetKey) => {
          this.loadGraphPreset(presetKey);
        },
        onAddNode: () => {
          this.graphVisualizer.addNode();
          this.generateAndLoadSteps();
        },
        onDeleteNode: () => {
          this.graphVisualizer.deleteSelectedNode();
          this.generateAndLoadSteps();
        },
        onRandomGraph: () => {
          this.generateRandomGraph();
          this.generateAndLoadSteps();
        }
      }
    );

    // 5. Comparison Component
    this.comparisonComp = new ComparisonComponent(this.comparisonContainer);

    // 6. Quiz Component
    this.quizComp = new QuizComponent(this.quizContainer);

    // 7. Theme initialization
    const savedTheme = localStorage.getItem('algovision_theme') || 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (this.themeIcon) {
      this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    localStorage.setItem('algovision_theme', theme);
  }

  bindGlobalEvents() {
    // Theme toggle button
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = State.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(nextTheme);
      });
    }

    // Sidebar collapse button
    if (this.sidebarToggleBtn && this.sidebar) {
      this.sidebarToggleBtn.addEventListener('click', () => {
        this.sidebar.classList.toggle('collapsed');
      });
    }

    // Sidebar algorithm click
    document.querySelectorAll('.algo-sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        this.switchAlgorithm(id);
      });
    });

    // Sidebar search filter
    if (this.sidebarSearchInput) {
      this.sidebarSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.algo-sidebar-item').forEach(item => {
          const title = item.querySelector('.algo-title').textContent.toLowerCase();
          const match = title.includes(query);
          item.style.display = match ? 'flex' : 'none';
        });
      });
    }

    // Top Navigation Views (Mô phỏng, So sánh, Quiz, Tài liệu)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = link.getAttribute('data-view');
        this.switchView(viewId);

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Brand logo returns to visualizer view
    const brandLogo = document.getElementById('nav-brand-logo');
    if (brandLogo) {
      brandLogo.addEventListener('click', () => {
        this.switchView('visualizer-view');
        const firstNav = document.querySelector('.nav-link[data-view="visualizer-view"]');
        if (firstNav) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          firstNav.classList.add('active');
        }
      });
    }

    // Learning Panel Bottom Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const pane = document.getElementById(tabId);
        if (pane) pane.classList.add('active');
      });
    });

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.engine.togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.engine.stepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.engine.stepBackward();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        this.engine.reset();
      } else if (e.key === '1') {
        e.preventDefault();
        this.codeViewer.setLanguage('c');
      } else if (e.key === '2') {
        e.preventDefault();
        this.codeViewer.setLanguage('cpp');
      } else if (e.key === '3') {
        e.preventDefault();
        this.codeViewer.setLanguage('python');
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const isMuted = this.audioEngine.toggleMute();
        const btn = document.getElementById('btn-sound-toggle');
        if (btn) btn.textContent = isMuted ? '🔇' : '🔊';
      }
    });
  }

  switchView(viewId) {
    State.activeView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === viewId);
    });

    // If switching away from visualizer, pause execution
    if (viewId !== 'visualizer-view') {
      this.engine.pause();
    }
  }

  switchAlgorithm(algoId) {
    if (State.activeAlgorithm === algoId) return;

    // Switch view to visualizer view if currently in comparison or quiz
    this.switchView('visualizer-view');
    const firstNav = document.querySelector('.nav-link[data-view="visualizer-view"]');
    if (firstNav) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      firstNav.classList.add('active');
    }

    // Update active class in sidebar
    document.querySelectorAll('.algo-sidebar-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-id') === algoId);
    });

    this.loadAlgorithm(algoId);
  }

  loadAlgorithm(algoId) {
    State.activeAlgorithm = algoId;
    const meta = AlgorithmsMeta[algoId];
    if (!meta) return;

    State.activeCategory = meta.category;

    // Update UI Header & Meta
    if (this.titleEl) this.titleEl.textContent = meta.name;
    if (this.categoryPill) this.categoryPill.textContent = meta.categoryLabel;
    if (this.descText) this.descText.textContent = meta.description;
    if (this.timeComplexityBadge) this.timeComplexityBadge.textContent = meta.badge;
    if (this.spaceComplexityBadge) this.spaceComplexityBadge.textContent = meta.complexity.space;

    // Update Bottom Learning Panel
    if (this.overviewWhat) this.overviewWhat.textContent = meta.overview.what;
    if (this.overviewPrinciple) this.overviewPrinciple.textContent = meta.overview.principle;
    if (this.overviewPros) this.overviewPros.textContent = meta.overview.pros;
    if (this.overviewCons) this.overviewCons.textContent = meta.overview.cons;
    if (this.pseudocodeText) this.pseudocodeText.textContent = meta.pseudocode;
    if (this.compBest) this.compBest.textContent = meta.complexity.best;
    if (this.compAvg) this.compAvg.textContent = meta.complexity.average;
    if (this.compWorst) this.compWorst.textContent = meta.complexity.worst;
    if (this.compSpace) this.compSpace.textContent = meta.complexity.space;
    if (this.compStable) this.compStable.textContent = meta.complexity.stable;
    if (this.compInplace) this.compInplace.textContent = meta.complexity.inPlace;

    // Update Legend based on category
    this.updateLegend(meta.category);

    // Update Controls Bar input controls
    this.controls.setCategory(meta.category);

    // Update Code Viewer
    this.codeViewer.setAlgorithm(algoId);

    // Generate Steps & Load
    this.generateAndLoadSteps();
  }

  updateLegend(category) {
    if (!this.legendContainer) return;

    if (category === 'sorting') {
      this.legendContainer.innerHTML = `
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-default);"></div><span>Chưa xét</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-comparing);"></div><span>So sánh</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-swapping);"></div><span>Hoán đổi</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-sorted);"></div><span>Đã sắp xếp</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-pivot);"></div><span>Chốt (Pivot)</span></div>
      `;
    } else if (category === 'searching') {
      this.legendContainer.innerHTML = `
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-active);"></div><span>Đang kiểm tra</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-sorted);"></div><span>Tìm thấy</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--state-dimmed);"></div><span>Đã loại bỏ</span></div>
      `;
    } else if (category === 'recursion') {
      this.legendContainer.innerHTML = `
        <div class="legend-item"><div class="legend-color" style="background-color: var(--accent);"></div><span>Đang thực thi</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--warning);"></div><span>Chờ kết quả</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--success);"></div><span>Đã trả về (Returned)</span></div>
      `;
    } else if (category === 'graph') {
      this.legendContainer.innerHTML = `
        <div class="legend-item"><div class="legend-color" style="background-color: var(--accent);"></div><span>Đỉnh hiện tại</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--success);"></div><span>Đã thăm (Visited / MST)</span></div>
        <div class="legend-item"><div class="legend-color" style="background-color: var(--primary);"></div><span>Chưa thăm</span></div>
      `;
    }
  }

  generateAndLoadSteps() {
    this.engine.pause();
    const algoId = State.activeAlgorithm;
    let steps = [];

    if (SortingGenerators[algoId]) {
      steps = SortingGenerators[algoId](State.sortingArray);
    } else if (SearchingGenerators[algoId]) {
      steps = SearchingGenerators[algoId](State.searchingArray, State.searchTarget);
    } else if (RecursionGenerators[algoId]) {
      steps = RecursionGenerators[algoId](State.recursionParam);
    } else if (GraphGenerators[algoId]) {
      steps = GraphGenerators[algoId](this.graphVisualizer.graphData, 0);
    }

    State.currentSteps = steps;
    this.engine.loadSteps(steps);
  }

  renderVisualizer(step) {
    const category = State.activeCategory;
    if (category === 'sorting') {
      this.sortingVisualizer.render(step);
    } else if (category === 'searching') {
      this.searchingVisualizer.render(step);
    } else if (category === 'recursion') {
      this.recursionVisualizer.render(step);
    } else if (category === 'graph') {
      this.graphVisualizer.render(step);
    }
  }

  loadGraphPreset(presetKey) {
    if (presetKey === 'tree') {
      this.graphVisualizer.setGraphData({
        isDirected: false,
        isWeighted: false,
        nodes: [
          { id: 0, label: '0', x: 270, y: 50 },
          { id: 1, label: '1', x: 160, y: 130 },
          { id: 2, label: '2', x: 380, y: 130 },
          { id: 3, label: '3', x: 100, y: 230 },
          { id: 4, label: '4', x: 220, y: 230 },
          { id: 5, label: '5', x: 320, y: 230 },
          { id: 6, label: '6', x: 440, y: 230 }
        ],
        edges: [
          { u: 0, v: 1, weight: 1 },
          { u: 0, v: 2, weight: 1 },
          { u: 1, v: 3, weight: 1 },
          { u: 1, v: 4, weight: 1 },
          { u: 2, v: 5, weight: 1 },
          { u: 2, v: 6, weight: 1 }
        ]
      });
    } else if (presetKey === 'dag') {
      this.graphVisualizer.setGraphData({
        isDirected: true,
        isWeighted: false,
        nodes: [
          { id: 0, label: '0', x: 80, y: 150 },
          { id: 1, label: '1', x: 200, y: 80 },
          { id: 2, label: '2', x: 200, y: 220 },
          { id: 3, label: '3', x: 340, y: 80 },
          { id: 4, label: '4', x: 340, y: 220 },
          { id: 5, label: '5', x: 460, y: 150 }
        ],
        edges: [
          { u: 0, v: 1, weight: 1 },
          { u: 0, v: 2, weight: 1 },
          { u: 1, v: 3, weight: 1 },
          { u: 2, v: 4, weight: 1 },
          { u: 3, v: 5, weight: 1 },
          { u: 4, v: 5, weight: 1 },
          { u: 2, v: 3, weight: 1 }
        ]
      });
    } else if (presetKey === 'cycle') {
      this.graphVisualizer.setGraphData({
        isDirected: false,
        isWeighted: false,
        nodes: [
          { id: 0, label: '0', x: 140, y: 80 },
          { id: 1, label: '1', x: 320, y: 80 },
          { id: 2, label: '2', x: 400, y: 200 },
          { id: 3, label: '3', x: 230, y: 260 },
          { id: 4, label: '4', x: 90, y: 200 }
        ],
        edges: [
          { u: 0, v: 1, weight: 1 },
          { u: 1, v: 2, weight: 1 },
          { u: 2, v: 3, weight: 1 },
          { u: 3, v: 4, weight: 1 },
          { u: 4, v: 0, weight: 1 }
        ]
      });
    } else if (presetKey === 'disconnected') {
      this.graphVisualizer.setGraphData({
        isDirected: false,
        isWeighted: false,
        nodes: [
          { id: 0, label: '0', x: 90, y: 100 },
          { id: 1, label: '1', x: 190, y: 100 },
          { id: 2, label: '2', x: 140, y: 200 },
          { id: 3, label: '3', x: 340, y: 100 },
          { id: 4, label: '4', x: 450, y: 100 },
          { id: 5, label: '5', x: 395, y: 200 }
        ],
        edges: [
          { u: 0, v: 1, weight: 1 },
          { u: 1, v: 2, weight: 1 },
          { u: 2, v: 0, weight: 1 },
          { u: 3, v: 4, weight: 1 },
          { u: 4, v: 5, weight: 1 },
          { u: 5, v: 3, weight: 1 }
        ]
      });
    } else {
      this.graphVisualizer.setGraphData(this.graphVisualizer.getDefaultGraph());
    }

    this.generateAndLoadSteps();
  }

  generateRandomGraph() {
    const nodeCount = 6;
    const nodes = [];
    const width = 480;
    const height = 260;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * 2 * Math.PI;
      const x = Math.round(270 + 170 * Math.cos(angle));
      const y = Math.round(160 + 100 * Math.sin(angle));
      nodes.push({ id: i, label: String(i), x, y });
    }

    const edges = [];
    for (let i = 0; i < nodeCount; i++) {
      edges.push({ u: i, v: (i + 1) % nodeCount, weight: Math.floor(Math.random() * 9) + 1 });
    }
    // Add 2-3 cross chords
    edges.push({ u: 0, v: 3, weight: Math.floor(Math.random() * 9) + 1 });
    edges.push({ u: 1, v: 4, weight: Math.floor(Math.random() * 9) + 1 });

    this.graphVisualizer.setGraphData({
      isDirected: false,
      isWeighted: true,
      nodes,
      edges
    });
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.algoVisionApp = new AlgoVisionApp();
});
