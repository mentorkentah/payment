export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({message:"Method not allowed"});

  const { till, amount, phone, username } = req.body;

  try{
    const response = await fetch("https://api.smartcodedesigners.co.ke/stkpush",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key":"kthx9bnnggn"
      },
      body: JSON.stringify({ till, amount, phone, username })
    });

    const data = await response.json();
    return res.status(200).json(data);

  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Server error", error: err.message});
  }
}