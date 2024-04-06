import { Ticket } from './ticket';

export interface Passenger {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  ticket: Ticket;
}
