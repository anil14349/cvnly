import React, { useState } from 'react';
import { X, CreditCard, Wallet, DollarSign } from 'lucide-react';
import { PaymentGateway } from '../../types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (gateway: PaymentGateway, transactionId: string) => void;
  amount: number;
  currency: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  amount,
  currency
}) => {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [upiId, setUpiId] = useState('');

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!selectedGateway || !email) {
      alert('Please select a payment method and enter your email');
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, you would integrate with actual payment gateways here
      const mockTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // For demo purposes, we'll consider all payments successful
      onPaymentSuccess(selectedGateway, mockTransactionId);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getGatewayLogo = (gateway: PaymentGateway) => {
    switch (gateway) {
      case 'stripe':
        return <CreditCard className="w-6 h-6" />;
      case 'razorpay':
        return <Wallet className="w-6 h-6" />;
      case 'paypal':
        return <DollarSign className="w-6 h-6" />;
      case 'upi':
        return <Wallet className="w-6 h-6" />;
    }
  };

  const gateways: { id: PaymentGateway; name: string; description: string }[] = [
    { id: 'stripe', name: 'Stripe', description: 'Credit/Debit Card' },
    { id: 'razorpay', name: 'Razorpay', description: 'Multiple payment options' },
    { id: 'paypal', name: 'PayPal', description: 'PayPal account' },
    { id: 'upi', name: 'UPI', description: 'UPI Payment' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount Display */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount to Pay</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {currency === 'INR' ? '₹' : '$'}{amount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              One-time payment for PDF download
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          {/* Payment Gateway Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Payment Method
            </label>
            <div className="space-y-2">
              {gateways.map((gateway) => (
                <button
                  key={gateway.id}
                  onClick={() => setSelectedGateway(gateway.id)}
                  disabled={loading}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition-all ${
                    selectedGateway === gateway.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-blue-600 dark:text-blue-400">
                    {getGatewayLogo(gateway.id)}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {gateway.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {gateway.description}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedGateway === gateway.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {selectedGateway === gateway.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* UPI ID Input (shown only when UPI is selected) */}
          {selectedGateway === 'upi' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={loading}
              />
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading || !selectedGateway || !email}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              `Pay ${currency === 'INR' ? '₹' : '$'}${amount}`
            )}
          </button>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Your payment is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
