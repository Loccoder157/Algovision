/**
 * ALGOVISION - Unified Application State
 */

export const State = {
  activeView: 'visualizer-view',
  activeCategory: 'sorting',
  activeAlgorithm: 'bubble-sort',
  activeLanguage: 'cpp', // 'c' | 'cpp' | 'python' (default C++)
  theme: 'dark', // 'dark' | 'light'

  // Input Data States
  sortingArray: [45, 12, 78, 23, 9, 56, 34, 67, 89, 15, 50, 28],
  searchingArray: [10, 15, 23, 34, 45, 56, 67, 78, 89, 95],
  searchTarget: 45,
  recursionParam: 4,
  graphPreset: 'default',

  // Current Generated Steps
  currentSteps: []
};
