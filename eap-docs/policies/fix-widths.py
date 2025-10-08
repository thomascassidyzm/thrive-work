#!/usr/bin/env python3
"""Quick script to standardize container widths"""

import os
import re
import glob

BASE_DIR = '/Users/tomcassidy/thrive/thrive-work/eap-docs/policies'
TARGET_WIDTH = 900

# Find all HTML files
html_files = []
for pattern in ['internal/*.html', 'external/*.html', 'data-governance/*.html', 'data-governance/forms/*.html', 'legal/*.html']:
    html_files.extend(glob.glob(os.path.join(BASE_DIR, pattern)))

print(f"Found {len(html_files)} HTML files\n")
print("="*70)
print("CURRENT WIDTHS:")
print("="*70)

widths = {}
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        match = re.search(r'\.container\s*{[^}]*max-width:\s*(\d+)px', content, re.DOTALL)
        if match:
            width = match.group(1)
            filename = os.path.basename(filepath)
            if width not in widths:
                widths[width] = []
            widths[width].append(filename)

for width in sorted(widths.keys()):
    files = widths[width]
    print(f"\n{width}px ({len(files)} files):")
    for f in files[:3]:
        print(f"  - {f}")
    if len(files) > 3:
        print(f"  ... and {len(files)-3} more")

print("\n" + "="*70)
print(f"UPDATING ALL TO {TARGET_WIDTH}px...")
print("="*70 + "\n")

updated = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(
        r'(\.container\s*{[^}]*max-width:\s*)(\d+)(px)',
        rf'\g<1>{TARGET_WIDTH}\g<3>',
        content,
        flags=re.DOTALL
    )
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ {os.path.basename(filepath)}")
        updated += 1

print(f"\n{updated} files updated to {TARGET_WIDTH}px")
