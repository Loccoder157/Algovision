/**
 * ALGOVISION - Source Code for Graph Algorithms
 * Chuẩn thụt lề 4 space, chuẩn đóng mở ngoặc, chân thực như code thực tế
 */

export const GraphCode = {
  // 1. BFS
  'bfs': {
    c: `void bfs(int adj[V][V], int start) {
    bool visited[V] = {false};
    int queue[V], front = 0, rear = 0;
    visited[start] = true;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        for (int v = 0; v < V; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
        }
    }
}`,
    cpp: `void bfs(const vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    python: `from collections import deque

def bfs(adj, start):
    visited = {start}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)`
  },

  // 2. DFS
  'dfs': {
    c: `void dfsRec(int adj[V][V], int u, bool visited[]) {
    visited[u] = true;
    for (int v = 0; v < V; v++) {
        if (adj[u][v] && !visited[v]) {
            dfsRec(adj, v, visited);
        }
    }
}

void dfs(int adj[V][V], int start) {
    bool visited[V] = {false};
    dfsRec(adj, start, visited);
}`,
    cpp: `void dfsRec(const vector<vector<int>>& adj, int u, vector<bool>& vis) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) {
            dfsRec(adj, v, vis);
        }
    }
}

void dfs(const vector<vector<int>>& adj, int start) {
    vector<bool> vis(adj.size(), false);
    dfsRec(adj, start, vis);
}`,
    python: `def dfs(adj, start):
    visited = set()
    def dfs_rec(u):
        visited.add(u)
        for v in adj[u]:
            if v not in visited:
                dfs_rec(v)
    dfs_rec(start)`
  },

  // 3. Dijkstra
  'dijkstra': {
    c: `void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];
    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX;
        sptSet[i] = false;
    }
    dist[src] = 0;
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;
        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
}`,
    cpp: `void dijkstra(const vector<vector<pair<int, int>>>& adj, int src) {
    int V = adj.size();
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) {
            continue;
        }
        for (auto& [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}`,
    python: `import heapq

def dijkstra(adj, src, n):
    dist = {i: float('inf') for i in range(n)}
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))`
  },

  // 4. Bellman-Ford
  'bellman-ford': {
    c: `void bellmanFord(struct Edge edges[], int V, int E, int src) {
    int dist[V];
    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX;
    }
    dist[src] = 0;
    for (int i = 1; i <= V - 1; i++) {
        for (int j = 0; j < E; j++) {
            int u = edges[j].u, v = edges[j].v, w = edges[j].w;
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
}`,
    cpp: `void bellmanFord(int V, const vector<tuple<int, int, int>>& edges, int src) {
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    for (int i = 0; i < V - 1; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != 1e9 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
}`,
    python: `def bellman_ford(V, edges, src):
    dist = [float('inf')] * V
    dist[src] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    return dist`
  },

  // 5. Floyd-Warshall
  'floyd-warshall': {
    c: `void floydWarshall(int dist[V][V]) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX
                    && dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
    cpp: `void floydWarshall(vector<vector<int>>& dist) {
    int V = dist.size();
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
    python: `def floyd_warshall(dist):
    V = len(dist)
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]`
  },

  // 6. Prim
  'prim': {
    c: `void primMST(int graph[V][V]) {
    int parent[V], key[V];
    bool inMST[V];
    for (int i = 0; i < V; i++) {
        key[i] = INT_MAX;
        inMST[i] = false;
    }
    key[0] = 0;
    parent[0] = -1;
    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, inMST);
        inMST[u] = true;
        for (int v = 0; v < V; v++) {
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
}`,
    cpp: `void primMST(const vector<vector<pair<int, int>>>& adj) {
    int V = adj.size();
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<int> key(V, 1e9), parent(V, -1);
    vector<bool> inMST(V, false);
    pq.push({0, 0});
    key[0] = 0;
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        inMST[u] = true;
        for (auto& [v, w] : adj[u]) {
            if (!inMST[v] && w < key[v]) {
                key[v] = w;
                parent[v] = u;
                pq.push({key[v], v});
            }
        }
    }
}`,
    python: `import heapq

def prim_mst(adj, V):
    pq = [(0, 0, -1)]  # (weight, node, parent)
    visited = set()
    mst = []
    while pq and len(visited) < V:
        w, u, parent = heapq.heappop(pq)
        if u in visited:
            continue
        visited.add(u)
        if parent != -1:
            mst.append((parent, u, w))
        for v, weight in adj[u]:
            if v not in visited:
                heapq.heappush(pq, (weight, v, u))
    return mst`
  },

  // 7. Kruskal
  'kruskal': {
    c: `void kruskalMST(struct Edge edges[], int V, int E) {
    qsort(edges, E, sizeof(edges[0]), compareEdges);
    int parent[V];
    for (int i = 0; i < V; i++) {
        parent[i] = i;
    }
    int e = 0, i = 0;
    while (e < V - 1 && i < E) {
        struct Edge next = edges[i++];
        int rootU = find(parent, next.u);
        int rootV = find(parent, next.v);
        if (rootU != rootV) {
            e++;
            parent[rootU] = rootV;
        }
    }
}`,
    cpp: `void kruskalMST(int V, vector<tuple<int, int, int>>& edges) {
    sort(edges.begin(), edges.end()); // sap xep theo weight
    DSU dsu(V);
    vector<tuple<int, int, int>> mst;
    for (auto [w, u, v] : edges) {
        if (dsu.find(u) != dsu.find(v)) {
            dsu.unite(u, v);
            mst.push_back({u, v, w});
        }
    }
}`,
    python: `def kruskal_mst(V, edges):
    edges.sort(key=lambda x: x[2])  # sap xep theo weight
    parent = list(range(V))
    def find(i):
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])
        return parent[i]
    mst = []
    for u, v, w in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v
            mst.append((u, v, w))
    return mst`
  },

  // 8. Topological Sort
  'topological-sort': {
    c: `void topologicalSort(int adj[V][V]) {
    int inDegree[V] = {0};
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (adj[i][j]) {
                inDegree[j]++;
            }
        }
    }
    int queue[V], front = 0, rear = 0;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            queue[rear++] = i;
        }
    }
    while (front < rear) {
        int u = queue[front++];
        for (int v = 0; v < V; v++) {
            if (adj[u][v]) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    queue[rear++] = v;
                }
            }
        }
    }
}`,
    cpp: `void topologicalSort(const vector<vector<int>>& adj) {
    int V = adj.size();
    vector<int> inDegree(V, 0);
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) {
            inDegree[v]++;
        }
    }
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
}`,
    python: `from collections import deque

def topological_sort(adj, V):
    in_degree = [0] * V
    for u in range(V):
        for v in adj[u]:
            in_degree[v] += 1
    queue = deque([i for i in range(V) if in_degree[i] == 0])
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    return order`
  },

  // 9. Connected Components
  'connected-components': {
    c: `void findComponents(int adj[V][V]) {
    bool visited[V] = {false};
    int compCount = 0;
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            compCount++;
            dfsRec(adj, i, visited);
        }
    }
}`,
    cpp: `void findComponents(const vector<vector<int>>& adj) {
    int V = adj.size();
    vector<bool> visited(V, false);
    int compCount = 0;
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            compCount++;
            dfsRec(adj, i, visited);
        }
    }
}`,
    python: `def connected_components(adj, V):
    visited = set()
    components = []
    for i in range(V):
        if i not in visited:
            comp = []
            queue = [i]
            visited.add(i)
            while queue:
                u = queue.pop(0)
                comp.append(u)
                for v in adj[u]:
                    if v not in visited:
                        visited.add(v)
                        queue.append(v)
            components.append(comp)
    return components`
  },

  // 10. Cycle Detection
  'cycle-detection': {
    c: `bool hasCycleDFS(int adj[V][V], int u, bool visited[], int parent) {
    visited[u] = true;
    for (int v = 0; v < V; v++) {
        if (adj[u][v]) {
            if (!visited[v]) {
                if (hasCycleDFS(adj, v, visited, u)) {
                    return true;
                }
            } else if (v != parent) {
                return true; // Phat hien chu trinh
            }
        }
    }
    return false;
}`,
    cpp: `bool hasCycleDFS(const vector<vector<int>>& adj, int u, vector<bool>& vis, int parent) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) {
            if (hasCycleDFS(adj, v, vis, u)) {
                return true;
            }
        } else if (v != parent) {
            return true; // Phat hien chu trinh
        }
    }
    return false;
}`,
    python: `def has_cycle(adj, V):
    visited = [False] * V
    def dfs(u, parent):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                if dfs(v, u):
                    return True
            elif v != parent:
                return True  # Phat hien chu trinh
        return False
    for i in range(V):
        if not visited[i] and dfs(i, -1):
            return True
    return False`
  }
};
