console.log('In my main.js')

var usernameInput = document.querySelector('#username');
var btnJoin = document.querySelector('#btn-join');

var username;

var webSocket;

function webSocketOnMessage(event){
    var parsedData = JSON.parse(event.data);
    var peerUsername = parsedData['peer'];
    var action = parsedData['action'];

    if(username == peerUsername){
        return;
    }

    var receiver_channel_name = parsedData['message']['receiver_channel_name'];

    if(action == 'new-peer'){
        createOffer(peerUsername, receiver_channel_name);

        return;
    }
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

function createOffer(peerUsername, receiver_channel_name){
    var peer = new RTCPeerConnection(null);

    addLocalTracks(peer);

    var dc = peer.createDataChannel('channel');
    dc.addEventListener('open', () => {
        console.log('Connection opened!');
    });
    dc.addEventListener('message', dcOnMessage);

    var remoteVedio = createVedio(peerUsername);
    setOnTrack(peer, peerUsername);
}

function addLocalTracks(peer){
    localStream.getTracks(),forEach(track => {
        peer.addTrack(track, localStream);
    });

    return;
}

var messageList = document.querySelector('#message-list');
function dcOnMessage(event){
    var message = event.data;

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    messageList.append(li);
}

function createVedio(peerUsername){
    var vedioWrapper = document.querySelector('#vedio-container');

    var remoteVedio = document.createElement('vedio');

    remoteVedio.id = peerUsername + '-vedio';
    remoteVedio.autoplay = true;
    remoteVedio.playsInline = true;

    var vedioWrapper = document.createElement('div');

    vedioContainer.appendChild(vedioWrapper);

    vedioWrapper.appendChild(remoteVedio);

    return remoteVedio;
}

function setOnTrack(peer, remoteVedio){
    var remoteStream = new MediaStream();

    remoteVedio.srcObject = remoteStream;

    peer.addEventListener('track', async (event) => {
        remoteStream.addTrack(event.track, remoteStream);
    });
}