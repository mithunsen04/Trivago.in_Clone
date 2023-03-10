const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem(storedEmail);

  if (!passwordInput.value) {
    // Show error message if password input field is empty
    const error = document.createElement('p');
    error.textContent = 'Enter your password.';
    error.style.color = '#DB3734';
    error.style.marginTop = '8px';
    error.style.textAlign = 'center';
    error.style.borderRadius = '8px';

    passwordInput.insertAdjacentElement('afterend', error);
  } else if (passwordInput.value !== storedPassword) {
    // Show error message if password is incorrect
    const error = document.createElement('p');
    error.textContent = 'The email/password combination you entered is wrong. Please double-check both or click “Forgot your password?”.';
    error.style.color = '#DB3734';
    error.style.marginTop = '8px';
    error.style.textAlign = 'center';
    error.style.borderRadius = '8px';
    passwordInput.insertAdjacentElement('afterend', error);
  } else {
    // Redirect to index.html page
    window.location.href = 'index.html';
  }
});

// Show email and navigate to login page when clicked
const emailLabel = document.querySelector('[for="email"]');
const storedEmail = localStorage.getItem('email');
emailLabel.innerHTML = `<   ${storedEmail}`;
emailLabel.addEventListener('click', () => {
  window.location.href = 'login.html';
});

// Insert emailLabel element before h1 element
const mainDiv = document.getElementById('main');
const h1Element = document.querySelector('#main h1');
mainDiv.insertBefore(emailLabel, h1Element);

// Adjust position of emailLabel element
emailLabel.style.marginTop = '30px';
emailLabel.style.marginBottom = '0px'

const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'Password';

const passwordInp = document.getElementById('password');
passwordInp.insertAdjacentElement('beforebegin', passwordLabel);

// Remove error message when user enters a password
passwordInput.addEventListener('input', () => {
  const passwordError = document.querySelector('#password + p');
  if (passwordInput.value && passwordError) {
    passwordError.remove();
  }
});
