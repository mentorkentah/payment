// mpesa-callback.js
export default async function handler(req, res) {
  // Only accept POST requests from Safaricom
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Safaricom sends JSON with ResultCode, Amount, PhoneNumber, etc.
    // For testing, you can log it:
    console.log("M-Pesa Callback Received:", data);

    // Check if payment was successful
    if (data.ResultCode === 0) {
      const username = data.Username || "unknown";

      // Here, normally you would update your database
      // But for your setup with localStorage, we return JSON for frontend
      return res.status(200).json({
        success: true,
        message: "Payment successful",
        username: username,
        amount: data.Amount,
        receipt: data.MpesaReceiptNumber,
        phone: data.PhoneNumber
      });
    } else {
      return res.status(200).json({
        success: false,
        message: data.ResultDesc || "Payment failed",
      });
    }

  } catch (error) {
    console.error("Callback Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}