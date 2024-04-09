# Real Time Multi-Client Video Conferencing Web App

## Description

This project is designed to facilitate learning about signaling WebRTC SDPs using JavaScript WebSocket and django-channels for developing multi-peer video conferencing systems. It utilizes django-channels and WebSockets for signaling, and WebRTC for establishing peer-to-peer connections, video streaming, and screen sharing. The system supports connecting more than two peers simultaneously.

**Features:**
- Real-time multi-client video conferencing
- WebRTC for peer-to-peer connections
- Support for video and display streaming
- Screen sharing functionality

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/IanMalobaMwakha/SLACK.git
    ```

2. Navigate to the directory with requirements.txt.

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
    ```

## Usage

1. Navigate to the `Slack` directory:
    ```
    cd Slack
    ```

2. Start the development server:
    ```
    python manage.py runserver
    ```

3. For testing on multiple devices within the same LAN, download and install ngrok from [here](https://ngrok.com/download).

4. Run ngrok to make the localhost public:
    ```
    ngrok.exe http 8000
    ```

5. Access the provided public URLs, ensuring to use the one starting with `https:` for accessing media devices.

6. On the local device, go to `http://127.0.0.1:8000/`. On other devices, visit the URL from ngrok starting with `https:`.

7. Once the page is loaded, enter a username and click "Join Room" from each device. Ensure to use different usernames.

8. If remote video does not play, click the "Click to play remote video" button, as some browsers require user gesture to play video.

**Note:**
This README is subject to updates, as the repository is still under development and testing. Some issues may still need to be resolved.

