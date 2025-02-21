import { Passenger } from '../../model/passenger';
import { useCallback, useEffect, useRef, useState } from 'react';

interface SearchTicketPageProps {
  onSuccessfulSearch: (passengers: Passenger[]) => void;
}

export const SearchTicketPage: React.FC<SearchTicketPageProps> = ({
  onSuccessfulSearch,
}) => {
  const [email, setEmail] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current?.focus();
    }
  }, []);

  const onSearch = useCallback(() => {
    fetch(`http://localhost:8080/passenger/${email}`)
      .then((obj) => obj.json())
      .then((result: Passenger[]) => {
        onSuccessfulSearch(result);
      });
  }, [email, onSuccessfulSearch]);

  return (
    <>
      <input
        type="email"
        ref={emailRef}
        placeholder="Email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
      />
      <button onClick={onSearch}>Search</button>
    </>
  );
};
