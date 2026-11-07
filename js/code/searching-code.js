/**
 * ALGOVISION - Source Code for Searching Algorithms
 * Cực kỳ rõ ràng, chuẩn thụt lề 4 space, chuẩn đóng mở ngoặc như code thật
 */

export const SearchingCode = {
  // 1. Linear Search
  'linear-search': {
    c: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i; // Tim thay tai vi tri i
        }
    }
    return -1; // Khong tim thay
}`,
    cpp: `int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Tim thay
        }
    }
    return -1; // Khong tim thay
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Tim thay
    return -1  # Khong tim thay`
  },

  // 2. Binary Search
  'binary-search': {
    c: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    cpp: `int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
  },

  // 3. Jump Search
  'jump-search': {
    c: `int jumpSearch(int arr[], int n, int target) {
    int step = (int)sqrt(n);
    int prev = 0;
    while (arr[(step < n ? step : n) - 1] < target) {
        prev = step;
        step += (int)sqrt(n);
        if (prev >= n) {
            return -1;
        }
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == (step < n ? step : n)) {
            return -1;
        }
    }
    if (arr[prev] == target) {
        return prev;
    }
    return -1;
}`,
    cpp: `int jumpSearch(const vector<int>& arr, int target) {
    int n = arr.size();
    int step = sqrt(n);
    int prev = 0;
    while (arr[min(step, n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n) {
            return -1;
        }
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == min(step, n)) {
            return -1;
        }
    }
    if (arr[prev] == target) {
        return prev;
    }
    return -1;
}`,
    python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    if arr[prev] == target:
        return prev
    return -1`
  },

  // 4. Interpolation Search
  'interpolation-search': {
    c: `int interpolationSearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            return (arr[low] == target) ? low : -1;
        }
        int pos = low + ((high - low) * (target - arr[low])) / (arr[high] - arr[low]);
        if (arr[pos] == target) {
            return pos;
        }
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    cpp: `int interpolationSearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            return (arr[low] == target) ? low : -1;
        }
        int pos = low + ((high - low) * (target - arr[low])) / (arr[high] - arr[low]);
        if (arr[pos] == target) {
            return pos;
        }
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            return low if arr[low] == target else -1
        pos = low + ((high - low) * (target - arr[low])) // (arr[high] - arr[low])
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`
  },

  // 5. Exponential Search
  'exponential-search': {
    c: `int exponentialSearch(int arr[], int n, int target) {
    if (arr[0] == target) {
        return 0;
    }
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    int left = i / 2, right = (i < n ? i : n - 1);
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    cpp: `int exponentialSearch(const vector<int>& arr, int target) {
    int n = arr.size();
    if (arr[0] == target) {
        return 0;
    }
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    int left = i / 2, right = min(i, n - 1);
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    python: `def exponential_search(arr, target):
    n = len(arr)
    if arr[0] == target:
        return 0
    i = 1
    while i < n and arr[i] <= target:
        i *= 2
    left, right = i // 2, min(i, n - 1)
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
  }
};
