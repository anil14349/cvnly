/**
 * PDF Service
 * Handles PDF generation and download tracking
 */

import { supabase } from '../utils/supabaseClient';

/**
 * Track a PDF download
 */
export const trackDownload = async (
  userEmail: string,
  transactionId: string,
  resumeData: any
): Promise<boolean> => {
  try {
    if (!supabase) return false;

    const { error } = await supabase
      .from('downloads')
      .insert([{
        user_email: userEmail,
        transaction_id: transactionId,
        resume_data: resumeData,
        download_count: 1,
        downloaded_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error tracking download:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in trackDownload:', error);
    return false;
  }
};

/**
 * Get download count for a transaction
 */
export const getDownloadCount = async (transactionId: string): Promise<number> => {
  try {
    if (!supabase) return 0;

    const { data, error } = await supabase
      .from('downloads')
      .select('download_count')
      .eq('transaction_id', transactionId)
      .single();

    if (error) {
      console.error('Error getting download count:', error);
      return 0;
    }

    return data?.download_count || 0;
  } catch (error) {
    console.error('Error in getDownloadCount:', error);
    return 0;
  }
};

/**
 * Increment download count
 */
export const incrementDownloadCount = async (transactionId: string): Promise<boolean> => {
  try {
    if (!supabase) return false;

    const currentCount = await getDownloadCount(transactionId);
    
    if (currentCount >= 5) {
      console.warn('Download limit reached');
      return false;
    }

    const { error } = await supabase
      .from('downloads')
      .update({ download_count: currentCount + 1 })
      .eq('transaction_id', transactionId);

    if (error) {
      console.error('Error incrementing download count:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in incrementDownloadCount:', error);
    return false;
  }
};

/**
 * Check if download is still valid (within 30 days)
 */
export const isDownloadValid = async (transactionId: string): Promise<boolean> => {
  try {
    if (!supabase) return false;

    const { data, error } = await supabase
      .from('downloads')
      .select('downloaded_at, download_count')
      .eq('transaction_id', transactionId)
      .single();

    if (error) {
      console.error('Error checking download validity:', error);
      return false;
    }

    if (!data) return false;

    // Check 30-day validity
    const downloadDate = new Date(data.downloaded_at);
    const now = new Date();
    const daysSince = Math.floor((now.getTime() - downloadDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Check download count limit
    const countValid = data.download_count < 5;
    const dateValid = daysSince <= 30;

    return countValid && dateValid;
  } catch (error) {
    console.error('Error in isDownloadValid:', error);
    return false;
  }
};

