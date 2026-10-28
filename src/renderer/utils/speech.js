// 数学小王子 · 语音讲解工具
// 统一封装浏览器语音合成，处理中文语音选择、语音列表异步加载、不支持时的降级

let voicesReadyPromise = null;

// 等待语音列表加载（部分浏览器首次 getVoices() 为空，需要等 voiceschanged）
function waitForVoices(timeout = 2000) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([]);
  }
  const synth = window.speechSynthesis;
  const existing = synth.getVoices();
  if (existing.length > 0) return Promise.resolve(existing);
  if (voicesReadyPromise) return voicesReadyPromise;

  voicesReadyPromise = new Promise(resolve => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      synth.removeEventListener('voiceschanged', done);
      resolve(synth.getVoices());
    };
    synth.addEventListener('voiceschanged', done);
    setTimeout(done, timeout);
  });
  return voicesReadyPromise;
}

function pickChineseVoice(voices) {
  if (!voices || voices.length === 0) return null;
  const isZhLang = (lang) => {
    if (!lang) return false;
    const l = lang.toLowerCase();
    return l.startsWith('zh') || l.startsWith('cmn') || l.startsWith('yue');
  };
  return (
    voices.find(v => isZhLang(v.lang) && v.lang.toLowerCase().includes('cn')) ||
    voices.find(v => isZhLang(v.lang)) ||
    voices.find(v => v.name && v.name.toLowerCase().includes('chinese')) ||
    null
  );
}

// 当前环境是否有可用的中文语音（异步，语音列表可能稍后才加载）
export async function hasChineseVoice() {
  if (!isSpeechSupported()) return false;
  const voices = await waitForVoices();
  return pickChineseVoice(voices) !== null;
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined';
}

// 朗读文本；返回 Promise<boolean> 表示是否成功开始朗读
export async function speak(text, options = {}) {
  if (!text || !isSpeechSupported()) return false;
  const synth = window.speechSynthesis;

  try {
    synth.cancel();
  } catch (e) {
    // ignore
  }

  const voices = await waitForVoices();
  const voice = pickChineseVoice(voices);
  if (!voice) {
    // 没有中文语音：不播放，避免用英文语音读中文变成乱码音
    console.warn('[speech] 未找到中文语音，跳过朗读');
    return false;
  }

  return new Promise(resolve => {
    let settled = false;
    let endNotified = false;
    const notifyEnd = ok => {
      if (endNotified) return;
      endNotified = true;
      if (typeof options.onEnd === 'function') options.onEnd(ok);
    };
    const finish = ok => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = options.rate || 0.95;
      utterance.pitch = options.pitch ?? 1;
      if (voice) utterance.voice = voice;
      utterance.onstart = () => finish(true);
      utterance.onend = () => notifyEnd(true);
      utterance.onerror = () => {
        notifyEnd(false);
        finish(false);
      };
      synth.speak(utterance);
      // 兜底：某些环境下 onstart 不触发
      setTimeout(() => finish(true), 600);
    } catch (e) {
      notifyEnd(false);
      finish(false);
    }
  });
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    // ignore
  }
}

export default { speak, stopSpeaking, isSpeechSupported };
