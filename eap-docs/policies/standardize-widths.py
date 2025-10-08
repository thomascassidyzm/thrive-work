#!/usr/bin/env python3
"""
Standardize container widths across all policy HTML files.
This script updates the max-width property in .container CSS to a consistent value.
"""

import os
import re
from pathlib import Path

# Standard width to use (in pixels)
STANDARD_WIDTH = 900

# Directories to process
POLICY_DIRS = [
    'internal',
    'external',
    'data-governance',
    'data-governance/forms',
    'legal'
]

def find_current_widths(base_dir):
    """Scan all HTML files and report current widths."""
    width_counts = {}
    
    for policy_dir in POLICY_DIRS:
        dir_path = os.path.join(base_dir, policy_dir)
        if not os.path.exists(dir_path):
            continue
            
        for filename in os.listdir(dir_path):
            if filename.endswith('.html'):
                filepath = os.path.join(dir_path, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Find max-width in .container class
                    match = re.search(r'\.container\s*{[^}]*max-width:\s*(\d+)px', content, re.DOTALL)
                    if match:
                        width = match.group(1)
                        if width not in width_counts:
                            width_counts[width] = []
                        width_counts[width].append(os.path.join(policy_dir, filename))
    
    return width_counts

def update_container_width(filepath, target_width):
    """Update the max-width in .container CSS class."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to find .container { ... max-width: XXXpx; ... }
    # We need to find the container class and update its max-width
    pattern = r'(\.container\s*{[^}]*max-width:\s*)(\d+)(px)'
    
    # Check if pattern exists
    if re.search(pattern, content, re.DOTALL):
        # Replace the width value
        new_content = re.sub(pattern, rf'\g<1>{target_width}\g<3>', content, flags=re.DOTALL)
        
        # Write back only if changed
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
    
    return False

def main():
    # Get the base directory (where this script is located)
    base_dir = Path(__file__).parent
    
    print("=" * 70)
    print("POLICY CONTAINER WIDTH STANDARDIZATION")
    print("=" * 70)
    print(f"\nTarget width: {STANDARD_WIDTH}px\n")
    
    # First, scan and report current widths
    print("Current widths found:")
    print("-" * 70)
    width_counts = find_current_widths(base_dir)
    
    for width, files in sorted(width_counts.items()):
        print(f"\n{width}px ({len(files)} files):")
        for filepath in files[:5]:
            print(f"  • {filepath}")
        if len(files) > 5:
            print(f"  ... and {len(files) - 5} more")
    
    print("\n" + "=" * 70)
    print("UPDATING FILES...")
    print("=" * 70 + "\n")
    
    # Update all files
    updated_count = 0
    skipped_count = 0
    
    for policy_dir in POLICY_DIRS:
        dir_path = os.path.join(base_dir, policy_dir)
        if not os.path.exists(dir_path):
            continue
            
        for filename in os.listdir(dir_path):
            if filename.endswith('.html'):
                filepath = os.path.join(dir_path, filename)
                if update_container_width(filepath, STANDARD_WIDTH):
                    print(f"✓ Updated: {os.path.join(policy_dir, filename)}")
                    updated_count += 1
                else:
                    skipped_count += 1
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Files updated: {updated_count}")
    print(f"Files skipped (already correct): {skipped_count}")
    print(f"\nAll container widths are now set to {STANDARD_WIDTH}px")
    print("=" * 70)

if __name__ == "__main__":
    main()
