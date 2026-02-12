<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pay to KENTAH</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .payment-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 450px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        h1 {
            color: #2d3748;
            font-size: 2.2em;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #718096;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #4a5568;
            font-weight: 500;
            font-size: 0.95em;
        }

        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }

        .prefix {
            position: absolute;
            left: 15px;
            color: #718096;
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1em;
            transition: all 0.3s ease;
            outline: none;
        }

        .phone-input {
            padding-left: 50px;
        }

        input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        button {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            margin-top: 10px;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .message {
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 25px;
            font-size: 0.95em;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .success {
            background: #c6f6d5;
            border: 2px solid #9ae6b4;
            color: #22543d;
        }

        .error {
            background: #fed7d7;
            border: 2px solid #fc8181;
            color: #742a2a;
        }

        .info {
            background: #bee3f8;
            border: 2px solid #90cdf4;
            color: #2c5282;
        }

        .amount-hint {
            font-size: 0.85em;
            color: #718096;
            margin-top: 5px;
        }

        .loader {
            display: none;
            text-align: center;
            margin-top: 20px;
        }

        .loader.active {
            display: block;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <?php
    // Initialize variables
    $message = '';
    $msg_type = '';

    // Function to send STK push via Smart Code Designers API
    function sendSTKPush($phone, $amount) {
        $url = "https://smartcodedesigners.co.ke/api/v1/";
        $apiSecret = "kthx9bnnggn"; // Your API secret key
        
        // Format phone number to 254xxxxxxxxx
        $phone = preg_replace('/\D/', '', $phone);
        if (strlen($phone) === 9 && substr($phone, 0, 1) === '7') {
            $phone = '254' . $phone;
        } elseif (strlen($phone) === 10 && substr($phone, 0, 1) === '0') {
            $phone = '254' . substr($phone, 1);
        }
        
        // Prepare data according to documentation
        $data = array(
            'amount' => (float)$amount,
            'phone' => $phone,
            'load_response' => true // 👈 Enables immediate response
        );

        $info = json_encode($data);

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: Application/json',
            'Api-secret: ' . $apiSecret
        ]);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $info);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);

        if (curl_errno($curl)) {
            $error = curl_error($curl);
            curl_close($curl);
            return [
                'status' => 'error',
                'message' => "Curl error: $error"
            ];
        }

        curl_close($curl);
        $response_data = json_decode($resp, true);
        
        // Add http_code for debugging
        return $response_data;
    }

    // Handle form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pay_now'])) {
        $phone = $_POST['phone'] ?? '';
        $amount = $_POST['amount'] ?? '';
        
        // Validation
        $errors = [];
        
        if (empty($phone)) {
            $errors[] = "Phone number is required";
        }
        
        if (empty($amount)) {
            $errors[] = "Amount is required";
        } elseif (!is_numeric($amount) || $amount < 2 || $amount > 1000) {
            $errors[] = "Amount must be between KES 2 and KES 1000";
        }
        
        // Format and validate phone
        $formatted_phone = preg_replace('/\D/', '', $phone);
        if (strlen($formatted_phone) === 9 && substr($formatted_phone, 0, 1) === '7') {
            $formatted_phone = '254' . $formatted_phone;
        } elseif (strlen($formatted_phone) === 10 && substr($formatted_phone, 0, 1) === '0') {
            $formatted_phone = '254' . substr($formatted_phone, 1);
        }
        
        if (strlen($formatted_phone) !== 12 || substr($formatted_phone, 0, 3) !== '254') {
            $errors[] = "Please enter a valid MPESA phone number (e.g., 0712345678 or 254712345678)";
        }
        
        if (empty($errors)) {
            // Send STK Push
            $response = sendSTKPush($phone, $amount);
            
            // Debug response (you can remove this in production)
            error_log("Smart Code Designers Response: " . print_r($response, true));
            
            // Check response based on actual API response structure
            if (isset($response['status']) && $response['status'] === 'success') {
                $message = "✓ STK Push sent successfully! Check your phone to complete the payment of KES " . number_format($amount, 2) . " to KENTAH.";
                $msg_type = "success";
            } elseif (isset($response['success']) && $response['success'] === true) {
                $message = "✓ STK Push sent successfully! Check your phone to complete the payment of KES " . number_format($amount, 2) . " to KENTAH.";
                $msg_type = "success";
            } elseif (isset($response['status']) && $response['status'] === true) {
                $message = "✓ STK Push sent successfully! Check your phone to complete the payment of KES " . number_format($amount, 2) . " to KENTAH.";
                $msg_type = "success";
            } else {
                $error_msg = $response['message'] ?? $response['msg'] ?? $response['error'] ?? 'Unknown error occurred';
                $message = "❌ Failed to send STK Push: " . $error_msg . ". Please try again.";
                $msg_type = "error";
                
                // Show full response in debug mode (remove in production)
                if (isset($response)) {
                    $message .= "<br><small>Debug: " . htmlspecialchars(print_r($response, true)) . "</small>";
                }
            }
        } else {
            $message = "❌ " . implode("<br>❌ ", $errors);
            $msg_type = "error";
        }
    }
    ?>

    <div class="payment-card">
        <div class="header">
            <h1>💰 PAY TO KENTAH</h1>
            <div class="subtitle">Secure M-PESA Payments</div>
        </div>

        <?php if (!empty($message)): ?>
            <div class="message <?php echo $msg_type; ?>">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="" id="paymentForm">
            <div class="form-group">
                <label>📱 M-PESA Phone Number</label>
                <div class="input-wrapper">
                    <span class="prefix">+254</span>
                    <input 
                        type="tel" 
                        name="phone" 
                        class="phone-input"
                        placeholder="712345678"
                        value="<?php echo isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : ''; ?>"
                        required
                    >
                </div>
                <div class="amount-hint">Enter phone number starting with 7 or 0 (e.g., 0712345678)</div>
            </div>

            <div class="form-group">
                <label>💵 Amount (KES)</label>
                <div class="input-wrapper">
                    <span class="prefix">KES</span>
                    <input 
                        type="number" 
                        name="amount" 
                        class="phone-input"
                        placeholder="100"
                        min="2"
                        max="1000"
                        step="1"
                        value="<?php echo isset($_POST['amount']) ? htmlspecialchars($_POST['amount']) : ''; ?>"
                        required
                    >
                </div>
                <div class="amount-hint">Minimum: KES 2 | Maximum: KES 1000</div>
            </div>

            <button type="submit" name="pay_now" id="payBtn">
                🔒 PAY NOW WITH M-PESA
            </button>
        </form>

        <div class="loader" id="loader">
            <div class="spinner"></div>
            <p style="margin-top: 15px; color: #4a5568;">Sending STK Push to your phone...</p>
        </div>

        <div style="margin-top: 30px; text-align: center; color: #718096; font-size: 0.8em;">
            <p>⚡ Powered by Smart Code Designers</p>
            <p style="margin-top: 5px;">You will receive an STK prompt on your phone to complete payment</p>
        </div>
    </div>

    <script>
        // Show loader on form submit
        document.getElementById('paymentForm').addEventListener('submit', function() {
            document.getElementById('loader').classList.add('active');
          //  document.getElementById('payBtn').disabled = true;
            document.getElementById('payBtn').style.opacity = '0.7';
        });

        // Auto-hide message after 10 seconds
        setTimeout(function() {
            const message = document.querySelector('.message');
            if (message) {
                message.style.transition = 'opacity 0.5s';
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
            }
        }, 10000);
    </script>
</body>
</html>