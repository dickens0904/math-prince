import React, { useState } from 'react';
import './ChoiceQuestion.css';

export default function ChoiceQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = option => {
    if (submitted) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    const isCorrect = selected === question.answer;
    setTimeout(() => {
      onAnswer(selected, isCorrect);
    }, 1500);
  };

  const getOptionClass = option => {
    if (!submitted) {
      return selected === option ? 'selected' : '';
    }
    if (option === question.answer) {
      return 'correct';
    }
    if (option === selected && option !== question.answer) {
      return 'wrong';
    }
    return '';
  };

  return (
    <div className="choice-question">
      <div className="question-content">{question.content}</div>

      <div className="options-grid">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${getOptionClass(option)}`}
            onClick={() => handleSelect(option)}
            disabled={submitted}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
            {submitted && option === question.answer && <span className="option-icon">✓</span>}
            {submitted && option === selected && option !== question.answer && (
              <span className="option-icon">✗</span>
            )}
          </button>
        ))}
      </div>

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit} disabled={!selected}>
          提交答案
        </button>
      )}

      {submitted && (
        <div className={`feedback ${selected === question.answer ? 'correct' : 'wrong'}`}>
          <div className="feedback-emoji">{selected === question.answer ? '🎉' : '😅'}</div>
          <div className="feedback-text">
            {selected === question.answer ? '答对了！' : `答错了，正确答案是 ${question.answer}`}
          </div>
        </div>
      )}
    </div>
  );
}
