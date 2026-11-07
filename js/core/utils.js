/**
 * ALGOVISION - Utility Functions
 */

export const Utils = {
  generateRandomArray(size = 12, min = 10, max = 95) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
  },

  parseCustomArray(inputStr) {
    if (!inputStr || !inputStr.trim()) return null;
    const parts = inputStr.split(/[\s,]+/).filter(Boolean);
    const nums = parts.map(p => Number(p)).filter(n => !isNaN(n));
    if (nums.length === 0) return null;
    return nums;
  },

  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    return JSON.parse(JSON.stringify(obj));
  },

  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};
