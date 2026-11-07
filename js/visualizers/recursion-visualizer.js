/**
 * ALGOVISION - Recursion Visualizer Component
 * Visualizes Call Stack frames, return values, recursion tree, and N-Queens chessboard
 */

export class RecursionVisualizer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(step) {
    if (!step || !step.state) return;

    const { callStack = [], activeFrameId, board } = step.state;

    // Check if algorithm is N-Queens
    if (board && Array.isArray(board)) {
      this.renderChessboard(board, callStack, activeFrameId);
      return;
    }

    let html = `
      <div class="recursion-split-container">
        <!-- Call Stack Panel -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--accent); display: flex; align-items: center; justify-content: space-between;">
            <span>CALL STACK (Ngăn xếp lời gọi hàm)</span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${callStack.length} frame(s)</span>
          </div>
          <div class="call-stack-section">
    `;

    if (callStack.length === 0) {
      html += `<div style="color: var(--text-muted); font-size: 12px; text-align: center; margin: auto;">Ngăn xếp trống (Stack Empty)</div>`;
    } else {
      callStack.forEach(frame => {
        const isActive = frame.id === activeFrameId;
        const statusClass = frame.status || 'waiting';

        html += `
          <div class="stack-frame-card ${isActive ? 'active' : ''} ${statusClass}">
            <div class="frame-info-group">
              <span class="frame-func-name">${frame.funcName}</span>
              <span class="frame-params">Tham số: ${frame.param}</span>
              ${frame.returnValue !== null ? `<span style="color: var(--success); font-weight: 600;">Trả về: ${frame.returnValue}</span>` : ''}
            </div>
            <span class="frame-status-badge ${statusClass}">${frame.status}</span>
          </div>
        `;
      });
    }

    html += `
          </div>
        </div>

        <!-- Call Hierarchy / Tree Panel -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">
            TIẾN TRÌNH THỰC THI ĐỆ QUY
          </div>
          <div class="recursion-tree-section">
            <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
    `;

    if (callStack.length > 0) {
      callStack.forEach((frame, idx) => {
        const indent = idx * 16;
        html += `
          <div style="margin-left: ${indent}px; font-family: var(--font-mono); font-size: 12px; color: ${frame.id === activeFrameId ? 'var(--accent)' : 'var(--text-main)'}; display: flex; align-items: center; gap: 6px;">
            <span>${idx === 0 ? '●' : '└─▶'}</span>
            <strong>${frame.funcName}</strong>
            ${frame.status === 'executing' ? '<span style="color: var(--accent); font-size: 10px;">[đang chạy]</span>' : ''}
            ${frame.returnValue !== null ? `<span style="color: var(--success); font-size: 11px;">➔ = ${frame.returnValue}</span>` : ''}
          </div>
        `;
      });
    } else {
      html += `<div style="color: var(--text-muted); font-size: 12px;">Đã hoàn thành toàn bộ cây lời gọi.</div>`;
    }

    html += `
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  renderChessboard(board, callStack, activeFrameId) {
    const N = board.length;
    let html = `
      <div style="display: flex; gap: 20px; width: 100%; align-items: center; justify-content: center;">
        <div style="display: grid; grid-template-columns: repeat(${N}, 44px); gap: 3px; background: var(--bg-base); padding: 8px; border-radius: var(--radius-sm); border: 2px solid var(--border-color);">
    `;

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const isDark = (r + c) % 2 === 1;
        const hasQueen = board[r][c] === 1;

        html += `
          <div style="
            width: 44px; height: 44px;
            background-color: ${isDark ? 'var(--bg-surface)' : 'var(--bg-secondary)'};
            display: flex; align-items: center; justify-content: center;
            font-size: 24px;
            border-radius: var(--radius-xs);
          ">
            ${hasQueen ? '👑' : ''}
          </div>
        `;
      }
    }

    html += `
        </div>
        <div style="min-width: 200px; display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--accent);">STACK QUAY LUI (Backtrack)</div>
          <div class="call-stack-section" style="max-height: 200px;">
    `;

    callStack.forEach(f => {
      html += `
        <div class="stack-frame-card active">
          <span>${f.funcName}</span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }
}
