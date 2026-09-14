#!/usr/bin/env python3
"""
Render the Flame Connect ambient "ember loop" video.

A procedurally generated, seamlessly looping ambient background: deep navy
field with warm ember glows drifting on closed circular paths (so frame N-1
flows back into frame 0), subtle grain, 24fps H.264.

Usage: .venv/bin/python scripts/render-ambient-video.py
Output: public/videos/ember-loop.mp4 + public/videos/ember-poster.jpg
"""

import math
import os

import imageio.v2 as imageio
import numpy as np

W, H = 1280, 720
FPS = 24
DURATION_S = 9
FRAMES = FPS * DURATION_S
OUT_DIR = os.path.join("public", "videos")
os.makedirs(OUT_DIR, exist_ok=True)

rng = np.random.default_rng(20260914)

# Coordinate field (aspect-corrected x)
y, x = np.mgrid[0:H, 0:W].astype(np.float32)
xn = x / W
yn = y / H
xar = xn * (W / H)  # aspect-corrected so gaussians stay round

# Deep navy base with a slow vertical cool gradient
base = np.zeros((H, W, 3), dtype=np.float32)
t_cool = (yn * 0.85 + xn * 0.15)[..., None]
navy_top = np.array([10.0, 27.0, 66.0], dtype=np.float32) / 255.0
navy_bot = np.array([6.0, 16.0, 42.0], dtype=np.float32) / 255.0
base[:] = navy_top * (1 - t_cool) + navy_bot * t_cool

# Ember definition: (center_x_r, center_y, orbit_r, sigma, color, pulse_phase)
EMBER_ORANGE = np.array([233, 82, 29], dtype=np.float32) / 255.0
EMBER_AMBER = np.array([255, 176, 32], dtype=np.float32) / 255.0
EMBER_DEEP = np.array([147, 48, 10], dtype=np.float32) / 255.0

embers = [
    (1.75, 1.05, 0.06, 0.16, EMBER_ORANGE * 0.95, 0.0),
    (1.30, 0.82, 0.05, 0.11, EMBER_AMBER * 0.75, 1.1),
    (0.62, 1.18, 0.07, 0.13, EMBER_DEEP * 0.85, 2.3),
    (0.30, 0.30, 0.04, 0.09, EMBER_ORANGE * 0.35, 3.4),
    (1.05, 0.20, 0.04, 0.07, EMBER_AMBER * 0.30, 4.2),
]

# Sparse drifting bokeh sparks (fixed positions, looping brightness)
sparks = [(rng.uniform(0.05, 0.95) * (W / H), rng.uniform(0.05, 0.95),
           rng.uniform(0.006, 0.015), rng.uniform(0, 2 * math.pi)) for _ in range(26)]
spark_color = np.array([255, 209, 160], dtype=np.float32) / 255.0

grain = rng.normal(0, 1, (H, W, 1)).astype(np.float32)


def frame(t_phase: float) -> np.ndarray:
    """t_phase in [0,1) — everything is 2pi-periodic so the loop is seamless."""
    img = base.copy()
    ang = 2 * math.pi * t_phase
    for cx, cy, orbit, sigma, color, phase in embers:
        px = cx + orbit * math.cos(ang + phase)
        py = cy + 0.6 * orbit * math.sin(ang + phase)
        s = sigma * (1.0 + 0.12 * math.sin(2 * ang + phase))
        g = np.exp(-(((xar - px) ** 2) + ((yn - py) ** 2)) / (2 * s * s))
        img += g[..., None] * color[None, None, :]

    for sx, sy, sr, sphase in sparks:
        bright = 0.5 + 0.5 * math.sin(3 * ang + sphase)
        g = np.exp(-(((xar - sx) ** 2) + ((yn - sy) ** 2)) / (2 * sr * sr))
        img += g[..., None] * (bright * 0.5) * spark_color[None, None, :]

    # gentle vignette
    vig = 1.0 - 0.25 * (((xn - 0.5) ** 2) * 1.6 + ((yn - 0.5) ** 2) * 1.2)
    img *= vig[..., None]
    img += grain * 0.012  # film grain
    return np.clip(img, 0, 1)


def main() -> None:
    out = os.path.join(OUT_DIR, "ember-loop.mp4")
    writer = imageio.get_writer(
        out,
        fps=FPS,
        codec="libx264",
        quality=8,
        pixelformat="yuv420p",
        macro_block_size=1,
        ffmpeg_params=["-movflags", "+faststart", "-profile:v", "high"],
    )
    for i in range(FRAMES):
        writer.append_data((frame(i / FRAMES) * 255).astype(np.uint8))
        if i % 48 == 0:
            print(f"frame {i}/{FRAMES}")
    writer.close()
    imageio.imwrite(
        os.path.join(OUT_DIR, "ember-poster.jpg"),
        (frame(0.02) * 255).astype(np.uint8),
        quality=86,
    )
    size_mb = os.path.getsize(out) / 1e6
    print(f"done: {out} ({size_mb:.2f} MB)")


if __name__ == "__main__":
    main()
