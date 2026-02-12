export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { phone, amount } = req.body;
        
        // Format phone to 254xxxxxxxxx
        let p = phone.replace(/\D/g, '');
        if (p.startsWith('0')) p = '254' + p.substring(1);
        if (p.startsWith('7')) p = '254' + p;
        if (p.length === 12 && p.startsWith('254')) {
            // Valid format
        } else {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Use format: 0712345678' 
            });
        }

        // Send to Smart Code Designers
        const response = await fetch('https://smartcodedesigners.co.ke/api/v1/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-secret': 'kthx9bnnggn'
            },
            body: JSON.stringify({
                amount: Number(amount),
                phone: p,
                load_response: true
            })
        });

        const data = await response.json();
        
        if (data.status === 'success' || data.success === true) {
            return res.json({ 
                status: 'success', 
                message: `✓ Check phone to pay KES ${amount} to KENTAH` 
            });
        } else {
            return res.status(400).json({ 
                status: 'error', 
                message: data.message || 'STK failed' 
            });
        }

    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Server error' 
        });
    }
}