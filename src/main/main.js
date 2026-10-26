import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import MathPrinceDB from '../database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let db;

// 防止多开
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../../public/favicon.svg'),
    title: '数学小王子',
    show: false,
    frame: false, // 无边框窗口，自定义标题栏
  });

  // 开发环境加载本地服务器
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境加载打包后的文件
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function setupIPC() {
  // 窗口控制
  ipcMain.on('minimize-window', () => {
    mainWindow?.minimize();
  });

  ipcMain.on('maximize-window', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    mainWindow?.close();
  });

  // 获取应用版本
  ipcMain.handle('get-version', () => {
    return app.getVersion();
  });

  // 数据库操作
  ipcMain.handle('db:create-user', (event, userData) => {
    return db.createUser(userData.nickname, userData.avatar, userData.grade);
  });

  ipcMain.handle('db:get-user', (event, userId) => {
    return db.getUser(userId);
  });

  ipcMain.handle('db:update-user', (event, userId, userData) => {
    return db.updateUser(userId, userData);
  });

  ipcMain.handle('db:save-practice-record', (event, record) => {
    return db.savePracticeRecord(record);
  });

  ipcMain.handle('db:get-practice-records', (event, userId, filters) => {
    return db.getPracticeRecords(userId, filters);
  });

  ipcMain.handle('db:get-wrong-questions', (event, userId) => {
    return db.getWrongQuestions(userId);
  });

  ipcMain.handle('db:mark-question-mastered', (event, questionId) => {
    return db.markQuestionMastered(questionId);
  });

  ipcMain.handle('db:get-badges', () => {
    return db.getBadges();
  });

  ipcMain.handle('db:get-user-badges', (event, userId) => {
    return db.getUserBadges(userId);
  });

  ipcMain.handle('db:award-badge', (event, userId, badgeId) => {
    return db.awardBadge(userId, badgeId);
  });

  ipcMain.handle('db:get-learning-stats', (event, userId, period) => {
    return db.getLearningStats(userId, period);
  });

  ipcMain.handle('db:checkin', (event, userId) => {
    return db.checkin(userId);
  });

  ipcMain.handle('db:add-wrong-question', (event, userId, question) => {
    return db.addWrongQuestion(userId, question);
  });
}

app.whenReady().then(() => {
  // 初始化数据库
  db = new MathPrinceDB();

  // 设置IPC处理
  setupIPC();

  // 创建窗口
  createWindow();
});

app.on('window-all-closed', () => {
  if (db) {
    db.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
