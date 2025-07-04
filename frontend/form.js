// Ensure EmailJS is loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  if (!form) {
    console.error("Form element not found.");
    return;
  }


  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic Validation
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();
    const captcha = grecaptcha.getResponse(); // this is just the token

    // Check reCAPTCHA
    if (!captcha) {
      showMessage("Please complete the reCAPTCHA.", "error");
      return;
    }

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }


    // Send EmailJS request
    emailjs
      .sendForm("service_3snxvmo", "template_k0flekj", form)
      .then(() => {
        showMessage("✅ Message sent successfully!", "success");
        form.reset();
        grecaptcha.reset(); // ✅ correct usage
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        showMessage("❌ Failed to send message. Please try again.", "error");
      });
  });


  function showMessage(text, type) {
    messageBox.innerText = text;
    messageBox.className = type;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageBox.innerText = "";
      messageBox.className = "";
    }, 5000);
  }


});


