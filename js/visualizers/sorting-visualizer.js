/**
 * ALGOVISION - Sorting Visualizer Component
 * Dynamic bars, values, indices, state colors,
 * Heap Sort binary tree dual-view, and Merge/Quick sort aux indicators.
 */

export class SortingVisualizer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(step) {
    if (!step || !step.state || !step.state.array) return;

    const { array, highlightIndices = [], highlightType = 'default', sortedIndices = [], variables = {} } = step.state;
    const maxVal = Math.max(...array, 100);
    const isHeapSort = window.algoVisionApp && window.algoVisionApp.titleEl && window.algoVisionApp.titleEl.textContent.includes('Heap');

    let html = `<div class="sorting-stage-wrapper" style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">`;

    // 1. Dual-View Heap Tree (for Heap Sort)
    if (isHeapSort) {
      html += this.renderHeapTree(array, highlightIndices, highlightType, sortedIndices, variables);
    }

    // 2. Aux Subarray view for Merge Sort (L and R buffers)
    if (variables.L !== undefined && variables.R !== undefined) {
      html += `
        <div class="aux-subarrays-container" style="margin-bottom: 8px;">
          <div style="font-size: 11px; font-weight: 600; color: var(--accent); margin-bottom: 4px;">
            Mảng con tạm thời (Divide & Conquer):
          </div>
          <div class="aux-subarray-row">
            <span style="font-size: 11px; color: var(--syntax-keyword); font-weight: 600;">L [${variables.l}..${variables.m}]:</span>
            <span style="font-family: var(--font-mono); font-size: 12px; background: rgba(99, 102, 241, 0.15); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--primary);">[${variables.L}]</span>
            <span style="margin: 0 10px; color: var(--text-muted);">|</span>
            <span style="font-size: 11px; color: var(--syntax-func); font-weight: 600;">R [${variables.m + 1}..${variables.r}]:</span>
            <span style="font-family: var(--font-mono); font-size: 12px; background: rgba(6, 182, 212, 0.15); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--accent);">[${variables.R}]</span>
          </div>
        </div>
      `;
    }

    // 3. Quick Sort Pivot & Range info banner
    if (variables.low !== undefined && variables.high !== undefined && variables.pivot !== undefined) {
      html += `
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 11px; margin-bottom: 6px;">
          <span class="pointer-badge" style="background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-secondary);">
            Phạm vi phân hoạch: [${variables.low} .. ${variables.high}]
          </span>
          <span class="pointer-badge" style="background: var(--state-pivot); color: #fff;">
            Pivot = ${variables.pivot}
          </span>
        </div>
      `;
    }

    // 4. Main Array Bars
    const barsHeight = isHeapSort ? '150px' : '280px';
    html += `<div class="sorting-bars-container" style="height: ${barsHeight};">`;

    array.forEach((val, idx) => {
      let stateClass = '';

      if (sortedIndices.includes(idx)) {
        stateClass = 'sorted';
      } else if (highlightIndices.includes(idx)) {
        stateClass = highlightType; // 'comparing', 'swapping', 'pivot', 'active'
      }

      // Height proportional to maximum value (minimum 15%, max 92%)
      const heightPercent = Math.max(14, Math.round((val / maxVal) * 90));

      html += `
        <div class="bar-wrapper" data-index="${idx}">
          <div class="bar-element ${stateClass}" style="height: ${heightPercent}%;">
            ${val}
          </div>
          <div class="bar-index">${idx}</div>
        </div>
      `;
    });

    html += `</div></div>`;
    this.container.innerHTML = html;
  }

  /**
   * Renders SVG Binary Heap Tree
   */
  renderHeapTree(array, highlightIndices, highlightType, sortedIndices, variables) {
    const n = Math.min(array.length, 15); // Show first 15 nodes for clear layout
    const svgWidth = 520;
    const svgHeight = 150;

    let treeHtml = `
      <div class="heap-tree-wrapper" style="width: 100%; display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.2); border-radius: 6px; padding: 4px; border: 1px dashed var(--border-color); margin-bottom: 6px;">
        <div style="font-size: 11px; font-weight: 600; color: var(--accent); margin-bottom: 2px;">
          Cấu trúc Max-Heap (Cây nhị phân hoàn chỉnh):
        </div>
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; max-height: 140px;">
    `;

    // Compute coordinates for each node
    const coords = [];
    for (let i = 0; i < n; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const pos = i - (Math.pow(2, level) - 1);
      const totalInLevel = Math.pow(2, level);
      const x = Math.round(svgWidth * ((pos + 0.5) / totalInLevel));
      const y = 22 + level * 36;
      coords.push({ x, y });
    }

    // Draw connecting edges
    for (let i = 0; i < n; i++) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        treeHtml += `<line x1="${coords[i].x}" y1="${coords[i].y}" x2="${coords[left].x}" y2="${coords[left].y}" stroke="var(--border-color)" stroke-width="1.5" />`;
      }
      if (right < n) {
        treeHtml += `<line x1="${coords[i].x}" y1="${coords[i].y}" x2="${coords[right].x}" y2="${coords[right].y}" stroke="var(--border-color)" stroke-width="1.5" />`;
      }
    }

    // Draw nodes
    for (let i = 0; i < n; i++) {
      const { x, y } = coords[i];
      let fillColor = 'var(--bg-surface)';
      let strokeColor = 'var(--border-color)';
      let textColor = 'var(--text-main)';

      if (sortedIndices.includes(i)) {
        fillColor = 'var(--success)';
        strokeColor = 'var(--success)';
        textColor = '#FFFFFF';
      } else if (highlightIndices.includes(i)) {
        if (highlightType === 'swapping') {
          fillColor = 'var(--error)';
          strokeColor = 'var(--error)';
        } else if (highlightType === 'comparing') {
          fillColor = 'var(--warning)';
          strokeColor = 'var(--warning)';
        } else {
          fillColor = 'var(--accent)';
          strokeColor = 'var(--accent)';
        }
        textColor = '#FFFFFF';
      }

      treeHtml += `
        <g>
          <circle cx="${x}" cy="${y}" r="12" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2" />
          <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="10" font-weight="700" font-family="var(--font-mono)" fill="${textColor}">
            ${array[i]}
          </text>
          <text x="${x}" y="${y + 22}" text-anchor="middle" font-size="8" fill="var(--text-muted)" font-family="var(--font-mono)">
            [${i}]
          </text>
        </g>
      `;
    }

    treeHtml += `</svg></div>`;
    return treeHtml;
  }
}
