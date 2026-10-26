// 音效系统 - 使用 Web Audio API 生成音效，无需外部文件

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // 静默处理音频错误
  }
}

function playNotes(notes, interval = 0.15) {
  notes.forEach((note, i) => {
    setTimeout(
      () => {
        playTone(note.freq, note.dur || 0.3, note.type || 'sine', note.vol || 0.25);
      },
      i * interval * 1000
    );
  });
}

// ==================== 答题音效 ====================

// 答对了 - 欢快上升音
export function playCorrect() {
  playNotes(
    [
      { freq: 523, dur: 0.15 }, // C5
      { freq: 659, dur: 0.15 }, // E5
      { freq: 784, dur: 0.3 }, // G5
    ],
    0.1
  );
}

// 答错了 - 下降音
export function playWrong() {
  playNotes(
    [
      { freq: 330, dur: 0.2, type: 'square', vol: 0.15 },
      { freq: 262, dur: 0.3, type: 'square', vol: 0.12 },
    ],
    0.15
  );
}

// 连续答对3题 - 超级棒音效
export function playCombo() {
  playNotes(
    [
      { freq: 523, dur: 0.1 },
      { freq: 659, dur: 0.1 },
      { freq: 784, dur: 0.1 },
      { freq: 1047, dur: 0.4 }, // C6
    ],
    0.08
  );
}

// 连续答对5题 - 疯狂连击音效
export function playSuperCombo() {
  playNotes(
    [
      { freq: 523, dur: 0.08 },
      { freq: 659, dur: 0.08 },
      { freq: 784, dur: 0.08 },
      { freq: 1047, dur: 0.08 },
      { freq: 1319, dur: 0.5 }, // E6
    ],
    0.07
  );
}

// ==================== 系统音效 ====================

// 点击按钮
export function playClick() {
  playTone(800, 0.08, 'sine', 0.1);
}

// 开始练习
export function playStart() {
  playNotes(
    [
      { freq: 392, dur: 0.15 }, // G4
      { freq: 523, dur: 0.15 }, // C5
      { freq: 659, dur: 0.3 }, // E5
    ],
    0.12
  );
}

// 练习结束
export function playFinish() {
  playNotes(
    [
      { freq: 523, dur: 0.15 },
      { freq: 659, dur: 0.15 },
      { freq: 784, dur: 0.15 },
      { freq: 1047, dur: 0.15 },
      { freq: 1319, dur: 0.5 },
    ],
    0.12
  );
}

// 升级音效
export function playLevelUp() {
  playNotes(
    [
      { freq: 392, dur: 0.1 },
      { freq: 523, dur: 0.1 },
      { freq: 659, dur: 0.1 },
      { freq: 784, dur: 0.1 },
      { freq: 1047, dur: 0.1 },
      { freq: 1319, dur: 0.1 },
      { freq: 1568, dur: 0.5 },
    ],
    0.08
  );
}

// 倒计时警告
export function playTick() {
  playTone(1000, 0.05, 'square', 0.08);
}

// 时间到
export function playTimeUp() {
  playNotes(
    [
      { freq: 440, dur: 0.2, type: 'square', vol: 0.15 },
      { freq: 370, dur: 0.2, type: 'square', vol: 0.15 },
      { freq: 330, dur: 0.4, type: 'square', vol: 0.12 },
    ],
    0.2
  );
}

// 签到成功
export function playCheckIn() {
  playNotes(
    [
      { freq: 659, dur: 0.1 },
      { freq: 784, dur: 0.1 },
      { freq: 1047, dur: 0.3 },
    ],
    0.1
  );
}

// 解锁徽章
export function playBadge() {
  playNotes(
    [
      { freq: 784, dur: 0.1 },
      { freq: 988, dur: 0.1 },
      { freq: 1175, dur: 0.1 },
      { freq: 1568, dur: 0.5 },
    ],
    0.1
  );
}

// 倒计时3-2-1
export function playCountdown() {
  playTone(660, 0.15, 'sine', 0.2);
}

export default {
  playCorrect,
  playWrong,
  playCombo,
  playSuperCombo,
  playClick,
  playStart,
  playFinish,
  playLevelUp,
  playTick,
  playTimeUp,
  playCheckIn,
  playBadge,
  playCountdown,
};
