export interface Ticket {
  id: string;
  sourceStation: string;
  destinationStation: string;
  price: number;
  section: string;
  seatNumber: number;
  bookingStatus: string;
}
