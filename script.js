function saveFormData(event) {
    event.preventDefault();

    console.log("Form submitted!"); // Debugging statement

    const existingData = localStorage.getItem('userData');
    const userDataArray = existingData ? JSON.parse(existingData) : [];

    const newUser = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value
    };

    userDataArray.push(newUser);

    const updatedData = JSON.stringify(userDataArray);

    localStorage.setItem('userData', updatedData);

    // Debugging statement
    console.log("User data saved:", JSON.parse(localStorage.getItem('userData')));

    // Optionally, clear the form fields
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("gender").value = "";
}