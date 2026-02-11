// This endpoint is called by Safaricom when payment is completed
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  try {
    const callbackData = req.body;

    // Example Safaricom callback data structure:
    // {
    //   accountRef: "USERNAME",
    //   amount: 150,
    //   phone: "+254712345678",
    //   status: "success"
    // }

    const { accountRef, status, amount, phone } = callbackData;

    if (!accountRef) {
      return res.status(400).json({ status: "error", message: "Missing accountRef" });
    }

    if (status !== "success") {
      return res.status(200).json({ status: "error", message: "Payment not successful" });
    }

    // Retrieve user from localStorage key (for frontend only testing)
    // For server DB, you would update the database here
    // Vercel serverless cannot access client localStorage directly.
    // Instead, send a signal to frontend to mark user as paid, or store in a DB

    // Respond 200 OK to Safaricom
    return res.status(200).json({ status: "success", message: `Payment received for ${accountRef}` });

  } catch (err) {
    console.error("Callback Error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}