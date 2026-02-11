// /api/mpesa-push.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  try {
    const { phone, amount, till, accountRef, callback } = req.body;

    if (!phone || !amount || !till || !accountRef || !callback) {
      return res.status(400).json({ status: "error", message: "Missing required parameters" });
    }

    // Safaricom Push API endpoint
    const API_URL = "https://api.smartcodedesigners.co.ke/mpesa/push";
    const API_KEY = "kthx9bnnggn";

    const payload = {
      phone,
      amount,
      till,
      accountRef,
      callback
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      // Respond success to frontend
      return res.status(200).json({ status: "success", message: data.message || "Payment pushed" });
    } else {
      return res.status(400).json({ status: "error", message: data.message || "Payment failed" });
    }

  } catch (err) {
    console.error("MPESA Push Error:", err);
    return res.status(500).json({ status: "error", message: "Server error: " + err.message });
  }
}