// /api/mpesa-push.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, phone, amount } = req.body;

  if (!username || !phone || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // --- M-Pesa API credentials ---
  const tillNumber = "4560832";
  const apiKey = "kthx9bnnggn";

  // --- Simulate API push ---
  // In production, you would call Safaricom API here
  try {
    // Example fetch (replace with real Safaricom API endpoint)
    const pushResponse = await fetch("https://api.smartcodedesigners.co.ke/mpesa/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        till: tillNumber,
        phone,
        amount,
        username,
        callback_url: `${req.headers.origin}/api/mpesa-callback?username=${username}`
      })
    });

    const data = await pushResponse.json();

    if (!pushResponse.ok) {
      return res.status(500).json({ error: data.message || "Failed to send push" });
    }

    // Respond success
    return res.status(200).json({ message: "Payment push sent successfully", data });

  } catch (err) {
    return res.status(500).json({ error: "Network error: " + err.message });
  }
}