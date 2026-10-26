import React from 'react';
import './TitleBar.css';

export default function TitleBar() {
  const handleMinimize = () => window.electronAPI?.minimizeWindow();
  const handleMaximize = () => window.electronAPI?.maximizeWindow();
  const handleClose = () => window.electronAPI?.closeWindow();

  return (
    <div className="title-bar">
      <div className="title-bar-drag">
        <span className="title-bar-icon">👑</span>
        <span className="title-bar-text">数学小王子</span>
      </div>
      <div className="title-bar-controls">
        <button className="title-btn minimize" onClick={handleMinimize} title="最小化">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="1" y="5.5" width="10" height="1" fill="currentColor" />
          </svg>
        </button>
        <button className="title-btn maximize" onClick={handleMaximize} title="最大化">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect
              x="1.5"
              y="1.5"
              width="9"
              height="9"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </button>
        <button className="title-btn close" onClick={handleClose} title="关闭">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
            <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
