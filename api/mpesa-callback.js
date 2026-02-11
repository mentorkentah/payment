// mpesa-callback.js
// This file should be hosted at https://<your-vercel-domain>/mpesa-callback.js

// Example URL: mpesa-callback.js?username=johndoe&status=success

(function() {
  // Parse query parameters
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  const status = params.get("status");

  if(!username || !status){
    console.error("Invalid callback parameters");
    document.body.innerHTML = "<h2>Payment callback failed: Missing parameters</h2>";
    return;
  }

  if(status.toLowerCase() === "success"){
    const userKey = "LUMIEARN_USER_" + username.toLowerCase();
    let userData = JSON.parse(localStorage.getItem(userKey));

    if(!userData){
      console.error("User not found in localStorage");
      document.body.innerHTML = "<h2>User not found</h2>";
      return;
    }

    // Mark user as paid
    userData.paid = true;
    userData.activatedAt = new Date().toISOString();
    localStorage.setItem(userKey, JSON.stringify(userData));

    // Save logged in user
    localStorage.setItem("LUMIEARN_LOGGED_IN", username);

    // Redirect to dashboard after short delay
    document.body.innerHTML = "<h2>Payment confirmed! Redirecting to your dashboard...</h2>";
    setTimeout(()=> window.location.href="dashboard.html", 2000);

  } else {
    document.body.innerHTML = "<h2>Payment failed or canceled</h2>";
  }
})();