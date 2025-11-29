import { useState, useCallback } from 'react';
// @ts-expect-error - html2pdf.js doesn't have type definitions
import html2pdf from 'html2pdf.js';
import type { FontOptions } from '../types/common';

interface PdfGenerationOptions {
  filename?: string;
  margin?: number;
  image?: { type: string; quality: number };
  html2canvas?: { 
    scale: number;
    useCORS: boolean;
    letterRendering: boolean;
    logging: boolean;
  };
  jsPDF?: { unit: string; format: string; orientation: string };
  fontOptions?: FontOptions;
  pagebreak?: { mode: string[]; before?: string; after?: string };
}

const usePdfGeneration = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePdf = useCallback(async (
    element: HTMLElement | null, 
    options: PdfGenerationOptions = {}
  ) => {
    if (!element) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Apply font options to the cloned element
      if (options.fontOptions) {
        const { 
          headerFont, 
          bodyFont, 
          fontSize, 
          lineHeight, 
          letterSpacing,
          lineColor 
        } = options.fontOptions;
        
        // Apply CSS variables to cloned element
        clonedElement.style.setProperty('--header-font', headerFont || 'Inter');
        clonedElement.style.setProperty('--body-font', bodyFont || 'Inter');
        clonedElement.style.setProperty('--font-size-body', `${fontSize || 14}px`);
        clonedElement.style.setProperty('--line-height-normal', `${lineHeight || 1.5}`);
        clonedElement.style.setProperty('--letter-spacing-normal', `${letterSpacing || 0}em`);
        clonedElement.style.setProperty('--line-color', lineColor || '#4299e1');
        
        // Apply inline styles to ensure they're captured
        clonedElement.style.fontFamily = bodyFont || 'Inter';
        clonedElement.style.fontSize = `${fontSize || 14}px`;
        clonedElement.style.lineHeight = `${lineHeight || 1.5}`;
        clonedElement.style.letterSpacing = `${letterSpacing || 0}em`;
        
        // Apply header font to all headings
        const headings = clonedElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          (heading as HTMLElement).style.fontFamily = headerFont || 'Inter';
        });
      }
      
      // Add print class to the cloned element
      clonedElement.classList.add('print-mode');
      clonedElement.classList.add('resume-print-ready');
      
      // Temporarily append to body (hidden) for rendering
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      document.body.appendChild(clonedElement);
      
      // Set default options with improved settings
      const defaultOptions = {
        filename: options.filename || 'resume.pdf',
        margin: [15, 15, 15, 15], // [top, right, bottom, left] in mm
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 3, // Higher scale for better quality
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after'
        }
      };
      
      // Merge options
      const mergedOptions = { 
        ...defaultOptions, 
        ...options,
        html2canvas: { ...defaultOptions.html2canvas, ...options.html2canvas }
      };
      
      // Generate the PDF
      await html2pdf().set(mergedOptions).from(clonedElement).save();
      
      // Remove the cloned element
      document.body.removeChild(clonedElement);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  }, []);

  return { isGeneratingPDF, generatePdf };
};

export default usePdfGeneration; 