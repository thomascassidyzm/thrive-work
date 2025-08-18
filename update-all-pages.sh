#!/bin/bash

# Update all HTML pages with favicon and orbital logo references

pages=(
    "chat/index.html"
    "about/index.html"
    "coaching/index.html"
    "corporate/index.html"
    "partners/index.html"
    "blog/index.html"
    "game/index.html"
    "domains/index.html"
)

for page in "${pages[@]}"; do
    echo "Updating $page..."
    
    # Check if favicon links already exist
    if ! grep -q "favicon-32.png" "$page"; then
        # Add favicon and icon links after the description meta tag
        sed -i '' '/<meta name="description"/a\
\
    <!-- Favicon and App Icons -->\
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32.png">\
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16.png">\
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">\
    <link rel="manifest" href="/manifest.json">\
    <meta name="theme-color" content="#FFD700">
' "$page"
    fi
    
    # Check if orbital logo CSS is already included
    if ! grep -q "orbital-logo.css" "$page"; then
        # Add orbital logo CSS after main.css
        sed -i '' '/<link rel="stylesheet" href=".*main.css"/a\
    <link rel="stylesheet" href="../assets/css/orbital-logo.css">
' "$page"
    fi
    
    # Update nav logo if it exists
    if grep -q '<span class="logo-text">THRIVE</span>' "$page"; then
        sed -i '' 's|<span class="logo-text">THRIVE</span>|<span class="th-icon-small">Th</span>\
                <span class="logo-text">THRIVE</span>|' "$page"
    fi
done

echo "All pages updated!"