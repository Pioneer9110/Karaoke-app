Karaoke Party App

A fun browser-based app where one person (the DJ) hosts a karaoke session, and others join in by scanning a QR code or typing a session code. Users can request songs, and the DJ can accept or reject them in real-time.

-----------------------
How to Run This Project
-----------------------

1. Requirements:
   - Node.js must be installed.
   - A modern web browser (Chrome, Firefox, etc.)

2. Installation:
   a) Download or clone this repository.
   b) Open a terminal and navigate to the project folder:
      cd Karaoke-app

3. Install Dependencies:
   npm install

4. Start the Server:
   npm start

   The server will run at:
   http://localhost:3000

5. Open your browser and visit:
   http://localhost:3000

-------------------
Project Structure
-------------------

Karaoke-app/
├── Landingpage.html   <- Landing page
├── DJ.html            <- DJ control panel (host)
├── User.html          <- User request panel (joiner)
├── Landingpage-style.css    <- Styles for landing page
├── DJ-style.css       <- Styles for DJ panel
├── User-style.css     <- Styles for User panel
├── /server
│   └── server.js      <- Node.js backend server
├── package.json
└── README.txt         <- This guide

-----------------------------
How the App Works (Overview)
-----------------------------

1. The Landingpage is where you can choose if you wish to host or join a session.
2. The DJ hosts the session, which generates a QR code.
3. Users join the session and can scan the code or enter a session code.
4. Users submit YouTube karaoke song links.
5. DJ receives the list of pending requests and can:
   - Accept a request: It moves to the public playlist.
   - Reject a request: It gets removed.
6. All accepted songs appear in real time on the public playlist.
7. Everyone can see what songs are lined up.

-----------------------------
Local Network Testing
-----------------------------

You can test this on multiple devices:

1. Find your local IP (use `ipconfig` or `ifconfig`)
2. Replace "localhost" with your IP when visiting from other devices.
   Example: http://192.168.1.42:3000
3. Make sure all devices are connected to the same Wi-Fi network.

-----------------------
Technology Stack
-----------------------

- HTML, CSS, JavaScript (Frontend)
- Node.js + Express (Backend)
- YouTube Karaoke links (no API needed)
- QR Code generator via CDN (qrcode.min.js)

--------------------------
Created for fun & parties!
--------------------------
