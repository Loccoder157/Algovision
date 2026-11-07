/**
 * ALGOVISION - Complete Algorithm Metadata
 * Comprehensive educational information, complexities, pseudocodes, and Vietnamese overviews
 */

export const AlgorithmsMeta = {
  // ==================== SORTING ALGORITHMS ====================
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n²)',
    description: 'Thuật toán sắp xếp nổi bọt so sánh từng cặp phần tử liền kề và hoán đổi chúng nếu sai thứ tự.',
    overview: {
      what: 'Bubble Sort là thuật toán sắp xếp đơn giản nhất dựa trên phép so sánh trực tiếp hai phần tử kề nhau.',
      when: 'Thích hợp cho mục đích giảng dạy bước đầu về sắp xếp hoặc khi mảng đã gần như có thứ tự.',
      principle: 'Duyệt qua mảng nhiều lần, mỗi lần đẩy phần tử lớn nhất còn lại về cuối mảng như bọt khí nổi lên mặt nước.',
      pros: 'Dễ cài đặt, trực quan, ổn định (Stable), sắp xếp tại chỗ (In-place).',
      cons: 'Hiệu suất kém O(n²), không dùng cho tập dữ liệu thực tế lớn.'
    },
    pseudocode: `procedure bubbleSort(A : list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
        n = n - 1
    until not swapped
end procedure`,
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'Có (Stable)',
      inPlace: 'Có (In-place)'
    }
  },

  'selection-sort': {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n²)',
    description: 'Thuật toán sắp xếp chọn tìm phần tử nhỏ nhất trong phần chưa sắp xếp và đưa về vị trí đầu tiên.',
    overview: {
      what: 'Selection Sort chia mảng thành hai phần: phần đã sắp xếp và phần chưa sắp xếp.',
      when: 'Phù hợp khi chi phí ghi/hoán đổi bộ nhớ đắt hơn so với chi phí đọc dữ liệu (tối đa n lần hoán đổi).',
      principle: 'Tại mỗi bước i, duyệt tìm giá trị nhỏ nhất từ vị trí i đến n-1, sau đó hoán vị với phần tử tại i.',
      pros: 'Số lần hoán đổi bộ nhớ ít nhất O(n), thuật toán đơn giản, in-place.',
      cons: 'Thời gian chạy luôn là O(n²) ngay cả khi mảng đã sắp xếp, không ổn định (Unstable).'
    },
    pseudocode: `procedure selectionSort(A : list of sortable items)
    n = length(A)
    for i = 0 to n - 1 do
        min_idx = i
        for j = i + 1 to n do
            if A[j] < A[min_idx] then
                min_idx = j
            end if
        end for
        if min_idx != i then
            swap(A[i], A[min_idx])
        end if
    end for
end procedure`,
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'Không (Unstable)',
      inPlace: 'Có (In-place)'
    }
  },

  'insertion-sort': {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n²)',
    description: 'Thuật toán sắp xếp chèn xây dựng mảng kết quả từng phần tử một tương tự cách xếp bài tây.',
    overview: {
      what: 'Insertion Sort duy trì một dãy con đã có thứ tự và chèn từng phần tử tiếp theo vào đúng vị trí.',
      when: 'Rất hiệu quả cho mảng nhỏ (n < 50) hoặc mảng đã gần như sắp xếp (gần như O(n)).',
      principle: 'Lấy phần tử key tại vị trí i, dời các phần tử lớn hơn key sang phải, sau đó đặt key vào chỗ trống.',
      pros: 'Rất nhanh với mảng gần có thứ tự O(n), ổn định (Stable), in-place, dễ triển khai.',
      cons: 'Kém hiệu quả khi mảng bị đảo ngược hoàn toàn O(n²).'
    },
    pseudocode: `procedure insertionSort(A : list of sortable items)
    for i = 1 to length(A) - 1 do
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        end while
        A[j + 1] = key
    end for
end procedure`,
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'Có (Stable)',
      inPlace: 'Có (In-place)'
    }
  },

  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n log n)',
    description: 'Thuật toán sắp xếp trộn áp dụng chiến lược Chia để trị (Divide and Conquer) với độ phức tạp tối ưu O(n log n).',
    overview: {
      what: 'Merge Sort chia mảng làm hai nửa bằng nhau, sắp xếp đệ quy từng nửa rồi trộn (merge) hai nửa lại.',
      when: 'Lý tưởng khi cần độ ổn định chắc chắn O(n log n) trong mọi trường hợp hoặc sắp xếp danh sách liên kết.',
      principle: 'Chia mảng tới kích thước 1, sau đó so sánh từng cặp phần tử từ 2 mảng con để ghép vào mảng mới.',
      pros: 'Độ phức tạp luôn là O(n log n), thuật toán ổn định (Stable), hiệu năng dự đoán trước được.',
      cons: 'Cần O(n) bộ nhớ phụ để trộn mảng, không in-place cho mảng thông thường.'
    },
    pseudocode: `procedure mergeSort(A, left, right)
    if left < right then
        mid = (left + right) / 2
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)
    end if
end procedure`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      stable: 'Có (Stable)',
      inPlace: 'Không (Not in-place)'
    }
  },

  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n log n)',
    description: 'Sắp xếp nhanh chọn một phần tử chốt (Pivot) và phân hoạch các phần tử nhỏ hơn sang trái, lớn hơn sang phải.',
    overview: {
      what: 'Quick Sort là thuật toán sắp xếp dựa trên phân hoạch chia để trị nhanh nhất trên thực tế.',
      when: 'Được sử dụng làm chuẩn sắp xếp mặc định trong nhiều thư viện chuẩn (như std::sort trong C++).',
      principle: 'Chọn chốt Pivot, phân hoạch sao cho mảng con bên trái <= Pivot và mảng con bên phải >= Pivot.',
      pros: 'Hằng số nhỏ, tốc độ thực tế cực nhanh, in-place tiết kiệm bộ nhớ.',
      cons: 'Trường hợp xấu nhất có thể rơi vào O(n²) nếu chọn pivot kém, không ổn định (Unstable).'
    },
    pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        pi = partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)
    end if
end procedure`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      stable: 'Không (Unstable)',
      inPlace: 'Có (In-place)'
    }
  },

  'heap-sort': {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n log n)',
    description: 'Sắp xếp vun đống sử dụng cấu trúc Max-Heap để lần lượt đưa phần tử lớn nhất về cuối mảng.',
    overview: {
      what: 'Heap Sort chuyển mảng thành cây nhị phân gần hoàn chỉnh thỏa mãn tính chất Max-Heap.',
      when: 'Cần bảo đảm thời gian chạy tối đa O(n log n) nhưng không được cấp phát thêm bộ nhớ phụ.',
      principle: 'Tạo Max-Heap, đổi chỗ gốc (lớn nhất) với phần tử cuối, giảm kích thước heap và vun đống lại.',
      pros: 'Hiệu năng bảo đảm O(n log n) trong mọi trường hợp, in-place O(1) bộ nhớ phụ.',
      cons: 'Không ổn định (Unstable), hằng số thực thi lớn hơn Quick Sort do truy cập bộ nhớ không tuần tự.'
    },
    pseudocode: `procedure heapSort(A)
    buildMaxHeap(A)
    for i = length(A) - 1 down to 1 do
        swap(A[0], A[i])
        heapify(A, 0, i)
    end for
end procedure`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
      stable: 'Không (Unstable)',
      inPlace: 'Có (In-place)'
    }
  },

  'shell-sort': {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n^1.5)',
    description: 'Cải tiến của Insertion Sort bằng cách so sánh và hoán đổi các phần tử ở khoảng cách xa (gap).',
    overview: {
      what: 'Shell Sort sắp xếp các phần tử cách nhau một khoảng gap, giảm dần khoảng cách về 1.',
      when: 'Thích hợp cho các hệ thống nhúng với bộ nhớ hạn chế và dữ liệu trung bình.',
      principle: 'Sắp xếp chèn theo từng bước gap, dần dần làm cho mảng có trật tự trước khi chạy gap = 1.',
      pros: 'Cải thiện đáng kể so với Insertion Sort O(n²), in-place, không cần đệ quy.',
      cons: 'Phức tạp trong việc chọn dãy gap tối ưu, không ổn định.'
    },
    pseudocode: `procedure shellSort(A)
    n = length(A)
    gap = n / 2
    while gap > 0 do
        for i = gap to n - 1 do
            temp = A[i]
            j = i
            while j >= gap and A[j - gap] > temp do
                A[j] = A[j - gap]
                j = j - gap
            end while
            A[j] = temp
        end for
        gap = gap / 2
    end while
end procedure`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n^1.3)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'Không (Unstable)',
      inPlace: 'Có (In-place)'
    }
  },

  'counting-sort': {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n + k)',
    description: 'Sắp xếp đếm phân phối tần suất xuất hiện của các khóa trong phạm vi hữu hạn để sắp xếp trong thời gian tuyến tính.',
    overview: {
      what: 'Counting Sort là thuật toán sắp xếp không dựa trên phép so sánh (Non-comparison based).',
      when: 'Khi tập dữ liệu là các số nguyên có giá trị tối đa k không quá lớn so với số lượng phần tử n.',
      principle: 'Đếm số lần xuất hiện của mỗi giá trị, sau đó điền lại các giá trị vào mảng theo thứ tự.',
      pros: 'Tốc độ cực nhanh O(n + k), tuyến tính nếu k <= n, ổn định (Stable).',
      cons: 'Không dùng được cho số thực hoặc phạm vi giá trị quá lớn vì tốn bộ nhớ.'
    },
    pseudocode: `procedure countingSort(A)
    k = max(A)
    count = array of size k + 1 with 0
    for each x in A do
        count[x] = count[x] + 1
    end for
    idx = 0
    for i = 0 to k do
        while count[i] > 0 do
            A[idx] = i
            idx = idx + 1
            count[i] = count[i] - 1
        end while
    end for
end procedure`,
    complexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)',
      space: 'O(k)',
      stable: 'Có (Stable)',
      inPlace: 'Có thể'
    }
  },

  'radix-sort': {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(d · (n + b))',
    description: 'Sắp xếp theo từng chữ số từ hàng đơn vị đến hàng cao nhất bằng thuật toán con ổn định.',
    overview: {
      what: 'Radix Sort sắp xếp các số nguyên bằng cách xử lý từng chữ số (digit) theo cơ số b.',
      when: 'Sắp xếp số nguyên lớn hoặc chuỗi ký tự có độ dài cố định.',
      principle: 'Duyệt từ chữ số ít quan trọng nhất (LSD) đến chữ số quan trọng nhất (MSD) dùng Counting Sort.',
      pros: 'Độ phức tạp tuyến tính O(d * n) khi số lượng chữ số d là hằng số, ổn định (Stable).',
      cons: 'Phụ thuộc vào cơ số, yêu cầu thêm bộ nhớ phụ cho từng lượt phân loại.'
    },
    pseudocode: `procedure radixSort(A)
    m = max(A)
    exp = 1
    while m / exp > 0 do
        countSortByDigit(A, exp)
        exp = exp * 10
    end while
end procedure`,
    complexity: {
      best: 'O(d · (n + b))',
      average: 'O(d · (n + b))',
      worst: 'O(d · (n + b))',
      space: 'O(n + b)',
      stable: 'Có (Stable)',
      inPlace: 'Không'
    }
  },

  'bucket-sort': {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    category: 'sorting',
    categoryLabel: 'Sorting Algorithms',
    badge: 'O(n + k)',
    description: 'Phân phối các phần tử vào nhiều thùng (buckets), sắp xếp từng thùng rồi ghép lại.',
    overview: {
      what: 'Bucket Sort chia khoảng giá trị thành các khoảng con (thùng) đều nhau.',
      when: 'Dữ liệu đầu vào được phân bố đều ngẫu nhiên trong một khoảng xác định.',
      principle: 'Ánh xạ từng phần tử vào thùng tương ứng, sắp xếp các thùng nhỏ rồi nối kết quả.',
      pros: 'Thời gian trung bình O(n + k) tuyến tính khi dữ liệu phân bố đều.',
      cons: 'Hiệu suất giảm về O(n²) nếu dữ liệu dồn hết vào một thùng đơn lẻ.'
    },
    pseudocode: `procedure bucketSort(A, k)
    create k empty buckets
    for each x in A do
        insert x into bucket[index(x)]
    end for
    for each bucket do
        sort(bucket)
    end for
    return concatenation of all buckets
end procedure`,
    complexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n²)',
      space: 'O(n + k)',
      stable: 'Có (Stable)',
      inPlace: 'Không'
    }
  },

  // ==================== SEARCHING ALGORITHMS ====================
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    categoryLabel: 'Searching Algorithms',
    badge: 'O(n)',
    description: 'Tìm kiếm tuần tự duyệt qua từng phần tử từ đầu đến cuối mảng cho đến khi thấy giá trị cần tìm.',
    overview: {
      what: 'Linear Search kiểm tra từng phần tử liên tiếp mà không yêu cầu mảng phải được sắp xếp.',
      when: 'Mảng chưa sắp xếp hoặc tập dữ liệu nhỏ cần tra cứu nhanh không bõ công sắp xếp trước.',
      principle: 'Duyệt tuần tự với vòng lặp từ chỉ số 0 đến n-1, so sánh A[i] với target.',
      pros: 'Đơn giản nhất, hoạt động trên mọi loại dữ liệu (kể cả chưa có thứ tự), không tốn thêm bộ nhớ.',
      cons: 'Chậm O(n) với tập dữ liệu lớn.'
    },
    pseudocode: `procedure linearSearch(A, target)
    for i = 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    categoryLabel: 'Searching Algorithms',
    badge: 'O(log n)',
    description: 'Tìm kiếm nhị phân chia đôi không gian tìm kiếm tại mỗi bước trên mảng đã được sắp xếp.',
    overview: {
      what: 'Binary Search so sánh giá trị cần tìm với phần tử chính giữa (mid) để loại bỏ một nửa mảng.',
      when: 'Mảng đã được sắp xếp tăng hoặc giảm dần.',
      principle: 'Nếu A[mid] == target: tìm thấy. Nếu target < A[mid]: tìm nửa trái. Ngược lại: tìm nửa phải.',
      pros: 'Rất nhanh O(log n), chỉ cần tối đa ~30 lần so sánh để tìm kiếm trong 1 tỷ phần tử.',
      cons: 'Bắt buộc dữ liệu phải được sắp xếp trước và hỗ trợ truy cập ngẫu nhiên O(1).'
    },
    pseudocode: `procedure binarySearch(A, target)
    left = 0
    right = length(A) - 1
    while left <= right do
        mid = left + (right - left) / 2
        if A[mid] == target then return mid
        else if A[mid] < target then left = mid + 1
        else right = mid - 1
    end while
    return -1
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  'jump-search': {
    id: 'jump-search',
    name: 'Jump Search',
    category: 'searching',
    categoryLabel: 'Searching Algorithms',
    badge: 'O(√n)',
    description: 'Nhảy qua các khối kích thước √n rồi thực hiện tìm kiếm tuyến tính ngược lại trong khối chứa giá trị.',
    overview: {
      what: 'Jump Search kiểm tra ít phần tử hơn Linear Search bằng cách nhảy về phía trước theo bước cố định √n.',
      when: 'Khi chi phí nhảy lùi đắt (hệ thống lưu trữ ngoài hoặc danh sách nhảy).',
      principle: 'Nhảy các bước k = √n cho đến khi A[k] >= target, sau đó duyệt tuyến tính từ khối trước đó.',
      pros: 'Nhanh hơn O(n), chỉ cần O(√n), chỉ nhảy lùi duy nhất một lần.',
      cons: 'Vẫn chậm hơn Binary Search O(log n).'
    },
    pseudocode: `procedure jumpSearch(A, target)
    n = length(A)
    step = floor(sqrt(n))
    prev = 0
    while A[min(step, n) - 1] < target do
        prev = step
        step = step + floor(sqrt(n))
        if prev >= n then return -1
    end while
    while A[prev] < target do
        prev = prev + 1
        if prev == min(step, n) then return -1
    end while
    if A[prev] == target then return prev
    return -1
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(√n)',
      worst: 'O(√n)',
      space: 'O(1)',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  'interpolation-search': {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    category: 'searching',
    categoryLabel: 'Searching Algorithms',
    badge: 'O(log log n)',
    description: 'Tìm kiếm nội suy ước tính vị trí của phần tử dựa trên giá trị của khóa (tương tự tra từ điển).',
    overview: {
      what: 'Interpolation Search cải tiến từ Binary Search bằng công thức nội suy tuyến tính vị trí pos.',
      when: 'Mảng đã được sắp xếp và giá trị các phần tử được phân bố đồng đều (Uniform distribution).',
      principle: 'Tính pos = low + ((target - A[low]) * (high - low)) / (A[high] - A[low]).',
      pros: 'Cực nhanh O(log log n) trên dữ liệu phân bố đều.',
      cons: 'Thời gian chạy có thể tụt về O(n) nếu dữ liệu phân bố lệch hàm mũ.'
    },
    pseudocode: `procedure interpolationSearch(A, target)
    low = 0
    high = length(A) - 1
    while low <= high and target >= A[low] and target <= A[high] do
        pos = low + floor(((high - low) / (A[high] - A[low])) * (target - A[low]))
        if A[pos] == target then return pos
        if A[pos] < target then low = pos + 1
        else high = pos - 1
    end while
    return -1
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(log log n)',
      worst: 'O(n)',
      space: 'O(1)',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  'exponential-search': {
    id: 'exponential-search',
    name: 'Exponential Search',
    category: 'searching',
    categoryLabel: 'Searching Algorithms',
    badge: 'O(log n)',
    description: 'Tìm khoảng chứa giá trị bằng cách nhân đôi chỉ số (1, 2, 4, 8, 16...) rồi áp dụng Binary Search.',
    overview: {
      what: 'Exponential Search xác định khoảng [i/2, i] chứa target bằng cách tăng lũy thừa chỉ số tìm kiếm.',
      when: 'Đặc biệt hiệu quả cho mảng vô hạn hoặc khi phần tử tìm kiếm nằm gần đầu mảng.',
      principle: 'Bắt đầu tại 1, nhân đôi chỉ số i *= 2 chừng nào A[i] <= target, sau đó áp dụng Binary Search.',
      pros: 'Rất nhanh O(log i) với i là vị trí của phần tử cần tìm.',
      cons: 'Yêu cầu dữ liệu phải được sắp xếp trước.'
    },
    pseudocode: `procedure exponentialSearch(A, target)
    if A[0] == target then return 0
    i = 1
    while i < length(A) and A[i] <= target do
        i = i * 2
    end while
    return binarySearchRange(A, target, i / 2, min(i, length(A) - 1))
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  // ==================== RECURSION ALGORITHMS ====================
  'factorial': {
    id: 'factorial',
    name: 'Factorial (Giai thừa)',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(n)',
    description: 'Tính giai thừa n! = n * (n - 1)! với điều kiện dừng n <= 1.',
    overview: {
      what: 'Ví dụ kinh điển nhất để học về đệ quy và cấu trúc Call Stack.',
      when: 'Tính tổ hợp, hoán vị, toán học rời rạc.',
      principle: 'Hàm gọi lại chính nó với tham số giảm dần n - 1 cho đến khi chạm base case n <= 1.',
      pros: 'Mã nguồn ngắn gọn, diễn đạt đúng định nghĩa toán học.',
      cons: 'Tốn O(n) không gian ngăn xếp (Call Stack), nguy cơ tràn bộ nhớ Stack Overflow nếu n quá lớn.'
    },
    pseudocode: `function factorial(n)
    if n <= 1 then
        return 1
    end if
    return n * factorial(n - 1)
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(n) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'fibonacci': {
    id: 'fibonacci',
    name: 'Fibonacci',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(2ⁿ)',
    description: 'Mô phỏng cây đệ quy nhị phân sinh dãy số Fibonacci F(n) = F(n-1) + F(n-2).',
    overview: {
      what: 'Ví dụ điển hình cho đệ quy phân nhánh và sự trùng lặp lời gọi hàm.',
      when: 'Minh họa sự bùng nổ hàm mũ O(2ⁿ) và sự cần thiết của kỹ thuật Ghi nhớ (Memoization).',
      principle: 'Mỗi lời gọi sinh ra hai nhánh đệ quy con độc lập.',
      pros: 'Mô tả nguyên bản công thức toán học.',
      cons: 'Độ phức tạp hàm mũ O(2ⁿ), tính toán lặp lại cùng một giá trị nhiều lần.'
    },
    pseudocode: `function fib(n)
    if n <= 0 then return 0
    if n == 1 then return 1
    return fib(n - 1) + fib(n - 2)
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(2ⁿ)',
      worst: 'O(2ⁿ)',
      space: 'O(n) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'sum-array': {
    id: 'sum-array',
    name: 'Sum of Array (Tổng mảng)',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(n)',
    description: 'Tính tổng mảng bằng đệ quy: Sum(A, n) = A[n-1] + Sum(A, n-1).',
    overview: {
      what: 'Đệ quy xử lý dữ liệu cấu trúc mảng tuyến tính.',
      when: 'Luyện tập kỹ năng quy nạp đệ quy trên danh sách.',
      principle: 'Cộng phần tử cuối cùng với tổng đệ quy của n-1 phần tử còn lại.',
      pros: 'Tư duy hàm hóa rõ ràng.',
      cons: 'Kém hiệu quả hơn vòng lặp đơn thuần do chi phí gọi hàm.'
    },
    pseudocode: `function sumArray(A, n)
    if n <= 0 then return 0
    return A[n - 1] + sumArray(A, n - 1)
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(n) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'power': {
    id: 'power',
    name: 'Power (Lũy thừa xⁿ)',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(log n)',
    description: 'Lũy thừa nhị phân nhanh xⁿ bằng đệ quy chia để trị chỉ với O(log n) phép nhân.',
    overview: {
      what: 'Thuật toán tính xⁿ bằng cách lấy half = power(x, n/2) và bình phương.',
      when: 'Tính toán lũy thừa lớn trong mật mã học và toán học số học.',
      principle: 'Nếu n chẵn: xⁿ = (x^(n/2))². Nếu n lẻ: xⁿ = x * (x^(n/2))².',
      pros: 'Tối ưu vượt bậc từ O(n) xuống O(log n).',
      cons: 'Cần lưu ý trường hợp số mũ âm hoặc tràn số nguyên.'
    },
    pseudocode: `function power(x, n)
    if n == 0 then return 1
    half = power(x, floor(n / 2))
    if n % 2 == 0 then return half * half
    else return x * half * half
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(log n) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'gcd': {
    id: 'gcd',
    name: 'Greatest Common Divisor (ƯCLN)',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(log(min(a, b)))',
    description: 'Thuật toán Euclid tìm ước chung lớn nhất của hai số: gcd(a, b) = gcd(b, a % b).',
    overview: {
      what: 'Một trong những thuật toán lâu đời nhất lịch sử (từ năm 300 TCN).',
      when: 'Rút gọn phân số, tính BCNN, thuật toán mật mã RSA.',
      principle: 'Nếu b == 0 kết quả là a; ngược lại gọi tiếp gcd(b, a % b).',
      pros: 'Tốc độ cực nhanh theo logarit, mã nguồn cực kỳ tinh gọn.',
      cons: 'Cần cẩn thận khi truyền số âm hoặc 0.'
    },
    pseudocode: `function gcd(a, b)
    if b == 0 then return a
    return gcd(b, a % b)
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(log(min(a, b)))',
      worst: 'O(log(min(a, b)))',
      space: 'O(log(min(a, b))) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'binary-search-rec': {
    id: 'binary-search-rec',
    name: 'Binary Search Recursive',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(log n)',
    description: 'Cài đặt thuật toán tìm kiếm nhị phân bằng kỹ thuật đệ quy chia để trị.',
    overview: {
      what: 'Mỗi bước đệ quy nhận vào khoảng giới hạn [left, right] mới.',
      when: 'Khi muốn viết mã nguồn theo phong cách chức năng (functional programming).',
      principle: 'Kiểm tra A[mid], sau đó gọi đệ quy nửa bên trái hoặc nửa bên phải.',
      pros: 'Cấu trúc tự nhiên, dễ chứng minh tính đúng đắn bằng quy nạp.',
      cons: 'Tốn O(log n) không gian Call Stack so với phiên bản vòng lặp O(1).'
    },
    pseudocode: `function binarySearchRec(A, left, right, target)
    if left > right then return -1
    mid = left + (right - left) / 2
    if A[mid] == target then return mid
    if A[mid] > target then return binarySearchRec(A, left, mid - 1, target)
    return binarySearchRec(A, mid + 1, right, target)
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(log n) stack',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  'tower-of-hanoi': {
    id: 'tower-of-hanoi',
    name: 'Tower of Hanoi (Tháp Hà Nội)',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(2ⁿ)',
    description: 'Bài toán kinh điển di chuyển n đĩa từ cọc nguồn sang cọc đích với sự trợ giúp của cọc trung gian.',
    overview: {
      what: 'Minh họa xuất sắc cho việc chia bài toán lớn thành các bài toán con tương tự.',
      when: 'Nghiên cứu đệ quy, quy nạp toán học.',
      principle: '1) Chuyển n-1 đĩa sang cọc phụ; 2) Chuyển đĩa thứ n sang cọc đích; 3) Chuyển n-1 đĩa từ cọc phụ sang cọc đích.',
      pros: 'Giải quyết hoàn hảo bài toán quy nạp phức tạp chỉ với vài dòng code.',
      cons: 'Số bước di chuyển tăng theo 2ⁿ - 1 (với n=64 cần hàng tỷ năm).'
    },
    pseudocode: `procedure hanoi(n, source, target, auxiliary)
    if n == 1 then
        move disk 1 from source to target
        return
    end if
    hanoi(n - 1, source, auxiliary, target)
    move disk n from source to target
    hanoi(n - 1, auxiliary, target, source)
end procedure`,
    complexity: {
      best: 'O(2ⁿ)',
      average: 'O(2ⁿ)',
      worst: 'O(2ⁿ)',
      space: 'O(n) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'n-queens': {
    id: 'n-queens',
    name: 'N-Queens Backtracking',
    category: 'recursion',
    categoryLabel: 'Recursion',
    badge: 'O(N!)',
    description: 'Bài toán Quay lui (Backtracking) đặt N quân hậu lên bàn cờ N×N sao cho không quân nào khống chế nhau.',
    overview: {
      what: 'Ví dụ chuẩn mực của thuật toán Quay lui: thử nghiệm, kiểm tra hợp lệ, đệ quy và thu hồi trạng thái.',
      when: 'Các bài toán tìm kiếm tổ hợp, giải câu đố Sudoku, xếp lịch.',
      principle: 'Đặt quân hậu từng cột, kiểm tra an toàn; nếu ngõ cụt thì bỏ cờ và thử dòng khác (Backtrack).',
      pros: 'Cắt tỉa nhánh sớm (pruning) giúp tránh phải duyệt toàn bộ N^N khả năng.',
      cons: 'Thời gian trong trường hợp xấu nhất vẫn theo giai thừa O(N!).'
    },
    pseudocode: `function solveNQ(board, col, N)
    if col >= N then return true
    for row = 0 to N - 1 do
        if isSafe(board, row, col, N) then
            board[row][col] = 1
            if solveNQ(board, col + 1, N) then return true
            board[row][col] = 0 // Backtrack
        end if
    end for
    return false
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(N!)',
      worst: 'O(N!)',
      space: 'O(N) stack + O(N²)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  // ==================== GRAPH ALGORITHMS ====================
  'bfs': {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V + E)',
    description: 'Duyệt đồ thị theo chiều rộng sử dụng hàng đợi (Queue), thăm các đỉnh theo từng lớp khoảng cách.',
    overview: {
      what: 'BFS mở rộng tìm kiếm theo từng tầng đồng tâm tính từ đỉnh xuất phát.',
      when: 'Tìm đường đi ngắn nhất trên đồ thị không có trọng số hoặc tìm các đỉnh gần nhất.',
      principle: 'Sử dụng Queue (FIFO): đẩy đỉnh bắt đầu vào hàng đợi, lấy đỉnh ra và đưa tất cả đỉnh kề chưa thăm vào.',
      pros: 'Bảo đảm tìm thấy đường đi ngắn nhất (ít cạnh nhất) trên đồ thị không trọng số.',
      cons: 'Tốn bộ nhớ O(V) để lưu hàng đợi khi đồ thị có bậc lớn.'
    },
    pseudocode: `procedure BFS(graph, startNode)
    let Q be a Queue
    let visited be a Set
    Q.enqueue(startNode)
    visited.add(startNode)
    while Q is not empty do
        u = Q.dequeue()
        for each neighbor v of u do
            if v not in visited then
                visited.add(v)
                Q.enqueue(v)
            end if
        end for
    end while
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'dfs': {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V + E)',
    description: 'Duyệt đồ thị theo chiều sâu đi xa nhất có thể theo từng nhánh trước khi quay lui.',
    overview: {
      what: 'DFS thám hiểm theo nhánh sâu nhất sử dụng Ngăn xếp (Stack) hoặc Đệ quy.',
      when: 'Phát hiện chu trình, sắp xếp topo, tìm thành phần liên thông, giải mê cung.',
      principle: 'Đánh dấu đỉnh đã thăm, duyệt đệ quy tới các đỉnh kề chưa thăm cho tới ngõ cụt thì lùi lại.',
      pros: 'Tốn ít bộ nhớ O(độ sâu) so với BFS, dễ cài đặt bằng đệ quy.',
      cons: 'Không bảo đảm đường đi ngắn nhất, có thể đi sâu vào nhánh vô tận nếu không đánh dấu visited.'
    },
    pseudocode: `procedure DFS(graph, u, visited)
    visited.add(u)
    for each neighbor v of u do
        if v not in visited then
            DFS(graph, v, visited)
        end if
    end for
end procedure`,
    complexity: {
      best: 'O(1)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'dijkstra': {
    id: 'dijkstra',
    name: 'Dijkstra Shortest Path',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O((V + E) log V)',
    description: 'Tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh còn lại trên đồ thị có trọng số không âm.',
    overview: {
      what: 'Thuật toán tham lam (Greedy) duy trì khoảng cách nhỏ nhất ước tính từ nguồn.',
      when: 'Ứng dụng trong định tuyến mạng (OSPF), Google Maps, tìm đường đi tối ưu.',
      principle: 'Dùng Priority Queue: lấy đỉnh có khoảng cách tạm thời nhỏ nhất, thực hiện nới lỏng (relaxation) các cạnh kề.',
      pros: 'Rất nhanh và tối ưu với Min-Heap O((V + E) log V).',
      cons: 'Không áp dụng được khi đồ thị có cạnh trọng số âm (phải dùng Bellman-Ford).'
    },
    pseudocode: `procedure Dijkstra(graph, source)
    dist = array with inf, dist[source] = 0
    let PQ be a Min-Priority-Queue
    PQ.push((0, source))
    while PQ is not empty do
        (d, u) = PQ.pop()
        if d > dist[u] then continue
        for each (v, weight) in graph[u] do
            if dist[u] + weight < dist[v] then
                dist[v] = dist[u] + weight
                PQ.push((dist[v], v))
            end if
        end for
    end while
end procedure`,
    complexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
      space: 'O(V)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'bellman-ford': {
    id: 'bellman-ford',
    name: 'Bellman-Ford',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V · E)',
    description: 'Tìm đường đi ngắn nhất từ đỉnh nguồn, hỗ trợ trọng số âm và phát hiện chu trình âm.',
    overview: {
      what: 'Nới lỏng tất cả E cạnh liên tục V - 1 lần bằng quy hoạch động.',
      when: 'Đồ thị có cạnh trọng số âm hoặc cần phát hiện chu trình âm.',
      principle: 'Sau V-1 vòng lặp, nếu vẫn có thể nới lỏng thêm cạnh nào thì đồ thị chứa chu trình âm.',
      pros: 'Xử lý được trọng số âm, phát hiện chu trình âm chính xác.',
      cons: 'Chậm hơn Dijkstra: O(V * E).'
    },
    pseudocode: `procedure BellmanFord(edges, V, source)
    dist = array with inf, dist[source] = 0
    for i = 1 to V - 1 do
        for each (u, v, weight) in edges do
            if dist[u] + weight < dist[v] then
                dist[v] = dist[u] + weight
            end if
        end for
    end for
    // Check negative cycle
    for each (u, v, weight) in edges do
        if dist[u] + weight < dist[v] then return "Negative Cycle Detected"
    end for
end procedure`,
    complexity: {
      best: 'O(E)',
      average: 'O(V · E)',
      worst: 'O(V · E)',
      space: 'O(V)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'floyd-warshall': {
    id: 'floyd-warshall',
    name: 'Floyd-Warshall',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V³)',
    description: 'Tìm đường đi ngắn nhất giữa mọi cặp đỉnh (All-Pairs Shortest Path) bằng quy hoạch động.',
    overview: {
      what: 'Tính khoảng cách ngắn nhất giữa tất cả các cặp đỉnh (u, v) trong ma trận.',
      when: 'Cần tra cứu khoảng cách giữa mọi cặp đỉnh trên đồ thị dày có kích thước vừa phải (V < 500).',
      principle: 'Xét từng đỉnh trung gian k từ 0 đến V-1: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
      pros: 'Mã nguồn chỉ gồm 3 vòng lặp for cực kỳ thanh lịch, giải quyết mọi cặp đỉnh cùng lúc.',
      cons: 'Độ phức tạp bậc ba O(V³), không khả thi cho đồ thị có hàng nghìn đỉnh.'
    },
    pseudocode: `procedure FloydWarshall(dist, V)
    for k = 0 to V - 1 do
        for i = 0 to V - 1 do
            for j = 0 to V - 1 do
                if dist[i][k] + dist[k][j] < dist[i][j] then
                    dist[i][j] = dist[i][k] + dist[k][j]
                end if
            end for
        end for
    end for
end procedure`,
    complexity: {
      best: 'O(V³)',
      average: 'O(V³)',
      worst: 'O(V³)',
      space: 'O(V²)',
      stable: 'N/A',
      inPlace: 'Có'
    }
  },

  'prim': {
    id: 'prim',
    name: 'Prim Minimum Spanning Tree',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O((V + E) log V)',
    description: 'Thuật toán tìm Cây khung nhỏ nhất (MST) phát triển cây từng đỉnh một bắt đầu từ một đỉnh bất kỳ.',
    overview: {
      what: 'Thuật toán tham lam duy trì tập hợp các đỉnh đã thuộc cây khung và chọn cạnh nối rẻ nhất ra ngoài.',
      when: 'Thiết kế mạng lưới cáp viễn thông, đường điện, mạng lưới giao thông với đồ thị dày.',
      principle: 'Tại mỗi bước, chọn đỉnh ngoài cây có cạnh nối tới cây nhỏ nhất, nạp vào cây và cập nhật chi phí các láng giềng.',
      pros: 'Rất hiệu quả trên đồ thị dày (nhiều cạnh).',
      cons: 'Đồ thị phải vô hướng và liên thông.'
    },
    pseudocode: `procedure PrimMST(graph, V)
    key = array with inf, key[0] = 0
    inMST = array with false
    let PQ be a Min-Priority-Queue of (key[u], u)
    while PQ is not empty do
        u = PQ.pop()
        inMST[u] = true
        for each (v, weight) in graph[u] do
            if not inMST[v] and weight < key[v] then
                key[v] = weight
                parent[v] = u
                PQ.push((key[v], v))
            end if
        end for
    end while
end procedure`,
    complexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
      space: 'O(V)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'kruskal': {
    id: 'kruskal',
    name: 'Kruskal Minimum Spanning Tree',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(E log E)',
    description: 'Tìm Cây khung nhỏ nhất bằng cách sắp xếp tất cả các cạnh và dùng Disjoint Set (Union-Find) để gom nhóm.',
    overview: {
      what: 'Thuật toán tham lam duyệt các cạnh theo trọng số tăng dần và thêm vào MST nếu không tạo chu trình.',
      when: 'Đồ thị thưa (ít cạnh), dễ cài đặt và trực quan.',
      principle: 'Sắp xếp E cạnh tăng dần; với mỗi cạnh, kiểm tra hai đỉnh có cùng tập hợp không; nếu khác thì hợp nhất.',
      pros: 'Rất trực quan, hoạt động cực nhanh trên đồ thị thưa O(E log E).',
      cons: 'Cần cấu trúc dữ liệu Disjoint Set Union (DSU).'
    },
    pseudocode: `procedure KruskalMST(edges, V)
    sort edges by weight ascending
    let dsu be DisjointSet(V)
    mst = []
    for each (u, v, weight) in edges do
        if dsu.find(u) != dsu.find(v) then
            dsu.union(u, v)
            mst.append((u, v, weight))
        end if
    end for
end procedure`,
    complexity: {
      best: 'O(E log E)',
      average: 'O(E log E)',
      worst: 'O(E log E)',
      space: 'O(V + E)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'topological-sort': {
    id: 'topological-sort',
    name: 'Topological Sort (Kahn)',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V + E)',
    description: 'Sắp xếp thứ tự các đỉnh của đồ thị có hướng không chu trình (DAG) dựa trên bán bậc vào (In-degree).',
    overview: {
      what: 'Thứ tự tuyến tính của các đỉnh sao cho với mọi cung u -> v, u luôn đứng trước v.',
      when: 'Quản lý phụ thuộc gói phần mềm (npm, apt), lập lịch môn học, pipeline biên dịch (Makefile).',
      principle: 'Tìm các đỉnh có in-degree = 0, đẩy vào Queue; khi lấy đỉnh ra, giảm in-degree của các đỉnh kề.',
      pros: 'Tuyến tính O(V + E), đồng thời phát hiện được đồ thị có chu trình hay không.',
      cons: 'Chỉ áp dụng được trên đồ thị có hướng không có chu trình (DAG).'
    },
    pseudocode: `procedure TopologicalSort(graph, V)
    compute in_degree for all vertices
    let Q be a Queue of vertices with in_degree == 0
    order = []
    while Q is not empty do
        u = Q.dequeue()
        order.append(u)
        for each neighbor v of u do
            in_degree[v] = in_degree[v] - 1
            if in_degree[v] == 0 then Q.enqueue(v)
        end for
    end while
    return order
end procedure`,
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'connected-components': {
    id: 'connected-components',
    name: 'Connected Components',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V + E)',
    description: 'Xác định các thành phần liên thông độc lập trong đồ thị vô hướng bằng BFS hoặc DFS.',
    overview: {
      what: 'Chia tập đỉnh thành các tập con rời rạc mà giữa 2 đỉnh bất kỳ trong cùng tập đều có đường đi.',
      when: 'Phân tích cụm mạng xã hội, phân vùng ảnh, phân tích đảo trong game.',
      principle: 'Duyệt qua các đỉnh từ 0 đến V-1; nếu đỉnh chưa thăm, tăng đếm thành phần và chạy BFS/DFS để đánh dấu toàn bộ cụm.',
      pros: 'Thuật toán đơn giản, chạy tuyến tính O(V + E).',
      cons: 'Cần phân biệt với thành phần liên thông mạnh (SCC) trên đồ thị có hướng.'
    },
    pseudocode: `procedure findComponents(graph, V)
    visited = array with false
    componentCount = 0
    for i = 0 to V - 1 do
        if not visited[i] then
            componentCount = componentCount + 1
            DFS(graph, i, visited)
        end if
    end for
end procedure`,
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  },

  'cycle-detection': {
    id: 'cycle-detection',
    name: 'Cycle Detection (Phát hiện chu trình)',
    category: 'graph',
    categoryLabel: 'Graph Algorithms',
    badge: 'O(V + E)',
    description: 'Kiểm tra đồ thị có chứa chu trình hay không bằng kỹ thuật tô màu DFS hoặc đỉnh cha (parent).',
    overview: {
      what: 'Xác định xem có tồn tại đường đi khép kín bắt đầu và kết thúc tại cùng một đỉnh hay không.',
      when: 'Phát hiện bế tắc (Deadlock detection) trong hệ điều hành, kiểm tra tính hợp lệ của cây.',
      principle: 'Trong DFS, nếu gặp một đỉnh đã thăm không phải là đỉnh cha trực tiếp thì có chu trình.',
      pros: 'Chạy nhanh O(V + E), phát hiện sớm ngay khi gặp cạnh ngược (back edge).',
      cons: 'Cần phân biệt cơ chế phát hiện giữa đồ thị có hướng và vô hướng.'
    },
    pseudocode: `function hasCycleDFS(u, parent, visited, graph)
    visited[u] = true
    for each neighbor v of u do
        if not visited[v] then
            if hasCycleDFS(v, u, visited, graph) then return true
        else if v != parent then
            return true // Cycle detected!
        end if
    end for
    return false
end function`,
    complexity: {
      best: 'O(1)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V) stack',
      stable: 'N/A',
      inPlace: 'N/A'
    }
  }
};
