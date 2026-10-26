import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MathPrinceDB {
  constructor() {
    // 数据库文件存储在用户数据目录
    const dbPath = path.join(app.getPath('userData'), 'math-prince.db');
    this.db = new Database(dbPath);
    this.init();
  }

  init() {
    // 启用WAL模式提高性能
    this.db.pragma('journal_mode = WAL');

    // 创建表
    this.createTables();

    // 插入初始数据
    this.insertInitialData();
  }

  createTables() {
    // 用户表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT NOT NULL,
        avatar TEXT DEFAULT 'default',
        grade INTEGER DEFAULT 2,
        level INTEGER DEFAULT 1,
        exp INTEGER DEFAULT 0,
        coins INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 练习记录表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS practice_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        question_type TEXT NOT NULL,
        question_content TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        user_answer TEXT,
        is_correct BOOLEAN NOT NULL,
        time_spent INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // 徽章表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        icon TEXT,
        condition_type TEXT NOT NULL,
        condition_value INTEGER NOT NULL
      )
    `);

    // 用户徽章表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_badges (
        user_id INTEGER NOT NULL,
        badge_id INTEGER NOT NULL,
        earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, badge_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (badge_id) REFERENCES badges(id)
      )
    `);

    // 错题表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS wrong_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        question_type TEXT NOT NULL,
        question_content TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        wrong_count INTEGER DEFAULT 1,
        last_wrong_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        mastered BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // 每日签到表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS daily_checkins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        checkin_date DATE NOT NULL,
        consecutive_days INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, checkin_date)
      )
    `);
  }

  insertInitialData() {
    // 检查是否已有徽章数据
    const badgeCount = this.db.prepare('SELECT COUNT(*) as count FROM badges').get();

    if (badgeCount.count === 0) {
      // 插入初始徽章
      const insertBadge = this.db.prepare(`
        INSERT INTO badges (name, description, icon, condition_type, condition_value)
        VALUES (?, ?, ?, ?, ?)
      `);

      const badges = [
        ['初学者', '完成第一道题目', 'beginner', 'total_questions', 1],
        ['计算小达人', '连续答对10道题', 'calculator', 'streak_correct', 10],
        ['口算高手', '完成100道口算题', 'mental_math', 'total_questions', 100],
        ['坚持不懈', '连续签到7天', 'persistent', 'consecutive_days', 7],
        ['数学之星', '获得1000积分', 'math_star', 'total_exp', 1000],
        ['全能王者', '完成所有类型题目', 'king', 'all_types', 1],
        ['错题克星', '掌握10道错题', 'error_killer', 'mastered_questions', 10],
        ['速度之王', '在计时挑战中获得满分', 'speed_king', 'perfect_score', 1],
      ];

      const insertMany = this.db.transaction(badges => {
        for (const badge of badges) {
          insertBadge.run(...badge);
        }
      });

      insertMany(badges);
    }
  }

  // 用户相关操作
  createUser(nickname, avatar = 'default', grade = 2) {
    const stmt = this.db.prepare(`
      INSERT INTO users (nickname, avatar, grade)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(nickname, avatar, grade);
    return { id: result.lastInsertRowid, nickname, avatar, grade };
  }

  getUser(userId) {
    return this.db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  }

  updateUser(userId, updates) {
    const fields = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(updates);
    values.push(userId);

    const stmt = this.db.prepare(`UPDATE users SET ${fields} WHERE id = ?`);
    return stmt.run(...values);
  }

  // 练习记录相关操作
  savePracticeRecord(record) {
    const stmt = this.db.prepare(`
      INSERT INTO practice_records (user_id, question_type, question_content, correct_answer, user_answer, is_correct, time_spent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      record.userId,
      record.questionType,
      record.questionContent,
      record.correctAnswer,
      record.userAnswer,
      record.isCorrect,
      record.timeSpent
    );
  }

  getPracticeRecords(userId, filters = {}) {
    let query = 'SELECT * FROM practice_records WHERE user_id = ?';
    const params = [userId];

    if (filters.questionType) {
      query += ' AND question_type = ?';
      params.push(filters.questionType);
    }

    if (filters.startDate) {
      query += ' AND created_at >= ?';
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ' AND created_at <= ?';
      params.push(filters.endDate);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    return this.db.prepare(query).all(...params);
  }

  // 错题相关操作
  addWrongQuestion(userId, question) {
    // 检查是否已存在相同错题
    const existing = this.db
      .prepare(
        `
      SELECT * FROM wrong_questions 
      WHERE user_id = ? AND question_content = ? AND mastered = FALSE
    `
      )
      .get(userId, question.questionContent);

    if (existing) {
      // 更新错误次数
      const stmt = this.db.prepare(`
        UPDATE wrong_questions 
        SET wrong_count = wrong_count + 1, last_wrong_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      return stmt.run(existing.id);
    } else {
      // 插入新错题
      const stmt = this.db.prepare(`
        INSERT INTO wrong_questions (user_id, question_type, question_content, correct_answer)
        VALUES (?, ?, ?, ?)
      `);
      return stmt.run(
        userId,
        question.questionType,
        question.questionContent,
        question.correctAnswer
      );
    }
  }

  getWrongQuestions(userId) {
    return this.db
      .prepare(
        `
      SELECT * FROM wrong_questions 
      WHERE user_id = ? AND mastered = FALSE 
      ORDER BY last_wrong_at DESC
    `
      )
      .all(userId);
  }

  markQuestionMastered(questionId) {
    const stmt = this.db.prepare('UPDATE wrong_questions SET mastered = TRUE WHERE id = ?');
    return stmt.run(questionId);
  }

  // 徽章相关操作
  getBadges() {
    return this.db.prepare('SELECT * FROM badges').all();
  }

  getUserBadges(userId) {
    return this.db
      .prepare(
        `
      SELECT b.*, ub.earned_at 
      FROM badges b
      INNER JOIN user_badges ub ON b.id = ub.badge_id
      WHERE ub.user_id = ?
    `
      )
      .all(userId);
  }

  awardBadge(userId, badgeId) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (?, ?)
      `);
      return stmt.run(userId, badgeId);
    } catch (error) {
      // 如果已经拥有该徽章，忽略错误
      if (error.message.includes('UNIQUE constraint failed')) {
        return null;
      }
      throw error;
    }
  }

  // 签到相关操作
  checkin(userId) {
    const today = new Date().toISOString().split('T')[0];

    // 检查今天是否已签到
    const existing = this.db
      .prepare(
        `
      SELECT * FROM daily_checkins 
      WHERE user_id = ? AND checkin_date = ?
    `
      )
      .get(userId, today);

    if (existing) {
      return { success: false, message: '今天已经签到过了' };
    }

    // 获取昨天的签到记录
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const yesterdayRecord = this.db
      .prepare(
        `
      SELECT * FROM daily_checkins 
      WHERE user_id = ? AND checkin_date = ?
    `
      )
      .get(userId, yesterday);

    const consecutiveDays = yesterdayRecord ? yesterdayRecord.consecutive_days + 1 : 1;

    // 插入今天的签到记录
    const stmt = this.db.prepare(`
      INSERT INTO daily_checkins (user_id, checkin_date, consecutive_days)
      VALUES (?, ?, ?)
    `);
    stmt.run(userId, today, consecutiveDays);

    // 计算奖励积分
    const expReward = 10 + (consecutiveDays - 1) * 5; // 连续签到奖励递增

    // 更新用户积分
    this.db.prepare('UPDATE users SET exp = exp + ? WHERE id = ?').run(expReward, userId);

    return {
      success: true,
      consecutiveDays,
      expReward,
      message: `签到成功！连续签到${consecutiveDays}天，获得${expReward}积分`,
    };
  }

  // 学习统计
  getLearningStats(userId, period = 'week') {
    let dateFilter;
    const now = new Date();

    switch (period) {
      case 'today':
        dateFilter = now.toISOString().split('T')[0];
        break;
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 86400000);
        dateFilter = weekAgo.toISOString().split('T')[0];
        break;
      }
      case 'month': {
        const monthAgo = new Date(now.getTime() - 30 * 86400000);
        dateFilter = monthAgo.toISOString().split('T')[0];
        break;
      }
      default:
        dateFilter = '1970-01-01';
    }

    const stats = this.db
      .prepare(
        `
      SELECT 
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_count,
        AVG(time_spent) as avg_time_spent
      FROM practice_records
      WHERE user_id = ? AND created_at >= ?
    `
      )
      .get(userId, dateFilter);

    // 按题型统计
    const typeStats = this.db
      .prepare(
        `
      SELECT 
        question_type,
        COUNT(*) as total,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
      FROM practice_records
      WHERE user_id = ? AND created_at >= ?
      GROUP BY question_type
    `
      )
      .all(userId, dateFilter);

    return {
      ...stats,
      accuracy:
        stats.total_questions > 0
          ? ((stats.correct_count / stats.total_questions) * 100).toFixed(1)
          : 0,
      typeStats,
    };
  }

  // 关闭数据库
  close() {
    this.db.close();
  }
}

export default MathPrinceDB;
