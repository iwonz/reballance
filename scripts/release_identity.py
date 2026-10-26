"""Reballance release identities shared by packaging and Pages."""
import json
import hashlib
from pathlib import Path
import re


VERSION = r"[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?"
EDITIONS = {
    "remaster": ("Reballance", "com.iwonz.BallanceRemaster"),
}
def checksum(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def verify_checksum(path, pinned=None):
    if path.is_symlink() or Path(str(path) + ".sha256").is_symlink():
        raise RuntimeError("Release inputs must not be symlinks")
    fields = Path(str(path) + ".sha256").read_text().split()
    if len(fields) not in (1, 2) or (len(fields) == 2 and fields[1] != path.name):
        raise RuntimeError("Invalid checksum sidecar: " + path.name)
    actual = checksum(path)
    if actual != fields[0]:
        raise RuntimeError("Archive checksum mismatch: " + path.name)
    if pinned is not None and actual != pinned:
        raise RuntimeError("Archive checksum differs from the pinned release: " + path.name)
    return actual


def parse_tag(tag):
    match = re.fullmatch(rf"(?:remaster/)?v({VERSION})", tag)
    if not match:
        raise RuntimeError("Invalid Reballance release tag; use v<version>")
    return "remaster", match[1], False


def asset_name(tag, platform="WebGL"):
    edition, version, legacy = parse_tag(tag)
    prefix = "Reballance"
    extension = "zip" if platform in ("macOS", "Windows") else "apk" if platform == "Android" else "tar.gz"
    return f"{prefix}-{version}-{platform}.{extension}"


def checkout_edition(root):
    path = Path(root) / "ProjectSettings/Edition.json"
    if not path.exists():
        return None
    data = json.loads(path.read_text())
    edition = data.get("id")
    if edition not in EDITIONS or (data.get("productName"), data.get("applicationIdentifier")) != EDITIONS[edition]:
        raise RuntimeError("Invalid checkout edition identity")
    return data


def validate_build_identity(root, folder, version):
    edition = checkout_edition(root)
    if edition is None:
        raise RuntimeError("Missing Reballance checkout identity")
    path = folder / "build-identity.json"
    if not path.is_file():
        raise RuntimeError("Missing build identity; rebuild this edition before packaging")
    built = json.loads(path.read_text())
    expected = {"edition": edition["id"], "version": version,
                "productName": edition["productName"],
                "applicationIdentifier": edition["applicationIdentifier"]}
    if built != expected:
        raise RuntimeError("Build identity does not match this checkout; do not relabel an older player")
    return "v" + version
