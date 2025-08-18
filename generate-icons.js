#!/usr/bin/env node

/**
 * THRIVE Icon Generator
 * Programmatically generates all icon sizes for favicon and PWA
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes to generate
const ICON_SIZES = [
  { size: 16, name: 'favicon-16.png', rounded: false },
  { size: 32, name: 'favicon-32.png', rounded: false },
  { size: 72, name: 'icon-72.png', rounded: true },
  { size: 96, name: 'icon-96.png', rounded: true },
  { size: 120, name: 'icon-120.png', rounded: true, ios: true },
  { size: 128, name: 'icon-128.png', rounded: true },
  { size: 144, name: 'icon-144.png', rounded: true },
  { size: 152, name: 'icon-152.png', rounded: true, ios: true },
  { size: 167, name: 'icon-167.png', rounded: true, ios: true },
  { size: 180, name: 'icon-180.png', rounded: true, ios: true },
  { size: 192, name: 'icon-192.png', rounded: true },
  { size: 384, name: 'icon-384.png', rounded: true },
  { size: 512, name: 'icon-512.png', rounded: true }
];

// Also generate apple-touch-icon
const APPLE_TOUCH_ICON = { size: 180, name: 'apple-touch-icon.png', rounded: true, ios: true };

/**
 * Draw rounded rectangle
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Generate a single icon
 */
function generateIcon(size, rounded = true, ios = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, size, size);
  
  // Calculate dimensions
  const padding = size * 0.1;
  const iconSize = size - (padding * 2);
  
  // iOS uses special corner radius (22.37% of size)
  const cornerRadius = ios ? size * 0.2237 : (rounded ? size * 0.15 : size * 0.05);
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#ffd700');
  gradient.addColorStop(1, '#ffed4e');
  
  // Draw background
  ctx.fillStyle = gradient;
  if (rounded) {
    drawRoundedRect(ctx, 0, 0, size, size, cornerRadius);
    ctx.fill();
  } else {
    // For very small icons, use minimal rounding
    if (size <= 32) {
      drawRoundedRect(ctx, 0, 0, size, size, 2);
    } else {
      drawRoundedRect(ctx, 0, 0, size, size, cornerRadius);
    }
    ctx.fill();
  }
  
  // Add subtle shadow/glow effect for larger icons
  if (size >= 72) {
    ctx.shadowColor = 'rgba(255, 215, 0, 0.3)';
    ctx.shadowBlur = size * 0.1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = size * 0.02;
  }
  
  // Draw "Th" text
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Calculate font size based on icon size
  let fontSize;
  let text;
  
  if (size <= 16) {
    fontSize = size * 0.6;
    text = 'T'; // Just T for tiny icons
  } else if (size <= 32) {
    fontSize = size * 0.5;
    text = 'Th';
  } else {
    fontSize = size * 0.44;
    text = 'Th';
  }
  
  // Use bold font
  ctx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  
  // Draw text
  ctx.fillText(text, size / 2, size / 2 + (size * 0.02)); // Slight vertical adjustment
  
  // Add atomic number for larger icons
  if (size >= 120) {
    ctx.font = `600 ${size * 0.08}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillStyle = 'rgba(26, 26, 26, 0.7)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('90', size * 0.15, size * 0.15);
  }
  
  return canvas.toBuffer('image/png');
}

/**
 * Generate all icons
 */
async function generateAllIcons() {
  const outputDir = path.join(__dirname, 'assets', 'images');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🎨 Generating THRIVE icons...\n');
  
  // Generate each icon size
  for (const iconConfig of ICON_SIZES) {
    const { size, name, rounded = true, ios = false } = iconConfig;
    
    console.log(`  📱 Generating ${name} (${size}x${size})...`);
    
    const iconBuffer = generateIcon(size, rounded, ios);
    const outputPath = path.join(outputDir, name);
    
    fs.writeFileSync(outputPath, iconBuffer);
  }
  
  // Generate apple-touch-icon
  console.log(`  🍎 Generating ${APPLE_TOUCH_ICON.name} (${APPLE_TOUCH_ICON.size}x${APPLE_TOUCH_ICON.size})...`);
  const appleIconBuffer = generateIcon(APPLE_TOUCH_ICON.size, APPLE_TOUCH_ICON.rounded, APPLE_TOUCH_ICON.ios);
  fs.writeFileSync(path.join(outputDir, APPLE_TOUCH_ICON.name), appleIconBuffer);
  
  console.log('\n✅ All icons generated successfully!');
  console.log(`📁 Icons saved to: ${outputDir}`);
  
  // Generate favicon.ico (multi-resolution)
  console.log('\n🔧 Note: To create favicon.ico, combine favicon-16.png and favicon-32.png');
  console.log('    You can use: https://favicon.io/favicon-converter/');
}

// Run the generator
generateAllIcons().catch(console.error);