/**
 * ALGOVISION - High Performance Token-Based Syntax Highlighter
 * Offline-ready lexical tokenizer for C, C++, and Python
 * Preserves exact whitespace, indentations, and escapes HTML safely per token.
 */

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const SyntaxHighlighter = {
  tokenize(code, lang = 'cpp') {
    if (!code) return [];
    const lines = code.split('\n');
    return lines.map(line => this.highlightLine(line, lang.toLowerCase()));
  },

  highlightLine(line, lang) {
    if (!line || !line.trim()) {
      return '&nbsp;';
    }

    const isPython = lang === 'python';
    const isC = lang === 'c';
    const isCpp = lang === 'cpp';

    const commentRegex = isPython ? /^#.*$/ : /^\/\/.*$/;
    const stringRegex = /^("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/;
    const numberRegex = /^(\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?\b)/;
    const identRegex = /^([a-zA-Z_]\w*)/;
    const spaceRegex = /^(\s+)/;
    const punctRegex = /^([^\s\w]+)/;

    const cppKeywords = new Set([
      'return', 'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'switch', 'case', 'default',
      'struct', 'class', 'public', 'private', 'protected', 'template', 'typename',
      'sizeof', 'using', 'namespace', 'std', 'swap', 'new', 'delete', 'const', 'static'
    ]);
    const cppTypes = new Set([
      'int', 'char', 'float', 'double', 'void', 'long', 'short', 'unsigned', 'signed',
      'bool', 'true', 'false', 'NULL', 'nullptr', 'size_t', 'auto', 'vector', 'pair', 'tuple', 'queue', 'priority_queue'
    ]);

    const cKeywords = new Set([
      'return', 'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'switch', 'case', 'default',
      'struct', 'sizeof', 'const', 'static', 'qsort'
    ]);
    const cTypes = new Set([
      'int', 'char', 'float', 'double', 'void', 'long', 'short', 'unsigned', 'signed',
      'bool', 'true', 'false', 'NULL', 'size_t'
    ]);

    const pyKeywords = new Set([
      'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue',
      'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'import', 'from', 'as',
      'pass', 'lambda', 'with', 'try', 'except', 'finally', 'raise', 'yield'
    ]);
    const pyBuiltins = new Set([
      'range', 'len', 'print', 'list', 'dict', 'set', 'min', 'max', 'sum', 'enumerate',
      'int', 'float', 'str', 'sorted', 'heapq', 'deque', 'append', 'pop'
    ]);

    let result = '';
    let rest = line;

    while (rest.length > 0) {
      // 1. Whitespace: preserve exactly
      let m = rest.match(spaceRegex);
      if (m) {
        result += m[1];
        rest = rest.slice(m[1].length);
        continue;
      }

      // 2. Comments: style remainder of line
      m = rest.match(commentRegex);
      if (m) {
        result += `<span class="syn-comment">${escapeHtml(m[0])}</span>`;
        break;
      }

      // 3. String literals
      m = rest.match(stringRegex);
      if (m) {
        result += `<span class="syn-string">${escapeHtml(m[1])}</span>`;
        rest = rest.slice(m[1].length);
        continue;
      }

      // 4. Numbers
      m = rest.match(numberRegex);
      if (m) {
        result += `<span class="syn-number">${m[1]}</span>`;
        rest = rest.slice(m[1].length);
        continue;
      }

      // 5. Identifiers (keywords, types, builtins, function names)
      m = rest.match(identRegex);
      if (m) {
        const ident = m[1];
        const after = rest.slice(ident.length);
        const isFunc = /^\s*\(/.test(after);

        if (isPython) {
          if (pyKeywords.has(ident)) {
            result += `<span class="syn-keyword">${ident}</span>`;
          } else if (pyBuiltins.has(ident)) {
            result += `<span class="syn-builtin">${ident}</span>`;
          } else if (isFunc) {
            result += `<span class="syn-func">${ident}</span>`;
          } else {
            result += escapeHtml(ident);
          }
        } else if (isC) {
          if (cKeywords.has(ident)) {
            result += `<span class="syn-keyword">${ident}</span>`;
          } else if (cTypes.has(ident)) {
            result += `<span class="syn-type">${ident}</span>`;
          } else if (isFunc) {
            result += `<span class="syn-func">${ident}</span>`;
          } else {
            result += escapeHtml(ident);
          }
        } else {
          // C++ default
          if (cppKeywords.has(ident)) {
            result += `<span class="syn-keyword">${ident}</span>`;
          } else if (cppTypes.has(ident)) {
            result += `<span class="syn-type">${ident}</span>`;
          } else if (isFunc) {
            result += `<span class="syn-func">${ident}</span>`;
          } else {
            result += escapeHtml(ident);
          }
        }
        rest = after;
        continue;
      }

      // 6. Operators / Punctuation
      m = rest.match(punctRegex);
      if (m) {
        result += escapeHtml(m[1]);
        rest = rest.slice(m[1].length);
        continue;
      }

      // Fallback single char
      result += escapeHtml(rest[0]);
      rest = rest.slice(1);
    }

    return result;
  }
};
