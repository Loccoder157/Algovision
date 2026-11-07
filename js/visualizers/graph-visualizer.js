/**
 * ALGOVISION - Interactive Graph Visualizer & Graph Editor
 * SVG engine supporting node dragging, interactive editing, weights, directed arrows,
 * and data structure inspection (Queue, Distance table, Visited set).
 */

export class GraphVisualizer {
  constructor(containerElement, onGraphChange = null) {
    this.container = containerElement;
    this.onGraphChange = onGraphChange;
    this.graphData = this.getDefaultGraph();
    this.selectedNodeId = null;
    this.isDragging = false;
    this.draggedNode = null;
    this.dragOffset = { x: 0, y: 0 };
    this.currentStep = null;
  }

  getDefaultGraph() {
    return {
      isDirected: false,
      isWeighted: true,
      nodes: [
        { id: 0, label: '0', x: 70, y: 150 },
        { id: 1, label: '1', x: 190, y: 60 },
        { id: 2, label: '2', x: 190, y: 240 },
        { id: 3, label: '3', x: 330, y: 60 },
        { id: 4, label: '4', x: 330, y: 240 },
        { id: 5, label: '5', x: 450, y: 150 }
      ],
      edges: [
        { u: 0, v: 1, weight: 4 },
        { u: 0, v: 2, weight: 2 },
        { u: 1, v: 2, weight: 1 },
        { u: 1, v: 3, weight: 5 },
        { u: 2, v: 4, weight: 8 },
        { u: 2, v: 3, weight: 8 },
        { u: 3, v: 5, weight: 6 },
        { u: 4, v: 5, weight: 3 },
        { u: 3, v: 4, weight: 2 }
      ]
    };
  }

  setGraphData(data) {
    this.graphData = data;
    this.render(this.currentStep);
    if (this.onGraphChange) this.onGraphChange(this.graphData);
  }

  render(step) {
    this.currentStep = step;
    const { nodes, edges, isDirected, isWeighted } = this.graphData;
    const state = step ? step.state : {};

    const currentNode = state.currentNode !== undefined ? state.currentNode : null;
    const visited = state.visited || [];
    const activeEdge = state.activeEdge || null;
    const mstEdges = state.mstEdges || [];
    const distances = state.distances || null;
    const previous = state.previous || null;
    const queue = state.queue || null;
    const order = state.order || null;

    let svgHtml = `
      <svg id="graph-svg" viewBox="0 0 540 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
        </defs>
    `;

    // Render Edges
    edges.forEach(edge => {
      const uNode = nodes.find(n => n.id === edge.u);
      const vNode = nodes.find(n => n.id === edge.v);
      if (!uNode || !vNode) return;

      const isActive = activeEdge && (
        (activeEdge.u === edge.u && activeEdge.v === edge.v) ||
        (!isDirected && activeEdge.u === edge.v && activeEdge.v === edge.u)
      );

      const isMst = mstEdges.some(e =>
        (e.u === edge.u && e.v === edge.v) || (!isDirected && e.u === edge.v && e.v === edge.u)
      );

      let edgeClass = 'graph-edge-line';
      if (isMst) edgeClass += ' mst';
      else if (isActive) edgeClass += ' active';

      const marker = isDirected ? (isActive ? 'url(#arrow-active)' : 'url(#arrow)') : '';

      svgHtml += `
        <line
          x1="${uNode.x}" y1="${uNode.y}"
          x2="${vNode.x}" y2="${vNode.y}"
          class="${edgeClass}"
          marker-end="${marker}"
        />
      `;

      // Draw weight label
      if (isWeighted) {
        const midX = (uNode.x + vNode.x) / 2;
        const midY = (uNode.y + vNode.y) / 2 - 6;
        svgHtml += `
          <rect x="${midX - 10}" y="${midY - 9}" width="20" height="14" fill="var(--bg-base)" rx="3" />
          <text x="${midX}" y="${midY}" class="graph-edge-weight">${edge.weight}</text>
        `;
      }
    });

    // Render Nodes
    nodes.forEach(node => {
      let nodeClass = 'graph-node-circle';
      if (node.id === currentNode) {
        nodeClass += ' current';
      } else if (visited.includes(node.id)) {
        nodeClass += ' visited';
      }
      if (node.id === this.selectedNodeId) {
        nodeClass += ' start';
      }

      svgHtml += `
        <g class="graph-node-group" data-id="${node.id}" style="cursor: grab;">
          <circle cx="${node.x}" cy="${node.y}" r="18" class="${nodeClass}" />
          <text x="${node.x}" y="${node.y}" class="graph-node-text">${node.label}</text>
        </g>
      `;
    });

    svgHtml += `</svg>`;

    // Side Inspector HTML
    let inspectorHtml = `
      <div class="graph-side-inspector">
        <div class="inspector-title">CẤU TRÚC DỮ LIỆU ĐỒ THỊ</div>
    `;

    if (distances) {
      inspectorHtml += `
        <div style="font-weight: 600; color: var(--accent); font-size: 11px;">BẢNG KHOẢNG CÁCH (Dist):</div>
        <div style="display: flex; flex-direction: column; gap: 3px; max-height: 120px; overflow-y: auto;">
      `;
      Object.keys(distances).forEach(id => {
        const d = distances[id];
        const p = previous ? previous[id] : null;
        inspectorHtml += `
          <div class="inspector-row">
            <span>Đỉnh ${id}:</span>
            <strong style="color: ${d !== Infinity ? 'var(--accent)' : 'var(--text-muted)'}">${d === Infinity ? '∞' : d}</strong>
            ${p !== null && p !== undefined ? `<span style="font-size: 10px; color: var(--text-muted);">qua ${p}</span>` : ''}
          </div>
        `;
      });
      inspectorHtml += `</div>`;
    }

    if (queue) {
      inspectorHtml += `
        <div style="font-weight: 600; color: var(--warning); font-size: 11px; margin-top: 6px;">QUEUE / HÀNG ĐỢI:</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-main); background: var(--bg-surface); padding: 4px 8px; border-radius: var(--radius-xs);">
          [${queue.join(', ')}]
        </div>
      `;
    }

    if (order && order.length > 0) {
      inspectorHtml += `
        <div style="font-weight: 600; color: var(--success); font-size: 11px; margin-top: 6px;">THỨ TỰ DUYỆT:</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-main); word-break: break-all;">
          ${order.join(' ➔ ')}
        </div>
      `;
    }

    if (visited && visited.length > 0) {
      inspectorHtml += `
        <div style="font-weight: 600; color: var(--text-secondary); font-size: 11px; margin-top: 6px;">ĐÃ THĂM (Visited):</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--success);">
          { ${visited.join(', ')} }
        </div>
      `;
    }

    inspectorHtml += `</div>`;

    this.container.innerHTML = `
      <div class="graph-stage-container">
        <div class="graph-canvas-area">${svgHtml}</div>
        ${inspectorHtml}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const svg = this.container.querySelector('#graph-svg');
    if (!svg) return;

    svg.querySelectorAll('.graph-node-group').forEach(group => {
      const id = Number(group.getAttribute('data-id'));
      const node = this.graphData.nodes.find(n => n.id === id);

      group.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.draggedNode = node;
        const rect = svg.getBoundingClientRect();
        this.dragOffset.x = (e.clientX - rect.left) * (540 / rect.width) - node.x;
        this.dragOffset.y = (e.clientY - rect.top) * (320 / rect.height) - node.y;
      });

      group.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedNodeId = (this.selectedNodeId === id) ? null : id;
        this.render(this.currentStep);
      });
    });

    svg.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.draggedNode) return;
      const rect = svg.getBoundingClientRect();
      const newX = (e.clientX - rect.left) * (540 / rect.width) - this.dragOffset.x;
      const newY = (e.clientY - rect.top) * (320 / rect.height) - this.dragOffset.y;

      this.draggedNode.x = Math.max(25, Math.min(515, Math.round(newX)));
      this.draggedNode.y = Math.max(25, Math.min(295, Math.round(newY)));

      this.render(this.currentStep);
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.draggedNode = null;
        if (this.onGraphChange) this.onGraphChange(this.graphData);
      }
    });
  }

  // Graph Editor Operations
  addNode(x = 270, y = 160) {
    const nextId = this.graphData.nodes.length > 0
      ? Math.max(...this.graphData.nodes.map(n => n.id)) + 1
      : 0;
    this.graphData.nodes.push({ id: nextId, label: String(nextId), x, y });
    this.setGraphData(this.graphData);
  }

  deleteSelectedNode() {
    if (this.selectedNodeId === null) return;
    const id = this.selectedNodeId;
    this.graphData.nodes = this.graphData.nodes.filter(n => n.id !== id);
    this.graphData.edges = this.graphData.edges.filter(e => e.u !== id && e.v !== id);
    this.selectedNodeId = null;
    this.setGraphData(this.graphData);
  }

  addEdge(u, v, weight = 1) {
    if (u === v) return;
    const exists = this.graphData.edges.some(e =>
      (e.u === u && e.v === v) || (!this.graphData.isDirected && e.u === v && e.v === u)
    );
    if (!exists) {
      this.graphData.edges.push({ u, v, weight: Number(weight) || 1 });
      this.setGraphData(this.graphData);
    }
  }

  clearGraph() {
    this.graphData.nodes = [];
    this.graphData.edges = [];
    this.selectedNodeId = null;
    this.setGraphData(this.graphData);
  }
}
