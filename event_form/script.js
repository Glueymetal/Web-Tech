document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  let isValid = true;

  // Reset errors
  document.querySelectorAll(".error").forEach(el => el.innerText = "");

  // Name
  if (form.name.value.trim() === "") {
    document.getElementById("nameError").innerText = "Name is required.";
    isValid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.value.trim())) {
    document.getElementById("emailError").innerText = "Enter a valid email address.";
    isValid = false;
  }

  // Phone
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(form.phone.value.trim())) {
    document.getElementById("phoneError").innerText = "Enter a 10-digit phone number.";
    isValid = false;
  }

  // Age
  const age = parseInt(form.age.value.trim(), 10);
  if (isNaN(age) || age < 5 || age > 100) {
    document.getElementById("ageError").innerText = "Age must be between 5 and 100.";
    isValid = false;
  }

  // Time slot
  if (form.timeslot.value === "") {
    document.getElementById("timeslotError").innerText = "Please select a preferred time slot.";
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});
