// 日志工具 - 统一日志管理
// 支持控制台输出 + 页面日志面板 + 文件导出

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const LOG_ICONS = { DEBUG: '🔍', INFO: '📋', WARN: '⚠️', ERROR: '❌' };

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 500;
    this.listeners = [];
    this.level = LOG_LEVELS.DEBUG;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  _log(level, module, message, data = null) {
    if (LOG_LEVELS[level] < this.level) return;

    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      level,
      module,
      message,
      data,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // 控制台输出
    const icon = LOG_ICONS[level];
    const prefix = `${icon} [${entry.timestamp}] [${module}]`;
    if (data) {
      console.log(prefix, message, data);
    } else {
      console.log(prefix, message);
    }

    // 通知订阅者
    this.listeners.forEach(fn => fn(entry));
  }

  debug(module, message, data) {
    this._log('DEBUG', module, message, data);
  }
  info(module, message, data) {
    this._log('INFO', module, message, data);
  }
  warn(module, message, data) {
    this._log('WARN', module, message, data);
  }
  error(module, message, data) {
    this._log('ERROR', module, message, data);
  }

  getLogs(filter = {}) {
    let filtered = this.logs;
    if (filter.module) filtered = filtered.filter(l => l.module === filter.module);
    if (filter.level)
      filtered = filtered.filter(l => LOG_LEVELS[l.level] >= LOG_LEVELS[filter.level]);
    return filtered;
  }

  clear() {
    this.logs = [];
    this.listeners.forEach(fn => fn(null));
  }

  exportText() {
    return this.logs
      .map(
        l =>
          `${l.timestamp} [${l.level}] [${l.module}] ${l.message}${l.data ? ' ' + JSON.stringify(l.data) : ''}`
      )
      .join('\n');
  }
}

export const logger = new Logger();
export default logger;
