"""Generate the site-wide circuit-board backgrounds (public/tech-lines/*.svg).

Realistic PCB look: parallel data buses that bend at 45 degrees, chips with
pins, vias and pads, and glowing data packets that travel along the traces.
Orange art for light surfaces, white art for dark ones; animated and still
(reduced motion) versions of each. Deterministic (fixed seed).

    python3 scripts/gen-tech-lines.py
"""
import math
import random

W, H = 1200, 600
rnd = random.Random(20261119)


def offset_polyline(pts, d):
    """Offset a polyline by d (left normal), mitred joins (45/90 deg bends)."""
    out = []
    n = len(pts)
    for i in range(n):
        if i == 0:
            (x0, y0), (x1, y1) = pts[0], pts[1]
            nx, ny = _normal(x0, y0, x1, y1)
            out.append((x0 + nx * d, y0 + ny * d))
        elif i == n - 1:
            (x0, y0), (x1, y1) = pts[-2], pts[-1]
            nx, ny = _normal(x0, y0, x1, y1)
            out.append((x1 + nx * d, y1 + ny * d))
        else:
            a, b, c = pts[i - 1], pts[i], pts[i + 1]
            n1 = _normal(*a, *b)
            n2 = _normal(*b, *c)
            mx, my = n1[0] + n2[0], n1[1] + n2[1]
            ml = math.hypot(mx, my) or 1
            mx, my = mx / ml, my / ml
            cos = mx * n1[0] + my * n1[1]
            k = d / (cos or 1)
            out.append((b[0] + mx * k, b[1] + my * k))
    return out


def _normal(x0, y0, x1, y1):
    dx, dy = x1 - x0, y1 - y0
    l = math.hypot(dx, dy) or 1
    return (-dy / l, dx / l)


def path_d(pts):
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts)


def route(x, y, direction, length):
    """A centreline that runs, jogs at 45 degrees, and runs again."""
    pts = [(x, y)]
    remaining = length
    while remaining > 0:
        run = rnd.choice([60, 90, 120, 160, 200])
        x += direction * run
        pts.append((x, y))
        remaining -= run
        if remaining <= 0:
            break
        jog = rnd.choice([-1, 1]) * rnd.choice([30, 45, 60, 90])
        if not (40 < y + jog < H - 40):
            jog = -jog
        x += direction * abs(jog)
        y += jog
        pts.append((x, y))
        remaining -= abs(jog)
    return pts


# Chips: (x, y, w, h). Kept towards the edges; text sits in the middle.
chips = [(70, 120, 92, 64), (1010, 90, 104, 70), (120, 430, 80, 56), (960, 410, 96, 68), (560, 520, 84, 48)]

traces, pins, vias, pads = [], [], [], []

for (cx, cy, cw, ch) in chips:
    for side in (-1, 1):  # left and right pin rows
        count = max(3, int(ch // 12))
        sx = cx if side == -1 else cx + cw
        ys = [cy + 10 + i * ((ch - 20) / (count - 1)) for i in range(count)]
        for py in ys:
            pins.append((sx, py, sx + side * 7, py))
        # a bus leaves from the middle pins
        mid = len(ys) // 2
        bus = ys[max(0, mid - 2): mid + 2]
        centre = sum(bus) / len(bus)
        length = rnd.choice([260, 340, 420, 520])
        centreline = route(sx + side * 7, centre, side, length)
        for py in bus:
            off = (py - centre) * (1 if side == 1 else -1)
            pts = offset_polyline(centreline, off)
            pts[0] = (sx + side * 7, py)
            traces.append(pts)
            vias.append(pts[-1])
    # pads on top and bottom edges
    for i in range(int(cw // 14)):
        px = cx + 9 + i * 14
        pads.append((px, cy - 6))
        pads.append((px, cy + ch + 6))

# Free-running buses that cross the canvas between the chips
for _ in range(6):
    y = rnd.choice([40, 70, 200, 250, 330, 360, 480, 560])
    side = rnd.choice([-1, 1])
    x = -20 if side == 1 else W + 20
    centreline = route(x, y, side, rnd.choice([420, 560, 700]))
    lanes = rnd.choice([2, 3, 4])
    for k in range(lanes):
        pts = offset_polyline(centreline, (k - (lanes - 1) / 2) * 8)
        traces.append(pts)
        vias.append(pts[-1])

# Stray via fields (the dotted grid you see on real boards)
via_field = [(x, y) for x in range(330, 900, 26) for y in (30, 572) if rnd.random() < 0.35]

TONES = {
    #          trace                    packet                  via/chip line            chip fill                 glow
    "orange": ("rgba(244,81,30,0.24)", "rgba(244,81,30,0.95)", "rgba(244,81,30,0.42)", "rgba(244,81,30,0.06)", "rgba(244,81,30,0.22)"),
    "white": ("rgba(255,255,255,0.2)", "rgba(255,255,255,0.95)", "rgba(255,255,255,0.34)", "rgba(255,255,255,0.05)", "rgba(255,255,255,0.20)"),
}


def svg(tone, animated):
    trace, packet, line, chip_fill, glow = TONES[tone]
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">']
    # Edge-weighted fade: full at the sides, softer under the centre text column,
    # faded top and bottom so stacked tiles join without seams.
    o.append(
        '<defs>'
        '<linearGradient id="fx" x1="0" x2="1"><stop offset="0" stop-color="#fff"/>'
        '<stop offset=".32" stop-color="#fff" stop-opacity=".45"/><stop offset=".68" stop-color="#fff" stop-opacity=".45"/>'
        '<stop offset="1" stop-color="#fff"/></linearGradient>'
        '<linearGradient id="fy" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/>'
        '<stop offset=".1" stop-color="#fff"/><stop offset=".9" stop-color="#fff"/>'
        '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'
        f'<mask id="mx"><rect width="{W}" height="{H}" fill="url(#fx)"/></mask>'
        f'<mask id="my"><rect width="{W}" height="{H}" fill="url(#fy)"/></mask>'
        '</defs>'
    )
    css = (
        'path,line{fill:none;stroke-linecap:round;stroke-linejoin:round}'
        f'.t path{{stroke:{trace};stroke-width:1.15}}'
        f'.pk path{{stroke:{packet};stroke-width:2.2;stroke-dasharray:10 990}}'
        f'.pg path{{stroke:{glow};stroke-width:7;stroke-dasharray:14 986}}'
        f'.c rect{{fill:{chip_fill};stroke:{line};stroke-width:1.1}}'
        f'.c .core{{fill:none;stroke:{trace}}}'
        f'.pin line{{stroke:{line};stroke-width:2.4;stroke-linecap:butt}}'
        f'.v circle{{fill:none;stroke:{line};stroke-width:1.2}}'
        f'.pd rect{{fill:{line}}}'
        f'.led circle{{fill:{packet}}}'
    )
    if animated:
        css += (
            '.pk path,.pg path{animation:run 6s linear infinite}'
            '.led circle{animation:blink 3.2s ease-in-out infinite}'
            '@keyframes run{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}'
            '@keyframes blink{0%,100%{opacity:.15}45%,55%{opacity:1}}'
        )
    else:
        css += '.pk path{stroke-dasharray:10 190}.pg path{display:none}.led circle{opacity:.6}'
    o.append(f'<style>{css}</style>')
    o.append('<g mask="url(#my)"><g mask="url(#mx)">')

    # traces
    o.append('<g class="t">' + ''.join(f'<path d="{path_d(t)}"/>' for t in traces) + '</g>')
    # vias at trace ends + via field
    o.append('<g class="v">' + ''.join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.4"/>' for x, y in vias + via_field) + '</g>')
    # chips
    chip_svg = []
    for (cx, cy, cw, ch) in chips:
        chip_svg.append(f'<rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="5"/>')
        chip_svg.append(f'<rect class="core" x="{cx + 12}" y="{cy + 12}" width="{cw - 24}" height="{ch - 24}" rx="3"/>')
    o.append('<g class="c">' + ''.join(chip_svg) + '</g>')
    o.append('<g class="pin">' + ''.join(f'<line x1="{a:.1f}" y1="{b:.1f}" x2="{c:.1f}" y2="{d:.1f}"/>' for a, b, c, d in pins) + '</g>')
    o.append('<g class="pd">' + ''.join(f'<rect x="{x - 2.5:.1f}" y="{y - 4:.1f}" width="5" height="8" rx="1"/>' for x, y in pads) + '</g>')

    # data packets: a share of traces carry traffic, at varied speeds
    moving = [t for i, t in enumerate(traces) if i % 2 == 0]
    pk, pg = [], []
    for i, t in enumerate(moving):
        dur = 4.5 + (i * 0.73) % 4.5
        delay = (i * 1.37) % dur
        reverse = i % 3 == 0
        pts = list(reversed(t)) if reverse else t
        style = f' style="animation-duration:{dur:.2f}s;animation-delay:-{delay:.2f}s"' if animated else f' style="stroke-dashoffset:{(i * 61) % 200}"'
        pk.append(f'<path d="{path_d(pts)}" pathLength="1000"{style}/>')
        pg.append(f'<path d="{path_d(pts)}" pathLength="1000"{style}/>')
    o.append('<g class="pg">' + ''.join(pg) + '</g>')
    o.append('<g class="pk">' + ''.join(pk) + '</g>')

    # status LEDs on the chips
    leds = []
    for i, (cx, cy, cw, ch) in enumerate(chips):
        st = f' style="animation-delay:-{i * 0.7:.1f}s"' if animated else ''
        leds.append(f'<circle cx="{cx + cw - 9}" cy="{cy + 9}" r="2.2"{st}/>')
    o.append('<g class="led">' + ''.join(leds) + '</g>')

    o.append('</g></g></svg>')
    return ''.join(o)


if __name__ == "__main__":
    for tone in TONES:
        for animated in (True, False):
            name = f"public/tech-lines/{tone}{'' if animated else '-static'}.svg"
            with open(name, "w") as fh:
                fh.write(svg(tone, animated) + "\n")
            print(name)
