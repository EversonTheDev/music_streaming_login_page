// Form switching
function switchForm(formType) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const successMsg = document.getElementById("successMessage");

  successMsg.classList.remove("show");

  if (formType === "signup") {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  } else {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  }

  // Clear all forms
  document.getElementById("login").reset();
  document.getElementById("signup").reset();
  clearErrors();
}

// Password toggle visibility
function togglePassword(inputId, iconElement) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";

  iconElement.classList.toggle("toggled");
}

// Clear all error messages
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((err) => err.classList.remove("show"));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((inp) => inp.classList.remove("error"));
}

// Show error message
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(inputId + "Error");

  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateUsername(username) {
  return (
    username.length >= 3 &&
    username.length <= 20 &&
    /^[a-zA-Z0-9_]+$/.test(username)
  );
}

function validatePassword(password) {
  return password.length >= 8;
}

// Login form submission
document.getElementById("login").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  let isValid = true;

  if (!email) {
    showError("loginEmail", "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError("loginEmail", "Please enter a valid email address");
    isValid = false;
  }

  if (!password) {
    showError("loginPassword", "Password is required");
    isValid = false;
  }

  if (isValid) {
    // Here you would typically send data to your backend
    const formData = {
      email: email,
      password: password,
    };

    console.log("Login Data:", formData);

    // Show success message
    const successMsg = document.getElementById("successMessage");
    successMsg.textContent = "✓ Login successful! Redirecting...";
    successMsg.classList.add("show");

    // Simulate redirect after 2 seconds
    setTimeout(() => {
      console.log("Redirecting to dashboard...");
    }, 2000);
  }
});

// Signup form submission
document.getElementById("signup").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  if (!username) {
    showError("signupUsername", "Username is required");
    isValid = false;
  } else if (!validateUsername(username)) {
    showError(
      "signupUsername",
      "Username must be 3-20 characters and contain only letters, numbers, and underscores"
    );
    isValid = false;
  }

  if (!email) {
    showError("signupEmail", "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError("signupEmail", "Please enter a valid email address");
    isValid = false;
  }

  if (!password) {
    showError("signupPassword", "Password is required");
    isValid = false;
  } else if (!validatePassword(password)) {
    showError("signupPassword", "Password must be at least 8 characters long");
    isValid = false;
  }

  if (!confirmPassword) {
    showError("confirmPassword", "Please confirm your password");
    isValid = false;
  } else if (password !== confirmPassword) {
    showError("confirmPassword", "Passwords do not match");
    isValid = false;
  }

  if (isValid) {
    // Here you would typically send data to your backend
    const formData = {
      username: username,
      email: email,
      password: password,
      subscriptionType: "free", // Default subscription type
      dateJoined: new Date().toISOString().split("T")[0],
    };

    console.log("Signup Data:", formData);

    // Show success message
    const successMsg = document.getElementById("successMessage");
    successMsg.textContent = "✓ Account created successfully! Please log in.";
    successMsg.classList.add("show");

    // Switch to login form after 2 seconds
    setTimeout(() => {
      switchForm("login");
    }, 2000);
  }
});

// Real-time validation on input
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      this.classList.remove("error");
      const errorElement = document.getElementById(this.id + "Error");
      if (errorElement) {
        errorElement.classList.remove("show");
      }
    }
  });
});
