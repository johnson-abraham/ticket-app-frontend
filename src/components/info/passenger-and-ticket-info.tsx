import { PassengerInfo } from './passenger-info';
import { TicketInfo } from './ticket-info';
import { Passenger } from '../../model/passenger';
import { Fragment } from 'react';

interface PassengerAndTicketInfoProps {
  passengers: Passenger[];
  onDelete?: (id: string) => void;
}

export const PassengerAndTicketInfo: React.FC<PassengerAndTicketInfoProps> = ({
  passengers,
  onDelete,
}) => {
  return (
    <>
      {passengers.map((passenger) => (
        <Fragment key={passenger.id}>
          <PassengerInfo passenger={passenger} />
          <TicketInfo ticket={passenger.ticket} />
          {onDelete ? (
            <button onClick={() => onDelete(passenger.id)}>Delete</button>
          ) : null}
        </Fragment>
      ))}
    </>
  );
};
