/**
 * ALGOVISION - Algorithm Comparison & Benchmark Component
 * Multi-algorithm shootout, performance.now() browser benchmark,
 * comparisons count, swaps count, memory and visual bar charts.
 */

import { Utils } from '../core/utils.js';

export class ComparisonComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.availableAlgos = [
      { id: 'bubble-sort', name: 'Bubble Sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
      { id: 'selection-sort', name: 'Selection Sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
      { id: 'insertion-sort', name: 'Insertion Sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
      { id: 'merge-sort', name: 'Merge Sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)' },
      { id: 'quick-sort', name: 'Quick Sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(log n)' },
      { id: 'heap-sort', name: 'Heap Sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)' },
      { id: 'shell-sort', name: 'Shell Sort', timeComplexity: 'O(n^1.5)', spaceComplexity: 'O(1)' }
    ];
    this.selectedAlgos = ['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'];
    this.datasetSize = 1000;
    this.benchmarkResults = [];

    this.render();
  }

  render() {
    let selectorChipsHtml = '';
    this.availableAlgos.forEach(algo => {
      const isSelected = this.selectedAlgos.includes(algo.id);
      selectorChipsHtml += `
        <div class="algo-multi-select-chip ${isSelected ? 'selected' : ''}" data-id="${algo.id}">
          <span>${isSelected ? '✓' : '+'}</span>
          <span>${algo.name}</span>
        </div>
      `;
    });

    let resultsHtml = '';
    if (this.benchmarkResults.length > 0) {
      const maxTime = Math.max(...this.benchmarkResults.map(r => r.timeMs), 0.1);

      this.benchmarkResults.forEach(res => {
        const percent = Math.max(5, Math.min(100, (res.timeMs / maxTime) * 100));

        resultsHtml += `
          <div class="benchmark-card">
            <div class="benchmark-card-title">
              <h3>${res.name}</h3>
              <span class="complexity-badge"><strong>${res.timeComplexity}</strong></span>
            </div>

            <div class="benchmark-metric-row">
              <span class="benchmark-metric-label">Thời gian thực thi (trình duyệt):</span>
              <span class="benchmark-metric-value highlight-time">${res.timeMs.toFixed(2)} ms</span>
            </div>
            <div class="benchmark-metric-row">
              <span class="benchmark-metric-label">Số phép so sánh:</span>
              <span class="benchmark-metric-value">${res.comparisons.toLocaleString()}</span>
            </div>
            <div class="benchmark-metric-row">
              <span class="benchmark-metric-label">Số lần hoán đổi (Swaps):</span>
              <span class="benchmark-metric-value">${res.swaps.toLocaleString()}</span>
            </div>
            <div class="benchmark-metric-row">
              <span class="benchmark-metric-label">Bộ nhớ phụ (Space):</span>
              <span class="benchmark-metric-value">${res.spaceComplexity}</span>
            </div>

            <div class="chart-bar-container">
              <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
                <span>Thời gian tương đối</span>
                <span>${res.timeMs.toFixed(2)} ms</span>
              </div>
              <div class="chart-bar-track">
                <div class="chart-bar-fill" style="width: ${percent}%;"></div>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      resultsHtml = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          Chọn các thuật toán và kích thước dữ liệu, sau đó nhấn "Chạy Benchmark so sánh" để bắt đầu đo lường hiệu năng thực tế.
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="comparison-container">
        <!-- Header Control -->
        <div class="comparison-header-card">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">
              SO SÁNH HIỆU NĂNG THỰC TẾ TRÊN CÙNG BỘ DỮ LIỆU
            </div>
            <div class="comparison-selectors">
              ${selectorChipsHtml}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="input-group">
              <label>Kích thước n:</label>
              <select id="benchmark-size-select">
                <option value="500" ${this.datasetSize === 500 ? 'selected' : ''}>500 phần tử</option>
                <option value="1000" ${this.datasetSize === 1000 ? 'selected' : ''}>1,000 phần tử</option>
                <option value="2500" ${this.datasetSize === 2500 ? 'selected' : ''}>2,500 phần tử</option>
                <option value="5000" ${this.datasetSize === 5000 ? 'selected' : ''}>5,000 phần tử</option>
              </select>
            </div>
            <button class="btn btn-primary" id="btn-run-benchmark">
              <span>⚡ Chạy Benchmark so sánh</span>
            </button>
          </div>
        </div>

        <div style="font-size: 11px; color: var(--text-muted); font-style: italic;">
          * Ghi chú: Thời gian đo lường được thực hiện trực tiếp bằng High-Resolution Timer (performance.now()) trên JavaScript engine của trình duyệt người dùng.
        </div>

        <!-- Benchmark Cards Grid -->
        <div class="comparison-results-grid">
          ${resultsHtml}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.algo-multi-select-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-id');
        if (this.selectedAlgos.includes(id)) {
          if (this.selectedAlgos.length > 1) {
            this.selectedAlgos = this.selectedAlgos.filter(x => x !== id);
          }
        } else {
          this.selectedAlgos.push(id);
        }
        this.render();
      });
    });

    const sizeSelect = this.container.querySelector('#benchmark-size-select');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        this.datasetSize = parseInt(e.target.value, 10);
      });
    }

    const runBtn = this.container.querySelector('#btn-run-benchmark');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        this.runBenchmark();
      });
    }
  }

  runBenchmark() {
    // Generate unified random array for all algorithms
    const testArray = Utils.generateRandomArray(this.datasetSize, 1, 10000);
    this.benchmarkResults = [];

    this.selectedAlgos.forEach(algoId => {
      const algoMeta = this.availableAlgos.find(a => a.id === algoId);
      const arrCopy = [...testArray];

      let comparisons = 0;
      let swaps = 0;

      const t0 = performance.now();

      if (algoId === 'bubble-sort') {
        const n = arrCopy.length;
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (arrCopy[j] > arrCopy[j + 1]) {
              swaps++;
              const t = arrCopy[j]; arrCopy[j] = arrCopy[j + 1]; arrCopy[j + 1] = t;
            }
          }
        }
      } else if (algoId === 'selection-sort') {
        const n = arrCopy.length;
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arrCopy[j] < arrCopy[minIdx]) minIdx = j;
          }
          if (minIdx !== i) {
            swaps++;
            const t = arrCopy[i]; arrCopy[i] = arrCopy[minIdx]; arrCopy[minIdx] = t;
          }
        }
      } else if (algoId === 'insertion-sort') {
        const n = arrCopy.length;
        for (let i = 1; i < n; i++) {
          const key = arrCopy[i];
          let j = i - 1;
          while (j >= 0) {
            comparisons++;
            if (arrCopy[j] > key) {
              arrCopy[j + 1] = arrCopy[j];
              swaps++;
              j--;
            } else {
              break;
            }
          }
          arrCopy[j + 1] = key;
        }
      } else if (algoId === 'merge-sort') {
        function ms(a, l, r) {
          if (l >= r) return;
          const m = Math.floor(l + (r - l) / 2);
          ms(a, l, m);
          ms(a, m + 1, r);
          const L = a.slice(l, m + 1);
          const R = a.slice(m + 1, r + 1);
          let i = 0, j = 0, k = l;
          while (i < L.length && j < R.length) {
            comparisons++;
            if (L[i] <= R[j]) a[k++] = L[i++];
            else { a[k++] = R[j++]; swaps++; }
          }
          while (i < L.length) a[k++] = L[i++];
          while (j < R.length) a[k++] = R[j++];
        }
        ms(arrCopy, 0, arrCopy.length - 1);
      } else if (algoId === 'quick-sort') {
        function qs(a, low, high) {
          if (low < high) {
            const pivot = a[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
              comparisons++;
              if (a[j] < pivot) {
                i++;
                swaps++;
                const t = a[i]; a[i] = a[j]; a[j] = t;
              }
            }
            swaps++;
            const t = a[i + 1]; a[i + 1] = a[high]; a[high] = t;
            const pi = i + 1;
            qs(a, low, pi - 1);
            qs(a, pi + 1, high);
          }
        }
        qs(arrCopy, 0, arrCopy.length - 1);
      } else if (algoId === 'heap-sort') {
        const n = arrCopy.length;
        function hp(len, i) {
          let largest = i;
          const l = 2 * i + 1, r = 2 * i + 2;
          if (l < len) {
            comparisons++;
            if (arrCopy[l] > arrCopy[largest]) largest = l;
          }
          if (r < len) {
            comparisons++;
            if (arrCopy[r] > arrCopy[largest]) largest = r;
          }
          if (largest !== i) {
            swaps++;
            const t = arrCopy[i]; arrCopy[i] = arrCopy[largest]; arrCopy[largest] = t;
            hp(len, largest);
          }
        }
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) hp(n, i);
        for (let i = n - 1; i > 0; i--) {
          swaps++;
          const t = arrCopy[0]; arrCopy[0] = arrCopy[i]; arrCopy[i] = t;
          hp(i, 0);
        }
      } else if (algoId === 'shell-sort') {
        const n = arrCopy.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
          for (let i = gap; i < n; i++) {
            const temp = arrCopy[i];
            let j = i;
            while (j >= gap) {
              comparisons++;
              if (arrCopy[j - gap] > temp) {
                arrCopy[j] = arrCopy[j - gap];
                swaps++;
                j -= gap;
              } else break;
            }
            arrCopy[j] = temp;
          }
        }
      }

      const t1 = performance.now();
      const timeMs = t1 - t0;

      this.benchmarkResults.push({
        id: algoId,
        name: algoMeta.name,
        timeComplexity: algoMeta.timeComplexity,
        spaceComplexity: algoMeta.spaceComplexity,
        timeMs,
        comparisons,
        swaps
      });
    });

    this.render();
  }
}
