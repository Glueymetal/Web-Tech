document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".error").forEach(el => el.innerText = "");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = parseInt(document.getElementById("age").value.trim(), 10);

  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required.";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerText = "Enter a valid email.";
    isValid = false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById("phoneError").innerText = "Enter a 10-digit phone number.";
    isValid = false;
  }

  if (isNaN(age) || age < 18) {
    document.getElementById("ageError").innerText = "You must be at least 18 years old.";
    isValid = false;
  }

  // No timeslot check here, since you removed it from HTML

  if (isValid) {
    alert("Form submitted successfully!");
    this.reset();
  }
});
