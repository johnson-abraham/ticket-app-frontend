import { BookTicketPage } from './book-ticket-page';
import React, { useCallback, useState } from 'react';
import { Passenger } from '../../model/passenger';
import { PassengerAndTicketInfo } from '../info/passenger-and-ticket-info';

export const BookTicket: React.FC = () => {
  const [key, setKey] = useState('');
  const [passenger, setPassenger] = useState<Passenger>();

  const onSuccessfulBooking = useCallback((passenger: Passenger) => {
    setPassenger(passenger);
    setKey(Math.random().toString());
  }, []);

  return (
    <>
      <BookTicketPage key={key} onSuccessfulBooking={onSuccessfulBooking} />
      {passenger ? <PassengerAndTicketInfo passengers={[passenger]} /> : null}
    </>
  );
};
