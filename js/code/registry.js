/**
 * ALGOVISION - Unified Code Registry
 * Combines sorting, searching, recursion, and graph source codes
 */

import { SortingCode } from './sorting-code.js';
import { SearchingCode } from './searching-code.js';
import { RecursionCode } from './recursion-code.js';
import { GraphCode } from './graph-code.js';

export const CodeRegistry = {
  ...SortingCode,
  ...SearchingCode,
  ...RecursionCode,
  ...GraphCode,

  getCode(algoId, lang = 'cpp') {
    const entry = this[algoId];
    if (!entry) return '// No code available for ' + algoId;
    return entry[lang.toLowerCase()] || entry['cpp'] || '';
  }
};
