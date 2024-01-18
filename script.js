function validateAndSubmit(event) {
    event.preventDefault(); 


    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;


    const namepattern = /^[A-Za-z]+$/;
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const inputDate = new Date(dob);
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 100);

    ///// Firstname /////

    if (!firstname) {
        alert("please fill out Firstname feild");
        return;
    }
    
        if (!namepattern.test(firstname)) {
            alert('First name should only contain letters');
            return;
        
    }
    

     ///// Lastname //////

    if (!lastname) {
        alert("please fill out Lastname feild");
        return;
    }

    if (!namepattern.test(lastname)) {
        alert("Last name should only contain letters");
        return;
    }

    ////// Email ///////
    
    if (!email) {
        alert("please fill out Email feild");
        return;
    }

    if (!emailpattern.test(email)) {
        alert("Please enter valid email address");
        return;
    }

    ////// password ///////

    
    if (!password) {
        alert("please fill out password feild");
        return;
    }

    if (!password.trim() === "") {
        alert("Please fill out password feild");
        return;
    }

    ///// Date of Birth ///////

    

    if (inputDate > currentDate || inputDate < minDate) {
        alert("Invalid date of birth. Age must be between 0 and 100 years.");
        return;
    }

    ////// GENDER ///////
    

    if (!gender) {
        alert("Please fill out the gender feild");
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

     // Convert the array to JSON
     const updatedData = JSON.stringify(userDataArray);
 
     // Store the updated data in Local Storage
     localStorage.setItem('userData', updatedData);

     document.getElementById("firstname").value = "";
     document.getElementById("lastname").value = "";
     document.getElementById("email").value = "";
     document.getElementById("password").value = "";
     document.getElementById("dob").value = "";
     document.getElementById("gender").value = "";

}