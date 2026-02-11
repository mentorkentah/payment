let payments = {}; // temporary storage (replace with database later)

export default async function handler(req, res) {
  try {

    const body = req.body;

    const username = body.username;
    const status = body.status; // success or failed

    if (status === "success") {
      payments[username] = "paid";
    }

    return res.status(200).json({ message: "Received" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success:false });
  }
}