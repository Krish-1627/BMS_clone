
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext.tsx';
import { addBooking, addEmailLog } from '../utils/localStorage.ts';
import SeatSelector from './SeatSelector.tsx';

const PaymentModal: React.FC = () => {
  const context = useContext(MovieContext);
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerEmail, setCustomerEmail] = useState('demo-user@example.com');
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset state when modal opens/closes
    setSelectedSeats([]);
    setCustomerEmail('demo-user@example.com');
    setError('');
  }, [context?.isModalOpen]);

  if (!context) return null;
  const { isModalOpen, closeModal, selectedMovie, selectedShowtime } = context;

  if (!isModalOpen || !selectedMovie || !selectedShowtime) {
    return null;
  }

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prevSeats =>
      prevSeats.includes(seatId)
        ? prevSeats.filter(s => s !== seatId)
        : [...prevSeats, seatId]
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat.');
      return;
    }
    if (!customerEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setError('Please enter a valid email address.');
        return;
    }
    setError('');

    const bookingId = Date.now().toString();
    const totalPrice = selectedSeats.length * selectedShowtime.price;

    const newBooking = {
      id: bookingId,
      movieId: selectedMovie.id,
      showtimeId: selectedShowtime.id,
      movieTitle: selectedMovie.title,
      seats: selectedSeats,
      price: totalPrice,
      customerEmail,
      createdAt: new Date().toISOString(),
    };

    addBooking(newBooking);

    const emailLog = {
      to: customerEmail,
      subject: `Booking Confirmed: ${selectedMovie.title}`,
      body: `Your booking ID is ${bookingId}. Seats: ${selectedSeats.join(', ')}. Total: ₹${totalPrice}`,
      at: new Date().toISOString(),
    };
    addEmailLog(emailLog);
    
    closeModal();
    navigate('/booking-success', { state: { bookingId } });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/70" onClick={closeModal}></div>
      <div className="relative bg-bms-charcoal rounded-lg shadow-xl w-full max-w-2xl p-6 m-4 transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
            <p className="text-sm text-gray-400">
              {new Date(selectedShowtime.time).toLocaleString()} | {selectedShowtime.screen}
            </p>
          </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="space-y-6">
          <SeatSelector
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
            pricePerSeat={selectedShowtime.price}
          />

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email for confirmation</label>
            <input
              id="email"
              type="email"
              data-test="customer-email-input"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full bg-bms-dark border border-bms-gray rounded-md px-3 py-2 text-white focus:ring-bms-red focus:border-bms-red"
              placeholder="your-email@example.com"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            data-test="confirm-book-btn"
            onClick={handleConfirmBooking}
            className="w-full bg-bms-red text-white font-bold py-3 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-500"
            disabled={selectedSeats.length === 0}
          >
            Confirm & Book (₹{selectedSeats.length * selectedShowtime.price})
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;