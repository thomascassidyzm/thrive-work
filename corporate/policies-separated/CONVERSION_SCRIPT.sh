#!/bin/bash

# Comprehensive Policy Conversion Script
# Converts all separated markdown policies to .docx format for Google Docs

POLICIES_DIR="/Users/tomcassidy/thrive/thrive-work/corporate/policies-separated"

echo "========================================="
echo "Policy Conversion: Markdown → .docx"
echo "========================================="
echo ""

# Counter for converted files
clearminds_count=0
concierge_count=0

echo "📁 CLEAR MINDS POLICIES"
echo "========================================="

# Convert Clear Minds policies
find "$POLICIES_DIR/clearminds" -name "*.md" -type f ! -name "README.md" | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .md)
    output="${dir}/${base}.docx"

    echo "Converting: $(basename "$file")"
    pandoc "$file" -o "$output" --standalone 2>/dev/null

    if [ $? -eq 0 ]; then
        echo "  ✓ Created: ${base}.docx"
        ((clearminds_count++))
    else
        echo "  ✗ Failed: $file"
    fi
done

echo ""
echo "📁 CONCIERGE HEALTH POLICIES"
echo "========================================="

# Convert Concierge Health policies (when ready)
if [ -d "$POLICIES_DIR/concierge-health" ]; then
    find "$POLICIES_DIR/concierge-health" -name "*.md" -type f ! -name "README.md" | while read -r file; do
        dir=$(dirname "$file")
        base=$(basename "$file" .md)
        output="${dir}/${base}.docx"

        echo "Converting: $(basename "$file")"
        pandoc "$file" -o "$output" --standalone 2>/dev/null

        if [ $? -eq 0 ]; then
            echo "  ✓ Created: ${base}.docx"
            ((concierge_count++))
        else
            echo "  ✗ Failed: $file"
        fi
    done
else
    echo "⚠️  Concierge Health policies not yet created"
fi

echo ""
echo "========================================="
echo "Conversion Complete!"
echo "========================================="
echo ""
echo "📊 SUMMARY:"
echo "  • Clear Minds policies converted"
echo "  • Concierge Health policies: $([ -d "$POLICIES_DIR/concierge-health" ] && echo "converted" || echo "not yet created")"
echo ""
echo "📂 OUTPUT LOCATION:"
echo "  $POLICIES_DIR"
echo ""
echo "📋 NEXT STEPS:"
echo "  1. Upload .docx files to Google Drive"
echo "  2. Right-click each file → 'Open with Google Docs'"
echo "  3. Google Docs will auto-convert with proper formatting"
echo ""
echo "✅ Ready for Google Docs editing!"
echo ""
