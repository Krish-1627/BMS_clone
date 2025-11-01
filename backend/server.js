// backend/server.js -- TEMP DEBUG MODE (allows all origins, logs requests)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// DEBUG: allow all origins for diagnosis
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`➡ ${new Date().toISOString()} ${req.method} ${req.path} origin=${req.headers.origin || 'N/A'}`);
  next();
});

const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, '../frontend/dist');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

function readJson(file, def = []) {
  try { return JSON.parse(fs.readFileSync(file,'utf8')); } catch { return def; }
}
function writeJson(file, data) {
  try { fs.writeFileSync(file, JSON.stringify(data, null, 2)); } catch (err) { console.error(err); }
}

const seedMovies = [ /* keep your seed data here (unchanged) */ ];
writeJson(MOVIES_FILE, seedMovies);
if (!fs.existsSync(BOOKINGS_FILE)) writeJson(BOOKINGS_FILE, []);

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'backend reachable (debug mode)', version: 'debug' });
});

app.get('/api/movies', (req, res) => {
  console.log('📡 /api/movies called');
  res.json(readJson(MOVIES_FILE, []));
});

// (rest of your routes unchanged)
app.post('/api/bookings', (req, res) => {
  const { movieId, movieTitle, seats, price, customerEmail } = req.body;
  if (!movieId || !movieTitle) return res.status(400).json({ error: 'Missing required fields' });
  const bookings = readJson(BOOKINGS_FILE, []);
  const booking = { id: Date.now().toString(), movieId, movieTitle, seats: seats||[], price: price||0, customerEmail: customerEmail||'demo@example.com', createdAt: (new Date()).toISOString() };
  bookings.unshift(booking); writeJson(BOOKINGS_FILE, bookings);
  res.json({ success: true, booking });
});

// other routes unchanged...
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
  app.get('*', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')));
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Debug backend running on port ${PORT}`));
