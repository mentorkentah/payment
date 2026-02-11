// /api/mpesa-push.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { phone, amount, username } = req.body;

  if (!phone || !amount || !username) {
    return res.status(400).json({ success: false, message: 'Missing parameters' });
  }

  try {
    // 🔹 Replace these with your Safaricom Sandbox / Live credentials
    const consumerKey = process.env.SAFARICOM_CONSUMER_KEY;
    const consumerSecret = process.env.SAFARICOM_CONSUMER_SECRET;
    const shortCode = process.env.SAFARICOM_SHORTCODE; // Business/Paybill number
    const passKey = process.env.SAFARICOM_PASSKEY;      // For STK push

    // 1️⃣ Get access token
    const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
      }
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2️⃣ Construct STK Push payload
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14);
    const password = Buffer.from(shortCode + passKey + timestamp).toString('base64');

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone.replace(/\D/g,''),   // User phone number
      PartyB: shortCode,
      PhoneNumber: phone.replace(/\D/g,''),
      CallBackURL: `https://your-vercel-domain.vercel.app/api/mpesa-callback`,
      AccountReference: username,
      TransactionDesc: "LUMIEARN Account Activation"
    };

    // 3️⃣ Send STK Push request
    const stkRes = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const stkData = await stkRes.json();

    if(stkData.ResponseCode === "0") {
      // Request successfully sent to user
      return res.status(200).json({ success: true, message: 'STK Push sent', data: stkData });
    } else {
      return res.status(400).json({ success: false, message: stkData.ResponseDescription });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}