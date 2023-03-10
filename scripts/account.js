// Get the first name and last name inputs
const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');

// Get the update personal information button
const updatePersonalInformationButton = document.getElementById('updateinformation');

// When the update personal information button is clicked
updatePersonalInformationButton.addEventListener('click', () => {
  // Store the first name and last name in local storage
  localStorage.setItem('firstName', firstNameInput.value);
  localStorage.setItem('lastName', lastNameInput.value);
});
