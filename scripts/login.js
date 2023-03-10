const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (!emailInput.value) {
    // Show error message if email input field is empty
    const error = document.createElement('p');
    error.textContent = 'Enter your email address.';
    error.style.color = '#DB3734';
    error.style.marginTop = '8px';
    error.style.textAlign = 'center';
    error.classList.add('error');
    
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

// Hide error message when user starts typing in email input field
emailInput.addEventListener('input', () => {
  const error = document.querySelector('.error');
  if (error) {
    error.remove();
  }
});
