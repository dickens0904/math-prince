"""测试自动组卷 - 年级选择器功能"""
from playwright.sync_api import sync_playwright
import os, time

SCREENSHOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)
BASE_URL = 'http://localhost:5173/'

def shot(page, name):
    page.screenshot(path=os.path.join(SCREENSHOT_DIR, f'{name}.png'))

with sync_playwright() as p:
    edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    browser = p.chromium.launch(headless=True, executable_path=edge)
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    # 注册
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)
    page.evaluate("localStorage.clear()")
    page.reload()
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)

    # 快速注册
    inp = page.locator('input.form-input')
    inp.first.fill('测试员')
    page.locator('button:has-text("下一步")').first.click()
    page.wait_for_timeout(400)
    page.locator('.avatar-btn').first.click()
    page.wait_for_timeout(200)
    page.locator('button:has-text("下一步")').first.click()
    page.wait_for_timeout(400)
    page.locator('.grade-card').nth(2).click()
    page.wait_for_timeout(200)
    page.locator('button:has-text("开始学习")').first.click()
    page.wait_for_timeout(1500)

    # 进入自动出卷
    cards = page.locator('.menu-card')
    for i in range(cards.count()):
        if '自动出卷' in cards.nth(i).inner_text():
            cards.nth(i).click()
            break
    page.wait_for_timeout(1000)
    shot(page, 'exam_01_default')

    # 检查年级选择器
    grade_btns = page.locator('.grade-btn')
    print(f"年级按钮数: {grade_btns.count()}")
    for i in range(grade_btns.count()):
        print(f"  [{i}] {grade_btns.nth(i).inner_text()} - selected: {'selected' in (grade_btns.nth(i).get_attribute('class') or '')}")

    # 切换到5年级
    for i in range(grade_btns.count()):
        if '五年级' in grade_btns.nth(i).inner_text():
            grade_btns.nth(i).click()
            break
    page.wait_for_timeout(500)
    shot(page, 'exam_02_grade5')

    # 检查章节是否更新
    topics = page.locator('.topic-chip')
    print(f"\n5年级章节数: {topics.count()}")
    for i in range(min(5, topics.count())):
        print(f"  [{i}] {topics.nth(i).inner_text()}")

    # 选择前3个章节
    for i in range(min(3, topics.count())):
        topics.nth(i).click()
        page.wait_for_timeout(200)
    shot(page, 'exam_03_topics_selected')

    # 生成试卷
    gen_btn = page.locator('button:has-text("生成试卷")')
    if gen_btn.count() > 0:
        gen_btn.first.click()
        page.wait_for_timeout(2000)
    shot(page, 'exam_04_generated')

    # 检查试卷标题和年级
    body = page.locator('body').inner_text()
    print(f"\n试卷页面包含 '5年级': {'5年级' in body}")
    print(f"试卷页面包含 '五年级': {'五年级' in body}")

    # 切换回2年级
    back_btn = page.locator('button:has-text("重新配置")')
    if back_btn.count() > 0:
        back_btn.first.click()
        page.wait_for_timeout(500)
    grade_btns2 = page.locator('.grade-btn')
    for i in range(grade_btns2.count()):
        if '二年级' in grade_btns2.nth(i).inner_text():
            grade_btns2.nth(i).click()
            break
    page.wait_for_timeout(500)
    shot(page, 'exam_05_grade2')

    topics2 = page.locator('.topic-chip')
    print(f"\n2年级章节数: {topics2.count()}")

    print("\n=== 测试完成 ===")
    browser.close()
