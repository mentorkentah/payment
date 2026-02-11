// /api/mpesa-callback.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = req.body; // Safaricom sends JSON payload

    // Safaricom STK push callback structure
    const resultCode = body.Body?.stkCallback?.ResultCode;
    const resultDesc = body.Body?.stkCallback?.ResultDesc;
    const checkoutRequestID = body.Body?.stkCallback?.CheckoutRequestID;
    const metadata = body.Body?.stkCallback?.CallbackMetadata?.Item;

    // Extract relevant info
    const amountItem = metadata?.find(i => i.Name === "Amount");
    const phoneItem = metadata?.find(i => i.Name === "PhoneNumber");
    const accountRefItem = metadata?.find(i => i.Name === "AccountReference");

    const amount = amountItem?.Value;
    const phone = phoneItem?.Value;
    const username = accountRefItem?.Value;

    if(resultCode === 0 && username){
      // Payment successful

      // --- Update localStorage equivalent in frontend ---
      // Since this is backend, you can return info for frontend to update localStorage
      // In real DB, you'd mark user as paid
      // Here we just respond OK
      console.log(`Payment success for ${username}, Phone: ${phone}, Amount: ${amount}`);

      return res.status(200).json({ success: true, message: 'Payment successful', username, phone, amount });
    } else {
      console.log(`Payment failed: ${resultDesc}`);
      return res.status(400).json({ success: false, message: resultDesc });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}