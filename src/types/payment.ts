export type PaymentGateway = 'stripe' | 'razorpay' | 'paypal' | 'upi';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  user_email: string;
  amount: number;
  currency: string;
  payment_gateway: PaymentGateway;
  payment_status: PaymentStatus;
  transaction_id?: string;
  payment_method?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Download {
  id: string;
  payment_id: string;
  user_email: string;
  resume_data: any;
  download_count: number;
  max_downloads: number;
  expires_at: string;
  created_at: string;
  last_downloaded_at?: string;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentId: string) => void;
  amount: number;
  currency: string;
}
