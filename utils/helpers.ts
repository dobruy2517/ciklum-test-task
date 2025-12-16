import { Page, expect } from '@playwright/test';
import { BookingData } from '../test-data/bookingData';
import { TuiHomePage } from '../pages/TuiHomePage';
import { TuiSearchResultsPage } from '../pages/TuiSearchResultsPage';
import { TuiHotelDetailsPage } from '../pages/TuiHotelDetailsPage';
import { TuiBookingPage } from '../pages/TuiBookingPage';
import { Logger } from './logger';

/**
 * Wait for a specific amount of time
 * @param ms - milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 * @param length - length of the string
 */
export function generateRandomString(length: number = 10): string {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Take a screenshot with a custom name
 * @param page - Playwright page object
 * @param name - name of the screenshot
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
}

/**
 * Get current timestamp in a readable format
 */
export function getTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Get a random element from an array
 * @param array - the array to pick from
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random integer between min and max inclusive
 * @param min - minimum value
 * @param max - maximum value
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateTestDescription(params: BookingData): string {
  return `\nDeparture: ${params.departure}\nDestination: ${params.destination}\nDate: ${params.departureDate}\nNights: ${params.nightsCount}\nHotel: ${params.hotelName}\nGuests: ${params.guestConfig.adults} adults, ${params.guestConfig.children} child (age ${params.guestConfig.childAge})`
}

interface GoToPassengerDetailsParams {
  homePage: TuiHomePage;
  searchResultsPage: TuiSearchResultsPage;
  hotelDetailsPage: TuiHotelDetailsPage;
  bookingPage: TuiBookingPage;
  bookingData: BookingData;
}

/**
 * Navigate to the passenger details page by performing the common booking flow
 * @param params - Object containing page objects and booking data
 */
export async function goToPassengerDetailsPage(params: GoToPassengerDetailsParams): Promise<void> {
  const { homePage, searchResultsPage, hotelDetailsPage, bookingPage, bookingData } = params;
  homePage.page.on('load', async () => {
      await checkFlightAvailability(params);
    });
      await homePage.goto();
      await homePage.acceptCookies();

      bookingData.departure = await homePage.selectRandomDeparture();
      expect(bookingData.departure).toBeTruthy();
      expect(bookingData.departure.length).toBeGreaterThan(0);
      // await homePage.saveAirportSelection();

      bookingData.destination = await homePage.selectRandomDestination();
      expect(bookingData.destination).toBeTruthy();
      expect(bookingData.destination.length).toBeGreaterThan(0);
      await homePage.saveDestinationSelection();

      bookingData.departureDate = await homePage.selectAvailableDepartureDate();
      expect(bookingData.departureDate).toBeTruthy();
      await homePage.saveDepartureDateSelection();

      await homePage.selectRandomNightCount();

      await homePage.configureRoomsAndGuests(bookingData.guestConfig.adults, bookingData.guestConfig.children, bookingData.guestConfig.childAge);

      await homePage.roomsGuestsSaveButton.click();
      await homePage.roomsGuestsSaveButton.waitFor({ state: 'hidden' });

      await homePage.searchHolidays();
      await searchResultsPage.waitForSearchResults();
      bookingData.hotelName = await searchResultsPage.selectFirstAvailableHotel();
      expect(bookingData.hotelName).toBeTruthy();
      expect(bookingData.hotelName).not.toBe('Unknown Hotel');

      await hotelDetailsPage.clickContinue();
      hotelDetailsPage.waitForLoaderHidden();
      await bookingPage.clickOnBookNow();
}

export async function checkFlightAvailability(params: GoToPassengerDetailsParams): Promise<void> {
    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const isFlightErrorVisible = await params.homePage.flightAvailabilityErrorBanner.isVisible();
      if (!isFlightErrorVisible) {
        Logger.info('Flight availability check passed');
        return;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error('Flight availability check failed after maximum retries');
      }
      Logger.info('Flight availability error detected, clearing browser context and restarting from beginning...');
      const context = params.homePage.page.context();
      await context.clearCookies();
      await context.clearPermissions();
      await params.homePage.page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await goToPassengerDetailsPage(params);
  }
}
