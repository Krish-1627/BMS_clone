
export interface Showtime {
  id: number;
  time: string;
  screen: string;
  price: number;
}

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  poster: string;
  backdrop: string;
  duration: number;
  language: string;
  genres: string[];
  showtimes: Showtime[];
}

export interface Booking {
  id: string;
  movieId: string;
  showtimeId: number;
  movieTitle: string;
  seats: string[];
  price: number;
  customerEmail: string;
  createdAt: string;
}

export interface EmailLog {
  to: string;
  subject: string;
  body: string;
  at: string;
}

export interface WebhookLog {
  source: string;
  payload: object;
  at: string;
}
