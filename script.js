///// This is used to store data in local storage using json file.

function saveFormData() {
    
    const formData = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value
    };


     const jsonData = JSON.stringify(formData);

     localStorage.setItem('userData',jsonData);

}
