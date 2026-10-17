"""Build the self-hosted Montserrat files used by the site (one-off tool, output is committed).

Why: the stock variable font is 38 KB (latin) + 24 KB (cyrillic). The design only uses weights 400-800 and a few
hundred glyphs, so we cut the weight axis and subset the glyphs. Result is roughly 40% smaller.

Source: @fontsource-variable/montserrat (SIL Open Font License 1.1). `npm install` it anywhere and point --src at
node_modules/@fontsource-variable/montserrat/files

    pip install fonttools brotli
    python scripts/make-fonts.py --src <that folder> --out src/assets/fonts

Fonts load per script (CSS unicode-range): Uzbek/English pages download the latin file only, Russian pages both.
If you add copy that needs a character that is missing, add it below and re-run (src/i18n tests will tell you).
"""
import argparse
import io
import json
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

# What each file must contain. The unit test (src/i18n/charset.test.ts) proves every character used in the
# dictionaries has a glyph here.
LATIN = (
    list(range(0x20, 0x7F))                       # basic latin
    + [0xA0, 0xA9, 0xAB, 0xAD, 0xB0, 0xB7, 0xBB]  # nbsp, (c), guillemets, soft hyphen, degree, middle dot
    + [0x2BB, 0x2BC]                              # Uzbek o' g' (modifier letter turned comma) and tutuq belgisi
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x201E, 0x2022, 0x2026]
)
CYRILLIC = list(range(0x400, 0x460)) + [0x490, 0x491, 0x2116]

FEATURES = ["kern", "liga"]


def build(src: Path, unicodes: list[int], out: Path, wght=(400, 800)):
    font = TTFont(src)
    font = instancer.instantiateVariableFont(font, {"wght": wght}, inplace=False)
    # Round-trip through memory: subsetting a freshly instanced font trips over the gvar table (KeyError '.notdef').
    buf = io.BytesIO()
    font.flavor = None
    font.save(buf)
    buf.seek(0)
    font = TTFont(buf)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = FEATURES
    opts.hinting = False
    opts.glyph_names = False
    opts.notdef_outline = True
    opts.name_IDs = [1, 2, 3, 4, 6]
    opts.drop_tables += ["DSIG", "MVAR", "STAT"]
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    subset.save_font(font, out, opts)
    return sorted(TTFont(out).getBestCmap().keys())


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    args = ap.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)

    report = {}
    for name, unicodes in (("latin", LATIN), ("cyrillic", CYRILLIC)):
        src = args.src / f"montserrat-{name}-wght-normal.woff2"
        out = args.out / f"montserrat-{name}.woff2"
        cmap = build(src, unicodes, out)
        report[name] = cmap
        print(f"{out.name}: {out.stat().st_size / 1024:.1f} KB, {len(cmap)} codepoints (source {src.stat().st_size / 1024:.1f} KB)")
    (args.out / "charset.json").write_text(json.dumps(report), encoding="utf-8")
