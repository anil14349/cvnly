import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Use a different port to avoid conflicts with Vite
const port = process.env.PORT || 3000;

// Enable CORS for all routes with specific origin
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.static(join(__dirname, '../dist')));

// PDF generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  let browser = null;
  
  try {
    const { htmlContent, cssStyles } = req.body;
    
    console.log('Received PDF generation request');
    
    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Create full HTML with styles
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          ${cssStyles || ''}
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
          }
          
          /* Ensure social links display correctly in a single line */
          .social-links-container {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            flex-wrap: wrap !important;
            gap: 16px !important;
            margin: 1rem auto !important;
          }
          
          .social-links-container > div {
            display: inline-flex !important;
            align-items: center !important;
            margin: 0 4px !important;
          }
          
          /* Fix bullet points */
          ul {
            padding-left: 1.5rem !important;
            list-style-position: outside !important;
            list-style-type: disc !important;
          }
          
          li {
            display: list-item !important;
            margin-left: 0.5rem !important;
            position: relative !important;
            text-align: left !important;
          }
          
          /* Fix whitespace */
          [contenteditable] {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
          }
          
          /* Print-specific styles */
          @page {
            margin: 0.5in;
            size: A4;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    console.log('Launching Puppeteer...');
    
    // Launch puppeteer with explicit executable path and more options for reliability
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ],
      ignoreHTTPSErrors: true
    });
    
    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 2,
    });
    
    // Set content and wait for it to load
    console.log('Setting content...');
    await page.setContent(fullHtml, { 
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    // Generate PDF
    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '20mm',
        right: '20mm'
      },
      displayHeaderFooter: false,
      timeout: 60000
    });
    
    console.log('PDF generated successfully');
    
    // Set response headers and send PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF', 
      details: error.message,
      stack: error.stack 
    });
  } finally {
    // Always close the browser
    if (browser) {
      console.log('Closing browser');
      await browser.close().catch(err => console.error('Error closing browser:', err));
    }
  }
});

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PDF service is running' });
});

// Start server
app.listen(port, () => {
  console.log(`PDF Server running on port ${port}`);
});

export default app; 