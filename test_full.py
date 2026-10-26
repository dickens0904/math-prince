"""
数学小王子 - 全面自动测试 + 实时日志监控 v2
"""
from playwright.sync_api import sync_playwright
import os, time

SCREENSHOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

BASE_URL = 'http://localhost:5173/'
PASS = 0
FAIL = 0
ERRORS = []
LOG_STATS = {'INFO': 0, 'WARN': 0, 'ERROR': 0, 'DEBUG': 0}
APP_LOGS = []

def test(name, fn):
    global PASS, FAIL
    try:
        result = fn()
        PASS += 1
        print(f"  [PASS] {name}")
        return result
    except Exception as e:
        FAIL += 1
        ERRORS.append((name, str(e)[:300]))
        print(f"  [FAIL] {name}: {str(e)[:200]}")
        return None

def shot(page, name):
    try:
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, f'{name}.png'))
    except:
        pass

def go_home(page):
    """强制回到首页 - 先尝试返回首页按钮，再尝试浏览器后退"""
    # 先找"返回首页"按钮（练习完成页）
    btn = page.locator('button:has-text("返回首页")')
    if btn.count() > 0:
        try:
            btn.first.click()
            page.wait_for_timeout(1000)
            if page.locator('.menu-card').count() > 0:
                return True
        except:
            pass
    # 找"← 返回"按钮
    btn = page.locator('button:has-text("← 返回")')
    if btn.count() > 0:
        try:
            btn.first.click()
            page.wait_for_timeout(1000)
            if page.locator('.menu-card').count() > 0:
                return True
        except:
            pass
    # 如果还没到首页，刷新并清空localStorage重新来
    page.evaluate("localStorage.clear()")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1500)
    # 重新注册
    _fast_register(page)
    return page.locator('.menu-card').count() > 0

def _fast_register(page):
    """快速注册用户"""
    nickname_input = page.locator('input.form-input, input[placeholder*="昵称"]')
    if nickname_input.count() > 0:
        nickname_input.first.fill('测试小王子')
        page.wait_for_timeout(200)
        next_btn = page.locator('button:has-text("下一步")')
        if next_btn.count() > 0:
            next_btn.first.click()
            page.wait_for_timeout(400)
    avatar_btns = page.locator('.avatar-btn')
    if avatar_btns.count() > 0:
        avatar_btns.first.click()
        page.wait_for_timeout(200)
    next_btn2 = page.locator('button:has-text("下一步")')
    if next_btn2.count() > 0:
        next_btn2.first.click()
        page.wait_for_timeout(400)
    grade_cards = page.locator('.grade-card')
    if grade_cards.count() > 0:
        grade_cards.nth(2).click()
        page.wait_for_timeout(200)
    start_btn = page.locator('button:has-text("开始学习")')
    if start_btn.count() > 0:
        start_btn.first.click()
        page.wait_for_timeout(1000)

def go_to_feature(page, keyword):
    cards = page.locator('.menu-card')
    for i in range(cards.count()):
        try:
            text = cards.nth(i).inner_text()
            if keyword in text:
                cards.nth(i).click()
                page.wait_for_timeout(1200)
                return True
        except:
            continue
    return False

def print_live_log(msg):
    if '📋' in msg: LOG_STATS['INFO'] += 1
    elif '⚠️' in msg: LOG_STATS['WARN'] += 1
    elif '❌' in msg: LOG_STATS['ERROR'] += 1
    elif '🔍' in msg: LOG_STATS['DEBUG'] += 1
    print(f"    [LOG] {msg[:180]}")

def get_logs_since(since_count):
    return APP_LOGS[since_count:]

with sync_playwright() as p:
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    browser = p.chromium.launch(headless=True, executable_path=edge_path)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()

    all_console = []
    page_errors = []

    def on_console(msg):
        text = msg.text
        all_console.append(f"[{msg.type}] {text}")
        if any(icon in text for icon in ['📋', '🔍', '⚠️', '❌']):
            APP_LOGS.append(text)
            print_live_log(text)

    def on_error(err):
        page_errors.append(str(err)[:200])
        print(f"    [PAGE_ERROR] {str(err)[:150]}")

    page.on('console', on_console)
    page.on('pageerror', on_error)

    print("=" * 70)
    print("  数学小王子 - 全面自动测试 + 实时日志监控 v2")
    print("=" * 70)
    print(f"  服务器: {BASE_URL}")
    print(f"  时间: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    # ==================== 1. 应用启动 ====================
    print("\n[Phase 1] 应用启动")
    log_start = len(APP_LOGS)
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    shot(page, '01_welcome')

    test("页面加载成功", lambda: page.title())
    root_len = test("React 渲染正常", lambda: page.evaluate("document.getElementById('root').innerHTML.length"))
    print(f"    Root HTML: {root_len} chars")
    page.wait_for_timeout(500)
    new_logs = get_logs_since(log_start)
    has_log = any('应用启动' in l for l in new_logs)
    print(f"    日志系统: {'正常' if has_log else '异常'}")

    # ==================== 2. 用户注册 ====================
    print("\n[Phase 2] 用户注册")
    log_count = len(APP_LOGS)

    def do_register():
        page.evaluate("localStorage.clear()")
        page.reload()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(1500)
        _fast_register(page)
        shot(page, '02_home')
        return page.locator('.menu-card').count()

    card_count = test("注册并进入首页", do_register)
    print(f"    首页菜单卡片: {card_count}")
    page.wait_for_timeout(500)
    for l in get_logs_since(log_count)[:5]:
        print_live_log(l)

    # ==================== 3. 日常练习 ====================
    print("\n[Phase 3] 日常练习")
    log_count = len(APP_LOGS)

    def test_practice():
        go_to_feature(page, '日常练习')
        shot(page, '03_practice')
        body = page.locator('body').inner_text()
        has_q = any(kw in body for kw in ['+', '-', '×', '÷', '?', '？', '填', '几', '○', '分数', '几分', '口诀', '角', '乘', '除', '加', '减'])
        assert has_q, f"题目未显示: {body[:150]}"
        answered = 0
        for _ in range(3):
            inp = page.locator('input.answer-input')
            if inp.count() > 0:
                try:
                    if inp.first.is_visible():
                        inp.first.fill('')
                        inp.first.fill('1')
                        page.wait_for_timeout(300)
                        sub = page.locator('button.submit-btn')
                        if sub.count() > 0 and sub.first.is_enabled():
                            sub.first.click()
                            page.wait_for_timeout(1500)
                            answered += 1
                            continue
                except:
                    pass
            opts = page.locator('.choice-option, .option-btn, [class*="option-item"]')
            if opts.count() > 0:
                try:
                    opts.first.click()
                    page.wait_for_timeout(1500)
                    answered += 1
                except:
                    pass
        shot(page, '03_practice_done')
        return answered

    ans = test("日常练习答题", test_practice)
    print(f"    完成答题: {ans}")
    page.wait_for_timeout(500)
    for l in get_logs_since(log_count)[:5]:
        print_live_log(l)
    go_home(page)

    # ==================== 4. 计时挑战 ====================
    print("\n[Phase 4] 计时挑战")

    def test_challenge():
        go_to_feature(page, '计时挑战')
        shot(page, '04_challenge')
        body = page.locator('body').inner_text()
        return '计时' in body or '挑战' in body or '分钟' in body

    r = test("计时挑战页面", test_challenge)
    print(f"    页面: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 5. 专项突破 ====================
    print("\n[Phase 5] 专项突破")
    log_count = len(APP_LOGS)

    def test_topic():
        go_to_feature(page, '专项突破')
        shot(page, '05_topic')
        body = page.locator('body').inner_text()
        return '第' in body or '章' in body or '上册' in body

    r = test("专项突破页面", test_topic)
    print(f"    章节: {'正常' if r else '异常'}")
    page.wait_for_timeout(500)
    for l in get_logs_since(log_count)[:3]:
        print_live_log(l)
    go_home(page)

    # ==================== 6. 单元自测 ====================
    print("\n[Phase 6] 单元自测")

    def test_exam():
        go_to_feature(page, '自动出卷')
        shot(page, '06_exam')
        topics = page.locator('.topic-chip')
        modes = page.locator('.mode-btn')
        body = page.locator('body').inner_text()
        ok = '自测' in body or '出卷' in body or '章节' in body or '自适应' in body
        assert ok, f"页面异常: {body[:150]}"
        return {'topics': topics.count(), 'modes': modes.count()}

    r = test("单元自测页面", test_exam)
    if r:
        print(f"    章节: {r['topics']}, 模式: {r['modes']}")
    go_home(page)

    # ==================== 7. 错题本 ====================
    print("\n[Phase 7] 错题本")

    def test_wrong():
        go_to_feature(page, '错题本')
        shot(page, '07_wrong')
        body = page.locator('body').inner_text()
        return '错题' in body or '暂无' in body or '记录' in body

    r = test("错题本页面", test_wrong)
    print(f"    内容: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 8. 学习报告 ====================
    print("\n[Phase 8] 学习报告")

    def test_report():
        go_to_feature(page, '学习报告')
        shot(page, '08_report')
        body = page.locator('body').inner_text()
        return '报告' in body or '学习' in body or '统计' in body or '记录' in body

    r = test("学习报告页面", test_report)
    print(f"    内容: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 9. 我的徽章 ====================
    print("\n[Phase 9] 我的徽章")

    def test_badge():
        go_to_feature(page, '徽章')
        shot(page, '09_badge')
        body = page.locator('body').inner_text()
        return '徽章' in body or '成就' in body or '解锁' in body or '获得' in body

    r = test("徽章页面", test_badge)
    print(f"    内容: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 10. 护眼机制 ====================
    print("\n[Phase 10] 护眼机制")

    def test_eye():
        bar = page.locator('.eye-progress-bar').count()
        shot(page, '10_eye')
        btn = page.locator('.eye-settings-btn')
        settings_ok = False
        if btn.count() > 0:
            btn.first.click()
            page.wait_for_timeout(500)
            shot(page, '10_eye_settings')
            settings_ok = page.locator('.eye-settings-modal').count() > 0
            close = page.locator('.eye-settings-cancel')
            if close.count() > 0:
                close.first.click()
                page.wait_for_timeout(300)
        return {'bar': bar, 'settings': settings_ok}

    r = test("护眼进度条和设置", test_eye)
    if r:
        print(f"    进度条: {'正常' if r['bar'] > 0 else '未找到'}, 设置: {'正常' if r['settings'] else '未打开'}")

    # ==================== 11. 日志面板 ====================
    print("\n[Phase 11] 日志面板")

    def test_log():
        toggle = page.locator('.log-toggle-btn')
        if toggle.count() > 0:
            toggle.first.click()
            page.wait_for_timeout(500)
            shot(page, '11_log')
            entries = page.locator('.log-entry').count()
            filters = page.locator('.log-filter-btn').count()
            close = page.locator('.log-close-btn')
            if close.count() > 0:
                close.first.click()
                page.wait_for_timeout(300)
            return {'entries': entries, 'filters': filters}
        return {'entries': 0, 'filters': 0}

    r = test("日志面板", test_log)
    if r:
        print(f"    日志: {r['entries']}条, 筛选: {r['filters']}个")

    # ==================== 12. 错误检查 ====================
    print("\n[Phase 12] 控制台错误检查")
    errors = [m for m in all_console if '[error]' in m.lower() or 'PAGE_ERROR' in m]
    warns = [m for m in all_console if '[warn]' in m.lower()]
    if errors:
        print(f"    错误: {len(errors)}")
        for e in errors[:5]:
            print(f"      {e[:200]}")
    else:
        print("    无错误")
    if warns:
        print(f"    警告: {len(warns)}")
    if page_errors:
        print(f"    页面错误: {len(page_errors)}")
        for e in page_errors[:5]:
            print(f"      {e[:200]}")

    # ==================== 13. 日志汇总 ====================
    print("\n[Phase 13] 应用日志汇总")
    print(f"    总日志: {len(APP_LOGS)}条")
    print(f"    INFO:{LOG_STATS['INFO']} WARN:{LOG_STATS['WARN']} ERROR:{LOG_STATS['ERROR']} DEBUG:{LOG_STATS['DEBUG']}")
    if APP_LOGS:
        print("\n    完整日志:")
        for l in APP_LOGS:
            print(f"      {l[:180]}")

    # ==================== 最终汇总 ====================
    print("\n" + "=" * 70)
    print(f"  测试结果: 通过 {PASS} / 失败 {FAIL} / 共 {PASS + FAIL}")
    print(f"  控制台错误: {len(errors)} | 警告: {len(warns)} | 页面错误: {len(page_errors)}")
    print(f"  应用日志: {len(APP_LOGS)}条")
    print("=" * 70)
    if ERRORS:
        print("\n失败详情:")
        for name, err in ERRORS:
            print(f"  - {name}: {err}")
    print(f"\n截图: {SCREENSHOT_DIR}")
    browser.close()
