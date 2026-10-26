import { contextBridge, ipcRenderer } from 'electron';

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取应用版本
  getVersion: () => ipcRenderer.invoke('get-version'),

  // 最小化窗口
  minimizeWindow: () => ipcRenderer.send('minimize-window'),

  // 最大化窗口
  maximizeWindow: () => ipcRenderer.send('maximize-window'),

  // 关闭窗口
  closeWindow: () => ipcRenderer.send('close-window'),

  // 数据库操作
  db: {
    // 用户相关
    createUser: userData => ipcRenderer.invoke('db:create-user', userData),
    getUser: userId => ipcRenderer.invoke('db:get-user', userId),
    updateUser: (userId, userData) => ipcRenderer.invoke('db:update-user', userId, userData),

    // 练习记录
    savePracticeRecord: record => ipcRenderer.invoke('db:save-practice-record', record),
    getPracticeRecords: (userId, filters) =>
      ipcRenderer.invoke('db:get-practice-records', userId, filters),

    // 错题
    getWrongQuestions: userId => ipcRenderer.invoke('db:get-wrong-questions', userId),
    markQuestionMastered: questionId => ipcRenderer.invoke('db:mark-question-mastered', questionId),

    // 徽章
    getBadges: () => ipcRenderer.invoke('db:get-badges'),
    getUserBadges: userId => ipcRenderer.invoke('db:get-user-badges', userId),
    awardBadge: (userId, badgeId) => ipcRenderer.invoke('db:award-badge', userId, badgeId),

    // 学习统计
    getLearningStats: (userId, period) =>
      ipcRenderer.invoke('db:get-learning-stats', userId, period),
  },
});
