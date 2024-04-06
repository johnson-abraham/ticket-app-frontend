import { PassengerInfo } from './passenger-info';
import { TicketInfo } from './ticket-info';
import { Passenger } from '../../model/passenger';
import { useCallback, useState } from 'react';
import { AvailableSeats } from './available-seats';

interface PassengerAndTicketInfoProps {
  passengers: Passenger[];
  onDelete?: (id: string) => void;
  onUpdateSeat?: (
    passengerId: string,
    oldSeatId: string,
    newSeatId: string,
  ) => void;
}

export const PassengerAndTicketInfo: React.FC<PassengerAndTicketInfoProps> = ({
  passengers,
  onDelete,
  onUpdateSeat,
}) => {
  return (
    <>
      {passengers.map((passenger) => (
        <PassengerAndTicketInfoItem
          passenger={passenger}
          onDelete={onDelete}
          onUpdateSeat={onUpdateSeat}
          key={passenger.id}
        />
      ))}
    </>
  );
};

interface PassengerAndTicketInfoItemProps {
  passenger: Passenger;
  onDelete?: (id: string) => void;
  onUpdateSeat?: (
    passengerId: string,
    oldSeatId: string,
    newSeatId: string,
  ) => void;
}

export const PassengerAndTicketInfoItem: React.FC<
  PassengerAndTicketInfoItemProps
> = ({ passenger, onDelete, onUpdateSeat }) => {
  const [seatId, setSeatId] = useState('');

  const update = useCallback(() => {
    if (onUpdateSeat) {
      onUpdateSeat(passenger.id, passenger.ticket.id, seatId);
    }
  }, [onUpdateSeat, passenger.id, passenger.ticket.id, seatId]);

  return (
    <>
      <PassengerInfo passenger={passenger} />
      <TicketInfo ticket={passenger.ticket} />
      {onDelete ? (
        <p>
          <button onClick={() => onDelete(passenger.id)}>Delete</button>
        </p>
      ) : null}
      {onUpdateSeat ? (
        <p>
          <AvailableSeats onSeatSelection={setSeatId} />
          <button onClick={update}>Update Seat</button>
        </p>
      ) : null}
    </>
  );
};
