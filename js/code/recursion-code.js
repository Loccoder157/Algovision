/**
 * ALGOVISION - Source Code for Recursion Algorithms
 * Đơn giản, chuẩn thụt lề 4 space, chuẩn đóng mở ngoặc như code thật
 */

export const RecursionCode = {
  // 1. Factorial
  'factorial': {
    c: `long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case: 0! = 1! = 1
    }
    return n * factorial(n - 1); // De quy
}`,
    cpp: `long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case: 0! = 1! = 1
    }
    return n * factorial(n - 1); // De quy
}`,
    python: `def factorial(n):
    if n <= 1:
        return 1  # Base case: 0! = 1! = 1
    return n * factorial(n - 1)  # De quy`
  },

  // 2. Fibonacci
  'fibonacci': {
    c: `int fib(int n) {
    if (n <= 0) {
        return 0; // Base case 1: F(0) = 0
    }
    if (n == 1) {
        return 1; // Base case 2: F(1) = 1
    }
    return fib(n - 1) + fib(n - 2); // De quy
}`,
    cpp: `int fib(int n) {
    if (n <= 0) {
        return 0; // Base case 1: F(0) = 0
    }
    if (n == 1) {
        return 1; // Base case 2: F(1) = 1
    }
    return fib(n - 1) + fib(n - 2); // De quy
}`,
    python: `def fib(n):
    if n <= 0:
        return 0  # Base case 1: F(0) = 0
    if n == 1:
        return 1  # Base case 2: F(1) = 1
    return fib(n - 1) + fib(n - 2)  # De quy`
  },

  // 3. Sum of Array
  'sum-array': {
    c: `int sumArray(int arr[], int n) {
    if (n <= 0) {
        return 0; // Base case: mang rong (n = 0)
    }
    return arr[n - 1] + sumArray(arr, n - 1); // De quy
}`,
    cpp: `int sumArray(const vector<int>& arr, int n) {
    if (n <= 0) {
        return 0; // Base case: mang rong (n = 0)
    }
    return arr[n - 1] + sumArray(arr, n - 1); // De quy
}`,
    python: `def sum_array(arr, n):
    if n <= 0:
        return 0  # Base case: mang rong (n = 0)
    return arr[n - 1] + sum_array(arr, n - 1)  # De quy`
  },

  // 4. Power (x^n)
  'power': {
    c: `long long power(int x, int n) {
    if (n == 0) {
        return 1; // Base case: x^0 = 1
    }
    long long half = power(x, n / 2);
    if (n % 2 == 0) {
        return half * half;
    }
    return x * half * half;
}`,
    cpp: `long long power(int x, int n) {
    if (n == 0) {
        return 1; // Base case: x^0 = 1
    }
    long long half = power(x, n / 2);
    if (n % 2 == 0) {
        return half * half;
    }
    return x * half * half;
}`,
    python: `def power(x, n):
    if n == 0:
        return 1  # Base case: x^0 = 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return x * half * half`
  },

  // 5. GCD (Euclidean)
  'gcd': {
    c: `int gcd(int a, int b) {
    if (b == 0) {
        return a; // Base case: b = 0 thi UCLN = a
    }
    return gcd(b, a % b); // De quy Euclid
}`,
    cpp: `int gcd(int a, int b) {
    if (b == 0) {
        return a; // Base case: b = 0 thi UCLN = a
    }
    return gcd(b, a % b); // De quy Euclid
}`,
    python: `def gcd(a, b):
    if b == 0:
        return a  # Base case: b = 0 thi UCLN = a
    return gcd(b, a % b)  # De quy Euclid`
  },

  // 6. Binary Search Recursive
  'binary-search-rec': {
    c: `int binarySearchRec(int arr[], int l, int r, int target) {
    if (l > r) {
        return -1; // Base case 1: khong tim thay
    }
    int mid = l + (r - l) / 2;
    if (arr[mid] == target) {
        return mid; // Base case 2: da tim thay
    }
    if (arr[mid] > target) {
        return binarySearchRec(arr, l, mid - 1, target);
    }
    return binarySearchRec(arr, mid + 1, r, target);
}`,
    cpp: `int binarySearchRec(const vector<int>& arr, int l, int r, int target) {
    if (l > r) {
        return -1; // Base case 1: khong tim thay
    }
    int mid = l + (r - l) / 2;
    if (arr[mid] == target) {
        return mid; // Base case 2: da tim thay
    }
    if (arr[mid] > target) {
        return binarySearchRec(arr, l, mid - 1, target);
    }
    return binarySearchRec(arr, mid + 1, r, target);
}`,
    python: `def binary_search_rec(arr, l, r, target):
    if l > r:
        return -1  # Base case 1: khong tim thay
    mid = l + (r - l) // 2
    if arr[mid] == target:
        return mid  # Base case 2: da tim thay
    elif arr[mid] > target:
        return binary_search_rec(arr, l, mid - 1, target)
    else:
        return binary_search_rec(arr, mid + 1, r, target)`
  },

  // 7. Tower of Hanoi
  'tower-of-hanoi': {
    c: `void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1: %c -> %c\\n", from, to);
        return; // Base case: 1 dia duy nhat
    }
    towerOfHanoi(n - 1, from, aux, to);
    printf("Move disk %d: %c -> %c\\n", n, from, to);
    towerOfHanoi(n - 1, aux, to, from);
}`,
    cpp: `void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << "Move disk 1: " << from << " -> " << to << endl;
        return; // Base case: 1 dia duy nhat
    }
    towerOfHanoi(n - 1, from, aux, to);
    cout << "Move disk " << n << ": " << from << " -> " << to << endl;
    towerOfHanoi(n - 1, aux, to, from);
}`,
    python: `def tower_of_hanoi(n, from_rod, to_rod, aux_rod):
    if n == 1:
        print(f"Move disk 1: {from_rod} -> {to_rod}")
        return  # Base case: 1 dia duy nhat
    tower_of_hanoi(n - 1, from_rod, aux_rod, to_rod)
    print(f"Move disk {n}: {from_rod} -> {to_rod}")
    tower_of_hanoi(n - 1, aux_rod, to_rod, from_rod)`
  },

  // 8. N-Queens Backtracking
  'n-queens': {
    c: `bool isSafe(int board[N][N], int row, int col) {
    for (int i = 0; i < col; i++) {
        if (board[row][i]) {
            return false;
        }
    }
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) {
            return false;
        }
    }
    for (int i = row, j = col; i < N && j >= 0; i++, j--) {
        if (board[i][j]) {
            return false;
        }
    }
    return true;
}

bool solveNQ(int board[N][N], int col) {
    if (col >= N) {
        return true;
    }
    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            if (solveNQ(board, col + 1)) {
                return true;
            }
            board[i][col] = 0; // Backtrack
        }
    }
    return false;
}`,
    cpp: `bool isSafe(const vector<vector<int>>& b, int r, int c, int N) {
    for (int i = 0; i < c; i++) {
        if (b[r][i]) {
            return false;
        }
    }
    for (int i = r, j = c; i >= 0 && j >= 0; i--, j--) {
        if (b[i][j]) {
            return false;
        }
    }
    for (int i = r, j = c; i < N && j >= 0; i++, j--) {
        if (b[i][j]) {
            return false;
        }
    }
    return true;
}

bool solveNQ(vector<vector<int>>& b, int col, int N) {
    if (col >= N) {
        return true;
    }
    for (int i = 0; i < N; i++) {
        if (isSafe(b, i, col, N)) {
            b[i][col] = 1;
            if (solveNQ(b, col + 1, N)) {
                return true;
            }
            b[i][col] = 0; // Backtrack
        }
    }
    return false;
}`,
    python: `def is_safe(board, row, col, n):
    for i in range(col):
        if board[row][i]:
            return False
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j]:
            return False
    for i, j in zip(range(row, n), range(col, -1, -1)):
        if board[i][j]:
            return False
    return True

def solve_nq(board, col, n):
    if col >= n:
        return True
    for i in range(n):
        if is_safe(board, i, col, n):
            board[i][col] = 1
            if solve_nq(board, col + 1, n):
                return True
            board[i][col] = 0  # Backtrack
    return False`
  }
};
