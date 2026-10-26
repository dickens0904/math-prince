import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ExamGeneratorPage.css';
import {
  grade1Chapters,
  grade2Chapters,
  grade3Chapters,
  grade4Chapters,
  grade5Chapters,
  generateQuestionsByTopic,
} from '../utils/questionGenerator';
import { convertBatchToChoice } from '../utils/questionTypes/choiceGenerator';
import { generateRandomMatch } from '../utils/questionTypes/matchingGenerator';
import { generatePDF, printExam, downloadHTML } from '../utils/pdfGenerator';
import {
  calculateSuggestedDifficulty,
  addHistoryRecord,
  loadHistory,
  generateAdaptiveReport,
} from '../utils/adaptiveEngine';
import { playCorrect, playWrong, playStart, playFinish } from '../utils/soundEffects';

const allChapters = {
  1: grade1Chapters,
  2: grade2Chapters,
  3: grade3Chapters,
  4: grade4Chapters,
  5: grade5Chapters,
};

const gradeLabels = { 1: '一年级', 2: '二年级', 3: '三年级', 4: '四年级', 5: '五年级' };

export default function ExamGeneratorPage({ user, onBack }) {
  const [examGrade, setExamGrade] = useState(user.grade);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questionTypes, setQuestionTypes] = useState(['fill', 'choice']);
  const [questionCount, setQuestionCount] = useState(20);
  const [examTitle, setExamTitle] = useState(`${user.grade}年级数学测验`);
  const [generatedExam, setGeneratedExam] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // 自适应自测状态
  const [mode, setMode] = useState('exam'); // 'exam' | 'adaptive'
  const [adaptiveQuestions, setAdaptiveQuestions] = useState([]);
  const [adaptiveIndex, setAdaptiveIndex] = useState(0);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState('medium');
  const [adaptiveHistory, setAdaptiveHistory] = useState([]);
  const [adaptiveResults, setAdaptiveResults] = useState([]);
  const [adaptiveFinished, setAdaptiveFinished] = useState(false);
  const [adaptiveReport, setAdaptiveReport] = useState(null);
  const [difficultyChanges, setDifficultyChanges] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(null);
  const inputRef = useRef(null);

  const chapters = allChapters[examGrade] || allChapters[3];

  const handleGradeChange = grade => {
    setExamGrade(grade);
    setSelectedTopics([]);
    setExamTitle(`${grade}年级数学测验`);
  };

  const toggleTopic = topic => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const toggleQuestionType = type => {
    setQuestionTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const selectAllTopics = () => {
    setSelectedTopics(chapters.map(c => c.name));
  };

  const clearTopics = () => {
    setSelectedTopics([]);
  };

  // 自适应自测相关函数
  const startAdaptiveTest = useCallback(() => {
    if (selectedTopics.length === 0) {
      alert('请至少选择一个章节');
      return;
    }
    playStart();
    const history = loadHistory(user.id);
    setAdaptiveHistory(history);
    setAdaptiveIndex(0);
    setAdaptiveResults([]);
    setAdaptiveFinished(false);
    setAdaptiveReport(null);
    setDifficultyChanges([]);
    setAdaptiveDifficulty('medium');

    // 生成第一题
    const topic = selectedTopics[0];
    const questions = generateQuestionsByTopic(examGrade, topic, 1);
    setAdaptiveQuestions(questions);
  }, [selectedTopics, examGrade, user.id]);

  const generateNextQuestion = useCallback(
    (difficulty, topicIndex) => {
      const topic = selectedTopics[topicIndex % selectedTopics.length];
      const count = difficulty === 'easy' ? 1 : difficulty === 'hard' ? 1 : 1;
      let questions = generateQuestionsByTopic(examGrade, topic, count);

      // 根据难度调整题目（这里简化处理，实际可以更复杂）
      if (difficulty === 'easy') {
        questions = questions.map(q => ({ ...q, difficulty: 'easy' }));
      } else if (difficulty === 'hard') {
        questions = questions.map(q => ({ ...q, difficulty: 'hard' }));
      }

      return questions[0];
    },
    [selectedTopics, examGrade]
  );

  const handleAdaptiveSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!userAnswer.trim() || showFeedback) return;

      const currentQ = adaptiveQuestions[adaptiveIndex];
      const isCorrect = userAnswer.trim() === currentQ.answer;

      playCorrect();

      const result = {
        ...currentQ,
        userAnswer: userAnswer.trim(),
        isCorrect,
        difficulty: adaptiveDifficulty,
      };
      const newResults = [...adaptiveResults, result];
      setAdaptiveResults(newResults);

      // 记录历史
      const newHistory = addHistoryRecord(user.id, {
        content: currentQ.content,
        answer: currentQ.answer,
        userAnswer: userAnswer.trim(),
        isCorrect,
        topic: currentQ.type || '未分类',
        difficulty: adaptiveDifficulty,
      });
      setAdaptiveHistory(newHistory);

      setShowFeedback(isCorrect ? 'correct' : 'wrong');

      // 计算下一道题的难度
      const suggested = calculateSuggestedDifficulty(newHistory, adaptiveDifficulty);
      if (suggested.shouldChange) {
        setDifficultyChanges(prev => [
          ...prev,
          {
            from: adaptiveDifficulty,
            to: suggested.difficulty,
            reason: suggested.reason,
            questionIndex: newResults.length,
          },
        ]);
        setAdaptiveDifficulty(suggested.difficulty);
      }

      setTimeout(() => {
        setShowFeedback(null);
        setUserAnswer('');

        // 检查是否完成（20题或选中章节循环完毕）
        if (newResults.length >= questionCount) {
          setAdaptiveFinished(true);
          playFinish();
          const report = generateAdaptiveReport(newHistory, [...difficultyChanges]);
          setAdaptiveReport(report);
        } else {
          // 生成下一题
          const nextQ = generateNextQuestion(suggested.difficulty, newResults.length);
          setAdaptiveQuestions(prev => [...prev, nextQ]);
          setAdaptiveIndex(prev => prev + 1);
        }
      }, 1200);
    },
    [
      adaptiveQuestions,
      adaptiveIndex,
      userAnswer,
      adaptiveDifficulty,
      adaptiveResults,
      questionCount,
      user.id,
      difficultyChanges,
      generateNextQuestion,
      showFeedback,
    ]
  );

  const generateExam = () => {
    if (selectedTopics.length === 0) {
      alert('请至少选择一个章节');
      return;
    }
    if (questionTypes.length === 0) {
      alert('请至少选择一种题型');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      let allQuestions = [];
      const questionsPerTopic = Math.ceil(questionCount / selectedTopics.length);

      // 从每个选中的章节生成题目
      selectedTopics.forEach(topic => {
        const questions = generateQuestionsByTopic(examGrade, topic, questionsPerTopic);
        allQuestions.push(...questions);
      });

      // 根据题型要求转换
      let finalQuestions = [];
      const fillQuestions = allQuestions.filter(q => !q.isText);
      const textQuestions = allQuestions.filter(q => q.isText);

      if (questionTypes.includes('fill')) {
        finalQuestions.push(...fillQuestions.slice(0, Math.ceil(questionCount * 0.5)));
      }
      if (questionTypes.includes('text')) {
        finalQuestions.push(...textQuestions.slice(0, Math.ceil(questionCount * 0.2)));
      }
      if (questionTypes.includes('choice')) {
        const choiceQuestions = convertBatchToChoice(fillQuestions, 1.0);
        finalQuestions.push(...choiceQuestions.slice(0, Math.ceil(questionCount * 0.3)));
      }
      if (questionTypes.includes('matching')) {
        for (let i = 0; i < Math.ceil(questionCount * 0.1); i++) {
          finalQuestions.push(generateRandomMatch());
        }
      }

      // 截取到指定数量
      finalQuestions = finalQuestions.slice(0, questionCount);

      // 添加序号
      finalQuestions = finalQuestions.map((q, i) => ({ ...q, id: i + 1 }));

      setGeneratedExam({
        title: examTitle,
        grade: examGrade,
        questions: finalQuestions,
        totalScore: finalQuestions.length * 5, // 每题5分
        createdAt: new Date().toLocaleString(),
      });

      setIsGenerating(false);
    }, 500);
  };

  const handleExportPDF = async () => {
    if (!generatedExam || isExporting) return;
    setIsExporting(true);
    try {
      await generatePDF(generatedExam);
    } catch (error) {
      alert('PDF生成失败，请尝试使用打印功能');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (!generatedExam) return;
    printExam(generatedExam);
  };

  const handleDownloadHTML = () => {
    if (!generatedExam) return;
    downloadHTML(generatedExam);
  };

  // 自适应自测结果页面
  if (adaptiveFinished && adaptiveReport) {
    return (
      <div className="exam-page">
        <div className="exam-container">
          <div className="adaptive-result-card">
            <div
              className="result-grade"
              style={{
                fontSize: '72px',
                fontWeight: '900',
                color: adaptiveReport.level.color,
                textShadow: `0 4px 20px ${adaptiveReport.level.color}40`,
              }}
            >
              {adaptiveReport.level.grade}
            </div>
            <h2 className="result-title" style={{ color: adaptiveReport.level.color }}>
              {adaptiveReport.level.text}
            </h2>

            <div className="result-stats">
              <div className="stat-item">
                <div className="stat-number">{adaptiveReport.totalQuestions}</div>
                <div className="stat-label">总题数</div>
              </div>
              <div className="stat-item correct">
                <div className="stat-number">{adaptiveReport.correctCount}</div>
                <div className="stat-label">答对</div>
              </div>
              <div className="stat-item accuracy">
                <div className="stat-number">{adaptiveReport.accuracy}%</div>
                <div className="stat-label">正确率</div>
              </div>
              <div className="stat-item streak">
                <div className="stat-number">🔥 {adaptiveReport.maxStreak}</div>
                <div className="stat-label">最长连击</div>
              </div>
            </div>

            {/* 难度变化记录 */}
            {adaptiveReport.difficultyChanges.length > 0 && (
              <div className="difficulty-changes">
                <h3>📈 难度调整记录</h3>
                {adaptiveReport.difficultyChanges.map((change, i) => (
                  <div key={i} className="change-item">
                    <span className="change-question">第{change.questionIndex}题后</span>
                    <span className="change-from">
                      {change.from === 'easy' ? '简单' : change.from === 'medium' ? '中等' : '困难'}
                    </span>
                    <span className="change-arrow">→</span>
                    <span className="change-to">
                      {change.to === 'easy' ? '简单' : change.to === 'medium' ? '中等' : '困难'}
                    </span>
                    <span className="change-reason">{change.reason}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 薄弱知识点 */}
            {adaptiveReport.weakTopics.length > 0 && (
              <div className="weak-topics">
                <h3>📚 需要加强的知识点</h3>
                {adaptiveReport.weakTopics.map((topic, i) => (
                  <div key={i} className="weak-topic-item">
                    <span className="topic-name">{topic.topic}</span>
                    <span
                      className="topic-accuracy"
                      style={{ color: topic.accuracy < 0.5 ? '#FF5722' : '#FF9800' }}
                    >
                      正确率: {Math.round(topic.accuracy * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="result-buttons">
              <button
                className="exam-btn secondary"
                onClick={() => {
                  setAdaptiveFinished(false);
                  setMode('exam');
                }}
              >
                返回配置
              </button>
              <button className="exam-btn primary" onClick={startAdaptiveTest}>
                再测一次
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 自适应自测进行中
  if (mode === 'adaptive' && adaptiveQuestions.length > 0 && !adaptiveFinished) {
    const currentQ = adaptiveQuestions[adaptiveIndex];
    const progress = ((adaptiveIndex + 1) / questionCount) * 100;
    const correctCount = adaptiveResults.filter(r => r.isCorrect).length;

    return (
      <div className="exam-page">
        <div className="exam-container">
          <div className="adaptive-header">
            <button className="back-btn" onClick={() => setMode('exam')}>
              ← 返回
            </button>
            <div className="adaptive-progress">
              <span className="progress-text">
                {adaptiveIndex + 1} / {questionCount}
              </span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <div className="adaptive-score">
              ✅ {correctCount} / {adaptiveResults.length}
            </div>
          </div>

          {/* 难度指示器 */}
          <div className="difficulty-indicator">
            <span className="difficulty-label">当前难度:</span>
            <span className={`difficulty-badge ${adaptiveDifficulty}`}>
              {adaptiveDifficulty === 'easy'
                ? '🟢 简单'
                : adaptiveDifficulty === 'medium'
                  ? '🟡 中等'
                  : '🔴 困难'}
            </span>
            {difficultyChanges.length > 0 && (
              <span className="difficulty-change-hint">
                {difficultyChanges[difficultyChanges.length - 1].reason}
              </span>
            )}
          </div>

          {/* 题目卡片 */}
          <div className="adaptive-question-card">
            <div className="question-type">{currentQ.type || '填空题'}</div>
            <div className="question-content">{currentQ.content}</div>

            {showFeedback && (
              <div className={`feedback-overlay ${showFeedback}`}>
                <div className="feedback-emoji">{showFeedback === 'correct' ? '🎉' : '😅'}</div>
                <div className="feedback-text">
                  {showFeedback === 'correct' ? '回答正确！' : `正确答案是: ${currentQ.answer}`}
                </div>
              </div>
            )}

            <form className="answer-form" onSubmit={handleAdaptiveSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="answer-input"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="输入你的答案..."
                disabled={showFeedback !== null}
                autoFocus
              />
              <button
                type="submit"
                className="submit-btn"
                disabled={showFeedback !== null || !userAnswer.trim()}
              >
                确定
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-page">
      <div className="exam-container">
        <div className="exam-header-section">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="exam-title">📝 单元自测</h1>
          <p className="exam-subtitle">选择章节，生成试卷或开始自适应练习</p>

          {/* 模式切换 */}
          <div className="mode-switcher">
            <button
              className={`mode-btn ${mode === 'exam' ? 'active' : ''}`}
              onClick={() => setMode('exam')}
            >
              📄 生成试卷
            </button>
            <button
              className={`mode-btn ${mode === 'adaptive' ? 'active' : ''}`}
              onClick={() => setMode('adaptive')}
            >
              🧠 自适应练习
            </button>
          </div>
        </div>

        {!generatedExam ? (
          <div className="exam-config">
            <div className="config-section">
              <h3 className="section-title">选择年级</h3>
              <div className="grade-selector">
                {[1, 2, 3, 4, 5].map(g => (
                  <button
                    key={g}
                    className={`grade-btn ${examGrade === g ? 'selected' : ''}`}
                    onClick={() => handleGradeChange(g)}
                  >
                    {gradeLabels[g]}
                  </button>
                ))}
              </div>
            </div>

            <div className="config-section">
              <h3 className="section-title">试卷标题</h3>
              <input
                type="text"
                className="title-input"
                value={examTitle}
                onChange={e => setExamTitle(e.target.value)}
                placeholder="输入试卷标题"
              />
            </div>

            <div className="config-section">
              <h3 className="section-title">
                选择章节
                <div className="section-actions">
                  <button className="action-btn small" onClick={selectAllTopics}>
                    全选
                  </button>
                  <button className="action-btn small" onClick={clearTopics}>
                    清空
                  </button>
                </div>
              </h3>

              <div className="chapter-group">
                <h4 className="group-title">📗 上册</h4>
                <div className="topic-grid">
                  {chapters
                    .filter(c => c.unit === '上册')
                    .map(chapter => (
                      <button
                        key={chapter.id}
                        className={`topic-chip ${selectedTopics.includes(chapter.name) ? 'selected' : ''}`}
                        onClick={() => toggleTopic(chapter.name)}
                      >
                        {chapter.name}
                      </button>
                    ))}
                </div>
              </div>
              <div className="chapter-group">
                <h4 className="group-title">📘 下册</h4>
                <div className="topic-grid">
                  {chapters
                    .filter(c => c.unit === '下册')
                    .map(chapter => (
                      <button
                        key={chapter.id}
                        className={`topic-chip ${selectedTopics.includes(chapter.name) ? 'selected' : ''}`}
                        onClick={() => toggleTopic(chapter.name)}
                      >
                        {chapter.name}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="config-section">
              <h3 className="section-title">题型选择</h3>
              <div className="type-grid">
                <button
                  className={`type-chip ${questionTypes.includes('fill') ? 'selected' : ''}`}
                  onClick={() => toggleQuestionType('fill')}
                >
                  ✏️ 填空题
                </button>
                <button
                  className={`type-chip ${questionTypes.includes('choice') ? 'selected' : ''}`}
                  onClick={() => toggleQuestionType('choice')}
                >
                  🔘 选择题
                </button>
                <button
                  className={`type-chip ${questionTypes.includes('text') ? 'selected' : ''}`}
                  onClick={() => toggleQuestionType('text')}
                >
                  📝 文字题
                </button>
                <button
                  className={`type-chip ${questionTypes.includes('matching') ? 'selected' : ''}`}
                  onClick={() => toggleQuestionType('matching')}
                >
                  🔗 连线题
                </button>
              </div>
            </div>

            <div className="config-section">
              <h3 className="section-title">题目数量</h3>
              <div className="count-options">
                {[10, 15, 20, 25, 30].map(count => (
                  <button
                    key={count}
                    className={`count-btn ${questionCount === count ? 'selected' : ''}`}
                    onClick={() => setQuestionCount(count)}
                  >
                    {count}题
                  </button>
                ))}
              </div>
            </div>

            <div className="generate-section">
              {mode === 'exam' ? (
                <button
                  className="generate-btn"
                  onClick={generateExam}
                  disabled={
                    selectedTopics.length === 0 || questionTypes.length === 0 || isGenerating
                  }
                >
                  {isGenerating ? '生成中...' : '生成试卷'}
                </button>
              ) : (
                <button
                  className="generate-btn adaptive-btn"
                  onClick={startAdaptiveTest}
                  disabled={selectedTopics.length === 0}
                >
                  🧠 开始自适应练习
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="exam-preview">
            <div className="preview-header">
              <h2 className="preview-title">{generatedExam.title}</h2>
              <div className="preview-info">
                <span>年级：{generatedExam.grade}年级</span>
                <span>题数：{generatedExam.questions.length}题</span>
                <span>总分：{generatedExam.totalScore}分</span>
              </div>
            </div>

            <div className="preview-questions">
              {generatedExam.questions.map((q, i) => (
                <div key={i} className="preview-question">
                  <div className="question-header">
                    <span className="question-number">{i + 1}.</span>
                    <span className="question-content">{q.content}</span>
                    <span className="question-type-badge">
                      {q.questionType === 'choice'
                        ? '选择题'
                        : q.questionType === 'matching'
                          ? '连线题'
                          : q.type || '填空题'}
                    </span>
                  </div>
                  {q.questionType === 'choice' && q.options && (
                    <div className="preview-options">
                      {q.options.map((opt, j) => (
                        <span key={j} className="preview-option">
                          {String.fromCharCode(65 + j)}. {opt}
                        </span>
                      ))}
                    </div>
                  )}
                  {q.questionType === 'matching' && (
                    <div className="preview-matching">
                      <div className="matching-col">
                        {q.leftItems.map(item => (
                          <div key={item.id} className="matching-item">
                            {item.content}
                          </div>
                        ))}
                      </div>
                      <div className="matching-col">
                        {q.rightItems.map(item => (
                          <div key={item.id} className="matching-item">
                            {item.content}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="preview-actions">
              <button className="action-btn secondary" onClick={() => setGeneratedExam(null)}>
                重新配置
              </button>
              <button
                className="action-btn primary"
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                {isExporting ? '生成中...' : '📄 下载PDF'}
              </button>
              <button className="action-btn primary" onClick={handlePrint}>
                🖨️ 打印试卷
              </button>
              <button className="action-btn secondary" onClick={handleDownloadHTML}>
                📥 下载HTML
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
