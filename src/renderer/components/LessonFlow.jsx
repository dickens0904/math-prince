import React, { useState } from 'react';
import ConceptSection from './ConceptSection.jsx';
import ExampleSection from './ExampleSection.jsx';
import PracticeSection from './PracticeSection.jsx';
import AssessmentSection from './AssessmentSection.jsx';

// 四段式编排：概念 → 例题 → 练习 → 测评
const SECTIONS = ['concept', 'example', 'practice', 'assessment'];
const SECTION_LABELS = {
  concept: '概念',
  example: '例题',
  practice: '练习',
  assessment: '测评',
};

export default function LessonFlow({ lesson, onBack, onComplete }) {
  const [section, setSection] = useState(0);
  const [practiceResults, setPracticeResults] = useState([]);

  const currentSection = SECTIONS[section];
  const progress = ((section) / (SECTIONS.length - 1)) * 100;

  const handleNext = (results) => {
    if (currentSection === 'practice' && results) {
      setPracticeResults(results);
    }
    setSection(section + 1);
  };

  const handleComplete = (results, wrongQuestions) => {
    if (onComplete) onComplete(results, wrongQuestions);
  };

  return (
    <div style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      {/* 进度条 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: '#f5f5f5',
        borderRadius: '25px',
        margin: '0 auto 20px',
        maxWidth: '500px',
      }}>
        {SECTIONS.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              background: i <= section ? '#FF6B6B' : '#e0e0e0',
              color: i <= section ? '#fff' : '#999',
            }}>
              {i + 1}
            </div>
            <span style={{
              fontSize: '13px',
              color: i <= section ? '#FF6B6B' : '#999',
            }}>{SECTION_LABELS[s]}</span>
            {i < SECTIONS.length - 1 && <span style={{ color: '#ccc' }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* 当前段内容 */}
      <div style={{ flex: 1 }}>
        {currentSection === 'concept' && (
          <ConceptSection lesson={lesson} onNext={() => handleNext()} />
        )}
        {currentSection === 'example' && (
          <ExampleSection lesson={lesson} onNext={() => handleNext()} />
        )}
        {currentSection === 'practice' && (
          <PracticeSection lesson={lesson} onNext={handleNext} />
        )}
        {currentSection === 'assessment' && (
          <AssessmentSection
            lesson={lesson}
            onComplete={handleComplete}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
}
