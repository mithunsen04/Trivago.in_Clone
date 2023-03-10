const emailInput = document.getElementById('password');

// Show the user's email in the email input field
const storedEmail = localStorage.getItem('email');
emailInput.value = storedEmail;

function handleSubmit(event) {
  event.preventDefault();

  // Check if email input is empty
  if (!emailInput.value) {
    const error = document.createElement('p');
    error.textContent = 'Enter your email address.';
    error.style.color = '#DB3734';
    error.style.marginTop = '8px';
    error.style.textAlign = 'center';
    error.classList.add('error');

    emailInput.insertAdjacentElement('afterend', error);
    return;
  }

  // Check if email entered by user matches with the email stored in local storage
  const storedEmail = localStorage.getItem('email');
  if (emailInput.value === storedEmail) {
    // Redirect to email.html page
    window.location.href = 'email.html';
  } else {
    // Show error message if email entered by user does not match with the email stored in local storage
    const error = document.createElement('p');
    error.textContent = 'Email not found.';
    error.style.color = '#DB3734';
    error.style.marginTop = '8px';
    error.style.textAlign = 'center';
    error.classList.add('error');

    emailInput.insertAdjacentElement('afterend', error);
  }
}

// Add event listener to form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleSubmit);

// Hide error message when user starts typing in email input field
emailInput.addEventListener('input', () => {
  const error = document.querySelector('.error');
  if (error) {
    error.remove();
  }
});

// Show email and navigate to login page when clicked
const emailLabel = document.querySelector('[for="email"]');
const storedEmai = localStorage.getItem('email');
emailLabel.innerHTML = `< ${storedEmail}`;
emailLabel.addEventListener('click', () => {
  window.location.href = 'login.html';
});

// Insert emailLabel element before h1 element
const mainDiv = document.getElementById('main');
const h1Element = document.querySelector('#main h1');
mainDiv.insertBefore(emailLabel, h1Element);
