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
      // Create a temporary container for rendering
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '0';
      container.style.top = '0';
      container.style.width = '210mm';
      container.style.height = 'auto';
      container.style.backgroundColor = '#ffffff';
      container.style.zIndex = '-9999';
      container.style.pointerEvents = 'none';
      container.style.visibility = 'visible';
      container.style.opacity = '1';

      // Clone the original element
      const clonedElement = element.cloneNode(true) as HTMLElement;

      // Remove contenteditable attribute to prevent editing in PDF
      const editableElements = clonedElement.querySelectorAll('[contenteditable]');
      editableElements.forEach(el => {
        el.removeAttribute('contenteditable');
      });

      // Hide interactive elements
      const hideElements = clonedElement.querySelectorAll(
        'button, .add-button, .delete-button, .edit-button, .print\\:hidden, [data-no-print]'
      );
      hideElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // Apply font options
      if (options.fontOptions) {
        const { headerFont, bodyFont, fontSize, lineHeight, letterSpacing } = options.fontOptions;

        clonedElement.style.fontFamily = bodyFont || 'Inter';
        clonedElement.style.fontSize = `${fontSize || 14}px`;
        clonedElement.style.lineHeight = `${lineHeight || 1.5}`;
        clonedElement.style.letterSpacing = `${letterSpacing || 0}em`;

        // Apply header font to headings
        const headings = clonedElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          (heading as HTMLElement).style.fontFamily = headerFont || 'Inter';
        });
      }

      // Add page break avoidance
      const avoidBreakElements = clonedElement.querySelectorAll(
        '.experience-item, .education-item, .project-item, .certification-item, .skill-category, h2, h3, h4'
      );
      avoidBreakElements.forEach(el => {
        (el as HTMLElement).style.pageBreakInside = 'avoid';
        (el as HTMLElement).style.breakInside = 'avoid';
      });

      // Set background explicitly
      clonedElement.style.backgroundColor = '#ffffff';
      clonedElement.style.color = '#111827';

      // Append to temporary container
      container.appendChild(clonedElement);
      document.body.appendChild(container);

      // Wait for fonts and rendering
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 300));

      // PDF options
      const pdfOptions = {
        filename: options.filename || 'resume.pdf',
        margin: [10, 10, 10, 10],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794,
          windowHeight: 1123,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
          hotfixes: ['px_scaling'],
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

      // Generate PDF
      await html2pdf().set(pdfOptions).from(clonedElement).save();

      // Cleanup
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  }, []);

  return { isGeneratingPDF, generatePdf };
};

export default usePdfGeneration;
