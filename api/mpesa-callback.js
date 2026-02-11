export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({success:false,message:"Method not allowed"});
  const { username, status } = req.body;

  if(status==="success"){
    // Mark user as paid
    const key = "LUMIEARN_USER_"+username.toLowerCase();
    const userData = JSON.parse(localStorage.getItem(key));
    if(userData){
      userData.paid = true;
      localStorage.setItem(key,JSON.stringify(userData));
    }
  }
  res.status(200).json({success:true});
}