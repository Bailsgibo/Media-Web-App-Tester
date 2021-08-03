function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((userCredential) => {
            // Signed in
            window.alert("Signing in...")
            var user = userCredential.user;
            // ...
        window.location = 'index.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error1: " + errorMessage);
        });

}

function logout() {

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.alert("LOGOUT SUCCESFUL")
        window.location = 'login.html';
    }).catch((error) => {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error2: " + errorMessage)

    });


}

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            var user = firebase.auth().currentUser;


        } else { 
            // User is signed out
            // ...
            window.alert("you are signed out...");
            //document.getElementById("user_div").style.display = "none";
            //document.getElementById("login_div").style.display = "block";
        }
    });