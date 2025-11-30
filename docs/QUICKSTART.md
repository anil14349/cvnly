# Quick Start Guide - CVnly with Payment Integration

## What's New?

### 1. Enhanced Download with Payment
- Professional payment modal with multiple gateway options
- Secure payment processing
- One-time payment of $5.99 for PDF downloads
- Up to 5 downloads with 30-day validity

### 2. Real-Time ATS Score
- Live scoring as you edit your resume
- Detailed breakdown by category
- Actionable recommendations
- Visual progress indicators

### 3. Multiple Payment Options
- **Stripe**: Credit/Debit cards
- **Razorpay**: Cards, UPI, wallets, net banking
- **PayPal**: PayPal accounts
- **UPI**: Direct UPI payments

## Getting Started

### Step 1: Database Setup (One-Time)

Execute the SQL from `DATABASE_SETUP.md` in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the SQL from `DATABASE_SETUP.md`
5. Click "Run" to execute

### Step 2: Run the Application

```bash
# Start the development server
npm run dev

# In a new terminal, start the PDF server (if needed)
npm run pdf-server

# Or run both together
npm start
```

### Step 3: Test the Features

#### Test ATS Score:
1. Fill in your resume information
2. Check the "ATS Score" widget in the right sidebar
3. View your score (0-100) and recommendations
4. Make improvements based on suggestions

#### Test Payment Flow:
1. Click "Download PDF" button (with lock icon)
2. Payment modal will open
3. Enter your email
4. Select a payment method
5. For demo, all payments succeed after 2 seconds
6. After payment, button changes to green "Download PDF"
7. Click to download your resume

## Key Features

### ATS Score Widget
Located in the right sidebar, shows:
- Overall score with circular progress
- Category breakdown (Keywords, Format, Sections, Length, Readability)
- Up to 5 personalized recommendations
- Color-coded scoring (Green: 80+, Yellow: 60-79, Red: <60)

### Payment Modal
Features:
- Clean, modern UI
- Amount display with currency
- Email input for receipt
- 4 payment gateway options
- UPI ID input (for UPI payments)
- Secure payment processing
- Loading states and error handling

### Download Button
States:
- **Locked** (before payment): Shows price, opens payment modal
- **Processing**: Shows spinner and "Processing..." text
- **Unlocked** (after payment): Green button, allows direct download

## Testing Payment Gateways

### Demo Mode (Current Implementation)
- All payments succeed automatically after 2 seconds
- No real payment processing
- Perfect for testing UI and flow

### Production Mode (To Implement)
1. Add real API keys to `.env`:
```env
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_RAZORPAY_KEY_ID=rzp_live_...
VITE_PAYPAL_CLIENT_ID=...
```

2. Implement actual payment gateway SDKs
3. Add webhook handlers for payment confirmation
4. Enable real transaction processing

## Customization

### Change Download Price

Edit `src/components/payment/DownloadWithPayment.tsx`:
```typescript
const DOWNLOAD_PRICE = 5.99; // Change to your price
const CURRENCY = 'USD';      // Change to your currency
```

### Modify ATS Score Weights

Edit `src/utils/atsScoreCalculator.ts`:
```typescript
// Adjust point allocations
breakdown.keywords = Math.min(25, ...);  // Max 25 points
breakdown.format = Math.max(0, ...);     // Max 20 points
breakdown.sections = sectionsScore;       // Max 25 points
breakdown.length = lengthScore;          // Max 15 points
breakdown.readability = ...;             // Max 15 points
```

### Add Custom Recommendations

Edit `src/utils/atsScoreCalculator.ts` to add your own scoring criteria and recommendations.

## Architecture

### Payment Flow
```
User clicks Download
    ↓
Payment Modal Opens
    ↓
User selects gateway & pays
    ↓
Payment processing (demo: 2s delay)
    ↓
Transaction recorded
    ↓
Download unlocked
    ↓
User downloads PDF
```

### ATS Score Flow
```
User edits resume
    ↓
Data passed to calculateATSScore()
    ↓
Score calculated (0-100)
    ↓
Breakdown by category
    ↓
Recommendations generated
    ↓
UI updates in real-time
```

### Database Structure
```
payments
  - Stores payment transactions
  - Links to downloads

downloads
  - Links to payments
  - Stores resume data
  - Tracks download count & expiry

ats_scores
  - Stores historical scores
  - Tracks recommendations
```

## Troubleshooting

### ATS Score Shows 0
- Ensure resume sections are populated
- Check console for calculation errors
- Verify data is being passed correctly

### Payment Modal Won't Open
- Check console for JavaScript errors
- Ensure button click handler is connected
- Verify modal state management

### Download Button Stuck
- Clear browser cache
- Check network tab for errors
- Verify payment state is updating

### PDF Not Generating
- Ensure resumeContentRef is properly set
- Check PDF generation service is running
- Verify all resume data is valid

## Next Steps

1. **Set up real payment gateways** - Follow `PAYMENT_INTEGRATION.md`
2. **Configure webhooks** - For payment confirmation
3. **Add authentication** - Link payments to user accounts
4. **Implement download tracking** - Count and limit downloads
5. **Add analytics** - Track conversion rates
6. **Enable subscriptions** - Recurring payment options

## Support

Need help?
1. Check `PAYMENT_INTEGRATION.md` for detailed docs
2. Review `DATABASE_SETUP.md` for database issues
3. Check browser console for errors
4. Verify environment variables are set
5. Test with demo payment flow first

## Demo Screenshots

### ATS Score Widget
- Shows circular progress indicator
- Category breakdown with bars
- Recommendations list
- Color-coded scoring

### Payment Modal
- Gateway selection with icons
- Email input field
- Amount display
- Secure payment notice

### Download Button States
- Locked (before payment)
- Processing (during payment)
- Unlocked (after payment)

---

**Happy coding!** Your CV builder now has professional payment processing and ATS scoring capabilities!
