import React, { useState, useEffect, useCallback } from 'react';
import './EyeProtection.css';

const DEFAULT_SETTINGS = {
  studyDuration: 30, // 学习时长（分钟）
  restDuration: 5, // 休息时长（分钟）
  enabled: true, // 是否启用
};

function getSettings() {
  const saved = localStorage.getItem('math-prince-eye-settings');
  return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
}

function saveSettings(settings) {
  localStorage.setItem('math-prince-eye-settings', JSON.stringify(settings));
}

export { getSettings, saveSettings };

export default function EyeProtection({ onRestComplete }) {
  const [settings] = useState(getSettings);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restRemaining, setRestRemaining] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const studySeconds = settings.studyDuration * 60;
  const restSeconds = settings.restDuration * 60;

  // 学习计时器
  useEffect(() => {
    if (!settings.enabled || isResting) return;

    const timer = setInterval(() => {
      setElapsedSeconds(prev => {
        if (prev + 1 >= studySeconds) {
          setIsResting(true);
          setRestRemaining(restSeconds);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.enabled, isResting, studySeconds, restSeconds]);

  // 休息倒计时
  useEffect(() => {
    if (!isResting) return;

    const timer = setInterval(() => {
      setRestRemaining(prev => {
        if (prev <= 1) {
          setIsResting(false);
          onRestComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, onRestComplete]);

  const handleSkipRest = useCallback(() => {
    setIsResting(false);
    setElapsedSeconds(0);
  }, []);

  const handleSaveSettings = useCallback(() => {
    saveSettings(tempSettings);
    setShowSettings(false);
    window.location.reload(); // 简单重载以应用新设置
  }, [tempSettings]);

  const formatTime = seconds => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!settings.enabled) return null;

  const progress = (elapsedSeconds / studySeconds) * 100;

  return (
    <>
      {/* 学习时间进度条 */}
      <div className="eye-progress-bar" title={`已学习 ${formatTime(elapsedSeconds)}`}>
        <div className="eye-progress-fill" style={{ width: `${progress}%` }} />
        <span className="eye-progress-text">{formatTime(elapsedSeconds)}</span>
        <button
          className="eye-settings-btn"
          onClick={() => {
            setTempSettings(settings);
            setShowSettings(true);
          }}
          title="护眼设置"
        >
          ⚙️
        </button>
      </div>

      {/* 休息提醒弹窗 */}
      {isResting && (
        <div className="eye-rest-overlay">
          <div className="eye-rest-modal">
            <div className="eye-rest-emoji">👀</div>
            <h2 className="eye-rest-title">休息一下眼睛吧！</h2>
            <p className="eye-rest-desc">
              你已经学习了 {settings.studyDuration} 分钟
              <br />
              让眼睛休息一会儿，看看远处的风景~
            </p>

            <div className="eye-rest-timer">
              <div className="eye-rest-circle">
                <svg viewBox="0 0 100 100">
                  <circle className="eye-rest-circle-bg" cx="50" cy="50" r="45" />
                  <circle
                    className="eye-rest-circle-fill"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 45}`,
                      strokeDashoffset: `${2 * Math.PI * 45 * (1 - restRemaining / restSeconds)}`,
                    }}
                  />
                </svg>
                <span className="eye-rest-time">{formatTime(restRemaining)}</span>
              </div>
            </div>

            <div className="eye-rest-tips">
              <p>💡 护眼小贴士：</p>
              <ul>
                <li>看看窗外的绿色植物</li>
                <li>闭上眼睛深呼吸几次</li>
                <li>站起来活动一下身体</li>
              </ul>
            </div>

            <button className="eye-rest-skip" onClick={handleSkipRest}>
              跳过休息（不推荐）
            </button>
          </div>
        </div>
      )}

      {/* 设置弹窗 */}
      {showSettings && (
        <div className="eye-settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="eye-settings-modal" onClick={e => e.stopPropagation()}>
            <h3>👁️ 护眼设置</h3>

            <div className="eye-settings-item">
              <label>启用护眼提醒</label>
              <input
                type="checkbox"
                checked={tempSettings.enabled}
                onChange={e => setTempSettings({ ...tempSettings, enabled: e.target.checked })}
              />
            </div>

            <div className="eye-settings-item">
              <label>学习时长（分钟）</label>
              <input
                type="number"
                min="10"
                max="120"
                value={tempSettings.studyDuration}
                onChange={e =>
                  setTempSettings({
                    ...tempSettings,
                    studyDuration: parseInt(e.target.value) || 30,
                  })
                }
              />
            </div>

            <div className="eye-settings-item">
              <label>休息时长（分钟）</label>
              <input
                type="number"
                min="1"
                max="30"
                value={tempSettings.restDuration}
                onChange={e =>
                  setTempSettings({ ...tempSettings, restDuration: parseInt(e.target.value) || 5 })
                }
              />
            </div>

            <div className="eye-settings-actions">
              <button className="eye-settings-save" onClick={handleSaveSettings}>
                保存
              </button>
              <button className="eye-settings-cancel" onClick={() => setShowSettings(false)}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
