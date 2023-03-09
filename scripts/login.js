const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (!emailInput.value) {
    // Show error message if email input field is empty
    const error = document.createElement('div');
    // const error = document.createElement('p');
    error.textContent = 'Enter your email address.';
    error.style.color = '#DB3734';
    error.style.border = '1px solid #DB3734'
    error.style.height = '35px'
    error.style.width = '357px'
    error.style.position = 'relative'
    error.style.marginTop = '8px'
    error.style.textAlign = 'center'
    
    emailInput.insertAdjacentElement('afterend', error);
  } else {
    // Check if email entered by user matches with the email stored in local storage
    const storedEmail = localStorage.getItem('email');
    if (emailInput.value === storedEmail) {
      window.location.href = 'password.html';
    } else {
      // Store the email entered by user in local storage and redirect to create.html page
      localStorage.setItem('email', emailInput.value);
      window.location.href = 'create.html';
    }
  }
});
 // Handle login form submit
 const form = document.querySelector('form');
 form.addEventListener('submit', (event) => {
   event.preventDefault();

   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   // Store email in local storage
   localStorage.setItem('email', email);

   // Redirect to password.html
   window.location.href = 'password.html';
 });