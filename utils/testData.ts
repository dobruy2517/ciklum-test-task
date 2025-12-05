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

export class TestData {
  static getDefaultGuestConfig(): GuestConfig {
    return {
      adults: '2',
      children: '1',
      childAge: '5'
    };
  }

  static getRandomGuestConfig(): GuestConfig {
    const adults = Math.floor(Math.random() * 4) + 1; // 1-4 adults
    const children = Math.floor(Math.random() * 3); // 0-2 children
    const childAge = children > 0 ? (Math.floor(Math.random() * 12) + 1).toString() : undefined; // 1-12 if children

    return {
      adults: adults.toString(),
      children: children.toString(),
      childAge
    };
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

  static getPassengerErrormassagesMappingLabels(): Record<string, any> {
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