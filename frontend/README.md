# BookMyShow Clone for MIND (Final)

## Run (single command)
1. Install dependencies (root):
```bash
npm install
```
2. Start frontend + backend together:
```bash
npm run dev
```
This runs the Vite frontend and the mock backend concurrently.
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

## Backend endpoints
- `GET /api/movies`
- `GET /api/movies/:id`
- `GET /api/bookings`
- `POST /api/bookings`
- `POST /api/ai/bookMovie`  (MIND trigger endpoint)
- `GET /api/search?q=...`

## Notes
- All movie data is mock and stored in `server/data/movies.json`.
- Bookings are stored in `server/data/bookings.json`.
- No TMDB or Google API keys needed.