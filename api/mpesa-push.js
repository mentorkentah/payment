export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  
  const API_KEY = process.env.MPESA_API_KEY; // set in Vercel env
  const { phone, amount, till, accountRef, callback } = req.body;
  
  try {
    const response = await fetch("https://api.smartcodedesigners.co.ke/mpesa/push", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({ phone, amount, till, accountRef, callback })
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({status:'error', message:e.message});
  }
}