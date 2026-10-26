"""
数学小王子 - 深度测试（之前未测过的操作）
测试：计时挑战答题、专项选择章节、出卷功能、自适应模式、选择题交互、错题记录、护眼设置等
"""
from playwright.sync_api import sync_playwright
import os, time

SCREENSHOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)
BASE_URL = 'http://localhost:5173/'
PASS = FAIL = 0
ERRORS = []

def test(name, fn):
    global PASS, FAIL
    try:
        r = fn(); PASS += 1; print(f"  [PASS] {name}"); return r
    except Exception as e:
        FAIL += 1; ERRORS.append((name, str(e)[:300]))
        print(f"  [FAIL] {name}: {str(e)[:200]}"); return None

def shot(page, name):
    try: page.screenshot(path=os.path.join(SCREENSHOT_DIR, f'{name}.png'))
    except: pass

def register(page):
    """快速注册"""
    page.evaluate("localStorage.clear()")
    page.reload(); page.wait_for_load_state('networkidle'); page.wait_for_timeout(1000)
    inp = page.locator('input.form-input, input[placeholder*="昵称"]')
    if inp.count() > 0:
        inp.first.fill('深度测试员')
        page.wait_for_timeout(200)
        btn = page.locator('button:has-text("下一步")')
        if btn.count() > 0: btn.first.click(); page.wait_for_timeout(400)
    av = page.locator('.avatar-btn')
    if av.count() > 2: av.nth(2).click(); page.wait_for_timeout(200)
    btn = page.locator('button:has-text("下一步")')
    if btn.count() > 0: btn.first.click(); page.wait_for_timeout(400)
    gc = page.locator('.grade-card')
    if gc.count() > 0: gc.nth(2).click(); page.wait_for_timeout(200)
    btn = page.locator('button:has-text("开始学习")')
    if btn.count() > 0: btn.first.click(); page.wait_for_timeout(1000)

def go_home(page):
    for _ in range(3):
        btn = page.locator('button:has-text("返回首页"), button:has-text("← 返回")')
        if btn.count() > 0:
            try:
                btn.first.click(); page.wait_for_timeout(800)
                if page.locator('.menu-card').count() > 0: return True
            except: pass
    page.evaluate("localStorage.clear()"); page.goto(BASE_URL)
    page.wait_for_load_state('networkidle'); page.wait_for_timeout(1000)
    register(page)
    return page.locator('.menu-card').count() > 0

def goto(page, keyword):
    cards = page.locator('.menu-card')
    for i in range(cards.count()):
        try:
            if keyword in cards.nth(i).inner_text():
                cards.nth(i).click(); page.wait_for_timeout(1200); return True
        except: continue
    return False

def answer_and_next(page, count=3, always_wrong=False):
    """回答指定数量的题目，返回成功回答数"""
    answered = 0
    for _ in range(count):
        # 选择题
        opts = page.locator('.choice-option, .option-btn, [class*="option-item"]')
        if opts.count() > 0:
            try:
                if not always_wrong:
                    opts.first.click()
                else:
                    opts.last.click()
                page.wait_for_timeout(1800)
                answered += 1; continue
            except: pass
        # 匹配题
        match_btns = page.locator('.match-item, .match-option')
        if match_btns.count() > 0:
            try:
                match_btns.first.click(); page.wait_for_timeout(500)
                submit = page.locator('button:has-text("提交"), button:has-text("确定匹配")')
                if submit.count() > 0: submit.first.click()
                page.wait_for_timeout(1800)
                answered += 1; continue
            except: pass
        # 填空题
        inp = page.locator('input.answer-input')
        if inp.count() > 0:
            try:
                if inp.first.is_visible():
                    inp.first.fill('')
                    inp.first.fill('999' if always_wrong else '1')
                    page.wait_for_timeout(300)  # 等待 React 更新状态
                    sub = page.locator('button.submit-btn')
                    if sub.count() > 0 and sub.first.is_enabled():
                        sub.first.click()
                        page.wait_for_timeout(1800)
                        answered += 1; continue
            except: pass
        page.wait_for_timeout(500)
    return answered


with sync_playwright() as p:
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    browser = p.chromium.launch(headless=True, executable_path=edge_path)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()

    console_errors = []
    page.on('pageerror', lambda err: console_errors.append(str(err)[:200]))

    print("=" * 70)
    print("  数学小王子 - 深度测试（新操作覆盖）")
    print("=" * 70)
    print(f"  时间: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    # ========== 0. 初始化 ==========
    print("\n[Init] 注册并进入首页")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)
    register(page)
    assert page.locator('.menu-card').count() > 0, "首页未加载"
    print(f"  首页菜单: {page.locator('.menu-card').count()} 个")

    # ========== 1. 选择不同头像 ==========
    print("\n[Phase 1] 欢迎页 - 选择不同头像和伙伴")
    def test_welcome_avatar():
        page.evaluate("localStorage.clear()")
        page.reload(); page.wait_for_load_state('networkidle'); page.wait_for_timeout(1000)
        # Step1 - 选不同头像
        avatars = page.locator('.avatar-btn')
        assert avatars.count() >= 8, f"头像选项不足: {avatars.count()}"
        avatars.nth(4).click(); page.wait_for_timeout(200)  # 选熊猫
        shot(page, 'deep_01_avatar_panda')
        # 填名字 + 下一步
        inp = page.locator('input.form-input'); inp.first.fill('熊猫宝宝')
        btn = page.locator('button:has-text("下一步")'); btn.first.click()
        page.wait_for_timeout(400)
        # Step2 - 选不同伙伴
        partners = page.locator('.avatar-btn')
        assert partners.count() >= 3, "伙伴选项不足"
        partners.nth(3).click(); page.wait_for_timeout(200)  # 选第4个伙伴
        shot(page, 'deep_01_partner')
        btn = page.locator('button:has-text("下一步")'); btn.first.click()
        page.wait_for_timeout(400)
        # Step3 - 选不同年级（5年级）
        grades = page.locator('.grade-card')
        assert grades.count() >= 5, "年级选项不足"
        grades.nth(4).click(); page.wait_for_timeout(200)  # 五年级
        shot(page, 'deep_01_grade5')
        btn = page.locator('button:has-text("开始学习")'); btn.first.click()
        page.wait_for_timeout(1500)
        shot(page, 'deep_01_home_g5')
        return page.locator('.menu-card').count()

    r = test("欢迎页 - 熊猫头像+5年级", test_welcome_avatar)
    print(f"    首页卡片: {r}")

    # 恢复为3年级用户
    register(page)

    # ========== 2. 日常练习 - 完整答题流程 ==========
    print("\n[Phase 2] 日常练习 - 完整答完全部题")
    def test_practice_full():
        goto(page, '日常练习')
        shot(page, 'deep_02_practice_start')
        # 检查练习页面是否加载（有进度条或题目卡片）
        has_practice = page.locator('.practice-header, .practice-page, .question-card, .question-content').count() > 0
        assert has_practice, f"练习页面未加载: {page.locator('body').inner_text()[:150]}"
        # 连续答5题（包含选择题和填空题）
        answered = answer_and_next(page, count=5)
        shot(page, 'deep_02_practice_done5')
        return answered

    r = test("日常练习 - 连续答5题", test_practice_full)
    print(f"    完成: {r} 题")

    # 检查用户经验是否增加
    exp = page.evaluate("JSON.parse(localStorage.getItem('math-prince-user') || '{}').exp || 0")
    print(f"    当前经验: {exp}")

    go_home(page)

    # ========== 3. 计时挑战 - 选择时间+开始+答题 ==========
    print("\n[Phase 3] 计时挑战 - 选择1分钟+开始挑战")
    def test_challenge_full():
        goto(page, '计时挑战')
        shot(page, 'deep_03_challenge_select')
        # 验证时间选择界面
        body = page.locator('body').inner_text()
        assert '分钟' in body, f"时间选择未显示: {body[:100]}"
        # 选择1分钟
        time_cards = page.locator('.time-card')
        if time_cards.count() > 0:
            time_cards.first.click(); page.wait_for_timeout(300)
        shot(page, 'deep_03_time_selected')
        # 点击开始挑战
        start = page.locator('button:has-text("开始挑战")')
        assert start.count() > 0, "开始挑战按钮未找到"
        start.first.click(); page.wait_for_timeout(4000)  # 等待3-2-1倒计时
        shot(page, 'deep_03_challenge_playing')
        # 验证进入答题界面
        body2 = page.locator('body').inner_text()
        has_timer = '0:' in body2 or '1:' in body2
        # 答2题
        answered = answer_and_next(page, count=2)
        shot(page, 'deep_03_challenge_answered')
        return {'timer': has_timer, 'answered': answered}

    r = test("计时挑战 - 1分钟+答题", test_challenge_full)
    if r: print(f"    计时器: {'正常' if r['timer'] else '异常'}, 答题: {r['answered']}")

    go_home(page)

    # ========== 4. 专项突破 - 选择章节+开始练习 ==========
    print("\n[Phase 4] 专项突破 - 选择章节+开始专项练习")
    def test_topic_practice():
        goto(page, '专项突破')
        shot(page, 'deep_04_topic_list')
        # 验证章节列表
        chapters = page.locator('.topic-card, button:has-text("第"), [class*="chapter"]')
        assert chapters.count() > 0, "章节列表为空"
        print(f"    章节数: {chapters.count()}")
        # 选择第一个章节
        chapters.first.click(); page.wait_for_timeout(300)
        shot(page, 'deep_04_topic_selected')
        # 点击开始练习
        start = page.locator('button:has-text("开始练习"), button:has-text("开始")')
        if start.count() > 0:
            start.first.click(); page.wait_for_timeout(1500)
        shot(page, 'deep_04_topic_practice')
        # 验证进入了练习页面
        body = page.locator('body').inner_text()
        has_question = any(kw in body for kw in ['+', '-', '×', '÷', '?', '？', '○'])
        # 答2题
        answered = answer_and_next(page, count=2)
        shot(page, 'deep_04_topic_answered')
        return {'has_question': has_question, 'answered': answered}

    r = test("专项突破 - 选择章节+练习", test_topic_practice)
    if r: print(f"    有题目: {r['has_question']}, 答题: {r['answered']}")

    go_home(page)

    # ========== 5. 自动出卷 - 选择章节+生成试卷 ==========
    print("\n[Phase 5] 自动出卷 - 选择章节+生成试卷")
    def test_exam_generate():
        goto(page, '自动出卷')
        shot(page, 'deep_05_exam_page')
        # 验证章节选择
        topics = page.locator('.topic-chip')
        assert topics.count() > 0, f"章节芯片为空"
        print(f"    可选章节: {topics.count()}")
        # 选择前3个章节
        for i in range(min(3, topics.count())):
            topics.nth(i).click(); page.wait_for_timeout(200)
        shot(page, 'deep_05_topics_selected')
        # 点击生成试卷
        gen_btn = page.locator('button:has-text("生成"), button:has-text("出卷"), button:has-text("开始")')
        if gen_btn.count() > 0:
            gen_btn.first.click(); page.wait_for_timeout(2000)
        shot(page, 'deep_05_exam_generated')
        # 验证试卷生成
        body = page.locator('body').inner_text()
        has_questions = any(kw in body for kw in ['第1题', '第 1 题', '1.', '1、', '题目', '答案'])
        return {'topics': topics.count(), 'generated': has_questions}

    r = test("自动出卷 - 选章节+生成", test_exam_generate)
    if r: print(f"    章节: {r['topics']}, 生成试卷: {'成功' if r['generated'] else '失败'}")

    go_home(page)

    # ========== 6. 自适应自测 ==========
    print("\n[Phase 6] 自适应自测模式")
    def test_adaptive():
        goto(page, '自动出卷')
        page.wait_for_timeout(500)
        # 切换到自适应模式
        mode_btn = page.locator('button:has-text("自适应"), .mode-btn')
        adaptive_found = False
        for i in range(mode_btn.count()):
            try:
                text = mode_btn.nth(i).inner_text()
                if '自适应' in text:
                    mode_btn.nth(i).click(); page.wait_for_timeout(500)
                    adaptive_found = True; break
            except: continue
        shot(page, 'deep_06_adaptive_mode')
        if adaptive_found:
            # 选择章节
            topics = page.locator('.topic-chip')
            if topics.count() > 0:
                topics.first.click(); page.wait_for_timeout(200)
            # 开始自适应测试
            start = page.locator('button:has-text("开始自测"), button:has-text("开始")')
            if start.count() > 0:
                start.first.click(); page.wait_for_timeout(1500)
            shot(page, 'deep_06_adaptive_started')
            # 答2题
            answered = answer_and_next(page, count=2)
            shot(page, 'deep_06_adaptive_answered')
            return {'found': True, 'answered': answered}
        return {'found': False, 'answered': 0}

    r = test("自适应自测模式", test_adaptive)
    if r: print(f"    自适应模式: {'找到' if r['found'] else '未找到'}, 答题: {r['answered']}")

    go_home(page)

    # ========== 7. 错题本 - 确认有错题记录 ==========
    print("\n[Phase 7] 错题本 - 检查错题记录")
    def test_wrong_book():
        # 先做几道题故意答错
        goto(page, '日常练习')
        answer_and_next(page, count=3, always_wrong=True)
        go_home(page)
        # 进入错题本
        goto(page, '错题本')
        shot(page, 'deep_07_wrong_book')
        body = page.locator('body').inner_text()
        has_wrong = '错题' in body or '暂无' in body
        # 检查是否有错题卡片
        wrong_cards = page.locator('.wrong-card, .wrong-question, [class*="wrong"]')
        return {'has_page': has_wrong, 'cards': wrong_cards.count()}

    r = test("错题本 - 检查记录", test_wrong_book)
    if r: print(f"    错题本: {'正常' if r['has_page'] else '异常'}, 错题卡片: {r['cards']}")

    go_home(page)

    # ========== 8. 学习报告 - 检查统计数据 ==========
    print("\n[Phase 8] 学习报告 - 检查练习数据")
    def test_report_data():
        goto(page, '学习报告')
        shot(page, 'deep_08_report')
        body = page.locator('body').inner_text()
        has_data = '报告' in body or '学习' in body or '练习' in body or '统计' in body
        # 检查图表或数据
        charts = page.locator('.chart, .report-card, .stat-card, canvas, svg')
        return {'has_data': has_data, 'charts': charts.count()}

    r = test("学习报告 - 练习数据", test_report_data)
    if r: print(f"    报告: {'正常' if r['has_data'] else '异常'}, 图表/卡片: {r['charts']}")

    go_home(page)

    # ========== 9. 我的徽章 - 检查徽章网格 ==========
    print("\n[Phase 9] 我的徽章 - 检查徽章网格")
    def test_badge_grid():
        goto(page, '徽章')
        shot(page, 'deep_09_badge_grid')
        body = page.locator('body').inner_text()
        has_badge = '徽章' in body
        badges = page.locator('.badge-card, .badge-item, [class*="badge"]')
        return {'has_page': has_badge, 'badges': badges.count()}

    r = test("我的徽章 - 徽章网格", test_badge_grid)
    if r: print(f"    徽章页: {'正常' if r['has_page'] else '异常'}, 徽章元素: {r['badges']}")

    go_home(page)

    # ========== 10. 护眼设置 - 修改设置 ==========
    print("\n[Phase 10] 护眼设置 - 修改学习时长")
    def test_eye_settings():
        btn = page.locator('.eye-settings-btn')
        assert btn.count() > 0, "护眼设置按钮未找到"
        btn.first.click(); page.wait_for_timeout(500)
        shot(page, 'deep_10_eye_settings_open')
        # 检查设置弹窗
        modal = page.locator('.eye-settings-modal, .eye-modal, [class*="settings-modal"]')
        assert modal.count() > 0, "设置弹窗未打开"
        # 找到输入框或滑块
        inputs = page.locator('.eye-settings-modal input, .eye-modal input')
        sliders = page.locator('.eye-settings-modal input[type="range"], .slider')
        print(f"    输入框: {inputs.count()}, 滑块: {sliders.count()}")
        shot(page, 'deep_10_eye_settings_detail')
        # 关闭
        close = page.locator('.eye-settings-cancel, button:has-text("取消")')
        if close.count() > 0: close.first.click(); page.wait_for_timeout(300)
        return True

    r = test("护眼设置 - 打开+检查", test_eye_settings)
    print(f"    设置弹窗: {'正常' if r else '异常'}")

    # ========== 11. 日志面板 - 检查完整日志 ==========
    print("\n[Phase 11] 日志面板 - 检查累积日志")
    def test_log_panel():
        toggle = page.locator('.log-toggle-btn')
        assert toggle.count() > 0, "日志按钮未找到"
        toggle.first.click(); page.wait_for_timeout(500)
        shot(page, 'deep_11_log_panel_open')
        entries = page.locator('.log-entry')
        count = entries.count()
        # 检查筛选按钮
        filters = page.locator('.log-filter-btn')
        filter_count = filters.count()
        # 点击 INFO 筛选
        for i in range(filters.count()):
            try:
                if 'INFO' in filters.nth(i).inner_text():
                    filters.nth(i).click(); page.wait_for_timeout(300)
                    break
            except: continue
        filtered = page.locator('.log-entry').count()
        shot(page, 'deep_11_log_filtered')
        # 恢复全部
        for i in range(filters.count()):
            try:
                if 'ALL' in filters.nth(i).inner_text():
                    filters.nth(i).click(); page.wait_for_timeout(300)
                    break
            except: continue
        # 关闭
        close = page.locator('.log-close-btn')
        if close.count() > 0: close.first.click(); page.wait_for_timeout(300)
        return {'total': count, 'filters': filter_count, 'filtered': filtered}

    r = test("日志面板 - 累积日志+筛选", test_log_panel)
    if r: print(f"    日志: {r['total']}条, 筛选: {r['filters']}个, INFO筛选后: {r['filtered']}条")

    # ========== 12. 用户信息 - 检查经验变化 ==========
    print("\n[Phase 12] 用户信息 - 检查经验和等级")
    def test_user_info():
        user_data = page.evaluate("JSON.parse(localStorage.getItem('math-prince-user') || '{}')")
        exp = user_data.get('exp', 0)
        nickname = user_data.get('nickname', '')
        grade = user_data.get('grade', 0)
        # 验证首页显示
        level_badge = page.locator('.level-badge')
        level_text = level_badge.inner_text() if level_badge.count() > 0 else 'N/A'
        exp_display = page.locator('.level-exp')
        exp_text = exp_display.inner_text() if exp_display.count() > 0 else 'N/A'
        shot(page, 'deep_12_user_info')
        return {'exp': exp, 'nickname': nickname, 'grade': grade, 'level': level_text, 'exp_display': exp_text}

    r = test("用户信息 - 经验和等级", test_user_info)
    if r: print(f"    用户: {r['nickname']}, 年级: {r['grade']}, 经验: {r['exp']}, 等级: {r['level']}")

    # ========== 13. 控制台错误检查 ==========
    print("\n[Phase 13] 控制台错误检查")
    if console_errors:
        print(f"    页面错误: {len(console_errors)}")
        for e in console_errors[:5]: print(f"      {e[:200]}")
    else:
        print("    无页面错误")

    # ========== 汇总 ==========
    print("\n" + "=" * 70)
    print(f"  深度测试结果: 通过 {PASS} / 失败 {FAIL} / 共 {PASS + FAIL}")
    print(f"  页面错误: {len(console_errors)}")
    print("=" * 70)
    if ERRORS:
        print("\n失败详情:")
        for name, err in ERRORS: print(f"  - {name}: {err}")
    print(f"\n截图: {SCREENSHOT_DIR}")
    browser.close()
