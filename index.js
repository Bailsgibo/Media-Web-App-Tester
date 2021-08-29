// DOM elements
// document.getelementbyid("").innerhtml = uid
const boardList = document.querySelector('.boards');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

//retrieve one document and save it to userDetails

const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
        <div>User ID: ${user.uid}</div>
        <div>Logged in as: ${user.email}</div>
        <div>Username: ${user.bio}</div>
      `;
            accountDetails.innerHTML = html;
        });
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // clear account info
        accountDetails.innerHTML = '';
        // toggle user elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// setup boards
const setupBoards = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const board = doc.data();
            const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${board.title} </div>
          <div class="collapsible-body white"> ${board.content} </div>
        </li>
      `;
            html += li;
        });
        boardList.innerHTML = html;
    } else {
        boardList.innerHTML = '';
    }


};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
