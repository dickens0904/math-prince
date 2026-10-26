import React, { useState, useEffect } from 'react';
import TitleBar from './renderer/components/TitleBar';
import EyeProtection from './renderer/components/EyeProtection';
import LogPanel from './renderer/components/LogPanel';
import logger from './renderer/utils/logger';
import WelcomePage from './renderer/pages/WelcomePage';
import HomePage from './renderer/pages/HomePage';
import PracticePage from './renderer/pages/PracticePage';
import ChallengePage from './renderer/pages/ChallengePage';
import TopicPage from './renderer/pages/TopicPage';
import WrongBookPage from './renderer/pages/WrongBookPage';
import ReportPage from './renderer/pages/ReportPage';
import BadgePage from './renderer/pages/BadgePage';
import ExamGeneratorPage from './renderer/pages/ExamGeneratorPage';
import { savePracticeRecord } from './renderer/pages/ReportPage';
import { addWrongQuestionToStorage } from './renderer/pages/WrongBookPage';

// 本地数据库模拟
const localDB = {
  getUser() {
    const data = localStorage.getItem('math-prince-user');
    return data ? JSON.parse(data) : null;
  },
  saveUser(user) {
    localStorage.setItem('math-prince-user', JSON.stringify(user));
  },
  updateUser(updates) {
    const user = this.getUser();
    if (user) {
      const updated = { ...user, ...updates };
      this.saveUser(updated);
      return updated;
    }
    return null;
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('welcome');
  const [loading, setLoading] = useState(true);
  const [topicQuestions, setTopicQuestions] = useState(null);
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    logger.info('App', '应用启动');
    const savedUser = localDB.getUser();
    if (savedUser) {
      setUser(savedUser);
      setPage('home');
      logger.info('App', '检测到已登录用户', {
        nickname: savedUser.nickname,
        grade: savedUser.grade,
      });
    } else {
      logger.info('App', '无已登录用户，显示欢迎页');
    }
    setLoading(false);
  }, []);

  const handleStart = userData => {
    logger.info('App', '新用户注册', userData);
    const newUser = {
      id: Date.now(),
      ...userData,
      level: 1,
      exp: 0,
      coins: 0,
      createdAt: new Date().toISOString(),
    };
    localDB.saveUser(newUser);
    setUser(newUser);
    setPage('home');
    logger.info('App', '用户创建成功，进入首页', { id: newUser.id });
  };

  const handleNavigate = targetPage => {
    logger.info('App', `页面导航: ${page} → ${targetPage}`);
    setPage(targetPage);
  };

  // 处理练习完成
  const handlePracticeFinish = results => {
    const correctCount = results.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const expGain = correctCount * 10;
    logger.info('App', `日常练习完成: ${correctCount}/${results.length} 正确率${accuracy}%`, {
      expGain,
    });

    // 保存练习记录
    savePracticeRecord(user.id, {
      total: results.length,
      correct: correctCount,
      time: 0,
      details: results.map(r => ({
        content: r.content,
        type: r.type,
        userAnswer: r.userAnswer,
        correctAnswer: r.answer,
        isCorrect: r.isCorrect,
      })),
    });

    // 添加错题
    results
      .filter(r => !r.isCorrect)
      .forEach(r => {
        addWrongQuestionToStorage(user.id, {
          content: r.content,
          type: r.type,
          answer: r.answer,
        });
      });

    // 更新用户经验
    const updated = localDB.updateUser({
      exp: (user.exp || 0) + expGain,
    });
    setUser(updated);

    // 重新生成题目
    setPage('practice');
  };

  // 处理计时挑战完成
  const handleChallengeFinish = results => {
    const correctCount = results.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const expGain = correctCount * 15;
    logger.info('App', `计时挑战完成: ${correctCount}/${results.length} 正确率${accuracy}%`, {
      expGain,
    });

    // 保存练习记录
    savePracticeRecord(user.id, {
      total: results.length,
      correct: correctCount,
      time: 0,
      details: results.map(r => ({
        content: r.content,
        type: r.type,
        userAnswer: r.userAnswer,
        correctAnswer: r.answer,
        isCorrect: r.isCorrect,
      })),
    });

    // 添加错题
    results
      .filter(r => !r.isCorrect)
      .forEach(r => {
        addWrongQuestionToStorage(user.id, {
          content: r.content,
          type: r.type,
          answer: r.answer,
        });
      });

    // 检查是否获得S级
    if (accuracy >= 90) {
      const sGradeCount = parseInt(localStorage.getItem(`math-prince-s-grade-${user.id}`) || '0');
      localStorage.setItem(`math-prince-s-grade-${user.id}`, String(sGradeCount + 1));
    }

    // 更新用户经验
    const updated = localDB.updateUser({
      exp: (user.exp || 0) + expGain,
    });
    setUser(updated);
  };

  // 处理专项练习开始
  const handleTopicStartPractice = (topic, questions) => {
    logger.info('App', `专项练习开始: ${topic}`, { count: questions.length });
    setTopicName(topic);
    setTopicQuestions(questions);
    setPage('topic-practice');
  };

  // 处理专项练习完成
  const handleTopicPracticeFinish = results => {
    const correctCount = results.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const expGain = correctCount * 10;
    logger.info('App', `专项练习完成: ${correctCount}/${results.length} 正确率${accuracy}%`, {
      topicName,
    });

    // 保存练习记录
    savePracticeRecord(user.id, {
      total: results.length,
      correct: correctCount,
      time: 0,
      details: results.map(r => ({
        content: r.content,
        type: r.type,
        userAnswer: r.userAnswer,
        correctAnswer: r.answer,
        isCorrect: r.isCorrect,
      })),
    });

    // 添加错题
    results
      .filter(r => !r.isCorrect)
      .forEach(r => {
        addWrongQuestionToStorage(user.id, {
          content: r.content,
          type: r.type,
          answer: r.answer,
        });
      });

    // 更新用户经验
    const updated = localDB.updateUser({
      exp: (user.exp || 0) + expGain,
    });
    setUser(updated);

    // 返回专项页面
    setPage('topic');
  };

  const handleBackToHome = () => {
    logger.info('App', '返回首页');
    const freshUser = localDB.getUser();
    if (freshUser) setUser(freshUser);
    setPage('home');
    setTopicQuestions(null);
    setTopicName('');
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">👑</div>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <TitleBar />
      {user && <EyeProtection />}

      {page === 'welcome' && <WelcomePage onStart={handleStart} />}

      {page === 'home' && user && <HomePage user={user} onNavigate={handleNavigate} />}

      {page === 'practice' && user && (
        <PracticePage user={user} onBack={handleBackToHome} onFinish={handlePracticeFinish} />
      )}

      {page === 'challenge' && user && (
        <ChallengePage user={user} onBack={handleBackToHome} onFinish={handleChallengeFinish} />
      )}

      {page === 'topic' && user && (
        <TopicPage
          user={user}
          onBack={handleBackToHome}
          onStartPractice={handleTopicStartPractice}
        />
      )}

      {page === 'topic-practice' && user && topicQuestions && (
        <PracticePage
          user={user}
          onBack={() => setPage('topic')}
          onFinish={handleTopicPracticeFinish}
          initialQuestions={topicQuestions}
        />
      )}

      {page === 'wrong' && user && <WrongBookPage user={user} onBack={handleBackToHome} />}

      {page === 'report' && user && <ReportPage user={user} onBack={handleBackToHome} />}

      {page === 'badge' && user && <BadgePage user={user} onBack={handleBackToHome} />}

      {page === 'exam' && user && <ExamGeneratorPage user={user} onBack={handleBackToHome} />}

      <LogPanel />
    </div>
  );
}
