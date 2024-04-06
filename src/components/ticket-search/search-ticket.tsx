import { SearchTicketPage } from './search-ticket-page';
import { useCallback, useState } from 'react';
import { Passenger } from '../../model/passenger';
import { PassengerAndTicketInfo } from '../info/passenger-and-ticket-info';

interface PassengerDeleteResponse {
  success: boolean;
  id: string;
}

export const SearchTicket = () => {
  const [key, setKey] = useState(Math.random().toString());
  const [passengers, setPassengers] = useState<Passenger[]>();

  const onSuccessfulSearch = useCallback((passengers: Passenger[]) => {
    setPassengers(passengers);
    setKey(Math.random().toString());
  }, []);

  const onDelete = useCallback((id: string) => {
    fetch(`http://localhost:8080/passenger/${id}`, {
      method: 'DELETE',
    })
      .then((obj) => obj.json())
      .then((result: PassengerDeleteResponse) => {
        if (result.success) {
          setPassengers((prev) => prev?.filter((p) => p.id !== result.id));
        }
      });
  }, []);

  return (
    <>
      <SearchTicketPage onSuccessfulSearch={onSuccessfulSearch} />
      {passengers && passengers.length === 0 ? (
        <p>No Passengers Found</p>
      ) : null}
      {passengers && passengers.length > 0 ? (
        <PassengerAndTicketInfo
          passengers={passengers}
          onDelete={onDelete}
          key={key}
        />
      ) : null}
    </>
  );
};
