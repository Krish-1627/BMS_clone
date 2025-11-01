
import React from 'react';

interface SeatSelectorProps {
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  pricePerSeat: number;
}

const Seat: React.FC<{ id: string; status: 'available' | 'selected' | 'occupied'; onClick: (id: string) => void }> = ({ id, status, onClick }) => {
  const baseClasses = "w-8 h-8 rounded flex items-center justify-center font-bold text-xs cursor-pointer transition-colors";
  let statusClasses = "";

  switch (status) {
    case 'selected':
      statusClasses = "bg-bms-red text-white";
      break;
    case 'occupied':
      statusClasses = "bg-bms-gray text-gray-500 cursor-not-allowed";
      break;
    default:
      statusClasses = "bg-bms-charcoal border border-gray-500 hover:bg-gray-600";
  }

  return (
    <div
      data-test={`seat-${id}`}
      className={`${baseClasses} ${statusClasses}`}
      onClick={() => status === 'available' && onClick(id)}
    >
      {id.slice(1)}
    </div>
  );
};

const SeatSelector: React.FC<SeatSelectorProps> = ({ selectedSeats, onSeatSelect, pricePerSeat }) => {
  const layout = {
    rows: ['A', 'B', 'C', 'D', 'E'],
    cols: 10,
    occupied: ['A5', 'A6', 'C2', 'D7', 'D8', 'E1'],
  };

  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Select Your Seats</h3>
      <div className="p-4 bg-bms-dark rounded-lg flex flex-col items-center gap-2">
        <div className="w-full h-2 bg-gray-500 rounded-md mb-6 text-center text-xs py-1">SCREEN</div>
        {layout.rows.map(row => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-4 font-bold text-gray-400">{row}</span>
            <div className="flex gap-2">
              {Array.from({ length: layout.cols }, (_, i) => i + 1).map(col => {
                const seatId = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatId);
                const isOccupied = layout.occupied.includes(seatId);
                const status = isSelected ? 'selected' : isOccupied ? 'occupied' : 'available';
                return <Seat key={seatId} id={seatId} status={status} onClick={() => onSeatSelect(seatId)} />;
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-bms-charcoal rounded-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400">Selected Seats: <span className="font-bold text-white">{selectedSeats.join(', ') || 'None'}</span></p>
        </div>
        <div>
          <p className="text-gray-400">Total Price: <span className="font-bold text-xl text-bms-red">₹{totalPrice}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
