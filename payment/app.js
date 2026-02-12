const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Configuration
const API_URL = 'https://smartcodedesigners.co.ke/api/v1/';
const API_SECRET = 'kthx9bnnggn';

// Serve payment page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle payment
app.post('/pay', async (req, res) => {
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

        // Send to API
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
            res.json({
                status: 'success',
                message: `✓ STK sent! Check phone to pay KES ${amount} to KENTAH`
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: response.data?.message || 'Payment failed'
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error. Try again.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`💰 PAY TO KENTAH page ready!`);
});