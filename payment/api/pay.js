const axios = require('axios');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }

    try {
        const { phone, amount } = req.body;

        // Format phone
        let formattedPhone = phone.replace(/\D/g, '');
        if (formattedPhone.length === 9 && formattedPhone.startsWith('7')) {
            formattedPhone = '254' + formattedPhone;
        } else if (formattedPhone.length === 10 && formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        }

        // Validate
        if (!formattedPhone.startsWith('254') || formattedPhone.length !== 12) {
            return res.status(400).json({
                status: 'error',
                message: 'Valid phone required (e.g., 0712345678)'
            });
        }

        if (amount < 2 || amount > 1000) {
            return res.status(400).json({
                status: 'error',
                message: 'Amount must be KES 2 - 1000'
            });
        }

        // Send to Smart Code Designers API
        const response = await axios.post('https://smartcodedesigners.co.ke/api/v1/', {
            amount: parseFloat(amount),
            phone: formattedPhone,
            load_response: true
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Api-secret': 'kthx9bnnggn'
            }
        });

        if (response.data?.status === 'success' || response.data?.success === true) {
            return res.json({
                status: 'success',
                message: `✓ STK sent! Check phone to pay KES ${amount} to KENTAH`
            });
        } else {
            return res.status(400).json({
                status: 'error',
                message: response.data?.message || 'Payment failed'
            });
        }

    } catch (error) {
        console.error('Payment Error:', error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to process payment. Try again.'
        });
    }
};