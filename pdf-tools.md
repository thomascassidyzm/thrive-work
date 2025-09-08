# 🚀 High-Quality PDF Creation Tools

## THRIVE PDF Templates

### **Corporate Brochure** (`/corporate-brochure/`)
- **Purpose**: Client presentations and corporate sales
- **Styling**: Matches hero section design with THRIVE branding
- **Content**: Comprehensive employee benefits package details
- **API**: `/api/generate-corporate-pdf` (requires Puppeteer setup)
- **Features**: 
  - UK Equality Act 2010 compliance information
  - Mental health screening platform details
  - Professional layout for B2B sales

### **Company Handout** (`/company-handout/`)
- **Purpose**: General company overview
- **Styling**: Full THRIVE design system
- **API**: `/api/generate-pdf` (requires Puppeteer setup)

## Browser-Based Solutions
1. **Firefox** - Often better than Chrome for print-to-PDF with backgrounds
2. **Safari** (Mac) - Excellent PDF preservation
3. **Edge** - Sometimes handles complex CSS better than Chrome

## Professional PDF Tools

### **Puppeteer (Code Solution)**
```javascript
const puppeteer = require('puppeteer');

async function createPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.thrive-work.com/company-handout/');
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,  // KEY: Includes all styling
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
  });
  
  await browser.close();
  return pdf;
}
```

### **Online PDF Converters (High Quality)**
- **WeasyPrint** - Excellent HTML to PDF
- **Prince XML** - Professional grade
- **PDF24** - Free online converter
- **HTML/CSS to PDF API** - Various services

## Screenshot + PDF Method

### **High-Res Screenshots**
1. **Chrome DevTools**: 
   - F12 → Console → Run: `window.print()`
   - Or take full-page screenshot
2. **Firefox**: Full page screenshots built-in
3. **Online tools**: html2canvas, dom-to-image

### **Image to PDF**
- Combine screenshots in:
  - Adobe Acrobat
  - PowerPoint → Export as PDF
  - Google Docs
  - Canva