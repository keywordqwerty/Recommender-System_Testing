 //REGISTER NEW USER AND PUT TO JSON
 function register() {
    let newUsername = document.getElementById('newUsername').value;
    let newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[newUsername]) {
            alert('Username already exists');
        } else {
            users[newUsername] = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful');
        }
    } else {
        alert('Please enter a username and password');
    }
}

    //MAKE USER BE ABLE TO LOGIN AND GO TO NEXTPAGE
    function login() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
    
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username] === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'nextpage.html';
        } else {
            alert('Invalid username or password');
        }
    }

    // reset all users and their preferences
    function resetAll() {
        localStorage.removeItem('users');
        localStorage.removeItem('userPrefs');
        localStorage.removeItem('currentUser');
        alert('All users and preferences have been reset.');
        console.log('All users and preferences have been reset.');
}


   function logAllUserPrefs(){
    let userPrefs = JSON.parse(localStorage.getItem('userPrefs')) || {};
    Object.keys(userPrefs).forEach(user => {
        console.log(`Preferences for user ${user}:`, userPrefs[user])
    });
   }