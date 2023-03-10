const passwordForm = document.getElementById('loginForm');
const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Check if password inputs are empty
  if (!password1Input.value || !password2Input.value) {
    const passwordError = document.createElement('p');
    passwordError.textContent = 'Please enter both passwords';
    passwordError.style.color = 'red';
    passwordError.style.textAlign = 'center';
    password2Input.insertAdjacentElement('afterend', passwordError);
    return; // stop the function execution
  }

  // Check if password inputs match
  if (password1Input.value !== password2Input.value) {
    const passwordError = document.createElement('p');
    passwordError.textContent = 'Passwords do not match';
    passwordError.style.color = 'red';
    passwordError.style.textAlign = 'center';
    password2Input.insertAdjacentElement('afterend', passwordError);
    return; // stop the function execution
  }

  // Get the stored email from local storage
  const storedEmail = localStorage.getItem('email');

  // Update the password in local storage
  localStorage.setItem(storedEmail, password1Input.value);

  // Redirect to password.html page
  window.location.href = 'password.html';
});

// Show email and navigate to login page when clicked
const emailLabel = document.querySelector('[for="email"]');
const storedEmail = localStorage.getItem('email');
emailLabel.innerHTML = `< ${storedEmail}`;
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

// Add labels for password inputs
const password1Label = document.createElement('label');
password1Label.setAttribute('for', 'password1');
password1Label.textContent = 'Create new password';
password1Input.insertAdjacentElement('beforebegin', password1Label);

const password2Label = document.createElement('label');
password2Label.setAttribute('for', 'password2');
password2Label.textContent = 'Confirm new password';
password2Input.insertAdjacentElement('beforebegin', password2Label);

// Remove error message when user enters a password in either input
password1Input.addEventListener('input', () => {
  const passwordError = document.querySelector('#password1 + p');
  if (password1Input.value && passwordError) {
    passwordError.remove();
  }
});

password2Input.addEventListener('input', () => {
  const passwordError = document.querySelector('#password2 + p');
  if (password2Input.value && passwordError) {
    passwordError.remove();
  }
});
