
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Booking } from '../types.ts';
import { getBookings } from '../utils/localStorage.ts';

const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const [booking, setBooking] = useState<Booking | null>(null);
  const bookingId = location.state?.bookingId;

  useEffect(() => {
    if (bookingId) {
      const allBookings = getBookings();
      const foundBooking = allBookings.find(b => b.id === bookingId);
      setBooking(foundBooking || null);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="text-center p-10 bg-bms-charcoal rounded-lg">
        <h1 className="text-2xl font-bold">Booking not found or an error occurred.</h1>
        <Link to="/" className="text-bms-red hover:underline mt-4 inline-block">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-bms-charcoal rounded-lg shadow-xl text-center">
      <svg className="mx-auto h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl font-bold mt-4">Booking Successful!</h1>
      <p className="text-gray-300 mt-2">Your tickets have been confirmed. A confirmation email has been sent to {booking.customerEmail}.</p>

      <div className="mt-8 text-left bg-bms-dark p-6 rounded-lg space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Booking ID:</span>
          <span className="font-mono font-bold">{booking.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Movie:</span>
          <span className="font-bold">{booking.movieTitle}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Seats:</span>
          <span className="font-bold">{booking.seats.join(', ')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Price:</span>
          <span className="font-bold text-bms-red">₹{booking.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Date & Time:</span>
          <span className="font-bold">{new Date(booking.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/my-bookings" className="bg-bms-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
          View All Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccessPage;