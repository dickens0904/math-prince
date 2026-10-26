import React, { useState, useEffect, useRef } from 'react';
import logger from '../utils/logger';
import './LogPanel.css';

export default function LogPanel() {
  const [logs, setLogs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const endRef = useRef(null);

  useEffect(() => {
    const unsub = logger.subscribe(entry => {
      if (entry === null) {
        setLogs([]);
        return;
      }
      setLogs(prev => [...prev.slice(-199), entry]);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(l => l.level === filter);

  const levelColors = { DEBUG: '#888', INFO: '#4CAF50', WARN: '#FF9800', ERROR: '#F44336' };

  if (!visible) {
    return (
      <button className="log-toggle-btn" onClick={() => setVisible(true)} title="打开日志面板">
        📋 {logs.length > 0 && <span className="log-badge">{logs.length}</span>}
      </button>
    );
  }

  return (
    <div className="log-panel">
      <div className="log-header">
        <span className="log-title">📋 运行日志</span>
        <div className="log-filters">
          {['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR'].map(f => (
            <button
              key={f}
              className={`log-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="log-clear-btn" onClick={() => logger.clear()}>
          清空
        </button>
        <button className="log-close-btn" onClick={() => setVisible(false)}>
          ×
        </button>
      </div>
      <div className="log-body">
        {filteredLogs.length === 0 && <div className="log-empty">暂无日志</div>}
        {filteredLogs.map((l, i) => (
          <div
            key={l.id || i}
            className="log-entry"
            style={{ borderLeftColor: levelColors[l.level] }}
          >
            <span className="log-time">{l.timestamp}</span>
            <span className="log-level" style={{ color: levelColors[l.level] }}>
              {l.level}
            </span>
            <span className="log-module">[{l.module}]</span>
            <span className="log-msg">{l.message}</span>
            {l.data && (
              <span className="log-data">
                {typeof l.data === 'string' ? l.data : JSON.stringify(l.data)}
              </span>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
