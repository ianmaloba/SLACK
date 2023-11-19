console.log('In my main.js')

var usernameInput = documet.querySelector('#username');
var btnJoin = documet.querySelector('#btn-join');

var username;

btnJoin.addEventListener('click', () => {
    username = usernameInput.value;

    console.log('username: ', username);

    if(username == ''){
        return;
    }

    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibility = 'hidden';

    btnJoin.disabled = true;
    btnJoin.style.visibility = 'hidden';

    var labelUsername = document.querySelector('#username');
    labelUsername.innerHTML = username;

});