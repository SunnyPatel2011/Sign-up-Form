///// This is used to store data in local storage using json file.

function saveFormData(event) {
    event.preventDefault(); 

    // Retrieve existing data or initialize an empty array
    const existingData = localStorage.getItem('userData');
    const userDataArray = existingData ? JSON.parse(existingData) : [];

    // Create a new user object
    const newUser = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value
    };

    // Add the new user data to the array
    userDataArray.push(newUser);

    // Convert the array to JSON
    const updatedData = JSON.stringify(userDataArray);

    // Store the updated data in Local Storage
    localStorage.setItem('userData', updatedData);

    // Optionally, clear the form fields
    // document.getElementById("firstname").value = "";
    // document.getElementById("lastname").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("password").value = "";
    // document.getElementById("dob").value = "";
    // document.getElementById("gender").value = "";
}
