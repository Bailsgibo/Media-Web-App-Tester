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
    window.location = 'signup.html';
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