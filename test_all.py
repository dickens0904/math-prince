"""
数学小王子 - 全面自动测试脚本 v3
使用 Playwright + 系统 Edge 浏览器
"""
from playwright.sync_api import sync_playwright
import os

SCREENSHOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

PASS = 0
FAIL = 0
ERRORS = []

def test(name, fn):
    global PASS, FAIL
    try:
        result = fn()
        PASS += 1
        print(f"  [PASS] {name}")
        return result
    except Exception as e:
        FAIL += 1
        ERRORS.append((name, str(e)[:200]))
        print(f"  [FAIL] {name}: {str(e)[:150]}")
        return None

def shot(page, name):
    try:
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, f'{name}.png'))
    except:
        pass

def go_home(page):
    back = page.locator('button:has-text("返回首页"), button:has-text("← 返回")')
    if back.count() > 0:
        try:
            back.first.click()
            page.wait_for_timeout(800)
        except:
            pass

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

with sync_playwright() as p:
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    browser = p.chromium.launch(headless=True, executable_path=edge_path)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()

    console_msgs = []
    page.on('console', lambda msg: console_msgs.append(f"[{msg.type}] {msg.text}"))

    print("=" * 60)
    print("  数学小王子 - 全面自动测试")
    print("=" * 60)

    # ==================== 1. 首页加载 ====================
    print("\n[Phase 1] 应用启动")
    page.goto('http://localhost:3467/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1500)
    shot(page, '01_welcome')
    test("应用加载成功", lambda: page.title())
    print(f"    页面标题: {page.title()}")

    # ==================== 2. 注册用户 (3步向导) ====================
    print("\n[Phase 2] 用户注册")

    def do_register():
        page.evaluate("localStorage.clear()")
        page.reload()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(1000)

        # Step 1: 输入昵称
        nickname_input = page.locator('input.form-input, input[placeholder*="昵称"]')
        assert nickname_input.count() > 0, "昵称输入框未找到"
        nickname_input.first.fill('测试小王子')
        page.wait_for_timeout(300)

        # 点击下一步
        next_btn = page.locator('button:has-text("下一步")')
        assert next_btn.count() > 0, "下一步按钮未找到"
        next_btn.first.click()
        page.wait_for_timeout(500)

        # Step 2: 选择学习伙伴
        avatar_btns = page.locator('.avatar-btn')
        assert avatar_btns.count() > 0, "学习伙伴选项未找到"
        avatar_btns.first.click()
        page.wait_for_timeout(300)

        # 再点下一步
        next_btn2 = page.locator('button:has-text("下一步")')
        if next_btn2.count() > 0:
            next_btn2.first.click()
            page.wait_for_timeout(500)

        # Step 3: 选择年级
        grade_cards = page.locator('.grade-card')
        if grade_cards.count() > 0:
            grade_cards.nth(2).click()  # 三年级
            page.wait_for_timeout(300)

        # 点击开始学习
        start_btn = page.locator('button:has-text("开始学习")')
        if start_btn.count() > 0:
            start_btn.first.click()
            page.wait_for_timeout(1500)

        shot(page, '02_home')
        menu_cards = page.locator('.menu-card')
        return menu_cards.count()

    card_count = test("注册并进入首页", do_register)
    print(f"    首页菜单卡片数: {card_count if card_count else 'N/A'}")

    # ==================== 3. 日常练习 ====================
    print("\n[Phase 3] 日常练习")

    def test_practice():
        go_to_feature(page, '日常练习')
        shot(page, '03_practice')

        body = page.locator('body').inner_text()
        has_question = any(kw in body for kw in ['+', '-', '×', '÷', '?', '？', '填', '几'])
        assert has_question, f"题目未显示: {body[:200]}"

        answered = 0
        for _ in range(3):
            inp = page.locator('input.answer-input, form input[type="text"]')
            if inp.count() > 0:
                try:
                    if inp.first.is_visible():
                        inp.first.fill('1')
                        submit = page.locator('button.submit-btn, button:has-text("确定")')
                        if submit.count() > 0:
                            submit.first.click()
                            page.wait_for_timeout(1500)
                            answered += 1
                            continue
                except:
                    pass

            options = page.locator('.choice-option, .option-btn, [class*="option-item"]')
            if options.count() > 0:
                try:
                    options.first.click()
                    page.wait_for_timeout(1500)
                    answered += 1
                except:
                    pass

        shot(page, '03_practice_done')
        return answered

    ans = test("日常练习答题", test_practice)
    print(f"    完成答题数: {ans if ans else 0}")
    go_home(page)

    # ==================== 4. 计时挑战 ====================
    print("\n[Phase 4] 计时挑战")

    def test_challenge():
        go_to_feature(page, '计时挑战')
        shot(page, '04_challenge')
        body = page.locator('body').inner_text()
        has_content = '计时' in body or '挑战' in body or '分钟' in body
        return has_content

    r = test("计时挑战页面", test_challenge)
    print(f"    页面加载: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 5. 专项突破 ====================
    print("\n[Phase 5] 专项突破")

    def test_topic():
        go_to_feature(page, '专项突破')
        shot(page, '05_topic')
        body = page.locator('body').inner_text()
        has_chapters = '第' in body or '章' in body or '上册' in body
        return has_chapters

    r = test("专项突破页面", test_topic)
    print(f"    章节列表: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 6. 单元自测 ====================
    print("\n[Phase 6] 单元自测")

    def test_exam():
        go_to_feature(page, '自动出卷')
        shot(page, '06_exam')
        topics = page.locator('.topic-chip')
        mode_btns = page.locator('.mode-btn')
        return {'topics': topics.count(), 'modes': mode_btns.count()}

    r = test("单元自测页面", test_exam)
    if r:
        print(f"    可选章节数: {r.get('topics', 0)}, 模式数: {r.get('modes', 0)}")
    go_home(page)

    # ==================== 7. 错题本 ====================
    print("\n[Phase 7] 错题本")

    def test_wrong():
        go_to_feature(page, '错题本')
        shot(page, '07_wrong')
        body = page.locator('body').inner_text()
        has_content = '错题' in body or '暂无' in body or '记录' in body
        return has_content

    r = test("错题本页面", test_wrong)
    print(f"    页面内容: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 8. 学习报告 ====================
    print("\n[Phase 8] 学习报告")

    def test_report():
        go_to_feature(page, '学习报告')
        shot(page, '08_report')
        body = page.locator('body').inner_text()
        has_content = '报告' in body or '学习' in body or '统计' in body
        return has_content

    r = test("学习报告页面", test_report)
    print(f"    页面内容: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 9. 我的徽章 ====================
    print("\n[Phase 9] 我的徽章")

    def test_badge():
        go_to_feature(page, '徽章')
        shot(page, '09_badge')
        body = page.locator('body').inner_text()
        has_content = '徽章' in body or '成就' in body or '解锁' in body
        return has_content

    r = test("徽章页面", test_badge)
    print(f"    页面内容: {'正常' if r else '异常'}")
    go_home(page)

    # ==================== 10. 护眼机制 ====================
    print("\n[Phase 10] 护眼机制")

    def test_eye():
        eye_bar = page.locator('.eye-progress-bar')
        count = eye_bar.count()
        shot(page, '10_eye')
        settings_btn = page.locator('.eye-settings-btn')
        if settings_btn.count() > 0:
            settings_btn.first.click()
            page.wait_for_timeout(500)
            shot(page, '10_eye_settings')
            close = page.locator('.eye-settings-cancel, button:has-text("取消")')
            if close.count() > 0:
                close.first.click()
                page.wait_for_timeout(300)
        return count

    r = test("护眼进度条", test_eye)
    print(f"    进度条显示: {'正常' if r and r > 0 else '未找到'}")

    # ==================== 11. 日志面板 ====================
    print("\n[Phase 11] 日志面板")

    def test_log():
        toggle = page.locator('.log-toggle-btn')
        if toggle.count() > 0:
            toggle.first.click()
            page.wait_for_timeout(500)
            shot(page, '11_log')
            entries = page.locator('.log-entry')
            count = entries.count()
            close = page.locator('.log-close-btn')
            if close.count() > 0:
                close.first.click()
                page.wait_for_timeout(300)
            return count
        return 0

    r = test("日志面板", test_log)
    print(f"    日志条目数: {r if r else 0}")

    # ==================== 12. 控制台错误检查 ====================
    print("\n[Phase 12] 控制台错误检查")

    error_msgs = [m for m in console_msgs if '[error]' in m.lower() or 'PAGE_ERROR' in m]
    if error_msgs:
        print(f"    发现 {len(error_msgs)} 条错误:")
        for msg in error_msgs[:5]:
            print(f"      - {msg[:150]}")
    else:
        print("    无控制台错误")

    app_logs = [m for m in console_msgs if any(icon in m for icon in ['📋', '🔍', '⚠️', '❌'])]
    if app_logs:
        print(f"\n    应用日志 ({len(app_logs)} 条):")
        for log in app_logs[:15]:
            print(f"      {log[:150]}")

    # ==================== 汇总 ====================
    print("\n" + "=" * 60)
    print(f"  测试结果: 通过 {PASS} / 失败 {FAIL} / 共 {PASS + FAIL}")
    print("=" * 60)

    if ERRORS:
        print("\n失败详情:")
        for name, err in ERRORS:
            print(f"  - {name}: {err}")

    print(f"\n截图保存在: {SCREENSHOT_DIR}")
    browser.close()
