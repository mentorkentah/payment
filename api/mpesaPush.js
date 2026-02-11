import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { phone, amount, username } = req.body;

  if (!phone || !amount || !username) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // Safaricom sandbox credentials
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;
    const shortCode = process.env.BUSINESS_SHORTCODE; // e.g., 174379
    const passkey = process.env.PASSKEY;
    const callbackURL = process.env.CALLBACK_URL; // e.g., https://your-vercel-app.vercel.app/api/mpesaCallback

    // Step 1: Get OAuth token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` }
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2: Prepare STK Push
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

    const stkResponse = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,      // customer's phone
        PartyB: shortCode,  // till number
        PhoneNumber: phone,
        CallBackURL: callbackURL,
        AccountReference: username,
        TransactionDesc: "LUMIEARN Activation Fee"
      })
    });

    const stkData = await stkResponse.json();
    res.status(200).json(stkData);

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}