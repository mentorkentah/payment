let payments = {};

export default function handler(req, res) {
  const { username } = req.query;

  if (payments[username] === "paid") {
    return res.status(200).json({ paid: true });
  }

  return res.status(200).json({ paid: false });
}