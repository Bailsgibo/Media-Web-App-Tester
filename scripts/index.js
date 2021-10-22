//DOM Elements
const accountDetails = document.querySelector('.account-details');

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) { // If user returns a value - "user" is all the info
        var uid = user.uid;
        setupUI(user);
        console.log('User logged in: ', user); // Prints user info to console
    } else { // If user is null
        console.log('User logged out');
        setupUI();
    }
})

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location = 'index.html';
});

const setupUI = (user) => {
    if (user) {
        const username = db.collection('users').doc(user.uid).get('username');
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <div>User ID: ${user.uid}</div>
                <div>Logged in as: ${user.email}</div>
                <div>Username: ${doc.data().username}</div>
            `;
            accountDetails.innerHTML = html;
        });

    } else {
        // clear account info
        accountDetails.innerHTML = '';
    }
};

const getUID = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            accountDetails.innerHTML = html;
        });
    }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


function displayFolder() {

    $(".imagesClass").empty();
    var listvariable = document.getElementById('images');
    //var identity = document.getElementById('divemailMe').value;
    var identity = firebase.auth().currentUser.uid;
    //var selectedfolder = folder_options.innerHTML;
    console.log("identity is " + identity.toString());
    var listRef = storageRef.child('/images/' + identity + '/'); //would add " + selectedfolder + '/' " if wanted folder selection back
    console.log("storageRef.child or listRef is : " + listRef.toString());

    //$('#testry').html('');
    var i = 0;

    listRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            console.log("Image reference: " + imageRef.toString());

            i++;
            displayImage(i, imageRef, listvariable);
        });
    });
} //end display vision board

function displayImage(row, images, location) { //formats images
    images.getDownloadURL().then(function (url) {
        console.log(url);

        let new_html = '';
        //you dont need these breaks, it just makes everything have the weird stair effect
        //new_html += '<br>';
        new_html += '<img src="' + url + '"height = "300px" style="float: center">';
        //new_html += '<br>';
        location.innerHTML += new_html;
    })
}
