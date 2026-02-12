import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }

    try {
        const { phone, amount } = req.body;

        let formattedPhone = phone.replace(/\D/g, '');
        if (formattedPhone.length === 9 && formattedPhone.startsWith('7')) {
            formattedPhone = '254' + formattedPhone;
        } else if (formattedPhone.length === 10 && formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        }

        if (!formattedPhone.startsWith('254') || formattedPhone.length !== 12) {
            return res.status(400).json({ status: 'error', message: 'Valid phone required (e.g., 0712345678)' });
        }

        if (amount < 2 || amount > 1000) {
            return res.status(400).json({ status: 'error', message: 'Amount must be KES 2 - 1000' });
        }

        const API_URL = 'https://smartcodedesigners.co.ke/api/v1/';
        const API_SECRET = 'kthx9bnnggn';

        const response = await axios.post(API_URL, {
            amount: parseFloat(amount),
            phone: formattedPhone,
            load_response: true
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Api-secret': API_SECRET
            }
        });

        if (response.data?.status === 'success' || response.data?.success === true) {
            return res.status(200).json({ status: 'success', message: `✓ STK sent! Check phone to pay KES ${amount}` });
        } else {
            return res.status(400).json({ status: 'error', message: response.data?.message || 'Payment failed' });
        }

    } catch (error) {
        console.error('Payment error:', error.message);
        return res.status(500).json({ status: 'error', message: 'Server error. Try again.' });
    }
}