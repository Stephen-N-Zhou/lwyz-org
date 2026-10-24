"""Render matching Forbidden Bite picture and full menus from menu.json."""

from __future__ import annotations

import base64
import html
import json
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "forbidden_bite"
DATA = ASSETS / "menu.json"
ART = ASSETS / "menu-food-art.png"
SPLIT = 4


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def render_item(item: dict, full: bool) -> str:
    tags = "".join(f'<span class="tag">{esc(tag)}</span>' for tag in item.get("tags", []))
    compare_at = (
        f'<span class="compare-at">${item["compare_at"]}</span>'
        if item.get("compare_at") else ""
    )
    details = ""
    if full:
        details += f'<p class="description">{esc(item["description"])}</p>'
        if item.get("options"):
            details += f'<p class="options"><b>Options</b> · {esc(" / ".join(item["options"]))}</p>'
    return (
        '<li class="item">'
        f'<div class="item-line"><span class="item-name">{esc(item["name"])}</span>'
        f'<span class="price-group">{compare_at}<span class="price">${item["price"]}</span></span></div>'
        f'{details}{tags}</li>'
    )


def render_section(section: dict, full: bool) -> str:
    items = "".join(render_item(item, full) for item in section["items"])
    return (
        '<section class="category">'
        f'<div class="category-head"><h2>{esc(section["name"])}</h2>'
        f'<p>{esc(section["description"])}</p></div>'
        f'<ul>{items}</ul></section>'
    )


def build_document(data: dict, full: bool) -> str:
    sections = data["sections"]
    if len(sections) != 9:
        raise ValueError("Expected nine menu categories")
    names = [item["name"] for category in sections for item in category["items"]]
    if len(names) != len(set(names)):
        raise ValueError("Menu item names must be unique")
    left = "".join(render_section(section, full) for section in sections[:SPLIT])
    right = "".join(render_section(section, full) for section in sections[SPLIT:])
    art = base64.b64encode(ART.read_bytes()).decode("ascii")
    mode = "Full Menu · Descriptions & Choices" if full else "Picture Menu · Dishes & Prices"
    page = '''<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box}html,body{margin:0}body{width:1200px;margin:0 auto;padding:34px 42px 30px;background:#f5eddd;color:#28251f;font-family:Arial,Helvetica,sans-serif}
.frame{border:3px solid #b8923c;border-radius:24px;padding:24px 25px 22px;background:#f8f1e4;box-shadow:inset 0 0 0 5px #f8f1e4,inset 0 0 0 6px #dfd0a9}
header{text-align:center;padding:4px 8px 16px} .mark{width:42px;height:42px;border-radius:50%;margin:0 auto 8px;background:#0d5c4b;color:#f1d889;font:28px/42px Georgia,serif}h1{font:700 52px/1.08 Georgia,'Times New Roman',serif;color:#741e25;margin:0;letter-spacing:.03em}.tagline{font:italic 21px Georgia,serif;color:#173e35;margin:8px 0}.mode{font-size:15px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#0d5c4b;margin:12px 0 14px}.rule{height:2px;background:#b8923c;margin:0 0 14px}.art{display:block;width:100%;height:auto;max-height:660px;object-fit:contain;border:2px solid #b8923c;border-radius:16px;margin:0 auto 20px}
.columns{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}.column{display:flex;flex-direction:column;gap:15px}.category{background:#fffdf8;border:1px solid #dfd2b7;border-radius:14px;padding:16px 19px 15px;break-inside:avoid}.category-head{border-bottom:1.5px solid #d7bd79;padding:0 0 9px;margin:0 0 4px}.category h2{font:700 25px/1.15 Georgia,'Times New Roman',serif;color:#741e25;margin:0 0 4px}.category-head p{font:italic 15px/1.35 Georgia,serif;color:#686256;margin:0}.category ul{list-style:none;margin:0;padding:0}.item{padding:9px 0 8px;border-bottom:1px solid #eee6d8;break-inside:avoid}.item:last-child{border-bottom:0;padding-bottom:1px}.item-line{display:flex;align-items:baseline;justify-content:space-between;gap:12px}.item-name{font-size:20px;line-height:1.24;font-weight:700;color:#173e35}.price-group{display:flex;align-items:baseline;gap:8px;white-space:nowrap}.compare-at{font-size:15px;color:#8a8172;text-decoration:line-through}.price{flex:none;font-size:20px;line-height:1.2;font-weight:700;color:#173e35;font-variant-numeric:tabular-nums}.description{font-size:16px;line-height:1.4;color:#625d52;margin:4px 0 0}.options{font-size:13px;line-height:1.35;color:#795c28;font-style:italic;margin:4px 0 0}.options b{font-style:normal}.tag{display:inline-block;margin:5px 5px 0 0;padding:2px 7px;border-radius:99px;background:#e6efe8;color:#0d5c4b;font-size:12px;font-weight:700}.footer{text-align:center;color:#625d52;font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin:20px 0 0}
</style></head><body><div class="frame"><header><div class="mark">✦</div><h1>__TITLE__</h1><p class="tagline">__TAGLINE__</p><p class="mode">__MODE__</p><div class="rule"></div><img class="art" src="data:image/png;base64,__ART__" alt=""></header><main class="columns"><div class="column">__LEFT__</div><div class="column">__RIGHT__</div></main><footer class="footer">__NOTICE__</footer></div></body></html>'''
    replacements = {
        "__TITLE__": esc(data["title"]),
        "__TAGLINE__": esc(data["tagline"]),
        "__MODE__": esc(mode),
        "__ART__": art,
        "__LEFT__": left,
        "__RIGHT__": right,
        "__NOTICE__": esc(data["notice"]),
    }
    for token, value in replacements.items():
        page = page.replace(token, value)
    return page


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    versions = [(False, "menu.png"), (True, "menu2.png")]
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for full, filename in versions:
            page = browser.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
            page.set_content(build_document(data, full), wait_until="load")
            page.screenshot(path=str(ASSETS / filename), full_page=True, animations="disabled")
            page.close()
        browser.close()
    print(f"Rendered {sum(len(s['items']) for s in data['sections'])} matching menu items to menu.png and menu2.png")


if __name__ == "__main__":
    main()
