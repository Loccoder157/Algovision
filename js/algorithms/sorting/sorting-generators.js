/**
 * ALGOVISION - Step Generators for All 10 Sorting Algorithms
 * Every step contains educational Vietnamese explanation, variable values, state snapshots,
 * and exact line mappings for C, C++, and Python!
 */

export const SortingGenerators = {
  // 1. Bubble Sort
  'bubble-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    const sortedIndices = [];

    steps.push({
      type: 'init',
      description: `Bắt đầu thuật toán Bubble Sort với mảng gồm ${n} phần tử.`,
      activeLine: { c: 2, cpp: 3, python: 3 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { n, i: 0 }
      }
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Step: So sánh arr[j] và arr[j+1]
        steps.push({
          type: 'compare',
          description: `So sánh cặp phần tử kề nhau arr[${j}] (${arr[j]}) và arr[${j + 1}] (${arr[j + 1]}).`,
          activeLine: { c: 4, cpp: 5, python: 5 },
          state: {
            array: [...arr],
            highlightIndices: [j, j + 1],
            highlightType: 'comparing',
            sortedIndices: [...sortedIndices],
            variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] }
          }
        });

        if (arr[j] > arr[j + 1]) {
          // Hoán đổi
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          steps.push({
            type: 'swap',
            description: `Vì ${arr[j + 1]} > ${arr[j]} (sai thứ tự), tiến hành hoán đổi vị trí của arr[${j}] và arr[${j + 1}].`,
            activeLine: { c: 5, cpp: 6, python: 6 },
            state: {
              array: [...arr],
              highlightIndices: [j, j + 1],
              highlightType: 'swapping',
              sortedIndices: [...sortedIndices],
              variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] }
            }
          });
        }
      }
      // Phần tử lớn nhất lượt này đã nổi về đúng vị trí
      sortedIndices.push(n - i - 1);
      steps.push({
        type: 'sorted_element',
        description: `Vòng lặp i = ${i} hoàn thành: Phần tử lớn nhất còn lại (${arr[n - i - 1]}) đã nổi về đúng vị trí cuối cùng tại chỉ số ${n - i - 1}.`,
        activeLine: { c: 2, cpp: 3, python: 3 },
        state: {
          array: [...arr],
          highlightIndices: [n - i - 1],
          highlightType: 'sorted',
          sortedIndices: [...sortedIndices],
          variables: { i, 'vị trí cố định': n - i - 1 }
        }
      });
    }

    // Đánh dấu toàn bộ mảng đã sắp xếp
    const allSorted = Array.from({ length: n }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Hoàn tất! Mảng đã được sắp xếp tăng dần hoàn chỉnh.',
      activeLine: { c: 10, cpp: 9, python: 6 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 2. Selection Sort
  'selection-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    const sortedIndices = [];

    steps.push({
      type: 'init',
      description: `Khởi động Selection Sort cho mảng ${n} phần tử. Tìm phần tử nhỏ nhất mỗi lượt.`,
      activeLine: { c: 2, cpp: 3, python: 3 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { n, i: 0 }
      }
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      steps.push({
        type: 'set_min',
        description: `Bắt đầu lượt i = ${i}. Tạm thời giả định phần tử nhỏ nhất tại chỉ số min_idx = ${i} (giá trị: ${arr[i]}).`,
        activeLine: { c: 3, cpp: 4, python: 4 },
        state: {
          array: [...arr],
          highlightIndices: [i],
          highlightType: 'pivot',
          sortedIndices: [...sortedIndices],
          variables: { i, minIdx: i, 'arr[min]': arr[i] }
        }
      });

      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'compare',
          description: `So sánh phần tử arr[${j}] (${arr[j]}) với giá trị nhỏ nhất hiện tại arr[${minIdx}] (${arr[minIdx]}).`,
          activeLine: { c: 5, cpp: 6, python: 6 },
          state: {
            array: [...arr],
            highlightIndices: [j, minIdx],
            highlightType: 'comparing',
            sortedIndices: [...sortedIndices],
            variables: { i, j, minIdx, 'arr[j]': arr[j], 'arr[min]': arr[minIdx] }
          }
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({
            type: 'update_min',
            description: `Tìm thấy giá trị nhỏ hơn! Cập nhật min_idx = ${minIdx} (giá trị: ${arr[minIdx]}).`,
            activeLine: { c: 6, cpp: 7, python: 7 },
            state: {
              array: [...arr],
              highlightIndices: [minIdx],
              highlightType: 'pivot',
              sortedIndices: [...sortedIndices],
              variables: { i, j, minIdx, 'arr[min] mới': arr[minIdx] }
            }
          });
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;

        steps.push({
          type: 'swap',
          description: `Hoán đổi phần tử nhỏ nhất arr[${minIdx}] (${arr[i]}) về đúng vị trí đầu mảng con chưa sắp xếp arr[${i}].`,
          activeLine: { c: 10, cpp: 11, python: 9 },
          state: {
            array: [...arr],
            highlightIndices: [i, minIdx],
            highlightType: 'swapping',
            sortedIndices: [...sortedIndices],
            variables: { i, minIdx, 'giá trị đưa về': arr[i] }
          }
        });
      }

      sortedIndices.push(i);
      steps.push({
        type: 'sorted_element',
        description: `Vị trí ${i} đã được cố định với giá trị nhỏ nhất ${arr[i]}.`,
        activeLine: { c: 2, cpp: 3, python: 3 },
        state: {
          array: [...arr],
          highlightIndices: [i],
          highlightType: 'sorted',
          sortedIndices: [...sortedIndices],
          variables: { i }
        }
      });
    }

    const allSorted = Array.from({ length: n }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Selection Sort hoàn tất thành công!',
      activeLine: { c: 14, cpp: 14, python: 9 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 3. Insertion Sort
  'insertion-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    const sortedIndices = [0];

    steps.push({
      type: 'init',
      description: `Bắt đầu Insertion Sort. Phần tử đầu tiên arr[0] (${arr[0]}) mặc nhiên coi như đã có thứ tự.`,
      activeLine: { c: 2, cpp: 3, python: 2 },
      state: {
        array: [...arr],
        highlightIndices: [0],
        highlightType: 'sorted',
        sortedIndices: [0],
        variables: { n }
      }
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        type: 'pick_key',
        description: `Lấy phần tử arr[${i}] = ${key} làm khóa (key) để tìm vị trí chèn thích hợp vào dãy con bên trái.`,
        activeLine: { c: 3, cpp: 4, python: 3 },
        state: {
          array: [...arr],
          highlightIndices: [i],
          highlightType: 'pivot',
          sortedIndices: [...sortedIndices],
          variables: { i, key, j }
        }
      });

      while (j >= 0 && arr[j] > key) {
        steps.push({
          type: 'compare',
          description: `So sánh: arr[${j}] (${arr[j]}) > key (${key}), dời arr[${j}] sang phải vị trí ${j + 1}.`,
          activeLine: { c: 5, cpp: 6, python: 5 },
          state: {
            array: [...arr],
            highlightIndices: [j, j + 1],
            highlightType: 'comparing',
            sortedIndices: [...sortedIndices],
            variables: { i, key, j, 'arr[j]': arr[j] }
          }
        });

        arr[j + 1] = arr[j];
        steps.push({
          type: 'shift',
          description: `Đã dời giá trị ${arr[j]} sang chỉ số ${j + 1}.`,
          activeLine: { c: 6, cpp: 7, python: 6 },
          state: {
            array: [...arr],
            highlightIndices: [j + 1],
            highlightType: 'swapping',
            sortedIndices: [...sortedIndices],
            variables: { i, key, j }
          }
        });

        j--;
      }

      arr[j + 1] = key;
      sortedIndices.push(i);

      steps.push({
        type: 'insert',
        description: `Chèn khóa key = ${key} vào vị trí trống thích hợp arr[${j + 1}]. Dãy con [0..${i}] đã có thứ tự.`,
        activeLine: { c: 9, cpp: 10, python: 8 },
        state: {
          array: [...arr],
          highlightIndices: [j + 1],
          highlightType: 'sorted',
          sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
          variables: { i, key, 'vị trí chèn': j + 1 }
        }
      });
    }

    const allSorted = Array.from({ length: n }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Insertion Sort hoàn tất! Toàn bộ mảng đã được chèn theo thứ tự.',
      activeLine: { c: 11, cpp: 11, python: 8 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 4. Merge Sort
  'merge-sort': function(initialArray) {
    const arr = [...initialArray];
    const steps = [];

    steps.push({
      type: 'init',
      description: 'Bắt đầu Merge Sort: Chia để trị mảng thành các mảng con nhỏ hơn.',
      activeLine: { c: 28, cpp: 21, python: 25 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { l: 0, r: arr.length - 1 }
      }
    });

    function mergeSortHelper(l, r) {
      if (l >= r) return;
      const m = Math.floor(l + (r - l) / 2);

      steps.push({
        type: 'divide',
        description: `Chia mảng đoạn [${l}..${r}] tại điểm giữa mid = ${m} thành hai nửa: [${l}..${m}] và [${m + 1}..${r}].`,
        activeLine: { c: 29, cpp: 22, python: 26 },
        state: {
          array: [...arr],
          highlightIndices: [m],
          highlightType: 'pivot',
          sortedIndices: [],
          variables: { l, m, r }
        }
      });

      mergeSortHelper(l, m);
      mergeSortHelper(m + 1, r);

      // Merge step
      const n1 = m - l + 1;
      const n2 = r - m;
      const L = arr.slice(l, m + 1);
      const R = arr.slice(m + 1, r + 1);

      steps.push({
        type: 'start_merge',
        description: `Bắt đầu trộn 2 nửa đã sắp xếp [${l}..${m}] (kích thước ${n1}) và [${m + 1}..${r}] (kích thước ${n2}).`,
        activeLine: { c: 12, cpp: 5, python: 7 },
        state: {
          array: [...arr],
          highlightIndices: Array.from({ length: r - l + 1 }, (_, i) => l + i),
          highlightType: 'comparing',
          sortedIndices: [],
          variables: { l, m, r, 'L': L.join(', '), 'R': R.join(', ') }
        }
      });

      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        steps.push({
          type: 'compare_sub',
          description: `So sánh phần tử L[${i}] (${L[i]}) và R[${j}] (${R[j]}).`,
          activeLine: { c: 13, cpp: 6, python: 8 },
          state: {
            array: [...arr],
            highlightIndices: [k],
            highlightType: 'comparing',
            sortedIndices: [],
            variables: { 'L[i]': L[i], 'R[j]': R[j], k }
          }
        });

        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }

        steps.push({
          type: 'merge_place',
          description: `Đưa giá trị nhỏ hơn (${arr[k]}) vào vị trí arr[${k}].`,
          activeLine: { c: 14, cpp: 7, python: 9 },
          state: {
            array: [...arr],
            highlightIndices: [k],
            highlightType: 'swapping',
            sortedIndices: [],
            variables: { k, 'giá trị ghi': arr[k] }
          }
        });
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        steps.push({
          type: 'merge_place_rem',
          description: `Đưa phần tử còn lại của nửa trái (${L[i]}) vào arr[${k}].`,
          activeLine: { c: 20, cpp: 13, python: 16 },
          state: {
            array: [...arr],
            highlightIndices: [k],
            highlightType: 'swapping',
            sortedIndices: [],
            variables: { k, 'giá trị': L[i] }
          }
        });
        i++; k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        steps.push({
          type: 'merge_place_rem',
          description: `Đưa phần tử còn lại của nửa phải (${R[j]}) vào arr[${k}].`,
          activeLine: { c: 23, cpp: 16, python: 20 },
          state: {
            array: [...arr],
            highlightIndices: [k],
            highlightType: 'swapping',
            sortedIndices: [],
            variables: { k, 'giá trị': R[j] }
          }
        });
        j++; k++;
      }
    }

    mergeSortHelper(0, arr.length - 1);

    const allSorted = Array.from({ length: arr.length }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Merge Sort hoàn tất! Mảng đã được trộn hoàn chỉnh.',
      activeLine: { c: 33, cpp: 26, python: 29 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 5. Quick Sort
  'quick-sort': function(initialArray) {
    const arr = [...initialArray];
    const steps = [];
    const sortedIndices = [];

    steps.push({
      type: 'init',
      description: 'Khởi động Quick Sort: Chọn chốt Pivot và phân hoạch mảng.',
      activeLine: { c: 19, cpp: 15, python: 12 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { low: 0, high: arr.length - 1 }
      }
    });

    function quickSortHelper(low, high) {
      if (low < high) {
        // Partition
        const pivot = arr[high];
        let i = low - 1;

        steps.push({
          type: 'pick_pivot',
          description: `Chọn phần tử cuối arr[${high}] = ${pivot} làm Pivot cho đoạn [${low}..${high}].`,
          activeLine: { c: 2, cpp: 2, python: 2 },
          state: {
            array: [...arr],
            highlightIndices: [high],
            highlightType: 'pivot',
            sortedIndices: [...sortedIndices],
            variables: { low, high, pivot, i }
          }
        });

        for (let j = low; j < high; j++) {
          steps.push({
            type: 'compare_pivot',
            description: `So sánh arr[${j}] (${arr[j]}) với chốt Pivot (${pivot}).`,
            activeLine: { c: 5, cpp: 5, python: 5 },
            state: {
              array: [...arr],
              highlightIndices: [j, high],
              highlightType: 'comparing',
              sortedIndices: [...sortedIndices],
              variables: { low, high, pivot, i, j, 'arr[j]': arr[j] }
            }
          });

          if (arr[j] < pivot) {
            i++;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            steps.push({
              type: 'swap_partition',
              description: `Vì ${arr[i]} < ${pivot}, tăng i = ${i} và đổi chỗ arr[${i}] với arr[${j}].`,
              activeLine: { c: 8, cpp: 7, python: 7 },
              state: {
                array: [...arr],
                highlightIndices: [i, j],
                highlightType: 'swapping',
                sortedIndices: [...sortedIndices],
                variables: { pivot, i, j }
              }
            });
          }
        }

        // Đưa pivot về vị trí i + 1
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        const pi = i + 1;
        sortedIndices.push(pi);

        steps.push({
          type: 'place_pivot',
          description: `Đưa chốt Pivot (${pivot}) vào đúng vị trí phân hoạch arr[${pi}]. Các phần tử bên trái <= ${pivot}, bên phải >= ${pivot}.`,
          activeLine: { c: 13, cpp: 10, python: 8 },
          state: {
            array: [...arr],
            highlightIndices: [pi],
            highlightType: 'sorted',
            sortedIndices: [...sortedIndices],
            variables: { 'vị trí chốt cố định': pi }
          }
        });

        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      } else if (low === high) {
        sortedIndices.push(low);
      }
    }

    quickSortHelper(0, arr.length - 1);

    const allSorted = Array.from({ length: arr.length }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Quick Sort hoàn tất thành công!',
      activeLine: { c: 23, cpp: 19, python: 15 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 6. Heap Sort
  'heap-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    const sortedIndices = [];

    steps.push({
      type: 'init',
      description: 'Bắt đầu Heap Sort: Xây dựng cấu trúc Max-Heap từ mảng.',
      activeLine: { c: 20, cpp: 19, python: 15 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { n }
      }
    });

    function heapify(len, i) {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      steps.push({
        type: 'heapify_check',
        description: `Vun đống tại node gốc i = ${i} (giá trị: ${arr[i]}). Con trái: ${l < len ? arr[l] : 'không'}, con phải: ${r < len ? arr[r] : 'không'}.`,
        activeLine: { c: 5, cpp: 5, python: 5 },
        state: {
          array: [...arr],
          highlightIndices: [i, l, r].filter(idx => idx < len),
          highlightType: 'comparing',
          sortedIndices: [...sortedIndices],
          variables: { i, largest, l, r }
        }
      });

      if (l < len && arr[l] > arr[largest]) largest = l;
      if (r < len && arr[r] > arr[largest]) largest = r;

      if (largest !== i) {
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        steps.push({
          type: 'heapify_swap',
          description: `Đổi chỗ node i = ${i} với node con lớn hơn tại chỉ số ${largest} (${arr[i]}).`,
          activeLine: { c: 13, cpp: 12, python: 10 },
          state: {
            array: [...arr],
            highlightIndices: [i, largest],
            highlightType: 'swapping',
            sortedIndices: [...sortedIndices],
            variables: { i, largest }
          }
        });

        heapify(len, largest);
      }
    }

    // Xây dựng Max-Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    steps.push({
      type: 'heap_built',
      description: 'Cấu trúc Max-Heap đã hoàn thành! Phần tử lớn nhất hiện nằm ở gốc arr[0].',
      activeLine: { c: 21, cpp: 20, python: 16 },
      state: {
        array: [...arr],
        highlightIndices: [0],
        highlightType: 'pivot',
        sortedIndices: [],
        variables: { 'gốc heap (max)': arr[0] }
      }
    });

    // Trích xuất từng phần tử từ Heap
    for (let i = n - 1; i > 0; i--) {
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      sortedIndices.push(i);

      steps.push({
        type: 'extract_max',
        description: `Hoán đổi gốc lớn nhất (${temp}) về cuối mảng tại arr[${i}], sau đó vun đống lại mảng con kích thước ${i}.`,
        activeLine: { c: 25, cpp: 23, python: 18 },
        state: {
          array: [...arr],
          highlightIndices: [0, i],
          highlightType: 'swapping',
          sortedIndices: [...sortedIndices],
          variables: { i, 'đã cố định': temp }
        }
      });

      heapify(i, 0);
    }

    const allSorted = Array.from({ length: n }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Heap Sort hoàn tất thành công!',
      activeLine: { c: 28, cpp: 25, python: 19 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 7. Shell Sort
  'shell-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];

    steps.push({
      type: 'init',
      description: `Bắt đầu Shell Sort. Khởi tạo khoảng cách gap = ${Math.floor(n / 2)}.`,
      activeLine: { c: 2, cpp: 3, python: 3 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { n, gap: Math.floor(n / 2) }
      }
    });

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;

        steps.push({
          type: 'check_gap',
          description: `Xét phần tử arr[${i}] = ${temp} với khoảng cách gap = ${gap}.`,
          activeLine: { c: 3, cpp: 4, python: 5 },
          state: {
            array: [...arr],
            highlightIndices: [i, i - gap],
            highlightType: 'comparing',
            sortedIndices: [],
            variables: { gap, i, temp }
          }
        });

        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          steps.push({
            type: 'shift_gap',
            description: `Dời arr[${j - gap}] (${arr[j]}) sang arr[${j}] vì lớn hơn ${temp}.`,
            activeLine: { c: 6, cpp: 7, python: 8 },
            state: {
              array: [...arr],
              highlightIndices: [j, j - gap],
              highlightType: 'swapping',
              sortedIndices: [],
              variables: { gap, j, temp }
            }
          });
          j -= gap;
        }

        arr[j] = temp;
        steps.push({
          type: 'place_gap',
          description: `Đặt giá trị ${temp} vào arr[${j}].`,
          activeLine: { c: 8, cpp: 9, python: 10 },
          state: {
            array: [...arr],
            highlightIndices: [j],
            highlightType: 'sorted',
            sortedIndices: [],
            variables: { j, temp }
          }
        });
      }
    }

    const allSorted = Array.from({ length: n }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Shell Sort hoàn tất! Toàn bộ mảng đã được sắp xếp.',
      activeLine: { c: 11, cpp: 11, python: 11 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 8. Counting Sort
  'counting-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];

    const maxVal = Math.max(...arr);
    const count = new Array(maxVal + 1).fill(0);

    steps.push({
      type: 'init',
      description: `Bắt đầu Counting Sort. Giá trị lớn nhất tìm được là max = ${maxVal}. Tạo mảng đếm tần suất.`,
      activeLine: { c: 2, cpp: 5, python: 4 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { n, maxVal }
      }
    });

    for (let i = 0; i < n; i++) {
      count[arr[i]]++;
      steps.push({
        type: 'count',
        description: `Đếm phần tử arr[${i}] = ${arr[i]}: Tăng count[${arr[i]}] lên ${count[arr[i]]}.`,
        activeLine: { c: 13, cpp: 8, python: 7 },
        state: {
          array: [...arr],
          highlightIndices: [i],
          highlightType: 'comparing',
          sortedIndices: [],
          variables: { i, 'giá trị': arr[i], 'số lần gặp': count[arr[i]] }
        }
      });
    }

    let idx = 0;
    const sortedIndices = [];
    for (let val = 0; val <= maxVal; val++) {
      while (count[val] > 0) {
        arr[idx] = val;
        sortedIndices.push(idx);

        steps.push({
          type: 'restore',
          description: `Ghi lại giá trị ${val} vào vị trí arr[${idx}] và giảm count[${val}] còn ${count[val] - 1}.`,
          activeLine: { c: 18, cpp: 13, python: 11 },
          state: {
            array: [...arr],
            highlightIndices: [idx],
            highlightType: 'sorted',
            sortedIndices: [...sortedIndices],
            variables: { idx, val, 'còn lại': count[val] - 1 }
          }
        });

        idx++;
        count[val]--;
      }
    }

    const allSorted = Array.from({ length: n }, (_, i) => i);
    steps.push({
      type: 'done',
      description: 'Counting Sort hoàn tất trong thời gian tuyến tính O(n + k)!',
      activeLine: { c: 22, cpp: 17, python: 13 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 9. Radix Sort
  'radix-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];

    const maxVal = Math.max(...arr);

    steps.push({
      type: 'init',
      description: `Bắt đầu Radix Sort (LSD). Giá trị lớn nhất là ${maxVal}. Sẽ sắp xếp lần lượt theo từng hàng chữ số.`,
      activeLine: { c: 19, cpp: 19, python: 18 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { maxVal }
      }
    });

    for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
      const digitName = exp === 1 ? 'hàng đơn vị' : (exp === 10 ? 'hàng chục' : 'hàng trăm');
      steps.push({
        type: 'start_exp',
        description: `Bắt đầu phân loại theo ${digitName} (exp = ${exp}).`,
        activeLine: { c: 25, cpp: 22, python: 21 },
        state: {
          array: [...arr],
          highlightIndices: [],
          highlightType: 'default',
          sortedIndices: [],
          variables: { exp, digitName }
        }
      });

      // Counting sort theo chữ số
      const output = new Array(n).fill(0);
      const count = new Array(10).fill(0);

      for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
        steps.push({
          type: 'count_digit',
          description: `Phần tử arr[${i}] = ${arr[i]} có chữ số tại ${digitName} là ${digit}.`,
          activeLine: { c: 4, cpp: 4, python: 6 },
          state: {
            array: [...arr],
            highlightIndices: [i],
            highlightType: 'comparing',
            sortedIndices: [],
            variables: { i, 'arr[i]': arr[i], digit }
          }
        });
      }

      for (let i = 1; i < 10; i++) count[i] += count[i - 1];

      for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
      }

      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
      }

      steps.push({
        type: 'finish_exp',
        description: `Đã sắp xếp ổn định xong theo ${digitName}.`,
        activeLine: { c: 14, cpp: 14, python: 14 },
        state: {
          array: [...arr],
          highlightIndices: Array.from({ length: n }, (_, idx) => idx),
          highlightType: 'sorted',
          sortedIndices: [],
          variables: { exp }
        }
      });
    }

    const allSorted = Array.from({ length: n }, (_, idx) => idx);
    steps.push({
      type: 'done',
      description: 'Radix Sort hoàn tất! Mảng đã được sắp xếp tăng dần hoàn hảo.',
      activeLine: { c: 27, cpp: 24, python: 23 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  },

  // 10. Bucket Sort
  'bucket-sort': function(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];

    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    const bucketCount = 5;
    const range = (maxVal - minVal + 1) / bucketCount;

    steps.push({
      type: 'init',
      description: `Bắt đầu Bucket Sort với ${bucketCount} thùng. Phạm vi giá trị từ ${minVal} đến ${maxVal}.`,
      activeLine: { c: 2, cpp: 5, python: 4 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: [],
        variables: { minVal, maxVal, bucketCount }
      }
    });

    const buckets = Array.from({ length: bucketCount }, () => []);

    for (let i = 0; i < n; i++) {
      const bIdx = Math.min(bucketCount - 1, Math.floor((arr[i] - minVal) / range));
      buckets[bIdx].push(arr[i]);

      steps.push({
        type: 'distribute',
        description: `Phần tử arr[${i}] = ${arr[i]} được phân phối vào Thùng ${bIdx}.`,
        activeLine: { c: 14, cpp: 10, python: 8 },
        state: {
          array: [...arr],
          highlightIndices: [i],
          highlightType: 'comparing',
          sortedIndices: [],
          variables: { i, 'giá trị': arr[i], 'thùng': bIdx }
        }
      });
    }

    // Sắp xếp từng thùng
    for (let i = 0; i < bucketCount; i++) {
      buckets[i].sort((a, b) => a - b);
    }

    let k = 0;
    const sortedIndices = [];
    for (let b = 0; b < bucketCount; b++) {
      for (const val of buckets[b]) {
        arr[k] = val;
        sortedIndices.push(k);

        steps.push({
          type: 'gather',
          description: `Thu thập giá trị ${val} từ Thùng ${b} đưa lại vào mảng chính arr[${k}].`,
          activeLine: { c: 18, cpp: 18, python: 14 },
          state: {
            array: [...arr],
            highlightIndices: [k],
            highlightType: 'sorted',
            sortedIndices: [...sortedIndices],
            variables: { k, val, 'từ thùng': b }
          }
        });
        k++;
      }
    }

    const allSorted = Array.from({ length: n }, (_, i) => i);
    steps.push({
      type: 'done',
      description: 'Bucket Sort hoàn tất thành công!',
      activeLine: { c: 22, cpp: 21, python: 17 },
      state: {
        array: [...arr],
        highlightIndices: [],
        highlightType: 'default',
        sortedIndices: allSorted,
        variables: { 'trạng thái': 'Hoàn thành' }
      }
    });

    return steps;
  }
};
