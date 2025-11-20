import React, { useState } from 'react';
import { Download, Lock, CheckCircle } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { PaymentGateway } from '../../types/payment';

interface DownloadWithPaymentProps {
  onDownload: () => void;
  resumeData: any;
  userEmail?: string;
}

const DownloadWithPayment: React.FC<DownloadWithPaymentProps> = ({
  onDownload,
  resumeData,
  userEmail
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const DOWNLOAD_PRICE = 5.99;
  const CURRENCY = 'USD';

  const handlePaymentSuccess = async (gateway: PaymentGateway, transactionId: string) => {
    setIsProcessing(true);

    try {
      // Here you would:
      // 1. Save payment to Supabase
      // 2. Create download record
      // 3. Update user's access

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Payment successful:', {
        gateway,
        transactionId,
        amount: DOWNLOAD_PRICE,
        currency: CURRENCY,
        userEmail: userEmail || 'guest@example.com',
        resumeData
      });

      setIsPaid(true);
      setShowPaymentModal(false);

      // Show success message
      alert('Payment successful! You can now download your resume.');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadClick = () => {
    if (isPaid) {
      onDownload();
    } else {
      setShowPaymentModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleDownloadClick}
        disabled={isProcessing}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
          isPaid
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : isPaid ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Download PDF
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Download PDF (${DOWNLOAD_PRICE})
          </>
        )}
      </button>

      {!isPaid && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          One-time payment • Secure checkout • Download up to 5 times
        </p>
      )}

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        amount={DOWNLOAD_PRICE}
        currency={CURRENCY}
      />
    </>
  );
};

export default DownloadWithPayment;
