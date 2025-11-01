
import React, { useState, useEffect } from 'react';
import { Booking } from '../types.ts';
import { getBookings } from '../utils/localStorage.ts';

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-400 p-8 bg-bms-charcoal rounded-lg">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div
              key={booking.id}
              data-test={`booking-${booking.id}`}
              className="bg-bms-charcoal p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold">{booking.movieTitle}</h2>
                <p className="text-sm text-gray-400">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                <p className="font-mono text-xs text-gray-500 mt-1">ID: {booking.id}</p>
              </div>
              <div className="text-left md:text-right">
                 <p className="font-semibold">Seats: <span className="font-bold text-white">{booking.seats.join(', ')}</span></p>
                 <p className="font-semibold text-lg text-bms-red mt-1">Total: ₹{booking.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;