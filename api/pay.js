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
        
        // EXACT URL - NO PATHS
        const url = 'https://api.smartcodedesigners.co.ke';
        
        console.log('Sending to:', url);
        console.log('Phone:', p);
        console.log('Amount:', amount);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-secret': 'kthx9bnnggn'  // Your friend's actual secret
            },
            body: JSON.stringify({
                amount: Number(amount),
                phone: p,
                load_response: true
            })
        });

        // Try to get response text even if not JSON
        const text = await response.text();
        console.log('Raw response:', text);
        
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = { raw: text };
        }
        
        // Check if successful
        if (response.ok) {
            return res.json({
                status: 'success',
                message: `✓ Check your phone to pay KES ${amount} to KENTAH`,
                debug: data
            });
        } else {
            return res.status(response.status).json({
                status: 'error',
                message: `API Error (${response.status})`,
                debug: data
            });
        }

    } catch (error) {
        console.error('Fatal error:', error);
        
        return res.status(500).json({
            status: 'error',
            message: 'Network error: ' + error.message,
            debug: error.toString()
        });
    }
}