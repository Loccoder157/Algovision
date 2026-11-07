/**
 * ALGOVISION - Step Generators for Searching Algorithms
 * Precise range narrowing, pointer updates (left, mid, right), elimination dimming,
 * and multi-language line synchronization.
 */

export const SearchingGenerators = {
  // 1. Linear Search
  'linear-search': function(array, target) {
    const arr = [...array];
    const n = arr.length;
    const steps = [];
    const targetVal = Number(target);

    steps.push({
      type: 'init',
      description: `Bắt đầu Linear Search: Tìm kiếm giá trị ${targetVal} trong mảng ${n} phần tử.`,
      activeLine: { c: 2, cpp: 2, python: 2 },
      state: {
        array: [...arr],
        target: targetVal,
        currentIndex: -1,
        status: 'searching',
        eliminatedIndices: [],
        variables: { target: targetVal, n }
      }
    });

    const eliminated = [];
    let found = false;

    for (let i = 0; i < n; i++) {
      steps.push({
        type: 'check',
        description: `Kiểm tra phần tử tại chỉ số i = ${i} (giá trị: ${arr[i]}) với mục tiêu ${targetVal}.`,
        activeLine: { c: 3, cpp: 3, python: 3 },
        state: {
          array: [...arr],
          target: targetVal,
          currentIndex: i,
          status: 'checking',
          eliminatedIndices: [...eliminated],
          variables: { i, 'arr[i]': arr[i], target: targetVal }
        }
      });

      if (arr[i] === targetVal) {
        found = true;
        steps.push({
          type: 'found',
          description: `Tìm thấy mục tiêu ${targetVal} tại chỉ số ${i}! Thuật toán kết thúc thành công.`,
          activeLine: { c: 4, cpp: 4, python: 4 },
          state: {
            array: [...arr],
            target: targetVal,
            currentIndex: i,
            status: 'found',
            eliminatedIndices: [...eliminated],
            variables: { 'kết quả (vị trí)': i }
          }
        });
        break;
      } else {
        eliminated.push(i);
      }
    }

    if (!found) {
      steps.push({
        type: 'not_found',
        description: `Đã duyệt hết mảng nhưng không tìm thấy giá trị ${targetVal}. Trả về -1.`,
        activeLine: { c: 7, cpp: 7, python: 5 },
        state: {
          array: [...arr],
          target: targetVal,
          currentIndex: -1,
          status: 'not_found',
          eliminatedIndices: [...eliminated],
          variables: { 'kết quả': -1 }
        }
      });
    }

    return steps;
  },

  // 2. Binary Search
  'binary-search': function(array, target) {
    // Binary Search requires a sorted array
    const arr = [...array].sort((a, b) => a - b);
    const n = arr.length;
    const steps = [];
    const targetVal = Number(target);

    let left = 0;
    let right = n - 1;
    let found = false;

    steps.push({
      type: 'init',
      description: `Bắt đầu Binary Search: Mảng đã được sắp xếp tăng dần. Khởi tạo khoảng tìm kiếm [left=0, right=${right}], target = ${targetVal}.`,
      activeLine: { c: 2, cpp: 2, python: 2 },
      state: {
        array: [...arr],
        target: targetVal,
        left: 0,
        right: right,
        mid: -1,
        status: 'searching',
        eliminatedIndices: [],
        variables: { left: 0, right, target: targetVal }
      }
    });

    const eliminated = [];

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);

      steps.push({
        type: 'compute_mid',
        description: `Tính điểm chính giữa mid = left + (right - left) / 2 = ${mid}. Giá trị arr[${mid}] = ${arr[mid]}.`,
        activeLine: { c: 4, cpp: 4, python: 4 },
        state: {
          array: [...arr],
          target: targetVal,
          left,
          right,
          mid,
          status: 'checking',
          eliminatedIndices: [...eliminated],
          variables: { left, right, mid, 'arr[mid]': arr[mid], target: targetVal }
        }
      });

      if (arr[mid] === targetVal) {
        found = true;
        steps.push({
          type: 'found',
          description: `Chính xác! arr[${mid}] (${arr[mid]}) trùng khớp với mục tiêu ${targetVal}. Tìm thấy tại chỉ số ${mid}!`,
          activeLine: { c: 6, cpp: 6, python: 6 },
          state: {
            array: [...arr],
            target: targetVal,
            left,
            right,
            mid,
            status: 'found',
            eliminatedIndices: [...eliminated],
            variables: { 'kết quả (vị trí)': mid }
          }
        });
        break;
      } else if (arr[mid] < targetVal) {
        // Loại bỏ nửa trái
        for (let idx = left; idx <= mid; idx++) {
          if (!eliminated.includes(idx)) eliminated.push(idx);
        }
        const oldLeft = left;
        left = mid + 1;

        steps.push({
          type: 'eliminate_left',
          description: `Vì arr[${mid}] (${arr[mid]}) < ${targetVal}, mục tiêu chỉ có thể nằm bên phải. Cập nhật left = mid + 1 = ${left}.`,
          activeLine: { c: 8, cpp: 8, python: 8 },
          state: {
            array: [...arr],
            target: targetVal,
            left,
            right,
            mid,
            status: 'searching',
            eliminatedIndices: [...eliminated],
            variables: { 'left mới': left, right, target: targetVal }
          }
        });
      } else {
        // Loại bỏ nửa phải
        for (let idx = mid; idx <= right; idx++) {
          if (!eliminated.includes(idx)) eliminated.push(idx);
        }
        right = mid - 1;

        steps.push({
          type: 'eliminate_right',
          description: `Vì arr[${mid}] (${arr[mid]}) > ${targetVal}, mục tiêu chỉ có thể nằm bên trái. Cập nhật right = mid - 1 = ${right}.`,
          activeLine: { c: 10, cpp: 10, python: 10 },
          state: {
            array: [...arr],
            target: targetVal,
            left,
            right,
            mid,
            status: 'searching',
            eliminatedIndices: [...eliminated],
            variables: { left, 'right mới': right, target: targetVal }
          }
        });
      }
    }

    if (!found) {
      steps.push({
        type: 'not_found',
        description: `Khoảng tìm kiếm rỗng (left > right). Không tìm thấy giá trị ${targetVal} trong mảng. Trả về -1.`,
        activeLine: { c: 12, cpp: 12, python: 11 },
        state: {
          array: [...arr],
          target: targetVal,
          left,
          right,
          mid: -1,
          status: 'not_found',
          eliminatedIndices: Array.from({ length: n }, (_, i) => i),
          variables: { 'kết quả': -1 }
        }
      });
    }

    return steps;
  },

  // 3. Jump Search
  'jump-search': function(array, target) {
    const arr = [...array].sort((a, b) => a - b);
    const n = arr.length;
    const steps = [];
    const targetVal = Number(target);

    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    let curr = step;

    steps.push({
      type: 'init',
      description: `Bắt đầu Jump Search: Kích thước bước nhảy step = √${n} ≈ ${step}.`,
      activeLine: { c: 2, cpp: 3, python: 5 },
      state: {
        array: [...arr],
        target: targetVal,
        left: prev,
        right: Math.min(curr, n) - 1,
        status: 'searching',
        eliminatedIndices: [],
        variables: { step, prev, curr, target: targetVal }
      }
    });

    const eliminated = [];

    while (arr[Math.min(curr, n) - 1] < targetVal) {
      for (let i = prev; i < Math.min(curr, n); i++) eliminated.push(i);

      steps.push({
        type: 'jump',
        description: `Phần tử cuối khối arr[${Math.min(curr, n) - 1}] (${arr[Math.min(curr, n) - 1]}) < ${targetVal}. Nhảy tiếp bước ${step}!`,
        activeLine: { c: 5, cpp: 6, python: 8 },
        state: {
          array: [...arr],
          target: targetVal,
          left: prev,
          right: Math.min(curr, n) - 1,
          status: 'searching',
          eliminatedIndices: [...eliminated],
          variables: { prev, curr, target: targetVal }
        }
      });

      prev = curr;
      curr += step;
      if (prev >= n) break;
    }

    // Tuyến tính trong khối
    steps.push({
      type: 'linear_block',
      description: `Mục tiêu nằm trong khối [${prev}..${Math.min(curr, n) - 1}]. Bắt đầu duyệt tuần tự trong khối.`,
      activeLine: { c: 9, cpp: 10, python: 12 },
      state: {
        array: [...arr],
        target: targetVal,
        left: prev,
        right: Math.min(curr, n) - 1,
        status: 'checking',
        eliminatedIndices: [...eliminated],
        variables: { prev, curr }
      }
    });

    let found = false;
    while (prev < Math.min(curr, n)) {
      if (arr[prev] === targetVal) {
        found = true;
        steps.push({
          type: 'found',
          description: `Tìm thấy mục tiêu ${targetVal} tại vị trí ${prev}!`,
          activeLine: { c: 13, cpp: 14, python: 16 },
          state: {
            array: [...arr],
            target: targetVal,
            currentIndex: prev,
            status: 'found',
            eliminatedIndices: [...eliminated],
            variables: { 'kết quả (vị trí)': prev }
          }
        });
        break;
      }
      eliminated.push(prev);
      prev++;
    }

    if (!found) {
      steps.push({
        type: 'not_found',
        description: `Không tìm thấy giá trị ${targetVal} trong khối. Kết thúc: -1.`,
        activeLine: { c: 14, cpp: 15, python: 18 },
        state: {
          array: [...arr],
          target: targetVal,
          status: 'not_found',
          eliminatedIndices: Array.from({ length: n }, (_, i) => i),
          variables: { 'kết quả': -1 }
        }
      });
    }

    return steps;
  },

  // 4. Interpolation Search
  'interpolation-search': function(array, target) {
    const arr = [...array].sort((a, b) => a - b);
    const n = arr.length;
    const steps = [];
    const targetVal = Number(target);

    let low = 0;
    let high = n - 1;
    let found = false;
    const eliminated = [];

    steps.push({
      type: 'init',
      description: `Bắt đầu Interpolation Search: Ước tính vị trí dựa trên phân bố giá trị trong khoảng [${low}..${high}].`,
      activeLine: { c: 2, cpp: 2, python: 2 },
      state: {
        array: [...arr],
        target: targetVal,
        left: low,
        right: high,
        status: 'searching',
        eliminatedIndices: [],
        variables: { low, high, target: targetVal }
      }
    });

    while (low <= high && targetVal >= arr[low] && targetVal <= arr[high]) {
      if (low === high) {
        if (arr[low] === targetVal) {
          found = true;
          steps.push({
            type: 'found',
            description: `Tìm thấy ${targetVal} tại chỉ số ${low}!`,
            activeLine: { c: 5, cpp: 5, python: 5 },
            state: {
              array: [...arr],
              target: targetVal,
              currentIndex: low,
              status: 'found',
              eliminatedIndices: [...eliminated],
              variables: { 'vị trí': low }
            }
          });
        }
        break;
      }

      // Công thức nội suy
      const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (targetVal - arr[low]));

      steps.push({
        type: 'interpolate',
        description: `Nội suy vị trí pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]) = ${pos}. Giá trị arr[${pos}] = ${arr[pos]}.`,
        activeLine: { c: 7, cpp: 7, python: 6 },
        state: {
          array: [...arr],
          target: targetVal,
          left: low,
          right: high,
          mid: pos,
          status: 'checking',
          eliminatedIndices: [...eliminated],
          variables: { low, high, pos, 'arr[pos]': arr[pos], target: targetVal }
        }
      });

      if (arr[pos] === targetVal) {
        found = true;
        steps.push({
          type: 'found',
          description: `Chính xác! arr[${pos}] trùng khớp với mục tiêu ${targetVal}. Tìm thấy tại vị trí ${pos}!`,
          activeLine: { c: 9, cpp: 9, python: 8 },
          state: {
            array: [...arr],
            target: targetVal,
            currentIndex: pos,
            status: 'found',
            eliminatedIndices: [...eliminated],
            variables: { 'vị trí': pos }
          }
        });
        break;
      } else if (arr[pos] < targetVal) {
        for (let i = low; i <= pos; i++) if (!eliminated.includes(i)) eliminated.push(i);
        low = pos + 1;
        steps.push({
          type: 'update_low',
          description: `arr[${pos}] (${arr[pos]}) < ${targetVal}: Cập nhật low = ${low}.`,
          activeLine: { c: 12, cpp: 12, python: 10 },
          state: {
            array: [...arr],
            target: targetVal,
            left: low,
            right: high,
            status: 'searching',
            eliminatedIndices: [...eliminated],
            variables: { 'low mới': low, high }
          }
        });
      } else {
        for (let i = pos; i <= high; i++) if (!eliminated.includes(i)) eliminated.push(i);
        high = pos - 1;
        steps.push({
          type: 'update_high',
          description: `arr[${pos}] (${arr[pos]}) > ${targetVal}: Cập nhật high = ${high}.`,
          activeLine: { c: 14, cpp: 14, python: 12 },
          state: {
            array: [...arr],
            target: targetVal,
            left: low,
            right: high,
            status: 'searching',
            eliminatedIndices: [...eliminated],
            variables: { low, 'high mới': high }
          }
        });
      }
    }

    if (!found) {
      steps.push({
        type: 'not_found',
        description: `Mục tiêu ${targetVal} nằm ngoài phạm vi giá trị hiện tại. Kết thúc: -1.`,
        activeLine: { c: 17, cpp: 17, python: 13 },
        state: {
          array: [...arr],
          target: targetVal,
          status: 'not_found',
          eliminatedIndices: Array.from({ length: n }, (_, i) => i),
          variables: { 'kết quả': -1 }
        }
      });
    }

    return steps;
  },

  // 5. Exponential Search
  'exponential-search': function(array, target) {
    const arr = [...array].sort((a, b) => a - b);
    const n = arr.length;
    const steps = [];
    const targetVal = Number(target);

    steps.push({
      type: 'init',
      description: `Bắt đầu Exponential Search: Tìm kiếm ${targetVal} bằng cách nhân đôi chỉ số tìm kiếm (1, 2, 4, 8, ...).`,
      activeLine: { c: 1, cpp: 1, python: 1 },
      state: {
        array: [...arr],
        target: targetVal,
        status: 'searching',
        eliminatedIndices: [],
        variables: { target: targetVal }
      }
    });

    if (arr[0] === targetVal) {
      steps.push({
        type: 'found',
        description: `Mục tiêu nằm ngay tại phần tử đầu tiên arr[0] (${targetVal})!`,
        activeLine: { c: 3, cpp: 3, python: 4 },
        state: {
          array: [...arr],
          target: targetVal,
          currentIndex: 0,
          status: 'found',
          eliminatedIndices: [],
          variables: { 'vị trí': 0 }
        }
      });
      return steps;
    }

    let i = 1;
    while (i < n && arr[i] <= targetVal) {
      steps.push({
        type: 'multiply_index',
        description: `arr[${i}] = ${arr[i]} <= ${targetVal}. Nhân đôi chỉ số i = ${i} -> ${i * 2}.`,
        activeLine: { c: 7, cpp: 8, python: 7 },
        state: {
          array: [...arr],
          target: targetVal,
          currentIndex: i,
          status: 'checking',
          eliminatedIndices: Array.from({ length: i }, (_, k) => k),
          variables: { i, 'arr[i]': arr[i] }
        }
      });
      i *= 2;
    }

    const left = Math.floor(i / 2);
    const right = Math.min(i, n - 1);

    steps.push({
      type: 'range_found',
      description: `Đã xác định khoảng chứa mục tiêu: [left=${left}, right=${right}]. Bắt đầu Binary Search trong khoảng này.`,
      activeLine: { c: 9, cpp: 10, python: 8 },
      state: {
        array: [...arr],
        target: targetVal,
        left,
        right,
        status: 'searching',
        eliminatedIndices: Array.from({ length: left }, (_, k) => k),
        variables: { left, right }
      }
    });

    // Binary search trong khoảng [left, right]
    let l = left, r = right, found = false;
    while (l <= r) {
      const mid = Math.floor(l + (r - l) / 2);
      steps.push({
        type: 'bs_mid',
        description: `Nhị phân trong khoảng [${l}..${r}]: Kiểm tra mid = ${mid} (${arr[mid]}).`,
        activeLine: { c: 11, cpp: 12, python: 10 },
        state: {
          array: [...arr],
          target: targetVal,
          left: l,
          right: r,
          mid,
          status: 'checking',
          eliminatedIndices: [],
          variables: { l, r, mid, 'arr[mid]': arr[mid] }
        }
      });

      if (arr[mid] === targetVal) {
        found = true;
        steps.push({
          type: 'found',
          description: `Tìm thấy ${targetVal} tại chỉ số ${mid}!`,
          activeLine: { c: 13, cpp: 14, python: 12 },
          state: {
            array: [...arr],
            target: targetVal,
            currentIndex: mid,
            status: 'found',
            eliminatedIndices: [],
            variables: { 'kết quả (vị trí)': mid }
          }
        });
        break;
      } else if (arr[mid] < targetVal) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    if (!found) {
      steps.push({
        type: 'not_found',
        description: `Không tìm thấy giá trị ${targetVal}. Kết thúc: -1.`,
        activeLine: { c: 21, cpp: 22, python: 17 },
        state: {
          array: [...arr],
          target: targetVal,
          status: 'not_found',
          eliminatedIndices: Array.from({ length: n }, (_, idx) => idx),
          variables: { 'kết quả': -1 }
        }
      });
    }

    return steps;
  }
};
