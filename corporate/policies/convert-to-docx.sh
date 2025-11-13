#!/bin/bash

# Script to convert all markdown policy files to .docx format
# Preserves directory structure and skips README files

POLICIES_DIR="/Users/tomcassidy/thrive/thrive-work/corporate/policies"

echo "Converting markdown files to .docx in: $POLICIES_DIR"
echo "================================================"

# Counter for converted files
count=0

# Find all .md files and convert them
find "$POLICIES_DIR" -name "*.md" -type f | while read -r file; do
    # Skip README files
    if [[ $(basename "$file") == "README.md" ]]; then
        echo "Skipping: $file (README)"
        continue
    fi

    # Get directory and filename without extension
    dir=$(dirname "$file")
    base=$(basename "$file" .md)
    output="${dir}/${base}.docx"

    # Convert using pandoc
    echo "Converting: $file"
    pandoc "$file" -o "$output" --standalone

    if [ $? -eq 0 ]; then
        echo "  ✓ Created: $output"
        ((count++))
    else
        echo "  ✗ Failed: $file"
    fi
done

echo "================================================"
echo "Conversion complete!"
echo "Converted $count files"
echo ""
echo "Next steps:"
echo "1. Upload the .docx files to Google Drive"
echo "2. Right-click each file and select 'Open with Google Docs'"
echo "3. Google Docs will convert them with proper formatting"
