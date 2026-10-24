"""Build matching, typo-free Forbidden Bite menu posters from menu.json."""

from __future__ import annotations

import html
import json
import textwrap
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "assets" / "forbidden_bite" / "menu.json"
OUT = ROOT / "assets" / "forbidden_bite"
WIDTH = 1080
MARGIN = 42
GAP = 24
CARD_W = (WIDTH - MARGIN * 2 - GAP) // 2
COLS = ([0, 2, 4, 6, 8], [1, 3, 5, 7])


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def wrap(value: str, width: int) -> list[str]:
    return textwrap.wrap(value, width=width, break_long_words=False) or [""]


def card_svg(section: dict, x: int, y: int, full: bool) -> tuple[str, int]:
    items = section["items"]
    cursor = y + 68
    fragments = [
        f'<rect x="{x}" y="{y}" width="{CARD_W}" height="{{HEIGHT}}" rx="20" fill="#fffdf8" stroke="#dfd2b7" stroke-width="2"/>',
        f'<path d="M{x+20} {y+60} H{x+CARD_W-20}" stroke="#d7bd79" stroke-width="2"/>',
        f'<circle cx="{x+32}" cy="{y+33}" r="14" fill="#0d5c4b"/>',
        f'<text x="{x+32}" y="{y+39}" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#fff">{esc(section["name"][0])}</text>',
        f'<text x="{x+58}" y="{y+42}" font-family="Georgia,serif" font-size="26" font-weight="700" fill="#741e25">{esc(section["name"])}</text>',
    ]
    for item in items:
        name_lines = wrap(item["name"], 37)
        desc_lines = wrap(item["description"], 48) if full else []
        line_start = cursor
        for index, line in enumerate(name_lines):
            fragments.append(
                f'<text x="{x+24}" y="{cursor+21*index}" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="#173e35">{esc(line)}</text>'
            )
        cursor += len(name_lines) * 23
        for index, line in enumerate(desc_lines):
            fragments.append(
                f'<text x="{x+24}" y="{cursor+18*index}" font-family="Arial,sans-serif" font-size="15" fill="#625d52">{esc(line)}</text>'
            )
        cursor += len(desc_lines) * 18
        cursor += 10
        if item is not items[-1]:
            fragments.append(f'<path d="M{x+24} {cursor-4} H{x+CARD_W-24}" stroke="#eee6d8" stroke-width="1"/>')
        if cursor <= line_start:
            raise ValueError("Menu card did not advance")
    height = cursor - y + 16
    fragments[0] = fragments[0].replace("{HEIGHT}", str(height))
    return "\n".join(fragments), height


def build(data: dict, filename: str, full: bool) -> None:
    column_y = [236, 236]
    cards: list[str] = []
    for col, section_ids in enumerate(COLS):
        x = MARGIN + col * (CARD_W + GAP)
        for section_id in section_ids:
            if section_id >= len(data["sections"]):
                continue
            card, height = card_svg(data["sections"][section_id], x, column_y[col], full)
            cards.append(card)
            column_y[col] += height + 18
    canvas_h = max(column_y) + 90
    subtitle = "FULL MENU · ITEM NAMES & DESCRIPTIONS" if full else "PICTURE MENU · THE SAME DISHES AS THE FULL MENU"
    disclaimer = "A FICTIONAL FOOD & DESIGN CONCEPT · MENU ITEMS ARE ILLUSTRATIVE"
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{canvas_h}" viewBox="0 0 {WIDTH} {canvas_h}">
<rect width="100%" height="100%" fill="#f5eddd"/>
<rect x="18" y="18" width="{WIDTH-36}" height="{canvas_h-36}" rx="28" fill="none" stroke="#b8923c" stroke-width="4"/>
<rect x="27" y="27" width="{WIDTH-54}" height="{canvas_h-54}" rx="22" fill="none" stroke="#d9c58f" stroke-width="1.5"/>
<circle cx="{WIDTH//2}" cy="67" r="25" fill="#0d5c4b"/>
<path d="M{WIDTH//2-12} 68 q12 -19 24 0 q-12 19 -24 0" fill="none" stroke="#f1d889" stroke-width="3"/>
<text x="{WIDTH//2}" y="133" text-anchor="middle" font-family="Georgia,serif" font-size="48" font-weight="700" letter-spacing="2" fill="#741e25">{esc(data['title'])}</text>
<text x="{WIDTH//2}" y="173" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="#0d5c4b">{esc(subtitle)}</text>
<path d="M{MARGIN} 198 H{WIDTH-MARGIN}" stroke="#b8923c" stroke-width="2"/>
{''.join(cards)}
<text x="{WIDTH//2}" y="{canvas_h-43}" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" letter-spacing="1.3" fill="#625d52">{esc(disclaimer)}</text>
</svg>'''
    (OUT / filename).write_text(svg, encoding="utf-8")


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    build(data, "menu-picture.svg", full=False)
    build(data, "menu-full.svg", full=True)
    print("Built matching picture and full menus from menu.json")


if __name__ == "__main__":
    main()
