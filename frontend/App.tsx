
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import MoviePage from './pages/MoviePage.tsx';
import BookingSuccessPage from './pages/BookingSuccessPage.tsx';
import MyBookingsPage from './pages/MyBookingsPage.tsx';
import DevPage from './pages/DevPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import PaymentModal from './components/PaymentModal.tsx';
import { getBookings, saveBookings } from './utils/localStorage.ts';

function App() {
  useEffect(() => {
    // Seed initial bookings if localStorage is empty
    const existingBookings = getBookings();
    if (existingBookings.length === 0) {
      const seedBookings = [
        {
          id: '1700000000001',
          movieId: "dune-part-two",
          showtimeId: 201,
          movieTitle: "Dune: Part Two",
          seats: ["C5", "C6"],
          price: 500,
          customerEmail: "demo-user@example.com",
          createdAt: "2025-10-26T10:00:00.000Z",
        },
      ];
      saveBookings(seedBookings);
    }
  }, []);

  return (
    <div className="min-h-screen bg-bms-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/dev/integrations" element={<DevPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <PaymentModal />
    </div>
  );
}

export default App;