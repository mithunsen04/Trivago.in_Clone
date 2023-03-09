// 
  setTimeout(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem(storedEmail);
    alert(`Your Email and Password is here\nEmail: ${storedEmail}\nPassword: ${storedPassword}`);
  
    const emailParagraph = document.createElement('p');
    emailParagraph.textContent = `Email: ${storedEmail}`;
    emailParagraph.style.marginTop = '8px';
    emailParagraph.style.marginBottom = '8px';
    const mainDiv = document.getElementById('main');
    const thirdParagraph = mainDiv.children[2];
    mainDiv.insertBefore(emailParagraph, thirdParagraph);
  }, 2000);
  