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

const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'Your email address';

const passwordInp = document.getElementById('password');
passwordInp.insertAdjacentElement('beforebegin', passwordLabel);