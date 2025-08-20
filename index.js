// index.js
// where your node app starts

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// If running behind a reverse proxy (Glitch, Replit, Render, etc.) use the
// left-most X-Forwarded-For IP as the client IP.
app.set('trust proxy', true);

// enable CORS so FCC can test your API
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// sample endpoint kept for reference
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Required endpoint: Request Header Parser
app.get('/api/whoami', (req, res) => {
  // Try X-Forwarded-For first, fall back to req.ip
  const fwdFor = req.headers['x-forwarded-for'];
  const ipaddress = (fwdFor ? fwdFor.split(',')[0].trim() : req.ip) || '';

  const language = req.headers['accept-language'] || '';
  const software = req.headers['user-agent'] || '';

  res.json({ ipaddress, language, software });
});

// listen
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
