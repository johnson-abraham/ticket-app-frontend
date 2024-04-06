import { useCallback, useEffect, useRef, useState } from 'react';
import { TicketForm } from '../../model/ticket-form';
import { Passenger } from '../../model/passenger';
import { AvailableSeats } from '../info/available-seats';

interface BookTicketPageProps {
  onSuccessfulBooking: (passenger: Passenger) => void;
}

export const BookTicketPage: React.FC<BookTicketPageProps> = ({
  onSuccessfulBooking,
}) => {
  const sourceStation = 'London';
  const destinationStation = 'Paris';
  const price = 5;

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [seatId, setSeatId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const onSubmit = useCallback(() => {
    if (email && firstName && lastName) {
      fetch('http://localhost:8080/seats/bookTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          sourceStation,
          destinationStation,
          seatId,
          price,
        } as TicketForm),
      })
        .then((obj) => obj.json())
        .then((result) => {
          if (result.errorMessage) {
            setErrorMessage(result.errorMessage);
          } else {
            onSuccessfulBooking(result);
          }
        });
    }
  }, [email, firstName, lastName, onSuccessfulBooking, seatId]);

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        ref={emailRef}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFirstName(event.target.value)
        }
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setLastName(event.target.value)
        }
      />
      <input
        type="text"
        value={sourceStation}
        disabled
        placeholder="Source Station"
      />
      <input
        type="text"
        value={destinationStation}
        disabled
        placeholder="Destination Station"
      />
      <AvailableSeats onSeatSelection={setSeatId} />
      <input type="text" value={'$' + price} disabled placeholder="Price" />
      <button onClick={onSubmit}>Book Ticket</button>
      {errorMessage ? <div>{errorMessage}</div> : null}
    </div>
  );
};
