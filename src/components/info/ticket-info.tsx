import { Ticket } from '../../model/ticket';

interface TicketInfoProps {
  ticket: Ticket;
}

export const TicketInfo: React.FC<TicketInfoProps> = ({ ticket }) => {
  return (
    <div>
      <h2>Ticket Information</h2>
      <p>
        <strong>Source Station:</strong> {ticket.sourceStation}
      </p>
      <p>
        <strong>Destination Station:</strong> {ticket.destinationStation}
      </p>
      <p>
        <strong>Price:</strong> {ticket.price}
      </p>
      <p>
        <strong>Section:</strong> {ticket.section}
      </p>
      <p>
        <strong>Seat Number:</strong> {ticket.seatNumber}
      </p>
      <p>
        <strong>Booking Status:</strong> {ticket.bookingStatus}
      </p>
    </div>
  );
};
