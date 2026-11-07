/**
 * ALGOVISION - Comprehensive Quiz Question Bank
 * Multiple choice questions, output predictions, complexities, and code debugging
 */

export const QuizData = [
  {
    id: 1,
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'easy',
    question: 'Thuật toán sắp xếp nào sau đây luôn có độ phức tạp thời gian trong trường hợp xấu nhất (Worst Case) là O(n log n)?',
    options: [
      'Quick Sort',
      'Merge Sort',
      'Bubble Sort',
      'Insertion Sort'
    ],
    correctAnswer: 1,
    explanation: 'Merge Sort luôn chia đôi mảng đều đặn log(n) lần và trộn tuyến tính O(n), do đó trong mọi trường hợp (tốt nhất, trung bình, xấu nhất) đều đạt O(n log n). Quick Sort có trường hợp xấu nhất là O(n²).'
  },
  {
    id: 2,
    category: 'sorting',
    categoryName: 'Sorting',
    difficulty: 'medium',
    question: 'Khái niệm "Thuật toán sắp xếp ổn định" (Stable Sort) có nghĩa là gì?',
    options: [
      'Không bao giờ bị lỗi tràn bộ nhớ (Stack Overflow)',
      'Bảo toàn thứ tự tương đối ban đầu của các phần tử có giá trị khóa bằng nhau',
      'Thời gian chạy trong trường hợp xấu nhất luôn bằng trường hợp tốt nhất',
      'Chỉ sử dụng O(1) bộ nhớ phụ để sắp xếp tại chỗ'
    ],
    correctAnswer: 1,
    explanation: 'Một thuật toán sắp xếp được gọi là Ổn định (Stable) nếu hai phần tử có cùng giá trị khóa xuất hiện theo thứ tự nào trong mảng ban đầu thì sau khi sắp xếp, vị trí tương đối của chúng vẫn được giữ nguyên.'
  },
  {
    id: 3,
    category: 'searching',
    categoryName: 'Searching',
    difficulty: 'easy',
    question: 'Điều kiện tiên quyết để có thể áp dụng thuật toán Tìm kiếm nhị phân (Binary Search) là gì?',
    options: [
      'Tất cả các phần tử phải là số nguyên dương',
      'Mảng phải có kích thước là lũy thừa của 2',
      'Dữ liệu trong mảng phải được sắp xếp theo thứ tự (tăng hoặc giảm)',
      'Mảng không được chứa các phần tử trùng lặp'
    ],
    correctAnswer: 2,
    explanation: 'Binary Search dựa vào tính chất có thứ tự của mảng để so sánh giá trị cần tìm với phần tử chính giữa (mid), từ đó loại bỏ một nửa không gian tìm kiếm.'
  },
  {
    id: 4,
    category: 'searching',
    categoryName: 'Searching',
    difficulty: 'medium',
    question: 'Trong trường hợp dữ liệu được phân bố đồng đều (Uniformly Distributed), độ phức tạp thời gian trung bình của Interpolation Search là bao nhiêu?',
    options: [
      'O(log n)',
      'O(n)',
      'O(log log n)',
      'O(√n)'
    ],
    correctAnswer: 2,
    explanation: 'Khi dữ liệu phân bố đều tuyến tính, công thức nội suy ước lượng vị trí rất chính xác, giúp thời gian tìm kiếm trung bình đạt mức O(log log n).'
  },
  {
    id: 5,
    category: 'recursion',
    categoryName: 'Recursion',
    difficulty: 'easy',
    question: 'Thành phần nào bắt buộc phải có trong một hàm đệ quy để tránh gây lỗi tràn ngăn xếp (Stack Overflow)?',
    options: [
      'Vòng lặp for hoặc while',
      'Điều kiện dừng (Base Case)',
      'Biến toàn cục (Global variable)',
      'Câu lệnh break hoặc continue'
    ],
    correctAnswer: 1,
    explanation: 'Điều kiện dừng (Base Case) là trường hợp suy biến mà tại đó bài toán có thể giải trực tiếp không cần gọi đệ quy tiếp theo. Nếu thiếu Base Case, hàm sẽ gọi đệ quy vô hạn dẫn tới tràn Call Stack.'
  },
  {
    id: 6,
    category: 'recursion',
    categoryName: 'Recursion',
    difficulty: 'hard',
    question: 'Độ phức tạp thời gian của hàm tính Fibonacci đệ quy thông thường `fib(n) = fib(n-1) + fib(n-2)` không dùng memoization là gì?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(2ⁿ)',
      'O(n²)'
    ],
    correctAnswer: 2,
    explanation: 'Mỗi lời gọi hàm lại phân nhánh thành 2 lời gọi con độc lập, tạo nên một cây đệ quy nhị phân có chiều cao n, dẫn đến số phép tính bùng nổ theo cấp số nhân O(2ⁿ).'
  },
  {
    id: 7,
    category: 'graph',
    categoryName: 'Graph',
    difficulty: 'medium',
    question: 'Thuật toán Dijkstra KHÔNG thể hoạt động chính xác trong trường hợp nào sau đây?',
    options: [
      'Đồ thị có hướng (Directed Graph)',
      'Đồ thị có chứa cạnh mang trọng số âm',
      'Đồ thị có chứa chu trình dương',
      'Đồ thị không liên thông'
    ],
    correctAnswer: 1,
    explanation: 'Dijkstra là thuật toán tham lam (Greedy), giả định rằng khi một đỉnh đã được cố định khoảng cách ngắn nhất thì không thể có đường đi nào ngắn hơn tới đỉnh đó. Cạnh âm có thể vi phạm giả định này, khi đó phải sử dụng thuật toán Bellman-Ford.'
  },
  {
    id: 8,
    category: 'graph',
    categoryName: 'Graph',
    difficulty: 'medium',
    question: 'Cấu trúc dữ liệu nào được sử dụng phổ biến nhất để tối ưu thuật toán Kruskal tìm cây khung nhỏ nhất (MST)?',
    options: [
      'Ngăn xếp (Stack)',
      'Bảng băm (Hash Table)',
      'Hàng đợi hai đầu (Deque)',
      'Tập hợp các tập rời nhau (Disjoint Set Union / DSU)'
    ],
    correctAnswer: 3,
    explanation: 'DSU với kỹ thuật nén đường đi (Path Compression) và hợp nhất theo hạng (Union by Rank) cho phép kiểm tra hai đỉnh có tạo chu trình hay không gần như trong thời gian hằng số O(α(V)).'
  }
];
