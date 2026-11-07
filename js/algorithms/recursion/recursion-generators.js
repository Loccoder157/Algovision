/**
 * ALGOVISION - Step Generators for Recursion Algorithms
 * Tracks precise Call Stack frames (push, executing, waiting, pop/return)
 * and generates hierarchical recursive tree data.
 */

export const RecursionGenerators = {
  // 1. Factorial
  'factorial': function(paramN = 4) {
    const n = Math.min(6, Math.max(1, Number(paramN) || 4));
    const steps = [];
    const callStack = [];

    let frameIdCounter = 0;

    function recFact(val) {
      const frame = {
        id: ++frameIdCounter,
        funcName: `factorial(${val})`,
        param: val,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      // Push step
      steps.push({
        type: 'call_push',
        description: `Gọi hàm factorial(${val}). Đẩy khung ngăn xếp (Stack Frame) mới vào Call Stack.`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val }
        }
      });

      // Kiểm tra base case
      steps.push({
        type: 'check_base',
        description: `Kiểm tra điều kiện dừng (Base Case): ${val} <= 1? ${val <= 1 ? 'Đúng!' : 'Sai, tiếp tục đệ quy.'}`,
        activeLine: { c: 2, cpp: 2, python: 2 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val, isBaseCase: val <= 1 }
        }
      });

      if (val <= 1) {
        frame.status = 'returned';
        frame.returnValue = 1;

        steps.push({
          type: 'return_base',
          description: `Chạm Base Case! factorial(${val}) trả về giá trị 1. Bắt đầu trả ngược kết quả (Unwinding).`,
          activeLine: { c: 3, cpp: 3, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { n: val, 'kết quả trả về': 1 }
          }
        });

        callStack.pop();
        return 1;
      }

      frame.status = 'waiting';

      steps.push({
        type: 'call_recursive',
        description: `Tính ${val} * factorial(${val - 1}). Khung hàm hiện tại chuyển sang trạng thái CHỜ (Waiting), gọi đệ quy factorial(${val - 1}).`,
        activeLine: { c: 5, cpp: 5, python: 4 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val, 'chờ kết quả của': `factorial(${val - 1})` }
        }
      });

      const subResult = recFact(val - 1);
      const result = val * subResult;

      frame.status = 'returned';
      frame.returnValue = result;

      steps.push({
        type: 'return_calc',
        description: `Nhận kết quả từ factorial(${val - 1}) = ${subResult}. Tính: ${val} * ${subResult} = ${result}. Rút (Pop) khung hàm khỏi ngăn xếp.`,
        activeLine: { c: 5, cpp: 5, python: 4 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val, subResult, 'kết quả': result }
        }
      });

      callStack.pop();
      return result;
    }

    const finalAnswer = recFact(n);

    steps.push({
      type: 'done',
      description: `Hoàn tất! factorial(${n}) = ${finalAnswer}. Call Stack đã giải phóng hoàn toàn.`,
      activeLine: { c: 6, cpp: 6, python: 4 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'kết quả cuối cùng': finalAnswer }
      }
    });

    return steps;
  },

  // 2. Fibonacci (Stack + Call Tree)
  'fibonacci': function(paramN = 4) {
    const n = Math.min(5, Math.max(1, Number(paramN) || 4));
    const steps = [];
    const callStack = [];
    let frameId = 0;

    function recFib(val) {
      const frame = {
        id: ++frameId,
        funcName: `fib(${val})`,
        param: val,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Đẩy lời gọi fib(${val}) vào Call Stack.`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val }
        }
      });

      if (val <= 0) {
        frame.status = 'returned';
        frame.returnValue = 0;
        steps.push({
          type: 'return_base',
          description: `fib(${val}) chạm Base Case <= 0, trả về 0.`,
          activeLine: { c: 3, cpp: 3, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'trả về': 0 }
          }
        });
        callStack.pop();
        return 0;
      }

      if (val === 1) {
        frame.status = 'returned';
        frame.returnValue = 1;
        steps.push({
          type: 'return_base',
          description: `fib(1) chạm Base Case = 1, trả về 1.`,
          activeLine: { c: 6, cpp: 6, python: 5 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'trả về': 1 }
          }
        });
        callStack.pop();
        return 1;
      }

      frame.status = 'waiting';
      steps.push({
        type: 'branch_left',
        description: `fib(${val}) gọi nhánh trái fib(${val - 1}).`,
        activeLine: { c: 8, cpp: 8, python: 6 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val }
        }
      });

      const left = recFib(val - 1);

      steps.push({
        type: 'branch_right',
        description: `fib(${val}) đã nhận nhánh trái = ${left}. Gọi tiếp nhánh phải fib(${val - 2}).`,
        activeLine: { c: 8, cpp: 8, python: 6 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val, 'nhánh trái': left }
        }
      });

      const right = recFib(val - 2);
      const sum = left + right;

      frame.status = 'returned';
      frame.returnValue = sum;

      steps.push({
        type: 'return_sum',
        description: `fib(${val}) = fib(${val - 1}) + fib(${val - 2}) = ${left} + ${right} = ${sum}. Rút khung hàm.`,
        activeLine: { c: 8, cpp: 8, python: 6 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: val, left, right, sum }
        }
      });

      callStack.pop();
      return sum;
    }

    const res = recFib(n);
    steps.push({
      type: 'done',
      description: `Kết quả: Fibonacci(${n}) = ${res}.`,
      activeLine: { c: 8, cpp: 8, python: 6 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'kết quả cuối cùng': res }
      }
    });

    return steps;
  },

  // 3. Sum of Array
  'sum-array': function(input) {
    const arr = Array.isArray(input) ? input : [5, 2, 9, 1, 7];
    const steps = [];
    const callStack = [];
    let frameId = 0;

    function recSum(len) {
      const frame = {
        id: ++frameId,
        funcName: `sumArray(arr, ${len})`,
        param: len,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Gọi sumArray với n = ${len}.`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: len }
        }
      });

      if (len <= 0) {
        frame.status = 'returned';
        frame.returnValue = 0;
        steps.push({
          type: 'return_base',
          description: `n = 0: Mảng rỗng, Base Case trả về 0.`,
          activeLine: { c: 3, cpp: 3, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { n: 0, 'kết quả': 0 }
          }
        });
        callStack.pop();
        return 0;
      }

      frame.status = 'waiting';
      steps.push({
        type: 'call_rec',
        description: `Tính arr[${len - 1}] (${arr[len - 1]}) + sumArray(arr, ${len - 1}).`,
        activeLine: { c: 5, cpp: 5, python: 4 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { 'phần tử cuối': arr[len - 1], 'đệ quy': len - 1 }
        }
      });

      const subSum = recSum(len - 1);
      const total = arr[len - 1] + subSum;

      frame.status = 'returned';
      frame.returnValue = total;

      steps.push({
        type: 'return_calc',
        description: `Cộng dồn: ${arr[len - 1]} + ${subSum} = ${total}.`,
        activeLine: { c: 5, cpp: 5, python: 4 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { 'arr[n-1]': arr[len - 1], subSum, total }
        }
      });

      callStack.pop();
      return total;
    }

    const ans = recSum(arr.length);
    steps.push({
      type: 'done',
      description: `Tổng các phần tử trong mảng là ${ans}.`,
      activeLine: { c: 6, cpp: 6, python: 4 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'tổng mảng': ans }
      }
    });

    return steps;
  },

  // 4. Power (x^n)
  'power': function(paramX = 2, paramN = 6) {
    const x = Number(paramX) || 2;
    const n = Math.min(10, Math.max(0, Number(paramN) || 6));
    const steps = [];
    const callStack = [];
    let frameId = 0;

    function recPower(base, exp) {
      const frame = {
        id: ++frameId,
        funcName: `power(${base}, ${exp})`,
        param: `${base}, ${exp}`,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Gọi power(${base}, ${exp}) chia đôi số mũ để tối ưu O(log n).`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { x: base, n: exp }
        }
      });

      if (exp === 0) {
        frame.status = 'returned';
        frame.returnValue = 1;
        steps.push({
          type: 'return_base',
          description: `Số mũ n = 0: Base Case trả về 1 (x⁰ = 1).`,
          activeLine: { c: 2, cpp: 2, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'trả về': 1 }
          }
        });
        callStack.pop();
        return 1;
      }

      frame.status = 'waiting';
      const halfExp = Math.floor(exp / 2);
      const half = recPower(base, halfExp);

      let result;
      if (exp % 2 === 0) {
        result = half * half;
        steps.push({
          type: 'calc_even',
          description: `Số mũ n = ${exp} là CHẴN: ${half} * ${half} = ${result}.`,
          activeLine: { c: 5, cpp: 5, python: 6 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { half, result }
          }
        });
      } else {
        result = base * half * half;
        steps.push({
          type: 'calc_odd',
          description: `Số mũ n = ${exp} là LẺ: ${base} * ${half} * ${half} = ${result}.`,
          activeLine: { c: 7, cpp: 7, python: 8 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { half, result }
          }
        });
      }

      callStack.pop();
      return result;
    }

    const finalRes = recPower(x, n);
    steps.push({
      type: 'done',
      description: `Kết quả: ${x}^${n} = ${finalRes}.`,
      activeLine: { c: 8, cpp: 8, python: 8 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'kết quả': finalRes }
      }
    });

    return steps;
  },

  // 5. GCD (Euclidean)
  'gcd': function(paramA = 48, paramB = 18) {
    const a = Number(paramA) || 48;
    const b = Number(paramB) || 18;
    const steps = [];
    const callStack = [];
    let frameId = 0;

    function recGcd(u, v) {
      const frame = {
        id: ++frameId,
        funcName: `gcd(${u}, ${v})`,
        param: `${u}, ${v}`,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Gọi gcd(${u}, ${v}).`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { a: u, b: v }
        }
      });

      if (v === 0) {
        frame.status = 'returned';
        frame.returnValue = u;
        steps.push({
          type: 'return_base',
          description: `b = 0: Base Case! Ước chung lớn nhất là a = ${u}.`,
          activeLine: { c: 3, cpp: 3, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'ước chung lớn nhất': u }
          }
        });
        callStack.pop();
        return u;
      }

      frame.status = 'waiting';
      const remainder = u % v;
      steps.push({
        type: 'step_mod',
        description: `Phép chia dư: ${u} % ${v} = ${remainder}. Gọi tiếp gcd(${v}, ${remainder}).`,
        activeLine: { c: 5, cpp: 5, python: 4 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { a: u, b: v, remainder }
        }
      });

      const ans = recGcd(v, remainder);
      callStack.pop();
      return ans;
    }

    const gcdAns = recGcd(a, b);
    steps.push({
      type: 'done',
      description: `Ước chung lớn nhất GCD(${a}, ${b}) = ${gcdAns}.`,
      activeLine: { c: 6, cpp: 6, python: 4 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'kết quả GCD': gcdAns }
      }
    });

    return steps;
  },

  // 6. Binary Search Recursive
  'binary-search-rec': function(input, target = 23) {
    const rawArr = Array.isArray(input) ? input : [10, 15, 23, 38, 45, 62, 79, 91];
    const arr = [...rawArr].sort((a, b) => a - b);
    const steps = [];
    const callStack = [];
    let frameId = 0;
    const targetVal = Number(target) || 23;

    function recBS(l, r) {
      const frame = {
        id: ++frameId,
        funcName: `binarySearchRec([${l}..${r}])`,
        param: `l=${l}, r=${r}`,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Đẩy khung đệ quy tìm kiếm khoảng [${l}..${r}].`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { left: l, right: r, target: targetVal }
        }
      });

      if (l > r) {
        frame.status = 'returned';
        frame.returnValue = -1;
        steps.push({
          type: 'return_not_found',
          description: `left (${l}) > right (${r}): Base Case không tìm thấy. Trả về -1.`,
          activeLine: { c: 3, cpp: 3, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'trả về': -1 }
          }
        });
        callStack.pop();
        return -1;
      }

      const mid = Math.floor(l + (r - l) / 2);

      steps.push({
        type: 'check_mid',
        description: `Tính mid = ${mid} và so sánh arr[${mid}] (${arr[mid]}) với mục tiêu ${targetVal}.`,
        activeLine: { c: 5, cpp: 5, python: 4 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { mid, 'arr[mid]': arr[mid], target: targetVal }
        }
      });

      if (arr[mid] === targetVal) {
        frame.status = 'returned';
        frame.returnValue = mid;
        steps.push({
          type: 'return_found',
          description: `Base Case tìm thấy: arr[${mid}] == ${targetVal}! Trả về vị trí ${mid}.`,
          activeLine: { c: 7, cpp: 7, python: 6 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'vị trí': mid }
          }
        });
        callStack.pop();
        return mid;
      } else if (arr[mid] > targetVal) {
        frame.status = 'waiting';
        steps.push({
          type: 'recurse_left',
          description: `arr[${mid}] = ${arr[mid]} > ${targetVal}: Đệ quy tìm kiếm nửa trái [${l}..${mid - 1}].`,
          activeLine: { c: 10, cpp: 10, python: 8 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { mid, target: targetVal, 'nhánh': 'trái' }
          }
        });
        const res = recBS(l, mid - 1);
        callStack.pop();
        return res;
      } else {
        frame.status = 'waiting';
        steps.push({
          type: 'recurse_right',
          description: `arr[${mid}] = ${arr[mid]} < ${targetVal}: Đệ quy tìm kiếm nửa phải [${mid + 1}..${r}].`,
          activeLine: { c: 12, cpp: 12, python: 10 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { mid, target: targetVal, 'nhánh': 'phải' }
          }
        });
        const res = recBS(mid + 1, r);
        callStack.pop();
        return res;
      }
    }

    const foundIdx = recBS(0, arr.length - 1);
    steps.push({
      type: 'done',
      description: foundIdx !== -1 ? `Kết quả tìm kiếm: Tìm thấy tại vị trí ${foundIdx}.` : `Kết quả tìm kiếm: Không tìm thấy (trả về -1).`,
      activeLine: { c: foundIdx !== -1 ? 7 : 3, cpp: foundIdx !== -1 ? 7 : 3, python: foundIdx !== -1 ? 6 : 3 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'vị trí': foundIdx }
      }
    });

    return steps;
  },

  // 7. Tower of Hanoi
  'tower-of-hanoi': function(paramN = 3) {
    const n = Math.min(4, Math.max(1, Number(paramN) || 3));
    const steps = [];
    const callStack = [];
    let frameId = 0;

    function recHanoi(count, from, to, aux) {
      const frame = {
        id: ++frameId,
        funcName: `hanoi(${count}, ${from}->${to})`,
        param: `${count}, ${from}, ${to}, ${aux}`,
        status: 'executing',
        returnValue: null
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Gọi hanoi(${count}, cọc nguồn ${from}, cọc đích ${to}, cọc phụ ${aux}).`,
        activeLine: { c: 1, cpp: 1, python: 1 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { n: count, from, to, aux }
        }
      });

      if (count === 1) {
        steps.push({
          type: 'move_disk',
          description: `Chuyển trực tiếp đĩa 1 từ cọc ${from} sang cọc ${to}.`,
          activeLine: { c: 3, cpp: 3, python: 3 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            variables: { 'hành động': `Chuyển đĩa 1: ${from} -> ${to}` }
          }
        });
        callStack.pop();
        return;
      }

      frame.status = 'waiting';
      // 1. Chuyển n-1 đĩa sang cọc phụ
      recHanoi(count - 1, from, aux, to);

      // 2. Chuyển đĩa thứ n sang cọc đích
      steps.push({
        type: 'move_disk',
        description: `Chuyển đĩa lớn thứ ${count} từ cọc ${from} sang cọc ${to}.`,
        activeLine: { c: 7, cpp: 7, python: 6 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          variables: { 'hành động': `Chuyển đĩa ${count}: ${from} -> ${to}` }
        }
      });

      // 3. Chuyển n-1 đĩa từ cọc phụ sang cọc đích
      recHanoi(count - 1, aux, to, from);

      callStack.pop();
    }

    recHanoi(n, 'A', 'C', 'B');

    steps.push({
      type: 'done',
      description: `Đã hoàn thành toàn bộ ${Math.pow(2, n) - 1} bước chuyển đĩa của bài toán Tháp Hà Nội ${n} đĩa.`,
      activeLine: { c: 9, cpp: 9, python: 7 },
      state: {
        callStack: [],
        activeFrameId: null,
        variables: { 'tổng số bước': Math.pow(2, n) - 1 }
      }
    });

    return steps;
  },

  // 8. N-Queens Backtracking
  'n-queens': function(paramN = 4) {
    const N = Math.min(5, Math.max(4, Number(paramN) || 4));
    const steps = [];
    const callStack = [];
    let frameId = 0;
    const board = Array.from({ length: N }, () => new Array(N).fill(0));

    function isSafe(r, c) {
      for (let i = 0; i < c; i++) if (board[r][i]) return false;
      for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
      for (let i = r, j = c; i < N && j >= 0; i++, j--) if (board[i][j]) return false;
      return true;
    }

    function solveNQ(col) {
      const frame = {
        id: ++frameId,
        funcName: `solveNQ(cột ${col})`,
        param: `col=${col}`,
        status: 'executing'
      };

      callStack.push(frame);

      steps.push({
        type: 'call_push',
        description: `Bắt đầu đặt quân hậu vào cột ${col}.`,
        activeLine: { c: 20, cpp: 20, python: 13 },
        state: {
          callStack: JSON.parse(JSON.stringify(callStack)),
          activeFrameId: frame.id,
          board: JSON.parse(JSON.stringify(board)),
          variables: { col, N }
        }
      });

      if (col >= N) {
        steps.push({
          type: 'solution_found',
          description: `Đã đặt thành công ${N} quân hậu lên bàn cờ hợp lệ!`,
          activeLine: { c: 22, cpp: 22, python: 15 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            board: JSON.parse(JSON.stringify(board)),
            variables: { 'trạng thái': 'Tìm thấy nghiệm' }
          }
        });
        callStack.pop();
        return true;
      }

      for (let row = 0; row < N; row++) {
        const safe = isSafe(row, col);

        steps.push({
          type: 'try_cell',
          description: `Thử đặt quân hậu tại ô (${row}, ${col}). An toàn? ${safe ? 'Hợp lệ!' : 'Bị khống chế!'}`,
          activeLine: { c: 25, cpp: 25, python: 17 },
          state: {
            callStack: JSON.parse(JSON.stringify(callStack)),
            activeFrameId: frame.id,
            board: JSON.parse(JSON.stringify(board)),
            variables: { row, col, safe }
          }
        });

        if (safe) {
          board[row][col] = 1;

          steps.push({
            type: 'place_queen',
            description: `Đặt quân hậu tại (${row}, ${col}) và gọi đệ quy xét tiếp cột ${col + 1}.`,
            activeLine: { c: 26, cpp: 26, python: 18 },
            state: {
              callStack: JSON.parse(JSON.stringify(callStack)),
              activeFrameId: frame.id,
              board: JSON.parse(JSON.stringify(board)),
              variables: { row, col }
            }
          });

          if (solveNQ(col + 1)) return true;

          // Backtrack
          board[row][col] = 0;
          steps.push({
            type: 'backtrack',
            description: `Quay lui (Backtrack): Gỡ quân hậu tại (${row}, ${col}) để thử hàng khác.`,
            activeLine: { c: 30, cpp: 30, python: 21 },
            state: {
              callStack: JSON.parse(JSON.stringify(callStack)),
              activeFrameId: frame.id,
              board: JSON.parse(JSON.stringify(board)),
              variables: { 'gỡ cờ tại': `(${row}, ${col})` }
            }
          });
        }
      }

      callStack.pop();
      return false;
    }

    solveNQ(0);

    steps.push({
      type: 'done',
      description: 'Hoàn tất mô phỏng N-Queens Backtracking.',
      activeLine: { c: 33, cpp: 33, python: 22 },
      state: {
        callStack: [],
        activeFrameId: null,
        board: JSON.parse(JSON.stringify(board)),
        variables: { 'kết quả': 'Hoàn thành' }
      }
    });

    return steps;
  }
};
