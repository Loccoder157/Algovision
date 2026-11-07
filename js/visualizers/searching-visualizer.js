/**
 * ALGOVISION - Searching Visualizer Component
 * Horizontal array cells, Left/Mid/Right pointers, eliminated shades, found celebrate
 */

export class SearchingVisualizer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(step) {
    if (!step || !step.state || !step.state.array) return;

    const { array, target, left = -1, right = -1, mid = -1, currentIndex = -1, status = '', eliminatedIndices = [] } = step.state;

    let html = `
      <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
          <span>Mục tiêu cần tìm:</span>
          <span style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: var(--accent); background: rgba(6, 182, 212, 0.15); padding: 2px 10px; border-radius: var(--radius-xs); border: 1px solid var(--accent);">${target}</span>
        </div>
        <div class="searching-cells-container">
    `;

    array.forEach((val, idx) => {
      let cellClass = '';
      let pointerTag = '';

      if (idx === currentIndex && status === 'found') {
        cellClass = 'found';
      } else if (idx === mid) {
        cellClass = 'current';
        pointerTag = '<span class="pointer-badge mid">MID</span>';
      } else if (idx === currentIndex) {
        cellClass = 'current';
        pointerTag = '<span class="pointer-badge">CHECK</span>';
      } else if (eliminatedIndices.includes(idx)) {
        cellClass = 'eliminated';
      }

      let extraPointer = '';
      if (idx === left && idx === right) {
        extraPointer = '<span class="pointer-badge" style="background: var(--secondary);">L=R</span>';
      } else if (idx === left) {
        extraPointer = '<span class="pointer-badge">LEFT</span>';
      } else if (idx === right) {
        extraPointer = '<span class="pointer-badge" style="background: var(--warning);">RIGHT</span>';
      }

      html += `
        <div class="search-cell-wrapper" data-index="${idx}">
          <div class="search-cell-pointer">${extraPointer || pointerTag || '&nbsp;'}</div>
          <div class="search-cell-box ${cellClass}">
            ${val}
          </div>
          <div class="search-cell-index">[${idx}]</div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }
}
