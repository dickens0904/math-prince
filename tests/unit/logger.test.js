import { logger } from '../../src/renderer/utils/logger.js';

// 在测试前清空日志
beforeEach(() => {
  logger.clear();
  logger.level = 0; // DEBUG
});

describe('Logger 基础功能', () => {
  test('logger 是单例', () => {
    const l1 = logger;
    const l2 = logger;
    expect(l1).toBe(l2);
  });

  test('初始状态 logs 为空', () => {
    expect(logger.logs).toHaveLength(0);
  });

  test('maxLogs 默认 500', () => {
    expect(logger.maxLogs).toBe(500);
  });
});

describe('日志记录', () => {
  test('info 记录日志', () => {
    logger.info('Test', '测试消息');
    expect(logger.logs).toHaveLength(1);
    expect(logger.logs[0].level).toBe('INFO');
    expect(logger.logs[0].module).toBe('Test');
    expect(logger.logs[0].message).toBe('测试消息');
  });

  test('debug 记录日志', () => {
    logger.debug('Test', '调试消息');
    expect(logger.logs).toHaveLength(1);
    expect(logger.logs[0].level).toBe('DEBUG');
  });

  test('warn 记录日志', () => {
    logger.warn('Test', '警告消息');
    expect(logger.logs).toHaveLength(1);
    expect(logger.logs[0].level).toBe('WARN');
  });

  test('error 记录日志', () => {
    logger.error('Test', '错误消息');
    expect(logger.logs).toHaveLength(1);
    expect(logger.logs[0].level).toBe('ERROR');
  });

  test('每条日志有 id 和 timestamp', () => {
    logger.info('Test', '测试');
    const entry = logger.logs[0];
    expect(entry).toHaveProperty('id');
    expect(entry).toHaveProperty('timestamp');
    expect(typeof entry.id).toBe('number');
    expect(typeof entry.timestamp).toBe('string');
  });

  test('data 参数被记录', () => {
    logger.info('Test', '消息', { key: 'value' });
    expect(logger.logs[0].data).toEqual({ key: 'value' });
  });

  test('无 data 时为 null', () => {
    logger.info('Test', '消息');
    expect(logger.logs[0].data).toBeNull();
  });
});

describe('日志级别过滤', () => {
  test('level=INFO 时 debug 不记录', () => {
    logger.level = 1; // INFO
    logger.debug('Test', '调试');
    expect(logger.logs).toHaveLength(0);
  });

  test('level=INFO 时 info 记录', () => {
    logger.level = 1; // INFO
    logger.info('Test', '信息');
    expect(logger.logs).toHaveLength(1);
  });

  test('level=WARN 时 warn 和 error 记录', () => {
    logger.level = 2; // WARN
    logger.debug('Test', '调试');
    logger.info('Test', '信息');
    logger.warn('Test', '警告');
    logger.error('Test', '错误');
    expect(logger.logs).toHaveLength(2);
    expect(logger.logs[0].level).toBe('WARN');
    expect(logger.logs[1].level).toBe('ERROR');
  });

  test('level=ERROR 时只有 error 记录', () => {
    logger.level = 3; // ERROR
    logger.debug('Test', '调试');
    logger.info('Test', '信息');
    logger.warn('Test', '警告');
    logger.error('Test', '错误');
    expect(logger.logs).toHaveLength(1);
    expect(logger.logs[0].level).toBe('ERROR');
  });
});

describe('getLogs - 查询日志', () => {
  beforeEach(() => {
    logger.info('App', '应用启动');
    logger.debug('QuestionGen', '生成题目');
    logger.warn('App', '警告');
    logger.error('DB', '错误');
  });

  test('无过滤返回全部', () => {
    expect(logger.getLogs()).toHaveLength(4);
  });

  test('按 module 过滤', () => {
    const appLogs = logger.getLogs({ module: 'App' });
    expect(appLogs).toHaveLength(2);
    appLogs.forEach(l => expect(l.module).toBe('App'));
  });

  test('按 level 过滤', () => {
    const warnLogs = logger.getLogs({ level: 'WARN' });
    expect(warnLogs).toHaveLength(2); // WARN + ERROR
    warnLogs.forEach(l => {
      expect(['WARN', 'ERROR']).toContain(l.level);
    });
  });

  test('组合过滤', () => {
    const logs = logger.getLogs({ module: 'App', level: 'INFO' });
    expect(logs).toHaveLength(2); // INFO + WARN
  });
});

describe('clear - 清空日志', () => {
  test('清空后 logs 为空', () => {
    logger.info('Test', '消息');
    logger.info('Test', '消息2');
    expect(logger.logs).toHaveLength(2);
    logger.clear();
    expect(logger.logs).toHaveLength(0);
  });
});

describe('subscribe - 订阅机制', () => {
  test('新日志触发订阅者', () => {
    const received = [];
    logger.subscribe(entry => received.push(entry));
    logger.info('Test', '消息1');
    logger.info('Test', '消息2');
    expect(received).toHaveLength(2);
  });

  test('取消订阅后不再接收', () => {
    const received = [];
    const unsub = logger.subscribe(entry => received.push(entry));
    logger.info('Test', '消息1');
    unsub();
    logger.info('Test', '消息2');
    expect(received).toHaveLength(1);
  });

  test('clear 触发订阅者传 null', () => {
    let received = undefined;
    logger.subscribe(entry => {
      received = entry;
    });
    logger.clear();
    expect(received).toBeNull();
  });
});

describe('exportText - 导出文本', () => {
  test('导出格式正确', () => {
    logger.info('App', '测试消息');
    const text = logger.exportText();
    expect(text).toContain('INFO');
    expect(text).toContain('App');
    expect(text).toContain('测试消息');
  });

  test('多条日志用换行分隔', () => {
    logger.info('App', '消息1');
    logger.info('App', '消息2');
    const text = logger.exportText();
    expect(text.split('\n')).toHaveLength(2);
  });

  test('带 data 的日志包含 JSON', () => {
    logger.info('App', '消息', { key: 'value' });
    const text = logger.exportText();
    expect(text).toContain('{"key":"value"}');
  });

  test('空日志返回空字符串', () => {
    expect(logger.exportText()).toBe('');
  });
});

describe('maxLogs - 日志上限', () => {
  test('超过 maxLogs 自动裁剪', () => {
    logger.maxLogs = 5;
    for (let i = 0; i < 10; i++) {
      logger.info('Test', `消息${i}`);
    }
    expect(logger.logs.length).toBeLessThanOrEqual(5);
  });
});
