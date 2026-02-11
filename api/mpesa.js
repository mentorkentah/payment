export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { username, phone, amount } = req.body;

    const response = await fetch("https://api.smartcodedesigners.co.ke/mpesa-push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        phone,
        amount,
        till: "4560832",
        apiKey: process.env.MPESA_API_KEY,
        callbackUrl: "https://lumiearn-pay.vercel.app/api/mpesa-callback"
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success:false });
  }
}