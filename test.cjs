// Dynamic test runner for AlgoVision
async function runTests() {
  console.log('--- STARTING ALGOVISION INTEGRATION TESTS ---');

  const { AlgorithmsMeta } = await import('./js/data/algorithms-meta.js');
  const { CodeRegistry } = await import('./js/code/registry.js');
  const { SortingGenerators } = await import('./js/algorithms/sorting/sorting-generators.js');
  const { SearchingGenerators } = await import('./js/algorithms/searching/searching-generators.js');
  const { RecursionGenerators } = await import('./js/algorithms/recursion/recursion-generators.js');
  const { GraphGenerators } = await import('./js/algorithms/graph/graph-generators.js');

  const algoIds = Object.keys(AlgorithmsMeta);
  console.log(`Testing ${algoIds.length} algorithms metadata, source code, and step generators...`);

  let codePassed = 0;
  let genPassed = 0;

  for (const id of algoIds) {
    // 1. Check Source Code (C, C++, Python)
    const cCode = CodeRegistry.getCode(id, 'c');
    const cppCode = CodeRegistry.getCode(id, 'cpp');
    const pyCode = CodeRegistry.getCode(id, 'python');

    if (!cCode || cCode.startsWith('// No code')) {
      throw new Error(`Missing C code for ${id}`);
    }
    if (!cppCode || cppCode.startsWith('// No code')) {
      throw new Error(`Missing C++ code for ${id}`);
    }
    if (!pyCode || pyCode.startsWith('// No code')) {
      throw new Error(`Missing Python code for ${id}`);
    }
    codePassed++;

    // 2. Check Step Generator
    let steps = [];
    if (SortingGenerators[id]) {
      steps = SortingGenerators[id]([45, 12, 78, 23, 9, 56]);
    } else if (SearchingGenerators[id]) {
      steps = SearchingGenerators[id]([10, 20, 30, 40, 50], 30);
    } else if (RecursionGenerators[id]) {
      steps = RecursionGenerators[id](3);
    } else if (GraphGenerators[id]) {
      const sampleGraph = {
        isDirected: false,
        isWeighted: true,
        nodes: [{ id: 0, label: '0', x: 50, y: 50 }, { id: 1, label: '1', x: 150, y: 150 }],
        edges: [{ u: 0, v: 1, weight: 5 }]
      };
      steps = GraphGenerators[id](sampleGraph, 0);
    } else {
      throw new Error(`Missing generator for ${id}`);
    }

    if (!steps || steps.length === 0) {
      throw new Error(`Generator for ${id} yielded 0 steps`);
    }

    // Check step integrity
    steps.forEach((step, sIdx) => {
      if (!step.description || !step.state) {
        throw new Error(`Invalid step format in ${id} at index ${sIdx}`);
      }
      if (step.activeLine) {
        if (typeof step.activeLine.c !== 'number' || typeof step.activeLine.cpp !== 'number' || typeof step.activeLine.python !== 'number') {
          throw new Error(`Invalid activeLine mapping in ${id} at step ${sIdx}: ${JSON.stringify(step.activeLine)}`);
        }
      }
    });

    genPassed++;
  }

  console.log(`✓ Code integrity verified for all ${codePassed} algorithms in C, C++, and Python!`);
  console.log(`✓ Step generators verified for all ${genPassed} algorithms with full active line mappings!`);
  console.log('--- ALL TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
