/**
 * ALGOVISION - Multi-Language Code Viewer Component
 * Instant toggle between C, C++, and Python; line synchronization, copy, expand,
 * and dynamic Vietnamese step explanation.
 */

import { CodeRegistry } from '../code/registry.js';
import { SyntaxHighlighter } from '../core/syntax-highlighter.js';

export class CodeViewer {
  constructor(panelElement, onLanguageChange = null) {
    this.panel = panelElement;
    this.onLanguageChange = onLanguageChange;
    this.currentAlgoId = 'bubble-sort';
    this.currentLang = 'cpp'; // Default: C++
    this.currentStep = null;
    this.isExpanded = false;

    this.render();
  }

  setAlgorithm(algoId) {
    this.currentAlgoId = algoId;
    this.updateCodeDisplay();
    this.updateStep(this.currentStep);
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    this.updateCodeDisplay();
    this.updateStep(this.currentStep);
    if (this.onLanguageChange) this.onLanguageChange(lang);
  }

  render() {
    this.panel.innerHTML = `
      <div class="code-viewer-panel ${this.isExpanded ? 'expanded' : ''}">
        <div class="code-viewer-header">
          <!-- Segmented Language Control -->
          <div class="lang-selector-group">
            <button class="lang-tab-btn ${this.currentLang === 'c' ? 'active' : ''}" data-lang="c">C</button>
            <button class="lang-tab-btn ${this.currentLang === 'cpp' ? 'active' : ''}" data-lang="cpp">C++</button>
            <button class="lang-tab-btn ${this.currentLang === 'python' ? 'active' : ''}" data-lang="python">Python</button>
          </div>

          <div class="code-header-actions">
            <button class="code-action-btn" id="copy-code-btn" title="Sao chép mã nguồn">
              <span id="copy-icon">📋</span>
              <span id="copy-text">Copy</span>
            </button>
            <button class="code-action-btn" id="download-code-btn" title="Tải về file mã nguồn (.c, .cpp, .py)">
              <span>💾</span>
              <span>Lưu file</span>
            </button>
            <button class="code-action-btn" id="expand-code-btn" title="Mở rộng / Thu nhỏ">
              <span id="expand-icon">⛶</span>
            </button>
          </div>
        </div>

        <!-- Code Content -->
        <div class="code-content-wrapper" id="code-scroll-container">
          <div class="code-line-numbers" id="code-gutter"></div>
          <div class="code-lines-container" id="code-body"></div>
        </div>
      </div>

      <!-- Step Explanation Card Underneath Code -->
      <div class="step-explanation-card" id="explanation-container">
        <div class="explanation-header">
          <h4>💡 GIẢI THÍCH TỪNG BƯỚC (STEP EXPLANATION)</h4>
          <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);" id="explanation-step-num">Step: 0</span>
        </div>
        <div class="explanation-active-line-code" id="explanation-code-preview">
          // Đang sẵn sàng chạy thuật toán...
        </div>
        <div class="explanation-body-text" id="explanation-desc">
          Nhấn nút Play hoặc Step Forward để bắt đầu theo dõi từng bước xử lý của thuật toán.
        </div>
        <div class="variable-tracker-row" id="explanation-variables">
          <span style="font-size: 11px; color: var(--text-muted);">Biến: Chưa khởi tạo</span>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateCodeDisplay();
  }

  bindEvents() {
    this.panel.querySelectorAll('.lang-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });

    const copyBtn = this.panel.querySelector('#copy-code-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const rawCode = CodeRegistry.getCode(this.currentAlgoId, this.currentLang);
        navigator.clipboard.writeText(rawCode).then(() => {
          const copyText = this.panel.querySelector('#copy-text');
          if (copyText) {
            copyText.textContent = 'Đã chép!';
            setTimeout(() => { copyText.textContent = 'Copy'; }, 1500);
          }
        });
      });
    }

    const downloadBtn = this.panel.querySelector('#download-code-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const rawCode = CodeRegistry.getCode(this.currentAlgoId, this.currentLang);
        const ext = this.currentLang === 'c' ? 'c' : (this.currentLang === 'cpp' ? 'cpp' : 'py');
        const filename = `${this.currentAlgoId}.${ext}`;
        const blob = new Blob([rawCode], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    const expandBtn = this.panel.querySelector('#expand-code-btn');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        this.isExpanded = !this.isExpanded;
        const panelEl = this.panel.querySelector('.code-viewer-panel');
        if (panelEl) panelEl.classList.toggle('expanded', this.isExpanded);
      });
    }
  }

  updateCodeDisplay() {
    // Update active tab buttons
    this.panel.querySelectorAll('.lang-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
    });

    const rawCode = CodeRegistry.getCode(this.currentAlgoId, this.currentLang);
    const highlightedLines = SyntaxHighlighter.tokenize(rawCode, this.currentLang);

    const gutter = this.panel.querySelector('#code-gutter');
    const body = this.panel.querySelector('#code-body');

    if (!gutter || !body) return;

    let gutterHtml = '';
    let bodyHtml = '';

    highlightedLines.forEach((lineHtml, idx) => {
      const lineNum = idx + 1;
      gutterHtml += `<div>${lineNum}</div>`;
      bodyHtml += `<div class="code-line" data-line="${lineNum}">${lineHtml}</div>`;
    });

    gutter.innerHTML = gutterHtml;
    body.innerHTML = bodyHtml;
  }

  updateStep(step, stepIndex = 0, totalSteps = 0) {
    this.currentStep = step;
    if (!step) return;

    // 1. Highlight Active Line
    const activeLineNum = step.activeLine ? step.activeLine[this.currentLang] : null;
    const scrollContainer = this.panel.querySelector('#code-scroll-container');

    this.panel.querySelectorAll('.code-line').forEach(lineEl => {
      const line = Number(lineEl.getAttribute('data-line'));
      if (line === activeLineNum) {
        lineEl.classList.add('active');
        // Smooth auto-scroll restricted specifically inside code scroll container
        if (scrollContainer) {
          const lineTop = lineEl.offsetTop;
          const lineBottom = lineTop + lineEl.offsetHeight;
          const containerTop = scrollContainer.scrollTop;
          const containerBottom = containerTop + scrollContainer.clientHeight;
          if (lineTop < containerTop) {
            scrollContainer.scrollTo({ top: Math.max(0, lineTop - 30), behavior: 'smooth' });
          } else if (lineBottom > containerBottom) {
            scrollContainer.scrollTo({ top: lineBottom - scrollContainer.clientHeight + 30, behavior: 'smooth' });
          }
        }
      } else {
        lineEl.classList.remove('active');
      }
    });

    // 2. Update Explanation Card Underneath
    const stepNumEl = this.panel.querySelector('#explanation-step-num');
    if (stepNumEl) {
      stepNumEl.textContent = `Bước: ${stepIndex + 1} / ${totalSteps || 1}`;
    }

    const descEl = this.panel.querySelector('#explanation-desc');
    if (descEl && step.description) {
      descEl.textContent = step.description;
    }

    // 3. Active line preview
    const previewEl = this.panel.querySelector('#explanation-code-preview');
    if (previewEl && activeLineNum) {
      const rawCode = CodeRegistry.getCode(this.currentAlgoId, this.currentLang);
      const lines = rawCode.split('\n');
      const activeLineCode = lines[activeLineNum - 1] || '';
      previewEl.textContent = `Dòng ${activeLineNum} [${this.currentLang.toUpperCase()}]: ${activeLineCode.trim()}`;
    }

    // 4. Variables tracker
    const varsContainer = this.panel.querySelector('#explanation-variables');
    if (varsContainer && step.state && step.state.variables) {
      const vars = step.state.variables;
      let varsHtml = '';
      Object.keys(vars).forEach(k => {
        varsHtml += `
          <div class="variable-chip">
            <span class="var-name">${k}:</span>
            <span class="var-val">${vars[k]}</span>
          </div>
        `;
      });
      varsContainer.innerHTML = varsHtml || '<span style="font-size: 11px; color: var(--text-muted);">Không có biến thay đổi</span>';
    }
  }
}
