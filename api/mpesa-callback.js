// /api/mpesa-callback.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, status } = req.body;

  if (!username || status !== "success") {
    return res.status(400).json({ error: "Invalid callback" });
  }

  try {
    // Update user in localStorage (for client testing)
    // In production, you would update your database
    // Vercel serverless cannot directly access browser localStorage
    // So you can return a flag for client to mark user paid
    return res.status(200).json({ message: "Payment confirmed for " + username });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}