#!/usr/bin/env python3
"""Stage direct Reballance entry and one verified Web player atomically."""
import argparse
import importlib.util
import os
from pathlib import Path
import shutil
import tempfile

SITE_LIMIT = 1_000_000_000


def prepare(download, destination, tag, site=Path("site"), limit=SITE_LIMIT):
    if destination.exists() and any(destination.iterdir()):
        raise RuntimeError("The site destination must be empty")
    spec = importlib.util.spec_from_file_location("prepare_pages", Path(__file__).with_name("prepare-pages.py"))
    pages = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(pages)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="reballance-site-", dir=destination.parent) as temporary:
        staging = Path(temporary) / "public"
        staging.mkdir()
        identity = pages.prepare(download, staging, tag)
        for name in ("LICENSE", "CREDITS.md"):
            shutil.copyfile(site.parent / name, staging / name)
        entry = site / "play.html"
        if entry.is_symlink() or not entry.is_file():
            raise RuntimeError("Missing or unsafe legacy player entry page")
        legacy = staging / "play"
        legacy.mkdir()
        shutil.copyfile(entry, legacy / "index.html")
        # Keep published game bytes; adapt the former landing navigation in legacy hosts.
        index = staging / "index.html"
        html = index.read_text()
        html = html.replace('id="home" href="../"', 'id="home" href="https://github.com/iwonz/reballance#readme"')
        html = html.replace('location.assign(new URL("../", location.href))', 'location.assign(document.querySelector("#home").href)')
        index.write_text(html)
        (staging / ".nojekyll").touch()
        size = sum(path.stat().st_size for path in staging.rglob("*") if path.is_file())
        if size > limit:
            raise RuntimeError(f"Pages site exceeds {limit} bytes: {size}")
        os.replace(staging, destination)
    return identity


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("download", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("tag")
    parser.add_argument("--site", type=Path, default=Path("site"))
    args = parser.parse_args()
    prepare(args.download, args.destination, args.tag, args.site)
