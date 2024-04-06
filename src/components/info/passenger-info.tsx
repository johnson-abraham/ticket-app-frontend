import { Passenger } from '../../model/passenger';

interface PassengerInfoProps {
  passenger: Passenger;
}

export const PassengerInfo: React.FC<PassengerInfoProps> = ({ passenger }) => {
  return (
    <div>
      <h2 style={{ color: 'blue' }}>Passenger Information</h2>
      <p>
        <strong>First Name:</strong> {passenger.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {passenger.lastName}
      </p>
      <p>
        <strong>Email:</strong> {passenger.email}
      </p>
    </div>
  );
};
