describe('数学小王子 - 单元测试示例', () => {
  test('1 + 1 应该等于 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('字符串拼接', () => {
    const result = '数学' + '小王子';
    expect(result).toBe('数学小王子');
  });
});
