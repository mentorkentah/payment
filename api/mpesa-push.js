export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({success:false,message:"Method not allowed"});

  const { username, phone, amount, till, callbackUrl } = req.body;

  if(!username || !phone || !amount || !till || !callbackUrl){
    return res.status(400).json({success:false,message:"Missing fields"});
  }

  try{
    const mpesaApiKey = "kthx9bnnggn"; // Your API key
    const apiUrl = "https://api.smartcodedesigners.co.ke/mpesa/push"; // Test environment

    const response = await fetch(apiUrl,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+mpesaApiKey
      },
      body: JSON.stringify({phone,amount,till,account:username,callback:callbackUrl})
    });

    const data = await response.json();
    res.status(200).json(data);

  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}