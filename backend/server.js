/**
 * BookMyShow Clone — Railway + Vercel Integrated Backend (Final Stable Build v2)
 * ---------------------------------------------------------------------------
 * Supports:
 * ✅ Movie list retrieval
 * ✅ Manual & AI-driven bookings
 * ✅ Search endpoint
 * ✅ Auto movie creation for AI requests
 * ✅ JSON persistence (backend/data/)
 * ✅ Static assets serving
 * ✅ Fully Railway-compatible (no ESM / CJS conflict)
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// -------------------- CORS Configuration --------------------
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://bookmyshow-mind.vercel.app', // your real Vercel domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ CORS blocked request from:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

// -------------------- File Directories --------------------
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, '../frontend/dist');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// -------------------- Utility Functions --------------------
function readJson(file, def = []) {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`⚠️ Error reading ${file}:`, err.message);
    return def;
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('❌ Error writing JSON file:', err.message);
  }
}

// -------------------- Seed Demo Movies --------------------
const seedMovies = [
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    overview: 'A biographical thriller about J. Robert Oppenheimer.',
    poster: '/assets/posters/oppenheimer.jpg',
    backdrop: '/assets/posters/oppenheimer_back.jpg',
    duration: 180,
    language: 'English',
    genres: ['Drama', 'History'],
    showtimes: [{ id: 101, time: '2025-11-01T18:30:00', screen: 'Screen 1', price: 300 }],
  },
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    overview: 'The epic continuation of Dune’s story.',
    poster: '/assets/posters/dune.jpg',
    backdrop: '/assets/posters/dune_back.jpg',
    duration: 155,
    language: 'English',
    genres: ['Action', 'Sci-Fi'],
    showtimes: [{ id: 201, time: '2025-11-02T20:00:00', screen: 'Screen 2', price: 350 }],
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    overview: 'A team travels through a wormhole in search of a new home for humanity.',
    poster: '/assets/posters/interstellar.jpg',
    backdrop: '/assets/posters/interstellar_back.jpg',
    duration: 169,
    language: 'English',
    genres: ['Adventure', 'Sci-Fi'],
    showtimes: [{ id: 301, time: '2025-11-03T19:00:00', screen: 'Screen 3', price: 280 }],
  },
  {
    id: 'they-call-him-og',
    title: 'They Call Him OG',
    overview: 'The continuing story of OG.',
    poster: '/assets/posters/Og.jpg',
    backdrop: '/assets/posters/Og_back.jpg',
    duration: 122,
    language: 'English',
    genres: ['Crime', 'Drama'],
    showtimes: [{ id: 401, time: '2025-11-04T21:00:00', screen: 'Screen 4', price: 260 }],
  },
];

// Initialize once (don’t overwrite existing movies on Railway)
if (!fs.existsSync(MOVIES_FILE)) writeJson(MOVIES_FILE, seedMovies);
if (!fs.existsSync(BOOKINGS_FILE)) writeJson(BOOKINGS_FILE, []);

// -------------------- API Routes --------------------

// Health Check
app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    message: '✅ BookMyShow backend active on Railway',
    version: '1.0.7',
    endpoints: ['/api/movies', '/api/bookings', '/api/ai/bookMovie', '/api/search'],
  });
});

// Get all movies
app.get('/api/movies', (req, res) => {
  console.log('📡 /api/movies accessed');
  const movies = readJson(MOVIES_FILE, seedMovies);
  res.json(movies);
});

// Get single movie
app.get('/api/movies/:id', (req, res) => {
  const movies = readJson(MOVIES_FILE, seedMovies);
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

// Get bookings
app.get('/api/bookings', (req, res) => {
  res.json(readJson(BOOKINGS_FILE, []));
});

// Manual booking
app.post('/api/bookings', (req, res) => {
  const { movieId, movieTitle, seats, price, customerEmail } = req.body;
  if (!movieId || !movieTitle)
    return res.status(400).json({ error: 'Missing required fields' });

  const bookings = readJson(BOOKINGS_FILE, []);
  const booking = {
    id: Date.now().toString(),
    movieId,
    movieTitle,
    seats: seats || [],
    price: price || 0,
    customerEmail: customerEmail || 'demo@example.com',
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(booking);
  writeJson(BOOKINGS_FILE, bookings);
  res.json({ success: true, booking });
});

// AI booking
app.post('/api/ai/bookMovie', (req, res) => {
  const { movieName, seats, customerEmail } = req.body || {};
  if (!movieName) return res.status(400).json({ error: 'movieName required' });

  const movies = readJson(MOVIES_FILE, seedMovies);
  let movie =
    movies.find((m) => m.id.toLowerCase() === movieName.toLowerCase()) ||
    movies.find((m) => m.title.toLowerCase() === movieName.toLowerCase());

  if (!movie) {
    movie = {
      id: movieName.toLowerCase().replace(/\s+/g, '-'),
      title: movieName,
      overview: 'Auto-generated movie for AI booking demo.',
      poster: '/assets/posters/default.jpg',
      backdrop: '/assets/posters/default_back.jpg',
      duration: 120,
      language: 'English',
      genres: ['Drama'],
      showtimes: [
        { id: Date.now(), time: new Date().toISOString(), screen: 'Auto', price: 250 },
      ],
    };
    const moviesList = readJson(MOVIES_FILE, []);
    moviesList.unshift(movie);
    writeJson(MOVIES_FILE, moviesList);
  }

  const price = movie.showtimes?.[0]?.price || 250;
  const booking = {
    id: Date.now().toString(),
    movieId: movie.id,
    movieTitle: movie.title,
    seats: seats || ['A1', 'A2'],
    price,
    customerEmail: customerEmail || 'demo@mind.ai',
    createdAt: new Date().toISOString(),
  };

  const bookings = readJson(BOOKINGS_FILE, []);
  bookings.unshift(booking);
  writeJson(BOOKINGS_FILE, bookings);

  res.json({
    success: true,
    message: `Booked ${booking.seats.length} tickets for "${booking.movieTitle}"`,
    booking,
  });
});

// Search
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const movies = readJson(MOVIES_FILE, seedMovies);
  const result = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.genres.join(' ').toLowerCase().includes(q)
  );
  res.json(result);
});

// Serve frontend (for Vercel integration)
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
  });
}

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
