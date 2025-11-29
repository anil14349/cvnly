/**
 * Payment Service
 * Handles all payment-related business logic
 */

import { PaymentGateway, PaymentStatus } from '../types/payment';
import { supabase } from '../utils/supabaseClient';

export interface ProcessPaymentParams {
  amount: number;
  currency: string;
  email: string;
  gateway: PaymentGateway;
  upiId?: string;
  resumeData: any;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

/**
 * Process a payment through the selected gateway
 */
export const processPayment = async (params: ProcessPaymentParams): Promise<PaymentResult> => {
  try {
    const { amount, currency, email, gateway, upiId, resumeData } = params;

    // Demo mode: Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In production, integrate with actual payment gateway APIs here
    // For now, we'll just simulate a successful payment

    // Store payment record in database
    const paymentData = {
      transaction_id: transactionId,
      user_email: email,
      amount,
      currency,
      gateway,
      status: 'completed' as PaymentStatus,
      upi_id: upiId,
      resume_data: resumeData,
      created_at: new Date().toISOString()
    };

    // Save to Supabase (if configured)
    if (supabase) {
      const { error } = await supabase
        .from('payments')
        .insert([paymentData]);

      if (error) {
        console.error('Error saving payment:', error);
      }
    }

    return {
      success: true,
      transactionId
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment processing failed'
    };
  }
};

/**
 * Verify a payment status
 */
export const verifyPayment = async (transactionId: string): Promise<boolean> => {
  try {
    if (!supabase) return false;

    const { data, error } = await supabase
      .from('payments')
      .select('status')
      .eq('transaction_id', transactionId)
      .single();

    if (error) {
      console.error('Error verifying payment:', error);
      return false;
    }

    return data?.status === 'completed';
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};

/**
 * Get payment history for a user
 */
export const getPaymentHistory = async (userEmail: string) => {
  try {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPaymentHistory:', error);
    return [];
  }
};

