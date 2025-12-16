import { Logger } from './logger';
import { customFaker } from './faker';

export interface GuestConfig {
  adults: string;
  children: string;
  childAge?: string;
}

export interface BookingData {
  departure: string;
  destination: string;
  departureDate: string;
  nightsCount: number;
  guestConfig: GuestConfig;
  hotelName: string;
}

export interface PassengerErrorMessages {
  empty: Record<string, string>;
  invalid: Record<string, string>;
}

export class TestData {
  static getDefaultGuestConfig(): GuestConfig {
    return {
      adults: '2',
      children: '1',
      childAge: '5'
    };
  }

  static getRandomGuestConfig(): GuestConfig {
    const adults = customFaker.number.int({ min: 1, max: 4 }); // 1-4 adults
    const children = customFaker.number.int({ min: 0, max: 2 }); // 0-2 children
    const childAge = children > 0 ? customFaker.number.int({ min: 1, max: 12 }).toString() : undefined; // 1-12 if children

    const config = {
      adults: adults.toString(),
      children: children.toString(),
      childAge
    };

    Logger.info(`Generated random guest config: adults=${config.adults}, children=${config.children}, childAge=${config.childAge}`);

    return config;
  }

  static getBookingTestData(): BookingData {
    return {
      departure: '',
      destination: '',
      departureDate: '',
      nightsCount: 7,
      guestConfig: this.getDefaultGuestConfig(),
      hotelName: '',
    };
  }

  static getPassengerErrorMessagesMappingLabels(): PassengerErrorMessages {
    return {
      empty: {
        firstName: 'Vul de voornaam in (volgens paspoort)',
        lastName: 'Vul de achternaam in (volgens paspoort)',
        streetName: 'Vul de straatnaam in',
        houseNumber: 'Vul het huisnummer in',
        postalCode: 'Vul de postcode in',
        city: 'Vul de woonplaats in',
        phone: 'Vul het telefoonnummer in',
        email: 'Vul het e-mailadres in'
      },
      invalid: {
        firstName: 'Gebruik tussen de 2 en 32 letters. Geen cijfers of speciale tekens.',
        lastName: 'Gebruik tussen de 2 en 32 letters. Geen cijfers of speciale tekens.',
        streetName: 'Voer een geldige straatnaam in',
        houseNumber: 'Vul een geldig huisnummer in',
        postalCode: 'Vul een geldige postcode in.',
        city: 'Vul een geldige woonplaats in',
        phone: 'Vul het juiste telefoonnummer in',
        email: 'Vul een geldig e-mailadres in'
      }
    };
  }
}