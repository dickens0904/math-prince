// Jest setup - 静默 logger 输出
const noop = () => {};

beforeAll(() => {
  console.log = noop;
  console.warn = noop;
  console.debug = noop;
  console.info = noop;
});
