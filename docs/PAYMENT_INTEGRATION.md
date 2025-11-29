# Payment Integration Guide

## Overview
This application now includes payment processing for PDF downloads with support for multiple payment gateways and ATS (Applicant Tracking System) score calculation.

## Features

### 1. Payment Gateways
- **Stripe**: Credit/Debit card payments
- **Razorpay**: Multiple payment options (cards, UPI, wallets, net banking)
- **PayPal**: PayPal account payments
- **UPI**: Direct UPI payments for Indian users

### 2. ATS Score Calculator
- Real-time resume analysis
- Score breakdown by category:
  - Keywords (25 points)
  - Format (20 points)
  - Sections (25 points)
  - Length (15 points)
  - Readability (15 points)
- Personalized recommendations
- Visual score display with progress indicators

### 3. Download Management
- One-time payment: $5.99 (or ₹499 for Indian users)
- Up to 5 downloads per payment
- 30-day access period
- Secure download links
- Resume data storage for regeneration

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env` file:

```env
# Existing Supabase variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Payment Gateway API Keys (add these)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_RAZORPAY_KEY_ID=rzp_test_...
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 2. Database Setup

Follow instructions in `DATABASE_SETUP.md` to set up the required database tables.

### 3. Payment Gateway Configuration

#### Stripe Setup
1. Create account at https://stripe.com
2. Get your publishable key from Dashboard > Developers > API keys
3. Add webhook endpoint for payment confirmations
4. Add key to `.env` as `VITE_STRIPE_PUBLIC_KEY`

#### Razorpay Setup
1. Create account at https://razorpay.com
2. Get your Key ID from Settings > API Keys
3. Add webhook for payment status updates
4. Add key to `.env` as `VITE_RAZORPAY_KEY_ID`

#### PayPal Setup
1. Create developer account at https://developer.paypal.com
2. Create an app and get Client ID
3. Configure return URLs
4. Add key to `.env` as `VITE_PAYPAL_CLIENT_ID`

#### UPI Setup
For UPI payments, you'll need to:
1. Use Razorpay's UPI integration, OR
2. Integrate with a UPI payment aggregator
3. Configure UPI ID validation

## Usage

### For Users

1. **Create Your Resume**: Fill in all sections with your information
2. **Check ATS Score**: View your ATS compatibility score in the sidebar
3. **Improve Score**: Follow recommendations to optimize your resume
4. **Download**: Click "Download PDF" button
5. **Complete Payment**: Choose payment method and complete transaction
6. **Download**: After successful payment, download your PDF

### For Developers

#### ATS Score Calculation

```typescript
import { calculateATSScore } from './utils/atsScoreCalculator';

const scoreData = calculateATSScore({
  name: 'John Doe',
  title: 'Software Engineer',
  sections: [...],
  skills: [...],
  experiences: [...],
  educations: [...],
  projects: [...]
});

console.log(scoreData.score); // 0-100
console.log(scoreData.recommendations); // Array of suggestions
```

#### Payment Processing

```typescript
import DownloadWithPayment from './components/payment/DownloadWithPayment';

<DownloadWithPayment
  onDownload={() => generatePdf()}
  resumeData={resumeData}
  userEmail="user@example.com"
/>
```

#### Payment Modal

```typescript
import PaymentModal from './components/payment/PaymentModal';

<PaymentModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onPaymentSuccess={(gateway, txnId) => {
    console.log('Payment successful:', gateway, txnId);
  }}
  amount={5.99}
  currency="USD"
/>
```

## API Integration

### Payment Webhook Handling

Create an edge function or API endpoint to handle payment webhooks:

```typescript
// Example: Stripe webhook handler
import { supabase } from './utils/supabaseClient';

export async function handleStripeWebhook(event: any) {
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Update payment status in database
    await supabase
      .from('payments')
      .update({ payment_status: 'completed' })
      .eq('transaction_id', paymentIntent.id);

    // Create download record
    await supabase
      .from('downloads')
      .insert({
        payment_id: paymentIntent.metadata.payment_id,
        user_email: paymentIntent.receipt_email,
        resume_data: JSON.parse(paymentIntent.metadata.resume_data),
        max_downloads: 5,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
  }
}
```

## Security Best Practices

1. **Never store payment card details** - Use payment gateway tokens
2. **Validate all inputs** - Check email format, amounts, etc.
3. **Use HTTPS only** - Ensure all payment pages use HTTPS
4. **Implement webhook verification** - Verify webhook signatures
5. **Log all transactions** - Keep audit trail of all payments
6. **Use environment variables** - Never commit API keys
7. **Rate limit API calls** - Prevent abuse
8. **Validate download access** - Check payment status before allowing downloads

## Testing

### Test Mode
All payment gateways provide test mode. Use test credentials:

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

**Razorpay Test Cards:**
- Success: `4111 1111 1111 1111`
- OTP: `123456`

**PayPal:**
- Use sandbox account for testing

**UPI:**
- Use test UPI IDs provided by gateway

### Testing Checklist
- [ ] Test each payment gateway
- [ ] Test payment success flow
- [ ] Test payment failure flow
- [ ] Test webhook processing
- [ ] Test download access
- [ ] Test download expiration
- [ ] Test download count limit
- [ ] Test ATS score calculation
- [ ] Test mobile responsiveness

## Pricing

Default pricing (can be customized):
- **USD**: $5.99
- **INR**: ₹499
- **EUR**: €5.49

To change pricing, update `DOWNLOAD_PRICE` constant in:
`src/components/payment/DownloadWithPayment.tsx`

## Troubleshooting

### Payment Not Processing
1. Check API keys are correct in `.env`
2. Verify payment gateway is in live mode (not test)
3. Check browser console for errors
4. Verify webhook endpoints are configured

### Download Not Available After Payment
1. Check payment status in database
2. Verify download record was created
3. Check download expiration date
4. Verify user email matches payment email

### ATS Score Not Updating
1. Ensure resume data is being passed correctly
2. Check for console errors
3. Verify all required fields are present

## Support

For issues or questions:
1. Check console errors first
2. Verify environment variables
3. Review database logs
4. Check payment gateway dashboard
5. Review Supabase logs

## Future Enhancements

Potential improvements:
- Multiple resume storage
- Subscription model
- Premium features
- Advanced ATS analysis
- Template marketplace
- Collaboration features
- AI-powered suggestions
- Interview preparation tools
