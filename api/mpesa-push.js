export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { phone, amount, username } = req.body;

    // Safaricom M-Pesa push API
    const apiUrl = "https://api.smartcodedesigners.co.ke/push";
    const till = "4560832";
    const apiKey = "kthx9bnnggn";

    const payload = {
      phone,
      amount,
      till,
      callback: `https://yourdomain.vercel.app/api/mpesa-callback?username=${username}`
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) return res.status(400).json(data);

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}