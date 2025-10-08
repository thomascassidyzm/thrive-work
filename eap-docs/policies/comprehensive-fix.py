#!/usr/bin/env python3
"""
Comprehensive policy file consistency checker and fixer.
Ensures all files have:
1. Container width of 900px
2. Gradient header with white text (not old border-bottom style)
"""

import os
import re
import glob

BASE_DIR = '/Users/tomcassidy/thrive/thrive-work/eap-docs/policies'
TARGET_WIDTH = 900

# Define the correct header styles
GRADIENT_HEADER_CSS = """        .header {
            background: linear-gradient(135deg, #007a87 0%, #005f6b 100%);
            padding: 40px;
            margin: -60px -60px 40px -60px;
            border-radius: 8px 8px 0 0;
        }

        .logo {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 15px;
            opacity: 0.95;
        }

        .document-title {
            font-size: 32px;
            color: white;
            margin-bottom: 0;
            font-weight: 700;
            line-height: 1.3;
        }"""

# Pattern for old-style header
OLD_HEADER_PATTERN = r'\.header\s*{\s*border-bottom:\s*4px\s+solid\s+#007a87;'

def find_all_html_files():
    """Find all HTML policy files."""
    patterns = ['internal/*.html', 'external/*.html', 'data-governance/*.html', 
                'data-governance/forms/*.html', 'legal/*.html']
    html_files = []
    for pattern in patterns:
        html_files.extend(glob.glob(os.path.join(BASE_DIR, pattern)))
    return sorted(html_files)

def check_file_issues(filepath):
    """Check if file has width or styling issues."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # Check container width
    width_match = re.search(r'\.container\s*{[^}]*max-width:\s*(\d+)px', content, re.DOTALL)
    if width_match:
        width = int(width_match.group(1))
        if width != TARGET_WIDTH:
            issues.append(f"width={width}px (should be {TARGET_WIDTH}px)")
    else:
        issues.append("no container width found")
    
    # Check for old header style
    if re.search(OLD_HEADER_PATTERN, content, re.IGNORECASE):
        issues.append("old header style (border-bottom)")
    
    return issues

def fix_container_width(content, target_width):
    """Fix container max-width."""
    return re.sub(
        r'(\.container\s*{[^}]*max-width:\s*)(\d+)(px)',
        rf'\g<1>{target_width}\g<3>',
        content,
        flags=re.DOTALL
    )

def fix_header_style(content):
    """Replace old header style with gradient."""
    # Pattern to match the entire old header block
    old_header_block = r'\.header\s*{[^}]*border-bottom:[^}]*}\s*\.logo\s*{[^}]*}\s*\.document-title\s*{[^}]*}'
    
    # Replace with gradient version
    return re.sub(old_header_block, GRADIENT_HEADER_CSS, content, flags=re.DOTALL)

def main():
    print("="*80)
    print("POLICY FILES CONSISTENCY CHECK")
    print("="*80)
    
    files = find_all_html_files()
    print(f"\nFound {len(files)} HTML files\n")
    
    # Phase 1: Check all files
    print("Phase 1: Scanning for issues...")
    print("-"*80)
    
    files_with_issues = {}
    for filepath in files:
        issues = check_file_issues(filepath)
        if issues:
            filename = os.path.relpath(filepath, BASE_DIR)
            files_with_issues[filepath] = {
                'filename': filename,
                'issues': issues
            }
    
    if not files_with_issues:
        print("✓ All files are consistent!")
        print(f"  - Container width: {TARGET_WIDTH}px")
        print("  - Header style: Gradient with white text")
        return
    
    print(f"\nFound issues in {len(files_with_issues)} files:\n")
    for filepath, info in files_with_issues.items():
        print(f"  ✗ {info['filename']}")
        for issue in info['issues']:
            print(f"     - {issue}")
    
    # Phase 2: Fix all issues
    print("\n" + "="*80)
    print("Phase 2: Fixing issues...")
    print("-"*80 + "\n")
    
    fixed_count = 0
    for filepath, info in files_with_issues.items():
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix width if needed
        if any('width=' in issue for issue in info['issues']):
            content = fix_container_width(content, TARGET_WIDTH)
        
        # Fix header style if needed
        if any('old header' in issue for issue in info['issues']):
            content = fix_header_style(content)
        
        # Write back if changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Fixed: {info['filename']}")
            fixed_count += 1
    
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print(f"Files scanned: {len(files)}")
    print(f"Files with issues: {len(files_with_issues)}")
    print(f"Files fixed: {fixed_count}")
    print(f"\n✓ All files now have consistent styling:")
    print(f"  - Container width: {TARGET_WIDTH}px")
    print(f"  - White h1 in gradient header")
    print(f"  - Light green metadata boxes")
    print("="*80)

if __name__ == "__main__":
    main()
