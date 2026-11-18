"""Generate the site-wide 'data network' line backgrounds (public/tech-lines/*.svg).
Orange for light surfaces, white for dark. Animated + static (reduced motion)."""
import random
routes = [
  "M-50 485 L95 405 L245 447 L410 342 L590 370 L745 235 L940 265 L1240 90",
  "M-20 238 L160 273 L320 178 L490 202 L630 125 L845 164 L1025 75 L1250 100",
  "M-50 575 L132 533 L300 565 L500 465 L676 487 L840 390 L1090 417 L1250 310",
  "M50 -15 L218 74 L356 48 L520 142 L710 91 L890 145 L1050 76 L1240 150",
  "M-30 97 L122 131 L292 85 L466 144 L600 216 L815 186 L1010 264 L1235 202",
  "M80 610 L207 536 L310 421 L405 460 L535 388 L666 402 L838 306 L1050 320 L1250 250",
  "M-40 347 L160 314 L299 342 L500 300 L705 332 L870 246 L1020 289 L1220 237",
  "M225 -10 L295 113 L252 232 L385 282 L345 390 L465 478 L505 630",
  "M876 -30 L792 79 L868 198 L784 301 L848 424 L768 527 L805 645",
  "M1145 -20 L1070 114 L1114 205 L1033 319 L1110 420 L1041 630",
]
nodes = [(95,405),(245,447),(410,342),(745,235),(940,265),(160,273),(490,202),(845,164),(132,533),(500,465),
         (840,390),(218,74),(520,142),(890,145),(600,216),(815,186),(310,421),(535,388),(705,332),(1020,289),
         (292,85),(1010,264),(299,342),(870,246),(385,282),(868,198)]
TONES = {
  # base line, pulse, node, node-glow
  "orange": ("rgba(244,81,30,0.20)", "rgba(244,81,30,0.70)", "rgba(244,81,30,0.55)", "rgba(244,81,30,0.18)"),
  "white":  ("rgba(255,255,255,0.13)", "rgba(255,255,255,0.80)", "rgba(255,255,255,0.65)", "rgba(255,255,255,0.14)"),
}
def svg(tone, animated):
    base, pulse, node, glow = TONES[tone]
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">']
    o.append('<defs><linearGradient id="f" x1="0" x2="1" y1="0" y2="0">'
             '<stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#fff" stop-opacity=".5"/>'
             '<stop offset=".7" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff"/></linearGradient>'
             '<linearGradient id="v" x1="0" x2="0" y1="0" y2="1">'
             '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".14" stop-color="#fff"/>'
             '<stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'
             '<mask id="m"><rect width="1200" height="600" fill="url(#f)"/></mask>'
             '<mask id="mv"><rect width="1200" height="600" fill="url(#v)"/></mask></defs>')
    css = (f'path{{fill:none;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}}'
           f'.b path{{stroke:{base};stroke-width:1}}'
           f'.p path{{stroke:{pulse};stroke-width:2;stroke-dasharray:28 572}}'
           f'.n circle{{fill:{node}}}.g circle{{fill:{glow}}}')
    if animated:
        css += ('.p path{animation:t 9s linear infinite}'
                '.n circle,.g circle{animation:w 4.8s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}'
                '@keyframes t{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}'
                '@keyframes w{0%,30%{opacity:.25}100%{opacity:1}}')
    else:
        css += '.p path{stroke-dasharray:28 172;opacity:.55}'
    o.append(f'<style>{css}</style><g mask="url(#mv)"><g mask="url(#m)">')
    o.append('<g class="b">' + ''.join(f'<path d="{d}"/>' for d in routes) + '</g>')
    rnd = random.Random(7)
    ps = []
    for i, d in enumerate(routes):
        dur = 7 + rnd.random() * 6
        st = f' style="animation-duration:{dur:.1f}s;animation-delay:-{i*1.3:.1f}s"' if animated else f' style="stroke-dashoffset:{i*57}"'
        ps.append(f'<path d="{d}" pathLength="600"{st}/>')
    o.append('<g class="p">' + ''.join(ps) + '</g>')
    o.append('<g class="g">' + ''.join(f'<circle cx="{x}" cy="{y}" r="9"' + (f' style="animation-delay:-{i*.41:.2f}s"' if animated else '') + '/>' for i,(x,y) in enumerate(nodes) if i % 3 == 0) + '</g>')
    o.append('<g class="n">' + ''.join(f'<circle cx="{x}" cy="{y}" r="{3.2 if i%4==0 else 2}"' + (f' style="animation-delay:-{i*.37:.2f}s"' if animated else '') + '/>' for i,(x,y) in enumerate(nodes)) + '</g>')
    o.append('</g></g></svg>')
    return ''.join(o)
for tone in TONES:
    for animated in (True, False):
        name = f"public/tech-lines/{tone}{'' if animated else '-static'}.svg"
        open(name, "w").write(svg(tone, animated) + "\n")
        print(name)
