function validateAndSubmit(event) {
    event.preventDefault(); 


    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;


    const namepattern = /^[A-Za-z]+$/;
    const emailpattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const inputDate = new Date(dob);
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 100);
    
    clearErrorMessages();
  
    ///// Firstname /////

    if (!firstname) {
        displayError("firstname", "Please fill out Firstname field");
        return;
    }

    if (!namepattern.test(firstname)) {
        displayError("firstname", 'Alphabetic characters only.');
        return;
    }

    ///// Lastname //////

    if (!lastname) {
        displayError("lastname", "Please fill out lastname field");
        return;
    }

    if (!namepattern.test(lastname)) {
        displayError("lastname", "Alphabetic characters only.");
        return;
    }

    ////// Email ///////

    if (!email) {
        displayError("email", "Please fill out Email field");
        return;
    }

    if (!emailpattern.test(email)) {
        displayError("email", "Please enter a valid email address.");
        return;
    }

    ////// password ///////

    if (!password) {
        displayError("password", "Please fill out password field");
        return;
    }

    if (!password.trim() === "") {
        displayError("password", "Please fill out password field");
        return;
    }

    ///// Date of Birth ///////

    if (!dob) {
        displayError("dob", "Please fill out dob field");
        return;
    }

    if (inputDate > currentDate || inputDate < minDate) {
        displayError("dob", "Invalid date of birth. Age must be between 0 and 100 years.");
        return;
    }

    ////// GENDER ///////

    if (!gender) {
        displayError("gender", "Please fill out the gender field");
        return;
    }
    

        const existingData = localStorage.getItem('userData');
        const userDataArray = existingData ? JSON.parse(existingData) : [];

    const newUser = {
        firstname,
        lastname,
        email,
        password,
        dob,
        gender
    };

 
    userDataArray.push(newUser);

     const updatedData = JSON.stringify(userDataArray); 

     localStorage.setItem('userData', updatedData);

     document.getElementById("firstname").value = "";
     document.getElementById("lastname").value = "";
     document.getElementById("email").value = "";
     document.getElementById("password").value = "";
     document.getElementById("dob").value = "";
     document.getElementById("gender").value = "";


     function displayError(field, message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.color = "red";  
        errorDiv.style.fontSize = "12px";
        errorDiv.style.marginTop = "5px";
        errorDiv.innerHTML = message;
    
        const fieldElement = document.getElementById(field);
        fieldElement.parentNode.insertBefore(errorDiv, fieldElement.nextSibling);

        fieldElement.addEventListener("focus", function () {
            errorDiv.remove();
        });
    }
 
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((errorMessage) => errorMessage.remove());
    }
}
