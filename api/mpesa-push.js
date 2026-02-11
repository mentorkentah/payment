export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({status:"error", message:"Method not allowed"});
  
  const { till, phone, amount, username, callback_url } = req.body;

  try {
    const apiKey = process.env.MPESA_API_KEY; // store secret in Vercel env
    const response = await fetch("https://api.smartcodedesigners.co.ke/mpesa/push", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({ till, phone, amount, username, callback_url })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({status:"error", message: err.message});
  }
}