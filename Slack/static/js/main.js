console.log('In my main.js')

var usernameInput = document.querySelector('#username');
var btnJoin = document.querySelector('#btn-join');

var username;

var webSocket;

function webSocketOnMessage(event){
    var parsedData = JSON.parse(event.data);
    var message = parsedData['message'];

    console.log('message: ', message);
}

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

    var labelUsername = document.querySelector('#label-username');
    labelUsername.innerHTML = username;

    var loc = window.location;
    var wsStart = 'ws://';

    if(loc.protocol == 'https:'){
        wsStart = 'wss://';
    }

    var endPoint = wsStart + loc.host + loc.pathname;

    console.log('endpoint: ', endPoint);

    webSocket = new WebSocket(endPoint);

    webSocket.addEventListener('open', (e) => {
        console.log('Connection Opened!');

        sendSignal('new-peer', {});
    });
    
    webSocket.addEventListener('message', webSocketOnMessage);

    webSocket.addEventListener('close', (e) => (
        console.log('Connection Closed!')
    ));

    webSocket.addEventListener('error', (e) => (
        console.log('Error Occured!')
    ));

});

var localStream = new MediaStream();

const constraints = {
    'video': true,
    'audio': true
};

const localVideo = document.querySelector('#local-video');

var userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = localStream;
        localVideo.muted = true;
    })
    .catch(error => {
        console.log('Error accessing media devices.', error);
    });

function sendSignal(action, message){
    var jsonStr = JSON.stringify({
        'peer': username,
        'action': action,
        'message': message
    });

    webSocket.send(jsonStr);
}
