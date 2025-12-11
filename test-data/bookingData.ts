import { GuestConfig } from './guestConfigs';

export interface BookingData {
  departure: string;
  destination: string;
  departureDate: string;
  nightsCount: number;
  guestConfig: GuestConfig;
  hotelName: string;
}

export const defaultBookingData: BookingData = {
  departure: '',
  destination: '',
  departureDate: '',
  nightsCount: 7,
  guestConfig: {
    adults: '2',
    children: '1',
    childAge: '5'
  },
  hotelName: '',
};