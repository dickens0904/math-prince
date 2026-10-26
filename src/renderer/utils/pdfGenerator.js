import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * 生成试卷HTML内容
 * @param {Object} exam 试卷数据
 * @returns {string} HTML字符串
 */
export function generateExamHTML(exam) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${exam.title}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: "Microsoft YaHei", "SimHei", "PingFang SC", sans-serif; 
      font-size: 14px; 
      line-height: 1.8; 
      color: #333;
      padding: 20px;
      background: white;
    }
    .exam-header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px double #333;
    }
    .exam-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      letter-spacing: 4px;
    }
    .exam-info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
      margin-top: 8px;
    }
    .student-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      padding: 12px 15px;
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .info-label {
      font-weight: bold;
      font-size: 14px;
    }
    .info-line {
      display: inline-block;
      width: 120px;
      border-bottom: 1px solid #333;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin: 20px 0 15px;
      padding: 6px 12px;
      background: #f0f0f0;
      border-left: 4px solid #333;
    }
    .questions {
      margin-top: 10px;
    }
    .question {
      margin-bottom: 18px;
      page-break-inside: avoid;
    }
    .question-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 8px;
    }
    .question-number {
      font-weight: bold;
      min-width: 28px;
      color: #333;
    }
    .question-content {
      flex: 1;
      font-size: 15px;
    }
    .question-type-tag {
      font-size: 11px;
      color: #888;
      background: #f0f0f0;
      padding: 2px 8px;
      border-radius: 10px;
      white-space: nowrap;
    }
    .options {
      margin-left: 36px;
      margin-top: 8px;
    }
    .option {
      margin-bottom: 6px;
      font-size: 14px;
    }
    .option-letter {
      font-weight: bold;
      margin-right: 4px;
    }
    .matching-box {
      margin-left: 36px;
      margin-top: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      background: #fafafa;
    }
    .matching-columns {
      display: flex;
      justify-content: space-between;
      gap: 30px;
    }
    .matching-col {
      flex: 1;
    }
    .matching-col-title {
      font-weight: bold;
      text-align: center;
      margin-bottom: 8px;
      font-size: 13px;
      color: #666;
    }
    .matching-item {
      padding: 6px 10px;
      margin-bottom: 6px;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 13px;
    }
    .answer-section {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 3px double #333;
    }
    .answer-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .answer-block {
      margin-bottom: 15px;
      padding: 12px;
      background: #f9f9f9;
      border-radius: 6px;
      border-left: 4px solid #4CAF50;
      page-break-inside: avoid;
    }
    .answer-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 8px;
    }
    .answer-number {
      font-weight: bold;
      min-width: 24px;
      color: #4CAF50;
    }
    .answer-question {
      flex: 1;
      font-size: 13px;
      color: #555;
    }
    .answer-result {
      font-weight: bold;
      color: #333;
      white-space: nowrap;
    }
    .solution {
      margin-top: 8px;
      padding: 10px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }
    .solution-title {
      font-weight: bold;
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .solution-content {
      font-size: 13px;
      color: #333;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 11px;
      color: #aaa;
      border-top: 1px solid #eee;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <div class="exam-header">
    <div class="exam-title">${exam.title}</div>
    <div class="exam-info">
      <span>年级：${exam.grade}年级</span>
      <span>总分：${exam.totalScore}分</span>
      <span>题目：${exam.questions.length}道</span>
    </div>
  </div>

  <div class="student-info">
    <div class="info-item">
      <span class="info-label">姓名：</span>
      <span class="info-line"></span>
    </div>
    <div class="info-item">
      <span class="info-label">班级：</span>
      <span class="info-line"></span>
    </div>
    <div class="info-item">
      <span class="info-label">日期：</span>
      <span class="info-line"></span>
    </div>
    <div class="info-item">
      <span class="info-label">得分：</span>
      <span class="info-line"></span>
    </div>
  </div>

  <div class="questions">
    ${exam.questions.map((q, i) => renderQuestion(q, i)).join('')}
  </div>

  <div class="answer-section">
    <div class="answer-title">参考答案与解题思路</div>
    ${exam.questions
      .map(
        (q, i) => `
      <div class="answer-block">
        <div class="answer-header">
          <span class="answer-number">${i + 1}.</span>
          <span class="answer-question">${q.content}</span>
          <span class="answer-result">答案：${q.questionType === 'matching' ? '见连线' : q.answer}</span>
        </div>
        ${
          q.solution
            ? `
          <div class="solution">
            <div class="solution-title">解题思路：</div>
            <div class="solution-content">${q.solution.replace(/\n/g, '<br>')}</div>
          </div>
        `
            : ''
        }
      </div>
    `
      )
      .join('')}
  </div>

  <div class="footer">
    数学小王子 - 智能出卷系统 | ${exam.createdAt}
  </div>
</body>
</html>`;
}

function renderQuestion(q, index) {
  if (q.questionType === 'matching') {
    return `
    <div class="question">
      <div class="question-header">
        <span class="question-number">${index + 1}.</span>
        <span class="question-content">${q.content}</span>
        <span class="question-type-tag">连线题</span>
      </div>
      <div class="matching-box">
        <div class="matching-columns">
          <div class="matching-col">
            <div class="matching-col-title">左列</div>
            ${q.leftItems.map(item => `<div class="matching-item">${item.content}</div>`).join('')}
          </div>
          <div class="matching-col">
            <div class="matching-col-title">右列</div>
            ${q.rightItems.map(item => `<div class="matching-item">${item.content}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  }

  if (q.questionType === 'choice') {
    return `
    <div class="question">
      <div class="question-header">
        <span class="question-number">${index + 1}.</span>
        <span class="question-content">${q.content}</span>
        <span class="question-type-tag">选择题</span>
      </div>
      <div class="options">
        ${q.options
          .map(
            (opt, j) => `
          <div class="option">
            <span class="option-letter">${String.fromCharCode(65 + j)}.</span>
            <span>${opt}</span>
          </div>
        `
          )
          .join('')}
      </div>
    </div>`;
  }

  // 填空题 / 文字题 / 应用题
  return `
    <div class="question">
      <div class="question-header">
        <span class="question-number">${index + 1}.</span>
        <span class="question-content">${q.content}</span>
        <span class="question-type-tag">${q.type || '填空题'}</span>
      </div>
    </div>`;
}

/**
 * 生成PDF文件并下载
 * @param {Object} exam 试卷数据
 * @returns {Promise<void>}
 */
export async function generatePDF(exam) {
  // 创建一个隐藏的容器来渲染HTML
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // A4宽度 (96dpi)
  container.style.background = 'white';
  container.style.padding = '40px';
  container.innerHTML = generateExamHTML(exam).match(/<body[^>]*>([\s\S]*)<\/body>/)[1];

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: "Microsoft YaHei", "SimHei", "PingFang SC", sans-serif; 
      font-size: 14px; 
      line-height: 1.8; 
      color: #333;
    }
    .exam-header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px double #333;
    }
    .exam-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      letter-spacing: 4px;
    }
    .exam-info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
      margin-top: 8px;
    }
    .student-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      padding: 12px 15px;
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
    }
    .info-item { display: flex; align-items: center; gap: 6px; }
    .info-label { font-weight: bold; font-size: 14px; }
    .info-line { display: inline-block; width: 120px; border-bottom: 1px solid #333; }
    .questions { margin-top: 10px; }
    .question { margin-bottom: 18px; }
    .question-header { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
    .question-number { font-weight: bold; min-width: 28px; color: #333; }
    .question-content { flex: 1; font-size: 15px; }
    .question-type-tag { font-size: 11px; color: #888; background: #f0f0f0; padding: 2px 8px; border-radius: 10px; white-space: nowrap; }
    .options { margin-left: 36px; margin-top: 8px; }
    .option { margin-bottom: 6px; font-size: 14px; }
    .option-letter { font-weight: bold; margin-right: 4px; }
    .matching-box { margin-left: 36px; margin-top: 10px; border: 1px solid #ddd; border-radius: 8px; padding: 12px; background: #fafafa; }
    .matching-columns { display: flex; justify-content: space-between; gap: 30px; }
    .matching-col { flex: 1; }
    .matching-col-title { font-weight: bold; text-align: center; margin-bottom: 8px; font-size: 13px; color: #666; }
    .matching-item { padding: 6px 10px; margin-bottom: 6px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 13px; }
    .answer-section { margin-top: 30px; padding-top: 15px; border-top: 3px double #333; }
    .answer-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
    .answer-block { margin-bottom: 15px; padding: 12px; background: #f9f9f9; border-radius: 6px; border-left: 4px solid #4CAF50; }
    .answer-header { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
    .answer-number { font-weight: bold; min-width: 24px; color: #4CAF50; }
    .answer-question { flex: 1; font-size: 13px; color: #555; }
    .answer-result { font-weight: bold; color: #333; white-space: nowrap; }
    .solution { margin-top: 8px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e0e0e0; }
    .solution-title { font-weight: bold; font-size: 12px; color: #666; margin-bottom: 5px; }
    .solution-content { font-size: 13px; color: #333; line-height: 1.6; }
    .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #aaa; border-top: 1px solid #eee; padding-top: 10px; }
  `;
  container.prepend(style);
  document.body.appendChild(container);

  try {
    // 使用html2canvas将HTML转为canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794,
    });

    // 创建PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth - 20; // 左右各留10mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // 上边距10mm

    // 添加第一页
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20; // 减去上下边距

    // 如果内容超过一页，添加更多页
    while (heightLeft > 0) {
      position = position - (pdfHeight - 20);
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    // 下载PDF
    pdf.save(`${exam.title}.pdf`);

    return true;
  } catch (error) {
    console.error('PDF生成失败:', error);
    throw error;
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * 使用浏览器打印功能
 * @param {Object} exam 试卷数据
 */
export function printExam(exam) {
  const htmlContent = generateExamHTML(exam);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.onload = function () {
    printWindow.print();
  };
}

/**
 * 下载HTML文件
 * @param {Object} exam 试卷数据
 */
export function downloadHTML(exam) {
  const htmlContent = generateExamHTML(exam);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${exam.title}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
