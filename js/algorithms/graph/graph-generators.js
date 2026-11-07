/**
 * ALGOVISION - Step Generators for Graph Algorithms
 * Generates interactive graph steps, queue/stack representations,
 * relaxation animations, distance tables, and tree/MST updates.
 */

export const GraphGenerators = {
  // 1. BFS
  'bfs': function(graphData, startNodeId = 0) {
    const { nodes, edges } = graphData;
    const start = Number(startNodeId) || 0;
    const steps = [];

    const visited = new Set();
    const queue = [start];
    visited.add(start);
    const order = [];

    // Adjacency list
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.u].push({ v: e.v, weight: e.weight });
      if (!graphData.isDirected) {
        adj[e.v].push({ v: e.u, weight: e.weight });
      }
    });

    steps.push({
      type: 'init',
      description: `Bắt đầu BFS từ đỉnh xuất phát ${start}. Khởi tạo Hàng đợi (Queue) = [${start}] và tập đã thăm Visited = {${start}}.`,
      activeLine: { c: 5, cpp: 5, python: 5 },
      state: {
        currentNode: start,
        visited: Array.from(visited),
        queue: [...queue],
        order: [],
        activeEdge: null,
        variables: { startNode: start }
      }
    });

    while (queue.length > 0) {
      const u = queue.shift();
      order.push(u);

      steps.push({
        type: 'dequeue',
        description: `Lấy đỉnh ${u} ra khỏi hàng đợi Queue (Dequeue). Đỉnh hiện tại: ${u}.`,
        activeLine: { c: 7, cpp: 7, python: 7 },
        state: {
          currentNode: u,
          visited: Array.from(visited),
          queue: [...queue],
          order: [...order],
          activeEdge: null,
          variables: { 'đỉnh hiện tại (u)': u, 'thứ tự duyệt': order.join(' -> ') }
        }
      });

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        const v = edge.v;

        steps.push({
          type: 'inspect_neighbor',
          description: `Kiểm tra đỉnh kề ${v} của đỉnh ${u}.`,
          activeLine: { c: 8, cpp: 9, python: 8 },
          state: {
            currentNode: u,
            visited: Array.from(visited),
            queue: [...queue],
            order: [...order],
            activeEdge: { u, v },
            variables: { u, v, 'đã thăm': visited.has(v) }
          }
        });

        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);

          steps.push({
            type: 'enqueue_neighbor',
            description: `Đỉnh ${v} chưa được thăm: Đánh dấu đã thăm và đẩy ${v} vào cuối Queue.`,
            activeLine: { c: 11, cpp: 12, python: 11 },
            state: {
              currentNode: u,
              visited: Array.from(visited),
              queue: [...queue],
              order: [...order],
              activeEdge: { u, v },
              variables: { 'đã nạp': v, 'Queue mới': queue.join(', ') }
            }
          });
        }
      }
    }

    steps.push({
      type: 'done',
      description: `Thuật toán BFS hoàn tất! Thứ tự duyệt toàn bộ đồ thị: ${order.join(' -> ')}.`,
      activeLine: { c: 15, cpp: 16, python: 11 },
      state: {
        currentNode: null,
        visited: Array.from(visited),
        queue: [],
        order: [...order],
        activeEdge: null,
        variables: { 'kết quả BFS': order.join(' -> ') }
      }
    });

    return steps;
  },

  // 2. DFS
  'dfs': function(graphData, startNodeId = 0) {
    const { nodes, edges } = graphData;
    const start = Number(startNodeId) || 0;
    const steps = [];

    const visited = new Set();
    const order = [];

    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.u].push(e.v);
      if (!graphData.isDirected) adj[e.v].push(e.u);
    });

    steps.push({
      type: 'init',
      description: `Bắt đầu Depth-First Search (DFS) từ đỉnh ${start}.`,
      activeLine: { c: 12, cpp: 12, python: 8 },
      state: {
        currentNode: start,
        visited: [],
        order: [],
        activeEdge: null,
        variables: { startNode: start }
      }
    });

    function dfsRec(u, p = null) {
      visited.add(u);
      order.push(u);

      steps.push({
        type: 'visit_node',
        description: `Thăm đỉnh ${u} và đánh dấu vào tập Visited.`,
        activeLine: { c: 2, cpp: 2, python: 4 },
        state: {
          currentNode: u,
          visited: Array.from(visited),
          order: [...order],
          activeEdge: p !== null ? { u: p, v: u } : null,
          variables: { u, 'đã thăm': Array.from(visited).join(', ') }
        }
      });

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          steps.push({
            type: 'traverse_edge',
            description: `Đi sâu theo cạnh (${u} -> ${v}) chưa thăm.`,
            activeLine: { c: 5, cpp: 5, python: 7 },
            state: {
              currentNode: u,
              visited: Array.from(visited),
              order: [...order],
              activeEdge: { u, v },
              variables: { u, v }
            }
          });

          dfsRec(v, u);
        }
      }
    }

    dfsRec(start);

    steps.push({
      type: 'done',
      description: `Duyệt DFS hoàn tất! Thứ tự duyệt: ${order.join(' -> ')}.`,
      activeLine: { c: 13, cpp: 13, python: 8 },
      state: {
        currentNode: null,
        visited: Array.from(visited),
        order: [...order],
        activeEdge: null,
        variables: { 'kết quả DFS': order.join(' -> ') }
      }
    });

    return steps;
  },

  // 3. Dijkstra
  'dijkstra': function(graphData, startNodeId = 0) {
    const { nodes, edges } = graphData;
    const start = Number(startNodeId) || 0;
    const steps = [];

    const dist = {};
    const prev = {};
    const sptSet = new Set();

    nodes.forEach(n => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
    });
    dist[start] = 0;

    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.u].push({ v: e.v, weight: Number(e.weight) || 1 });
      if (!graphData.isDirected) {
        adj[e.v].push({ v: e.u, weight: Number(e.weight) || 1 });
      }
    });

    steps.push({
      type: 'init',
      description: `Khởi tạo bảng khoảng cách Dijkstra: dist[${start}] = 0, tất cả các đỉnh khác = ∞.`,
      activeLine: { c: 8, cpp: 6, python: 5 },
      state: {
        currentNode: start,
        visited: [],
        distances: { ...dist },
        previous: { ...prev },
        activeEdge: null,
        variables: { startNode: start }
      }
    });

    for (let count = 0; count < nodes.length; count++) {
      let u = null;
      let minDist = Infinity;
      nodes.forEach(n => {
        if (!sptSet.has(n.id) && dist[n.id] < minDist) {
          minDist = dist[n.id];
          u = n.id;
        }
      });

      if (u === null || minDist === Infinity) break;

      sptSet.add(u);

      steps.push({
        type: 'select_min',
        description: `Chọn đỉnh u = ${u} có khoảng cách tạm thời nhỏ nhất (${dist[u]}) đưa vào tập đường đi ngắn nhất (sptSet).`,
        activeLine: { c: 10, cpp: 9, python: 8 },
        state: {
          currentNode: u,
          visited: Array.from(sptSet),
          distances: { ...dist },
          previous: { ...prev },
          activeEdge: null,
          variables: { u, 'dist[u]': dist[u] }
        }
      });

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        const { v, weight } = edge;

        if (!sptSet.has(v)) {
          const newDist = dist[u] + weight;
          const willRelax = newDist < dist[v];

          steps.push({
            type: 'check_relax',
            description: `Xét cạnh (${u} -> ${v}, trọng số ${weight}): dist[${u}] (${dist[u]}) + ${weight} = ${newDist} so với dist[${v}] (${dist[v] === Infinity ? '∞' : dist[v]}).`,
            activeLine: { c: 13, cpp: 15, python: 12 },
            state: {
              currentNode: u,
              visited: Array.from(sptSet),
              distances: { ...dist },
              previous: { ...prev },
              activeEdge: { u, v },
              variables: { u, v, weight, newDist, 'dist[v] cũ': dist[v] }
            }
          });

          if (willRelax) {
            dist[v] = newDist;
            prev[v] = u;

            steps.push({
              type: 'relax',
              description: `Nới lỏng (Relaxation) thành công! Cập nhật khoảng cách ngắn hơn: dist[${v}] = ${newDist}, đỉnh liền trước prev[${v}] = ${u}.`,
              activeLine: { c: 15, cpp: 16, python: 13 },
              state: {
                currentNode: u,
                visited: Array.from(sptSet),
                distances: { ...dist },
                previous: { ...prev },
                activeEdge: { u, v },
                variables: { v, 'dist[v] mới': newDist, 'prev[v]': u }
              }
            });
          }
        }
      }
    }

    steps.push({
      type: 'done',
      description: 'Dijkstra hoàn tất! Đã tìm được đường đi ngắn nhất từ nguồn tới mọi đỉnh.',
      activeLine: { c: 19, cpp: 21, python: 15 },
      state: {
        currentNode: null,
        visited: Array.from(sptSet),
        distances: { ...dist },
        previous: { ...prev },
        activeEdge: null,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 4. Bellman-Ford
  'bellman-ford': function(graphData, startNodeId = 0) {
    const { nodes, edges } = graphData;
    const start = Number(startNodeId) || 0;
    const steps = [];
    const V = nodes.length;

    const dist = {};
    nodes.forEach(n => dist[n.id] = Infinity);
    dist[start] = 0;

    steps.push({
      type: 'init',
      description: `Bắt đầu Bellman-Ford. Khởi tạo dist[${start}] = 0, các đỉnh khác = ∞. Sẽ lặp qua tất cả cạnh ${V - 1} lần.`,
      activeLine: { c: 4, cpp: 3, python: 3 },
      state: {
        distances: { ...dist },
        variables: { V, start }
      }
    });

    for (let i = 1; i <= V - 1; i++) {
      let updated = false;

      for (const e of edges) {
        const u = e.u;
        const v = e.v;
        const w = Number(e.weight) || 1;

        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          updated = true;

          steps.push({
            type: 'relax_edge',
            description: `Lượt ${i}: Nới lỏng cạnh (${u} -> ${v}, w=${w}): dist[${v}] được giảm còn ${dist[v]}.`,
            activeLine: { c: 9, cpp: 7, python: 7 },
            state: {
              distances: { ...dist },
              activeEdge: { u, v },
              variables: { 'lượt lặp': i, u, v, w, 'dist[v] mới': dist[v] }
            }
          });
        }
      }

      if (!updated) break;
    }

    steps.push({
      type: 'done',
      description: 'Bellman-Ford hoàn tất! Không phát hiện chu trình âm.',
      activeLine: { c: 13, cpp: 11, python: 8 },
      state: {
        distances: { ...dist },
        activeEdge: null,
        variables: { 'kết quả': 'Khoảng cách tối ưu' }
      }
    });

    return steps;
  },

  // 5. Floyd-Warshall
  'floyd-warshall': function(graphData) {
    const { nodes, edges } = graphData;
    const V = nodes.length;
    const steps = [];

    const matrix = {};
    nodes.forEach(u => {
      matrix[u.id] = {};
      nodes.forEach(v => {
        matrix[u.id][v.id] = (u.id === v.id) ? 0 : Infinity;
      });
    });

    edges.forEach(e => {
      matrix[e.u][e.v] = Number(e.weight) || 1;
      if (!graphData.isDirected) matrix[e.v][e.u] = Number(e.weight) || 1;
    });

    steps.push({
      type: 'init',
      description: `Bắt đầu Floyd-Warshall: Khởi tạo ma trận khoảng cách giữa mọi cặp đỉnh.`,
      activeLine: { c: 2, cpp: 3, python: 3 },
      state: {
        matrix: JSON.parse(JSON.stringify(matrix)),
        variables: { V }
      }
    });

    for (let k = 0; k < V; k++) {
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          if (matrix[i][k] !== Infinity && matrix[k][j] !== Infinity) {
            if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
              matrix[i][j] = matrix[i][k] + matrix[k][j];

              steps.push({
                type: 'matrix_update',
                description: `Qua đỉnh trung gian k = ${k}: Cập nhật dist[${i}][${j}] = dist[${i}][${k}] + dist[${k}][${j}] = ${matrix[i][j]}.`,
                activeLine: { c: 7, cpp: 7, python: 7 },
                state: {
                  matrix: JSON.parse(JSON.stringify(matrix)),
                  currentNode: k,
                  variables: { k, i, j, 'khoảng cách mới': matrix[i][j] }
                }
              });
            }
          }
        }
      }
    }

    steps.push({
      type: 'done',
      description: 'Floyd-Warshall hoàn tất! Đã có ma trận đường đi ngắn nhất giữa mọi cặp đỉnh.',
      activeLine: { c: 12, cpp: 12, python: 7 },
      state: {
        matrix: JSON.parse(JSON.stringify(matrix)),
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 6. Prim MST
  'prim': function(graphData) {
    const { nodes, edges } = graphData;
    const steps = [];
    const inMST = new Set([0]);
    const mstEdges = [];

    steps.push({
      type: 'init',
      description: 'Bắt đầu Prim MST: Chọn đỉnh 0 làm điểm khởi đầu của Cây khung nhỏ nhất.',
      activeLine: { c: 5, cpp: 6, python: 4 },
      state: {
        visited: Array.from(inMST),
        mstEdges: [],
        variables: { 'đỉnh gốc MST': 0 }
      }
    });

    while (inMST.size < nodes.length) {
      let minEdge = null;
      let minWeight = Infinity;

      for (const e of edges) {
        const uIn = inMST.has(e.u);
        const vIn = inMST.has(e.v);
        const w = Number(e.weight) || 1;

        if ((uIn && !vIn) || (!uIn && vIn)) {
          if (w < minWeight) {
            minWeight = w;
            minEdge = { u: uIn ? e.u : e.v, v: uIn ? e.v : e.u, weight: w };
          }
        }
      }

      if (!minEdge) break;

      inMST.add(minEdge.v);
      mstEdges.push(minEdge);

      steps.push({
        type: 'add_mst_edge',
        description: `Thêm cạnh nhỏ nhất nối vào cây: (${minEdge.u} - ${minEdge.v}, trọng số ${minEdge.weight}). Nạp đỉnh ${minEdge.v} vào MST.`,
        activeLine: { c: 11, cpp: 12, python: 11 },
        state: {
          visited: Array.from(inMST),
          mstEdges: [...mstEdges],
          activeEdge: minEdge,
          variables: { 'cạnh thêm vào': `${minEdge.u}-${minEdge.v}`, 'trọng số': minEdge.weight }
        }
      });
    }

    steps.push({
      type: 'done',
      description: 'Cây khung nhỏ nhất (Prim MST) hoàn tất!',
      activeLine: { c: 16, cpp: 17, python: 15 },
      state: {
        visited: Array.from(inMST),
        mstEdges: [...mstEdges],
        activeEdge: null,
        variables: { 'tổng trọng số MST': mstEdges.reduce((acc, e) => acc + e.weight, 0) }
      }
    });

    return steps;
  },

  // 7. Kruskal MST
  'kruskal': function(graphData) {
    const { nodes, edges } = graphData;
    const steps = [];

    // Sắp xếp cạnh theo trọng số tăng dần
    const sortedEdges = [...edges].sort((a, b) => (Number(a.weight) || 1) - (Number(b.weight) || 1));
    const parent = {};
    nodes.forEach(n => parent[n.id] = n.id);

    function find(i) {
      if (parent[i] === i) return i;
      return parent[i] = find(parent[i]);
    }
    function union(i, j) {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) {
        parent[rootI] = rootJ;
        return true;
      }
      return false;
    }

    const mstEdges = [];

    steps.push({
      type: 'init',
      description: 'Bắt đầu Kruskal MST: Đã sắp xếp tất cả các cạnh theo trọng số tăng dần.',
      activeLine: { c: 2, cpp: 2, python: 2 },
      state: {
        mstEdges: [],
        variables: { 'tổng số cạnh': sortedEdges.length }
      }
    });

    for (const e of sortedEdges) {
      const w = Number(e.weight) || 1;
      const rootU = find(e.u);
      const rootV = find(e.v);

      if (rootU !== rootV) {
        union(e.u, e.v);
        mstEdges.push(e);

        steps.push({
          type: 'accept_edge',
          description: `Chọn cạnh (${e.u} - ${e.v}, w=${w}) vì hai đỉnh thuộc 2 thành phần rời rạc, không tạo chu trình.`,
          activeLine: { c: 12, cpp: 8, python: 13 },
          state: {
            mstEdges: [...mstEdges],
            activeEdge: e,
            variables: { 'thêm cạnh': `${e.u}-${e.v}`, w }
          }
        });
      } else {
        steps.push({
          type: 'reject_edge',
          description: `Bỏ qua cạnh (${e.u} - ${e.v}, w=${w}) vì sẽ tạo ra chu trình khép kín!`,
          activeLine: { c: 10, cpp: 6, python: 11 },
          state: {
            mstEdges: [...mstEdges],
            activeEdge: e,
            variables: { 'loại bỏ': `${e.u}-${e.v}`, 'lý do': 'Tạo chu trình' }
          }
        });
      }

      if (mstEdges.length === nodes.length - 1) break;
    }

    steps.push({
      type: 'done',
      description: `Kruskal MST hoàn tất với ${mstEdges.length} cạnh.`,
      activeLine: { c: 15, cpp: 11, python: 14 },
      state: {
        mstEdges: [...mstEdges],
        activeEdge: null,
        variables: { 'tổng trọng số': mstEdges.reduce((acc, e) => acc + (Number(e.weight) || 1), 0) }
      }
    });

    return steps;
  },

  // 8. Topological Sort
  'topological-sort': function(graphData) {
    const { nodes, edges } = graphData;
    const steps = [];
    const inDegree = {};
    nodes.forEach(n => inDegree[n.id] = 0);
    edges.forEach(e => inDegree[e.v] = (inDegree[e.v] || 0) + 1);

    const queue = [];
    nodes.forEach(n => {
      if (inDegree[n.id] === 0) queue.push(n.id);
    });

    const order = [];

    steps.push({
      type: 'init',
      description: 'Bắt đầu Topological Sort (Kahn): Tính bán bậc vào (In-degree) của mọi đỉnh. Đẩy các đỉnh có in-degree = 0 vào Queue.',
      activeLine: { c: 13, cpp: 12, python: 6 },
      state: {
        inDegree: { ...inDegree },
        queue: [...queue],
        order: [],
        variables: { 'Queue ban đầu': queue.join(', ') }
      }
    });

    while (queue.length > 0) {
      const u = queue.shift();
      order.push(u);

      steps.push({
        type: 'process_node',
        description: `Lấy đỉnh ${u} có bán bậc vào = 0 đưa vào thứ tự Topo: [${order.join(' -> ')}].`,
        activeLine: { c: 17, cpp: 16, python: 9 },
        state: {
          currentNode: u,
          inDegree: { ...inDegree },
          queue: [...queue],
          order: [...order],
          variables: { u, 'thứ tự': order.join(', ') }
        }
      });

      edges.filter(e => e.u === u).forEach(e => {
        inDegree[e.v]--;
        steps.push({
          type: 'decrement_indegree',
          description: `Giảm in-degree của đỉnh kề ${e.v} xuống còn ${inDegree[e.v]}.`,
          activeLine: { c: 20, cpp: 19, python: 12 },
          state: {
            currentNode: u,
            inDegree: { ...inDegree },
            queue: [...queue],
            order: [...order],
            activeEdge: e,
            variables: { 'đỉnh kề': e.v, 'in-degree mới': inDegree[e.v] }
          }
        });

        if (inDegree[e.v] === 0) {
          queue.push(e.v);
          steps.push({
            type: 'push_zero',
            description: `Đỉnh ${e.v} đã có in-degree = 0, đẩy vào Queue.`,
            activeLine: { c: 22, cpp: 21, python: 14 },
            state: {
              currentNode: u,
              inDegree: { ...inDegree },
              queue: [...queue],
              order: [...order],
              variables: { 'nạp Queue': e.v }
            }
          });
        }
      });
    }

    steps.push({
      type: 'done',
      description: `Thứ tự Topological Sort hoàn chỉnh: ${order.join(' -> ')}.`,
      activeLine: { c: 27, cpp: 25, python: 15 },
      state: {
        order: [...order],
        variables: { 'kết quả': order.join(' -> ') }
      }
    });

    return steps;
  },

  // 9. Connected Components
  'connected-components': function(graphData) {
    const { nodes, edges } = graphData;
    const steps = [];
    const visited = new Set();
    let compCount = 0;
    const components = {};

    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.u].push(e.v);
      adj[e.v].push(e.u);
    });

    steps.push({
      type: 'init',
      description: 'Bắt đầu tìm các thành phần liên thông trong đồ thị.',
      activeLine: { c: 2, cpp: 3, python: 2 },
      state: {
        visited: [],
        variables: { 'số thành phần': 0 }
      }
    });

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        compCount++;
        const currentComp = [];
        const queue = [node.id];
        visited.add(node.id);

        steps.push({
          type: 'new_component',
          description: `Phát hiện Thành phần liên thông mới #${compCount} bắt đầu từ đỉnh ${node.id}.`,
          activeLine: { c: 6, cpp: 7, python: 6 },
          state: {
            currentNode: node.id,
            visited: Array.from(visited),
            variables: { 'thành phần hiện tại': compCount, 'đỉnh gốc': node.id }
          }
        });

        while (queue.length > 0) {
          const u = queue.shift();
          currentComp.push(u);

          for (const v of adj[u]) {
            if (!visited.has(v)) {
              visited.add(v);
              queue.push(v);
              steps.push({
                type: 'expand_comp',
                description: `Đỉnh ${v} liên thông với đỉnh ${u}, gộp vào Thành phần #${compCount}.`,
                activeLine: { c: 7, cpp: 8, python: 15 },
                state: {
                  currentNode: v,
                  visited: Array.from(visited),
                  variables: { u, v, compCount }
                }
              });
            }
          }
        }
        components[compCount] = currentComp;
      }
    }

    steps.push({
      type: 'done',
      description: `Đã phân loại thành công! Đồ thị có tổng cộng ${compCount} thành phần liên thông riêng biệt.`,
      activeLine: { c: 10, cpp: 11, python: 17 },
      state: {
        visited: Array.from(visited),
        variables: { 'tổng thành phần': compCount }
      }
    });

    return steps;
  },

  // 10. Cycle Detection
  'cycle-detection': function(graphData) {
    const { nodes, edges } = graphData;
    const steps = [];
    const visited = new Set();
    let hasCycle = false;

    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      adj[e.u].push(e.v);
      if (!graphData.isDirected) adj[e.v].push(e.u);
    });

    steps.push({
      type: 'init',
      description: 'Bắt đầu thuật toán phát hiện chu trình (Cycle Detection) bằng DFS.',
      activeLine: { c: 1, cpp: 1, python: 1 },
      state: {
        visited: [],
        variables: { 'trạng thái': 'Đang kiểm tra' }
      }
    });

    function dfsCycle(u, parent) {
      visited.add(u);

      steps.push({
        type: 'visit',
        description: `Thăm đỉnh ${u} (đỉnh cha: ${parent === null ? 'gốc' : parent}).`,
        activeLine: { c: 2, cpp: 2, python: 4 },
        state: {
          currentNode: u,
          visited: Array.from(visited),
          variables: { u, parent }
        }
      });

      for (const v of adj[u]) {
        if (!visited.has(v)) {
          if (dfsCycle(v, u)) return true;
        } else if (v !== parent) {
          hasCycle = true;
          steps.push({
            type: 'cycle_found',
            description: `PHÁT HIỆN CHU TRÌNH! Cạnh (${u} -> ${v}) nối tới đỉnh đã thăm ${v} không phải đỉnh cha (${parent}).`,
            activeLine: { c: 10, cpp: 9, python: 10 },
            state: {
              currentNode: u,
              activeEdge: { u, v },
              visited: Array.from(visited),
              variables: { 'chu trình tại': `${u} -> ${v}` }
            }
          });
          return true;
        }
      }
      return false;
    }

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        if (dfsCycle(node.id, null)) break;
      }
    }

    if (!hasCycle) {
      steps.push({
        type: 'done',
        description: 'Đồ thị là Rừng/Cây hữu hạn, KHÔNG chứa chu trình (Acyclic).',
        activeLine: { c: 14, cpp: 12, python: 15 },
        state: {
          visited: Array.from(visited),
          variables: { 'kết luận': 'Không có chu trình' }
        }
      });
    }

    return steps;
  }
};
