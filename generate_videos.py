from pathlib import Path
import json, hashlib, re

ROOT = Path(__file__).resolve().parent
VIDEO_DIR = ROOT / "videos"
OUT = ROOT / "videos.json"
EXTS = {".mp4", ".webm", ".mov", ".m4v", ".ogg"}

def caption(name):
    stem = Path(name).stem
    return re.sub(r"\s+", " ", re.sub(r"[-_]+", " ", stem)).strip()

items = []
for p in sorted(VIDEO_DIR.iterdir(), key=lambda x: x.name.lower()):
    if p.is_file() and p.suffix.lower() in EXTS:
        rel = p.relative_to(ROOT).as_posix()
        ident = hashlib.sha1(rel.encode("utf-8")).hexdigest()[:12]
        items.append({
            "id": ident,
            "file": p.name,
            "src": rel,
            "caption": caption(p.name)
        })

OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"BunBunGram: found {len(items)} video(s).")
print(f"Updated: {OUT.name}")
