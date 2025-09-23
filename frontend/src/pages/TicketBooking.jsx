import React from 'react';
import Ticket from '../components/Ticket';
import TicketBookingForm from '../components/TicketBookingForm';

const TicketBooking = () => {
  return (
    <div className="bg-white min-h-screen p-6">
      <h1
        className="text-4xl font-bold text-center my-10"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Ticket Booking Page
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

        {/* Center - Ticket Booking Form */}
        <div className="">
          <TicketBookingForm />
        </div>

        
        {/* Right Side - Ticket Preview */}
        {/* <div className="border-l  border-gray-200 pl-6">
          <Ticket />
        </div> */}
      </div>
    </div>
  );
};

export default TicketBooking;
