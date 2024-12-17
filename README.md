# Real-Time Multi-Client Video Conferencing Web App  

## Overview  

This project is a simple **Real-Time Multi-Client Video Conferencing Web App** that leverages **Django Channels**, **WebSockets**, and **WebRTC**. The application facilitates learning and implementation of signaling protocols and peer-to-peer (P2P) connections to create a dynamic video conferencing system with features like multi-peer connections, video streaming, and screen sharing.  


## Features  

- **Real-Time Communication**: Supports simultaneous connections for multiple clients.  
- **WebRTC Integration**: Utilizes WebRTC for P2P video and display streaming.  
- **Screen Sharing**: Built-in functionality for sharing screens during video calls.  
- **Efficient Signaling**: Uses Django Channels and WebSockets for signaling Session Description Protocols (SDPs).  
- **Mesh Topology**: Each peer establishes a direct connection with all other peers in the room.  


## How It Works  

### **Session Description Protocol (SDP)**  
The application exchanges SDPs to initiate P2P connections between clients. SDPs contain critical information like media capabilities and connection details.  

### **Signaling Process**  
1. Both peers connect to the signaling server using WebSockets.  
2. SDPs are exchanged via the server.  
3. Once SDPs are shared, a direct P2P connection is established, and the signaling server is no longer needed.  

### **Mesh Topology**  
1. A new peer joins the room and notifies all other peers of its entry.  
2. Existing peers send **offer SDPs** to the new peer.  
3. The new peer responds with **answer SDPs**.  
4. Once SDPs are exchanged, the new peer is connected to all existing peers.  


## Installation  

### **Prerequisites**  
Ensure you have the following installed:  
- Python 3.8 or higher  
- pip (Python package manager)  
- Virtualenv (recommended for isolated environments)  

### **Steps to Set Up the Project**  
1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/IanMalobaMwakha/SLACK.git  
   cd SLACK  
    ```

2. Navigate to the directory with [requirements.txt](https://github.com/ianmaloba/SLACK/blob/main/requirements.txt).

3. Create a virtual environment:
    - For Windows:
        ```
        python -m venv venv
        venv\Scripts\activate.bat
        ```
    - For Unix or MacOS:
        ```
        python -m venv venv
        source venv/bin/activate
        ```

4. Ensure pip is up to date:
    ```
    python -m pip install --upgrade pip
    ```

5. Install dependencies:
    ```
    pip install -r requirements.txt


6. Run Migrations:
    ```
    python manage.py migrate  
    ```

## Usage
### **Starting the Application** 

1. Start the development server:
    ```
    python manage.py runserver
    ```

2. For testing on multiple devices within the same LAN, download and install ngrok from [here](https://ngrok.com/download).

3. Run ngrok to make the localhost public:
    ```
    ngrok.exe http 8000
    ```

4. Access the provided public URLs, ensuring to use the one starting with `https:` for accessing media devices.

5. On the local device, go to `http://127.0.0.1:8000/`. On other devices, visit the URL from ngrok starting with `https:`.

6. Join a Room:
    - Enter a unique username and click "Join Room."
    - Ensure different usernames for each device.

7. Enable Remote Video Playback:
    - Some browsers may require user gestures to play remote video. If the video does not start, click the "Click to play remote video" button.
    
### **Key Concepts** 
WebRTC establishes a direct connection between peers by exchanging SDPs that describe media capabilities and connection parameters.

1. Signaling Server
    - Required only for exchanging SDPs.
    - Implements Django Channels and WebSockets for signaling.
    - After signaling, peers communicate directly without the server.
2. Channel Groups
    - Groups act as "rooms" for peers.
    - Messages broadcast to all peers within a group using Django Channels.

## Example Code
### Signaling Consumer (`Chat/consumers.py`)

Handles WebSocket connections and SDP exchanges.
```
import json  
from channels.generic.websocket import AsyncWebsocketConsumer  

class ChatConsumer(AsyncWebsocketConsumer):  
    async def connect(self):  
        self.room_group_name = 'Test-Room'  
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)  
        await self.accept()  

    async def disconnect(self, code):  
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)  
        print('Disconnected')  

    async def receive(self, text_data):  
        receive_dict = json.loads(text_data)  
        action = receive_dict['action']  

        if action in ['new-offer', 'new-answer']:  
            receiver_channel_name = receive_dict['message']['receiver_channel_name']  
            await self.channel_layer.send(receiver_channel_name, {  
                'type': 'send.sdp',  
                'receive_dict': receive_dict  
            })  
            return  

        receive_dict['message']['receiver_channel_name'] = self.channel_name  
        await self.channel_layer.group_send(self.room_group_name, {  
            'type': 'send.sdp',  
            'receive_dict': receive_dict  
        })  

    async def send_sdp(self, event):  
        receive_dict = event['receive_dict']  
        await self.send(text_data=json.dumps(receive_dict))  

```

## License
This project is licensed under the [MIT License](https://github.com/ianmaloba/SLACK/blob/main/LICENSE).


## References:
- [Django Channels Documentation](https://channels.readthedocs.io/en/stable/)
- [WebRTC Official Guide](https://webrtc.org/getting-started/overview)
- [Ngrok Documentation](https://ngrok.com/docs/)

## Note:
This README is subject to updates, as the repository is still under development and testing. Some issues may still need to be resolved

