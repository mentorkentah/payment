// mpesa-callback.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    console.log("MPESA CALLBACK RECEIVED:", body);

    // Example JSON format from Safaricom push
    /*
    {
      "Result": {
        "MerchantRequestID": "12345",
        "CheckoutRequestID": "abcde",
        "ResultCode": 0,
        "ResultDesc": "The service request is processed successfully.",
        "CallbackMetadata": {
          "Item": [
            { "Name": "Amount", "Value": 150 },
            { "Name": "MpesaReceiptNumber", "Value": "ABCDE12345" },
            { "Name": "TransactionDate", "Value": 20260211153000 },
            { "Name": "PhoneNumber", "Value": 254700123456 }
          ]
        }
      }
    }
    */

    // Only mark payment successful if ResultCode is 0
    if (body?.Result?.ResultCode === 0) {

      const phone = body.Result.CallbackMetadata.Item.find(i => i.Name === "PhoneNumber").Value;
      const amount = body.Result.CallbackMetadata.Item.find(i => i.Name === "Amount").Value;

      // Find the user in localStorage via their phone
      // In a Vercel serverless function, you don’t have localStorage.
      // Instead, you would use a DB. For testing on frontend, you can return success to trigger frontend update.
      // Here we just respond OK
      console.log(`Payment successful for phone ${phone}, amount ${amount}`);

      // Send response back to Safaricom API
      return res.status(200).json({
        ResultCode: 0,
        ResultDesc: "Payment received successfully"
      });
    }

    // Payment failed
    return res.status(200).json({
      ResultCode: 1,
      ResultDesc: "Payment failed"
    });

  } catch (err) {
    console.error("MPESA CALLBACK ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}