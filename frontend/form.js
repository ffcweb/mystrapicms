// emailjs.init('ue1cJMZhkfqB1jFrTGnPV'); // Your Public Key

// document.getElementById('contact-form').addEventListener('submit', function (e) {
//   e.preventDefault();
//   emailjs.sendForm('service_3snxvmo', 'template_k0flekj', this)
//     .then(() => {
//       alert('Message sent!');
//     }, (error) => {
//       console.error('Email send failed:', error);
//     });
// });
// 



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const message = document.getElementById("form-message");

  if (!form) {
    console.error("Form element not found.");
    return;
  }


  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm('service_3snxvmo', 'template_k0flekj', form)

      .then(() => {
        message.innerText = "✅ Message sent successfully!";
        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        message.innerText = "❌ Failed to send message. Please try again.";
      });


  });
});



