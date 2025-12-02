import { useState, useCallback } from 'react';
// @ts-expect-error - html2pdf.js doesn't have type definitions
import html2pdf from 'html2pdf.js';
import type { FontOptions } from '../types/common';

interface PdfGenerationOptions {
  filename?: string;
  margin?: number | number[];
  image?: { type: string; quality: number };
  html2canvas?: { 
    scale: number;
    useCORS: boolean;
    letterRendering: boolean;
    logging: boolean;
  };
  jsPDF?: { unit: string; format: string; orientation: string };
  fontOptions?: FontOptions;
  pagebreak?: { mode: string[]; before?: string; after?: string; avoid?: string[] };
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

      // Convert contenteditable elements to regular text to preserve content
      const editableElements = clonedElement.querySelectorAll('[contenteditable]');
      editableElements.forEach(el => {
        const element = el as HTMLElement;
        const textContent = element.textContent || element.innerText;

        if (textContent) {
          // Create a new element to replace the contenteditable one
          const replacement = document.createElement(el.tagName);
          replacement.innerHTML = element.innerHTML;
          replacement.className = element.className;
          replacement.style.cssText = element.style.cssText;

          // Copy over attributes except contenteditable
          Array.from(element.attributes).forEach(attr => {
            if (attr.name !== 'contenteditable') {
              replacement.setAttribute(attr.name, attr.value);
            }
          });

          // Replace the element
          el.parentNode?.replaceChild(replacement, el);
        }
      });
      
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
      
      // Hide all interactive elements (buttons, inputs for adding content)
      const hideElements = clonedElement.querySelectorAll(
        'button, .add-button, .delete-button, .edit-button, .print\\:hidden, [data-no-print]'
      );
      hideElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      
      // Add page break avoidance to important sections
      const avoidBreakElements = clonedElement.querySelectorAll(
        '.experience-item, .education-item, .project-item, .certification-item, .skill-category, h2, h3, h4'
      );
      avoidBreakElements.forEach(el => {
        (el as HTMLElement).style.pageBreakInside = 'avoid';
        (el as HTMLElement).style.breakInside = 'avoid';
      });
      
      // Add orphan/widow control to paragraphs and list items
      const textElements = clonedElement.querySelectorAll('p, li, span');
      textElements.forEach(el => {
        (el as HTMLElement).style.orphans = '3';
        (el as HTMLElement).style.widows = '3';
      });
      
      // Force section headers to keep with their content
      const sectionHeaders = clonedElement.querySelectorAll('.section-header, [class*="SectionHeader"]');
      sectionHeaders.forEach(el => {
        (el as HTMLElement).style.pageBreakAfter = 'avoid';
        (el as HTMLElement).style.breakAfter = 'avoid';
      });
      
      // Temporarily append to body (hidden) for rendering
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.width = '210mm'; // A4 width
      clonedElement.style.backgroundColor = '#ffffff';
      document.body.appendChild(clonedElement);
      
      // Wait for fonts to load
      await document.fonts.ready;
      
      // Small delay to ensure all styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Set default options with improved page break handling
      const defaultOptions = {
        filename: options.filename || 'resume.pdf',
        margin: [10, 10, 10, 10], // [top, right, bottom, left] in mm - smaller margins
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, // Good balance of quality and file size
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794, // A4 width in pixels at 96dpi
          windowHeight: 1123 // A4 height in pixels at 96dpi
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true,
          hotfixes: ['px_scaling']
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: [
            '.experience-item',
            '.education-item', 
            '.project-item',
            '.certification-item',
            '.skill-category',
            'h2', 'h3', 'h4',
            '.section-header'
          ]
        }
      };
      
      // Merge options
      const mergedOptions = { 
        ...defaultOptions, 
        ...options,
        html2canvas: { ...defaultOptions.html2canvas, ...options.html2canvas },
        pagebreak: { ...defaultOptions.pagebreak, ...options.pagebreak }
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
