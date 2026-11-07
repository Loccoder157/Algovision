# AlgoVision – Algorithm Visualizer Đa Ngôn Ngữ (C, C++, Python)

**AlgoVision** là nền tảng giáo dục tương tác chuyên nghiệp giúp người học lập trình và kỹ sư phần mềm quan sát, phân tích và thấu hiểu cách thức hoạt động của các thuật toán và cấu trúc dữ liệu cốt lõi thông qua animation trực quan, trình hiển thị mã nguồn IDE đa ngôn ngữ đồng bộ và giải thích từng bước bằng tiếng Việt.

---

## 🌟 Tính Năng Nổi Bật

### 1. Multi-Language Code Viewer (C, C++, Python)
- **Hỗ trợ 3 ngôn ngữ lập trình cho 100% thuật toán**: C, C++, và Python.
- **Mặc định chọn C++**, chuyển đổi tức thì giữa C, C++, và Python chỉ với một cú nhấp chuột.
- **Không khởi động lại thuật toán**: Giữ nguyên toàn bộ dữ liệu đầu vào và tiến trình mô phỏng khi chuyển ngôn ngữ.
- **Đồng bộ dòng code (Live Synchronization)**: Dòng code tương ứng trong ngôn ngữ đang chọn tự động phát sáng (active line glow) theo từng bước thao tác của animation.
- **Trình soạn thảo kiểu IDE**: Syntax highlighting ngoại tuyến, số dòng (line numbers), font chữ lập trình monospace, nút Copy Code và nút phóng to toàn màn hình (Expand Code).

### 2. Bộ Điều Khiển Mô Phỏng Đầy Đủ & Khả Năng Rewind
- **Play / Pause / Resume**: Bắt đầu hoặc tạm dừng mô phỏng mượt mà.
- **Step Forward & Step Backward (Rewind)**: Cho phép lùi lại bước trước đó với trạng thái khôi phục thực sự (Time Travel State Restoration), không phải chỉ chạy ngược animation giả lập.
- **Điều chỉnh tốc độ**: Slider mượt mà từ `0.25x` đến `3.0x`.
- **Bộ đếm bước**: Hiển thị chính xác `Step: 12 / 45`.
- **Cấu hình dữ liệu đầu vào**:
  - Nhập mảng thủ công tùy chỉnh.
  - Sinh mảng ngẫu nhiên và điều chỉnh số lượng phần tử.
  - Chọn giá trị cần tìm kiếm (Searching).
  - Điều chỉnh độ sâu đệ quy N (Recursion).
  - Chọn đồ thị mẫu, thêm đỉnh, xóa đỉnh, kéo thả đỉnh tự do (Graph Editor).

### 3. Giải Thích Từng Bước Bằng Tiếng Việt (Step Explanation)
- Trích xuất dòng code hiện tại đang thực thi.
- Mô tả chi tiết chức năng của câu lệnh.
- Hiển thị bảng biến động của các biến (Variable Tracker) theo thời gian thực (`i`, `j`, `key`, `mid`, `dist`, `queue`, ...).
- Giải thích vì sao cần thực hiện thao tác và kết quả đạt được sau mỗi bước.

### 4. Danh Mục Thuật Toán Toàn Diện (33 Thuật Toán)

#### 📊 1. Sorting Algorithms (10 thuật toán)
1. **Bubble Sort** (Sắp xếp nổi bọt)
2. **Selection Sort** (Sắp xếp chọn)
3. **Insertion Sort** (Sắp xếp chèn)
4. **Merge Sort** (Sắp xếp trộn - Chia để trị)
5. **Quick Sort** (Sắp xếp nhanh - Phân hoạch Pivot)
6. **Heap Sort** (Sắp xếp vun đống Max-Heap)
7. **Shell Sort** (Sắp xếp khoảng cách Gap)
8. **Counting Sort** (Sắp xếp đếm phân phối)
9. **Radix Sort** (Sắp xếp theo chữ số LSD)
10. **Bucket Sort** (Sắp xếp theo thùng)

#### 🔍 2. Searching Algorithms (5 thuật toán)
1. **Linear Search** (Tìm kiếm tuyến tính)
2. **Binary Search** (Tìm kiếm nhị phân với con trỏ Left, Mid, Right)
3. **Jump Search** (Tìm kiếm nhảy theo bước √n)
4. **Interpolation Search** (Tìm kiếm nội suy công thức toán học)
5. **Exponential Search** (Tìm kiếm hàm mũ nhân đôi chỉ số)

#### 🔄 3. Recursion & Call Stack (8 thuật toán)
1. **Factorial** (Giai thừa - Mô phỏng Call Stack Frame push/pop)
2. **Fibonacci** (Cây đệ quy nhị phân và phát hiện trùng lặp lời gọi)
3. **Sum of Array** (Tổng mảng quy nạp)
4. **Power (xⁿ)** (Lũy thừa nhị phân O(log n))
5. **Greatest Common Divisor** (Thuật toán Euclid tìm ƯCLN)
6. **Binary Search Recursive** (Tìm kiếm nhị phân đệ quy)
7. **Tower of Hanoi** (Tháp Hà Nội chuyển đĩa kinh điển)
8. **N-Queens Backtracking** (Bài toán Quay lui bàn cờ N×N)

#### 🕸️ 4. Graph Algorithms & Interactive Editor (10 thuật toán)
1. **Breadth-First Search (BFS)** (Duyệt theo chiều rộng với Queue & Visited Set)
2. **Depth-First Search (DFS)** (Duyệt theo chiều sâu với Call Stack)
3. **Dijkstra Shortest Path** (Đường đi ngắn nhất với Bảng khoảng cách & Relaxation)
4. **Bellman-Ford** (Hỗ trợ cạnh âm và phát hiện chu trình âm)
5. **Floyd-Warshall** (Đường đi ngắn nhất giữa mọi cặp đỉnh O(V³))
6. **Prim Minimum Spanning Tree** (Cây khung nhỏ nhất theo đỉnh)
7. **Kruskal Minimum Spanning Tree** (Cây khung nhỏ nhất theo cạnh & DSU)
8. **Topological Sort** (Sắp xếp thứ tự topo DAG theo bán bậc vào In-degree)
9. **Connected Components** (Tìm các thành phần liên thông độc lập)
10. **Cycle Detection** (Phát hiện chu trình bằng cạnh ngược DFS)

---

### 5. Thư Viện So Sánh Thuật Toán (Benchmark Workbench)
- Cho phép chọn nhiều thuật toán để so sánh đối đầu trên cùng một tập dữ liệu ngẫu nhiên (500 – 5,000 phần tử).
- Đo lường thời gian thực thi thực tế trong trình duyệt bằng `performance.now()`.
- Thống kê chính xác số phép so sánh, số lần hoán đổi (swaps), độ phức tạp thời gian và không gian.
- Biểu đồ thanh trực quan so sánh tốc độ giữa các thuật toán.

### 6. Quiz & Bài Tập Luyện Tập
- Ngân hàng câu hỏi trắc nghiệm, phân tích độ phức tạp, dự đoán kết quả và tìm lỗi mã nguồn.
- Lọc theo từng chủ đề (Sorting, Searching, Recursion, Graph) và cấp độ (Dễ, Trung bình, Khó).
- Phản hồi kết quả đúng/sai tức thì kèm giải thích chi tiết bằng tiếng Việt.

---

## 🎨 Giao Diện & Thiết Kế

- **Bảng màu tiêu chuẩn hiện đại**:
  - Background chính: `#0B1020`
  - Secondary Background: `#111827`
  - Surface: `#182235`
  - Primary Accent: `#6366F1`
  - Secondary Accent: `#8B5CF6`
  - Cyan Accent: `#06B6D4`
  - Success: `#22C55E`
  - Warning: `#F59E0B`
  - Error: `#EF4444`
- **Dark Mode mặc định** và hỗ trợ **Light Mode** với nút chuyển đổi 1-click.
- **Responsive Layout**: Tự động thích ứng trên mọi màn hình máy tính để bàn, laptop và thiết bị di động.
- **Hỗ trợ `prefers-reduced-motion`** cho người dùng nhạy cảm với chuyển động.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

AlgoVision được xây dựng hoàn toàn bằng **HTML5, CSS3 và JavaScript ES6+ tiêu chuẩn**, không cần cài đặt các framework nặng nề (như React hay Vue).

### Cách 1: Sử dụng VS Code Live Server (Khuyến nghị)
1. Mở thư mục dự án trong **Visual Studio Code**.
2. Cài đặt extension **Live Server** (nếu chưa có).
3. Nhấp chuột phải vào file `index.html` và chọn **"Open with Live Server"**.
4. Trình duyệt sẽ tự động mở trang web tại địa chỉ `http://127.0.0.1:5500`.

### Cách 2: Sử dụng bất kỳ Static HTTP Server nào
Ví dụ với Node.js:
```bash
# Sử dụng npx serve
npx serve .

# Hoặc sử dụng Python built-in server
python -m http.server 8000
```
Sau đó truy cập `http://localhost:8000` trên trình duyệt.

### Chạy Kiểm Thử Tự Động (Integration Tests)
Để xác nhận tính toàn vẹn của mã nguồn 3 ngôn ngữ và 33 bộ sinh bước thuật toán:
```bash
node test.cjs
```

---

## 📁 Cấu Trúc Mã Nguồn

```text
AlgoVision/
├── index.html                   # Giao diện chính của ứng dụng
├── test.cjs                     # Bộ kiểm thử tích hợp tự động cho 33 thuật toán
├── README.md                    # Tài liệu hướng dẫn sử dụng và kiến trúc
├── css/
│   ├── main.css                 # Reset, biến CSS, bảng màu Dark/Light Mode
│   ├── layout.css               # Header, Sidebar collapsible, Grid 2 cột
│   ├── components.css           # Nút bấm, thanh điều khiển, tabs, modals
│   ├── visualizer.css           # Cột sắp xếp, ô tìm kiếm, call stack, SVG đồ thị
│   ├── code-viewer.css          # IDE code viewer, line highlighting, giải thích
│   └── comparison-quiz.css      # Thẻ benchmark, biểu đồ so sánh, hệ thống quiz
└── js/
    ├── app.js                   # Orchestrator chính khởi tạo và điều phối
    ├── state.js                 # Quản lý trạng thái ứng dụng phản ứng
    ├── core/
    │   ├── execution-engine.js  # Step-based engine: Play/Pause/Rewind/Speed
    │   ├── syntax-highlighter.js# Syntax tokenizer ngoại tuyến cho C, C++, Python
    │   └── utils.js             # Hàm tiện ích sinh mảng, parse dữ liệu
    ├── algorithms/
    │   ├── sorting/             # 10 bộ sinh bước sắp xếp
    │   ├── searching/           # 5 bộ sinh bước tìm kiếm
    │   ├── recursion/           # 8 bộ sinh bước đệ quy & Call Stack
    │   └── graph/               # 10 bộ sinh bước đồ thị
    ├── code/
    │   ├── sorting-code.js      # Mã nguồn chuẩn C, C++, Python cho Sorting
    │   ├── searching-code.js    # Mã nguồn chuẩn C, C++, Python cho Searching
    │   ├── recursion-code.js    # Mã nguồn chuẩn C, C++, Python cho Recursion
    │   ├── graph-code.js        # Mã nguồn chuẩn C, C++, Python cho Graph
    │   └── registry.js          # Registry thống nhất cung cấp mã nguồn
    ├── visualizers/
    │   ├── sorting-visualizer.js   # Render cột động, màu trạng thái, hoán đổi
    │   ├── searching-visualizer.js # Render ô mảng, con trỏ L/M/R, thu hẹp phạm vi
    │   ├── recursion-visualizer.js # Render Call Stack frames và bàn cờ N-Queens
    │   └── graph-visualizer.js     # Engine SVG đồ thị tương tác & kéo thả đỉnh
    ├── components/
    │   ├── code-viewer.js       # Segmented control C/C++/Python, đồng bộ dòng
    │   ├── controls.js          # Play, Pause, Rewind, Step, Speed, Input Config
    │   ├── comparison.js        # Module so sánh hiệu năng benchmark
    │   └── quiz.js              # Module bài tập trắc nghiệm & chấm điểm
    └── data/
        ├── algorithms-meta.js   # Metadata độ phức tạp, mã giả, tổng quan tiếng Việt
        └── quiz-data.js         # Ngân hàng câu hỏi trắc nghiệm
```

---

## 👨‍💻 Tác Quyền & Mục Đích
Sản phẩm được phát triển nhằm phục vụ mục đích học tập, nghiên cứu và giảng dạy Khoa học Máy tính. Toàn bộ mã nguồn C, C++, Python được chuẩn hóa chính xác theo tiêu chuẩn hiện đại.
