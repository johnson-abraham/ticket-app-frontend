import { useCallback, useEffect, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';

interface EmptySeatsResponse {
  id: string;
  section: string;
  seatNumber: number;
}

interface Props {
  onSeatSelection: (seatId: string) => void;
}

export const AvailableSeats: React.FC<Props> = ({ onSeatSelection }) => {
  const getSeatNumber = useCallback(
    (seat: EmptySeatsResponse) => `${seat.section}${seat.seatNumber}`,
    [],
  );

  const [seats, setSeats] = useState<EmptySeatsResponse[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const options = seats.map((seat) => ({
    value: seat.id,
    label: getSeatNumber(seat),
  }));

  if (options.length > 0 && !selectedOption) {
    setSelectedOption(options[0]);
  }

  useEffect(() => {
    fetch('http://localhost:8080/seats/getAvailableSeats')
      .then((result) => result.json())
      .then((res: EmptySeatsResponse[]) => {
        if (res.length) {
          setSeats(res);
          onSeatSelection(res[0].id);
        }
      });
  }, [onSeatSelection]);

  const onChange = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      onSeatSelection(option.value);
    },
    [onSeatSelection],
  );

  return (
    <Dropdown
      options={options}
      placeholder="Seat Number"
      onChange={onChange}
      value={selectedOption}
    />
  );
};
