/**
 * ALGOVISION - Simulation Control Bar & Input Config Component
 * Play, pause, step forward, rewind backward, speed slider, step counter,
 * and adaptive input configuration for Sorting, Searching, Recursion, and Graph.
 */

export class Controls {
  constructor(controlBarContainer, inputConfigContainer, engine, callbacks = {}) {
    this.controlBarEl = controlBarContainer;
    this.inputConfigEl = inputConfigContainer;
    this.engine = engine;
    this.callbacks = callbacks; // onArrayChange, onTargetChange, onParamChange, onGraphPresetChange, etc.
    this.currentCategory = 'sorting';

    this.render();
    this.bindEvents();
  }

  setCategory(category) {
    this.currentCategory = category;
    this.renderInputConfig();
  }

  render() {
    this.controlBarEl.innerHTML = `
      <div class="control-bar-card">
        <div class="playback-controls">
          <button class="btn btn-icon" id="btn-reset" title="Khởi động lại (Reset)">⏮</button>
          <button class="btn btn-icon" id="btn-step-back" title="Lùi 1 bước (Step Backward - Rewind)">◀</button>
          <button class="btn play-main-btn" id="btn-play-pause" title="Chạy / Tạm dừng (Play / Pause)">
            <span id="play-icon">▶</span>
          </button>
          <button class="btn btn-icon" id="btn-step-forward" title="Tiến 1 bước (Step Forward)">▶</button>
          <button class="btn btn-icon" id="btn-sound-toggle" title="Âm thanh hiệu ứng (Mute / Unmute)">🔊</button>
          <div class="step-indicator-badge" id="step-badge">Step: 0 / 0</div>
        </div>

        <div class="speed-control-group">
          <span class="speed-label">Tốc độ:</span>
          <input type="range" class="speed-slider" id="speed-slider" min="0.25" max="3.0" step="0.25" value="1.0" />
          <span class="speed-val-badge" id="speed-badge">1.0x</span>
        </div>
      </div>
    `;

    this.renderInputConfig();
  }

  renderInputConfig() {
    if (!this.inputConfigEl) return;

    if (this.currentCategory === 'sorting') {
      this.inputConfigEl.innerHTML = `
        <div class="input-config-card">
          <div class="input-group">
            <label>Mảng tùy chỉnh:</label>
            <input type="text" id="custom-array-input" placeholder="Ví dụ: 45, 12, 78, 23, 9, 56, 34" />
            <button class="btn btn-secondary" id="btn-apply-array">Áp dụng</button>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="input-group">
              <label>Số phần tử:</label>
              <input type="number" id="array-size-input" min="5" max="25" value="12" />
            </div>
            <button class="btn btn-primary" id="btn-random-array">
              <span>🎲 Ngẫu nhiên</span>
            </button>
          </div>
        </div>
      `;
    } else if (this.currentCategory === 'searching') {
      this.inputConfigEl.innerHTML = `
        <div class="input-config-card">
          <div class="input-group">
            <label>Giá trị cần tìm:</label>
            <input type="number" id="search-target-input" value="38" style="width: 80px;" />
            <button class="btn btn-primary" id="btn-apply-target">Tìm kiếm</button>
          </div>
          <div class="input-group">
            <label>Mảng (tự động sắp xếp):</label>
            <button class="btn btn-secondary" id="btn-random-search-arr">🎲 Tạo mảng mới</button>
          </div>
        </div>
      `;
    } else if (this.currentCategory === 'recursion') {
      this.inputConfigEl.innerHTML = `
        <div class="input-config-card">
          <div class="input-group">
            <label>Tham số đầu vào (N):</label>
            <input type="number" id="rec-param-input" min="1" max="6" value="4" style="width: 70px;" />
            <button class="btn btn-primary" id="btn-apply-rec-param">Cập nhật</button>
            <span style="font-size: 11px; color: var(--text-muted);">(Giới hạn N ≤ 6 để Call Stack trực quan rõ ràng)</span>
          </div>
        </div>
      `;
    } else if (this.currentCategory === 'graph') {
      this.inputConfigEl.innerHTML = `
        <div class="input-config-card">
          <div class="input-group">
            <label>Đồ thị mẫu:</label>
            <select id="graph-preset-select">
              <option value="default">Dijkstra Demo (6 đỉnh, 9 cạnh)</option>
              <option value="tree">Cây nhị phân (Binary Tree)</option>
              <option value="dag">Đồ thị có hướng DAG (Topological)</option>
              <option value="cycle">Đồ thị chứa chu trình</option>
              <option value="disconnected">Đồ thị nhiều thành phần</option>
            </select>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button class="btn btn-secondary" id="btn-add-node">➕ Thêm Đỉnh</button>
            <button class="btn btn-secondary" id="btn-del-node">🗑 Xóa Đỉnh đã chọn</button>
            <button class="btn btn-secondary" id="btn-random-graph">🎲 Đồ thị ngẫu nhiên</button>
          </div>
        </div>
      `;
    }

    this.bindInputEvents();
  }

  bindEvents() {
    const playPauseBtn = this.controlBarEl.querySelector('#btn-play-pause');
    const playIcon = this.controlBarEl.querySelector('#play-icon');
    const stepForwardBtn = this.controlBarEl.querySelector('#btn-step-forward');
    const stepBackBtn = this.controlBarEl.querySelector('#btn-step-back');
    const resetBtn = this.controlBarEl.querySelector('#btn-reset');
    const speedSlider = this.controlBarEl.querySelector('#speed-slider');
    const speedBadge = this.controlBarEl.querySelector('#speed-badge');
    const soundToggleBtn = this.controlBarEl.querySelector('#btn-sound-toggle');

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        if (this.callbacks.onToggleSound) {
          const isMuted = this.callbacks.onToggleSound();
          soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
        }
      });
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        this.engine.togglePlayPause();
      });
    }

    if (stepForwardBtn) {
      stepForwardBtn.addEventListener('click', () => {
        this.engine.stepForward();
      });
    }

    if (stepBackBtn) {
      stepBackBtn.addEventListener('click', () => {
        this.engine.stepBackward();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.engine.reset();
      });
    }

    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.engine.setSpeed(val);
        if (speedBadge) speedBadge.textContent = `${val.toFixed(2).replace(/\.00$/, '')}x`;
      });
    }

    // Engine listeners
    this.engine.on('playbackChange', (isPlaying) => {
      if (playIcon) playIcon.textContent = isPlaying ? '⏸' : '▶';
    });

    this.engine.on('stepChange', (step, index, total) => {
      const badge = this.controlBarEl.querySelector('#step-badge');
      if (badge) {
        badge.textContent = `Step: ${index + 1} / ${total || 0}`;
      }
    });
  }

  bindInputEvents() {
    // 1. Sorting input events
    const applyArrayBtn = this.inputConfigEl.querySelector('#btn-apply-array');
    const customArrayInput = this.inputConfigEl.querySelector('#custom-array-input');
    const randomArrayBtn = this.inputConfigEl.querySelector('#btn-random-array');
    const arraySizeInput = this.inputConfigEl.querySelector('#array-size-input');

    if (applyArrayBtn && customArrayInput) {
      applyArrayBtn.addEventListener('click', () => {
        const val = customArrayInput.value;
        if (this.callbacks.onCustomArray) this.callbacks.onCustomArray(val);
      });
    }

    if (randomArrayBtn) {
      randomArrayBtn.addEventListener('click', () => {
        const size = arraySizeInput ? parseInt(arraySizeInput.value, 10) || 12 : 12;
        if (this.callbacks.onRandomArray) this.callbacks.onRandomArray(size);
      });
    }

    // 2. Searching input events
    const applyTargetBtn = this.inputConfigEl.querySelector('#btn-apply-target');
    const searchTargetInput = this.inputConfigEl.querySelector('#search-target-input');
    const randomSearchArrBtn = this.inputConfigEl.querySelector('#btn-random-search-arr');

    if (applyTargetBtn && searchTargetInput) {
      applyTargetBtn.addEventListener('click', () => {
        const target = parseInt(searchTargetInput.value, 10) || 0;
        if (this.callbacks.onSearchTargetChange) this.callbacks.onSearchTargetChange(target);
      });
    }

    if (randomSearchArrBtn) {
      randomSearchArrBtn.addEventListener('click', () => {
        if (this.callbacks.onRandomSearchArray) this.callbacks.onRandomSearchArray();
      });
    }

    // 3. Recursion input events
    const applyRecBtn = this.inputConfigEl.querySelector('#btn-apply-rec-param');
    const recParamInput = this.inputConfigEl.querySelector('#rec-param-input');

    if (applyRecBtn && recParamInput) {
      applyRecBtn.addEventListener('click', () => {
        const p = parseInt(recParamInput.value, 10) || 4;
        if (this.callbacks.onRecursionParamChange) this.callbacks.onRecursionParamChange(p);
      });
    }

    // 4. Graph input events
    const presetSelect = this.inputConfigEl.querySelector('#graph-preset-select');
    const addNodeBtn = this.inputConfigEl.querySelector('#btn-add-node');
    const delNodeBtn = this.inputConfigEl.querySelector('#btn-del-node');
    const randomGraphBtn = this.inputConfigEl.querySelector('#btn-random-graph');

    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        if (this.callbacks.onGraphPresetChange) this.callbacks.onGraphPresetChange(e.target.value);
      });
    }

    if (addNodeBtn) {
      addNodeBtn.addEventListener('click', () => {
        if (this.callbacks.onAddNode) this.callbacks.onAddNode();
      });
    }

    if (delNodeBtn) {
      delNodeBtn.addEventListener('click', () => {
        if (this.callbacks.onDeleteNode) this.callbacks.onDeleteNode();
      });
    }

    if (randomGraphBtn) {
      randomGraphBtn.addEventListener('click', () => {
        if (this.callbacks.onRandomGraph) this.callbacks.onRandomGraph();
      });
    }
  }
}
