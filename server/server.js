const ytSearch = require('yt-search');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sessions = {}; // Store all requests here
const acceptedSongs = {}; 

// Add song to a session
app.post('/api/request-song', async (req, res) => {
  const { sessionId, song } = req.body;

  // 1. Search YouTube
  const searchQuery = `${song} karaoke`;
  const result = await ytSearch(searchQuery);

  // 2. Pick the best result (with 'karaoke' in title)
  const video = result.videos.find(v => v.title.toLowerCase().includes('karaoke')) || result.videos[0];

  if (!video) {
    return res.status(404).json({ message: 'No karaoke video found!' });
  }

  // 3. Prepare the song object
  const songData = {
    title: video.title,
    url: video.url,
    requestedName: song,
  };

  // 4. Store in session
  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }

  sessions[sessionId].push(songData);

  res.json({ message: 'Karaoke link found!', video: songData });
});

// Get all requests for a session
app.get('/api/requests/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const songs = sessions[sessionId] || [];
  res.json(songs);
});

app.post('/api/accept-song', (req, res) => {
    const { sessionId, song } = req.body;
  
    if (!acceptedSongs[sessionId]) {
      acceptedSongs[sessionId] = [];
    }
  
    // Add song with a UID
    acceptedSongs[sessionId].push({ id: Date.now(), ...song });
  
    // Remove from pending (optional)
    if (sessions[sessionId]) {
      sessions[sessionId] = sessions[sessionId].filter(s => s.url !== song.url);
    }
  
    res.json({ success: true });
  });

  // ❌ Reject a song (just removes it from pending list)
app.post('/api/reject-song', (req, res) => {
    const { sessionId, song } = req.body;
  
    if (sessions[sessionId]) {
      sessions[sessionId] = sessions[sessionId].filter(s => s.url !== song.url);
    }
  
    res.json({ success: true });
  });
  
  // Get accepted songs for a session
app.get('/api/accepted/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId;
    const accepted = acceptedSongs[sessionId] || [];
    res.json(accepted);
  });

app.listen(port, () => {
  console.log(`🎵 Karaoke server running at http://localhost:${port}`);
});
