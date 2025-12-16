import { test as base } from '@playwright/test';
import { TuiHomePage } from '../pages/TuiHomePage';
import { TuiSearchResultsPage } from '../pages/TuiSearchResultsPage';
import { TuiHotelDetailsPage } from '../pages/TuiHotelDetailsPage';
import { TuiPassengerDetailsPage } from '../pages/TuiPassengerDetailsPage';
import { TuiBookingPage } from '../pages/TuiBookingPage';
import { Logger } from '../utils/logger';
import { BookingData, defaultBookingData } from '../test-data/bookingData';
import { passengerErrorMessages } from '../test-data/errorMessages';
import { generateTestDescription, goToPassengerDetailsPage } from '../utils/helpers';

// Extend the base test with our fixtures
export const test = base.extend<{
  homePage: TuiHomePage;
  searchResultsPage: TuiSearchResultsPage;
  hotelDetailsPage: TuiHotelDetailsPage;
  bookingPage: TuiBookingPage;
  passengerDetailsPage: TuiPassengerDetailsPage;
  bookingData: BookingData;
  logger: typeof Logger;
  errorMessages: typeof passengerErrorMessages;
  generateTestDescription: typeof generateTestDescription;
  goToPassengerDetailsPage: typeof goToPassengerDetailsPage;
  navigateToPassengerDetails: () => Promise<void>;
}>({
  // Page object fixtures
  homePage: async ({ page }, use) => {
    const homePage = new TuiHomePage(page);
    await use(homePage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new TuiSearchResultsPage(page);
    await use(searchResultsPage);
  },

  hotelDetailsPage: async ({ page }, use) => {
    const hotelDetailsPage = new TuiHotelDetailsPage(page);
    await use(hotelDetailsPage);
  },

  bookingPage: async ({ page }, use) => {
    const bookingPage = new TuiBookingPage(page);
    await use(bookingPage);
  },

  passengerDetailsPage: async ({ page }, use) => {
    const passengerDetailsPage = new TuiPassengerDetailsPage(page);
    await use(passengerDetailsPage);
  },

  // Test data fixtures
  bookingData: async ({}, use) => {
    await use(defaultBookingData);
  },

  // Utility fixtures
  logger: async ({}, use) => {
    await use(Logger);
  },

  errorMessages: async ({}, use) => {
    await use(passengerErrorMessages);
  },

  generateTestDescription: async ({}, use) => {
    await use(generateTestDescription);
  },

  goToPassengerDetailsPage: async ({}, use) => {
    await use(goToPassengerDetailsPage);
  },

  navigateToPassengerDetails: async ({ homePage, searchResultsPage, hotelDetailsPage, bookingPage, bookingData }, use) => {
    await use(async () => {
      await goToPassengerDetailsPage({ homePage, searchResultsPage, hotelDetailsPage, bookingPage, bookingData });
    });
  },
});

export { expect } from '@playwright/test';