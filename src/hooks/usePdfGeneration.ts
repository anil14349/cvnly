import { useState, useCallback } from 'react';
// @ts-expect-error - html2pdf.js doesn't have type definitions
import html2pdf from 'html2pdf.js';

interface PdfGenerationOptions {
  filename?: string;
  margin?: number;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number };
  jsPDF?: { unit: string; format: string; orientation: string };
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
      // Add print class to the element
      element.classList.add('print-mode');
      
      // Set default options
      const defaultOptions = {
        filename: 'resume.pdf',
        margin: 10,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Merge default options with provided options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Generate the PDF
      await html2pdf().set(mergedOptions).from(element).save();
      
      // Remove print class after generation
      element.classList.remove('print-mode');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  }, []);

  return { isGeneratingPDF, generatePdf };
};

export default usePdfGeneration; 