/**
 * ALGOVISION - Interactive Quiz Component
 * Question filtering, immediate feedback, score tracking, and detailed explanations
 */

import { QuizData } from '../data/quiz-data.js';

export class QuizComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.questions = [...QuizData];
    this.currentCategory = 'all';
    this.currentDifficulty = 'all';
    this.score = 0;
    this.answeredCount = 0;
    this.answeredQuestions = {}; // { questionId: selectedIndex }

    this.render();
  }

  render() {
    const filteredQuestions = this.questions.filter(q => {
      const matchCat = this.currentCategory === 'all' || q.category === this.currentCategory;
      const matchDiff = this.currentDifficulty === 'all' || q.difficulty === this.currentDifficulty;
      return matchCat && matchDiff;
    });

    let html = `
      <div class="quiz-container">
        <!-- Header & Filters -->
        <div class="quiz-header-card">
          <div class="quiz-filter-group">
            <label style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Chủ đề:</label>
            <select id="quiz-filter-category">
              <option value="all" ${this.currentCategory === 'all' ? 'selected' : ''}>Tất cả chủ đề</option>
              <option value="sorting" ${this.currentCategory === 'sorting' ? 'selected' : ''}>Sorting (Sắp xếp)</option>
              <option value="searching" ${this.currentCategory === 'searching' ? 'selected' : ''}>Searching (Tìm kiếm)</option>
              <option value="recursion" ${this.currentCategory === 'recursion' ? 'selected' : ''}>Recursion (Đệ quy)</option>
              <option value="graph" ${this.currentCategory === 'graph' ? 'selected' : ''}>Graph (Đồ thị)</option>
            </select>

            <label style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-left: 10px;">Độ khó:</label>
            <select id="quiz-filter-difficulty">
              <option value="all" ${this.currentDifficulty === 'all' ? 'selected' : ''}>Tất cả cấp độ</option>
              <option value="easy" ${this.currentDifficulty === 'easy' ? 'selected' : ''}>Dễ (Easy)</option>
              <option value="medium" ${this.currentDifficulty === 'medium' ? 'selected' : ''}>Trung bình (Medium)</option>
              <option value="hard" ${this.currentDifficulty === 'hard' ? 'selected' : ''}>Khó (Hard)</option>
            </select>
          </div>

          <div class="quiz-score-badge">
            <span>🏆 Điểm số:</span>
            <span id="quiz-score-val">${this.score} / ${this.questions.length}</span>
          </div>
        </div>

        <!-- Questions List -->
        <div class="quiz-cards-list">
    `;

    filteredQuestions.forEach((q, qIndex) => {
      const userAnswer = this.answeredQuestions[q.id];
      const isAnswered = userAnswer !== undefined;

      html += `
        <div class="quiz-card" data-id="${q.id}">
          <div class="quiz-question-header">
            <span class="quiz-category-tag">${q.categoryName}</span>
            <span class="quiz-difficulty-tag ${q.difficulty}">
              ${q.difficulty === 'easy' ? 'Dễ' : (q.difficulty === 'medium' ? 'Trung bình' : 'Khó')}
            </span>
          </div>

          <div class="quiz-question-title">
            <strong>Câu ${qIndex + 1}:</strong> ${q.question}
          </div>

          <div class="quiz-options-grid">
      `;

      q.options.forEach((opt, optIdx) => {
        let optClass = '';
        if (isAnswered) {
          if (optIdx === q.correctAnswer) {
            optClass = 'correct';
          } else if (optIdx === userAnswer && userAnswer !== q.correctAnswer) {
            optClass = 'wrong';
          }
        }

        html += `
          <button class="quiz-option-btn ${optClass}" data-qid="${q.id}" data-opt="${optIdx}" ${isAnswered ? 'disabled' : ''}>
            <span>${String.fromCharCode(65 + optIdx)}. ${opt}</span>
            ${isAnswered && optIdx === q.correctAnswer ? '<span>✓ Đúng</span>' : ''}
            ${isAnswered && optIdx === userAnswer && userAnswer !== q.correctAnswer ? '<span>✗ Sai</span>' : ''}
          </button>
        `;
      });

      html += `</div>`;

      if (isAnswered) {
        html += `
          <div class="quiz-explanation-box">
            <strong>💡 Giải thích:</strong> ${q.explanation}
          </div>
        `;
      }

      html += `</div>`;
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.bindEvents();
  }

  bindEvents() {
    const catSelect = this.container.querySelector('#quiz-filter-category');
    const diffSelect = this.container.querySelector('#quiz-filter-difficulty');

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        this.render();
      });
    }

    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        this.currentDifficulty = e.target.value;
        this.render();
      });
    }

    this.container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = Number(btn.getAttribute('data-qid'));
        const optIdx = Number(btn.getAttribute('data-opt'));
        const question = this.questions.find(q => q.id === qid);
        if (!question || this.answeredQuestions[qid] !== undefined) return;

        this.answeredQuestions[qid] = optIdx;
        this.answeredCount++;
        if (optIdx === question.correctAnswer) {
          this.score++;
        }

        this.render();
      });
    });
  }
}
