import { test, expect } from '@playwright/test';
import { TuiHomePage } from '../../pages/TuiHomePage';
import { TuiSearchResultsPage } from '../../pages/TuiSearchResultsPage';
import { TuiHotelDetailsPage } from '../../pages/TuiHotelDetailsPage';
import { TuiPassengerDetailsPage } from '../../pages/TuiPassengerDetailsPage';
import { TuiBookingPage } from '@pages/TuiBookingPage';
import { Logger } from '@utils/logger';
import { TestData } from '@utils/testData';
import { generateTestDescription } from '@utils/helpers';

test.describe('Passenger Details Page Validation Tests', () => {

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(60000);
  });

  test('Validation of error messages on passenger details page for all empty fields', async ({ page }) => {
    const homePage = new TuiHomePage(page);
    const searchResultsPage = new TuiSearchResultsPage(page);
    const hotelDetailsPage = new TuiHotelDetailsPage(page);
    const tuiBookingPage = new TuiBookingPage(page);
    const passengerDetailsPage = new TuiPassengerDetailsPage(page);

    // Variables to store selected data
    let bookingData = TestData.getBookingTestData();

    await test.step('Navigate to TUI homepage and accept cookies', async () => {
      await homePage.goto();
      await homePage.acceptCookies();
      Logger.info('Opened homepage and accepted cookies');
    });

    await test.step('Select random departure airport', async () => {
      bookingData.departure = await homePage.selectRandomDeparture();
      expect(bookingData.departure).toBeTruthy();
      expect(bookingData.departure.length).toBeGreaterThan(0);
      Logger.info(`Selected departure airport: ${bookingData.departure}`);
    });

    await test.step('Save airport selection', async () => {
      await homePage.saveAirportSelection();
      Logger.info('Saved airport selection');
    });

    await test.step('Select random destination airport', async () => {
      bookingData.destination = await homePage.selectRandomDestination();
      expect(bookingData.destination).toBeTruthy();
      expect(bookingData.destination.length).toBeGreaterThan(0);
      Logger.info(`Selected destination: ${bookingData.destination}`);
    });

    await test.step('Save destination selection', async () => {
      await homePage.saveDestinationSelection();
      Logger.info('Saved destination selection');
    });

    await test.step('Select available departure date', async () => {
      bookingData.departureDate = await homePage.selectAvailableDepartureDate();
      expect(bookingData.departureDate).toBeTruthy();
      Logger.info(`Selected departure date: ${bookingData.departureDate}`);
    });

    await test.step('Save departure date selection', async () => {
      await homePage.saveDepartureDateSelection();
      Logger.info('Saved departure date selection');
    });

    await test.step('Select randon nihgt count', async () => {
      await homePage.selectRandomNightCount();
      Logger.info('Selected random night count');
    })

    await test.step('Configure rooms and guests', async () => {
      const defaultConfig = TestData.getDefaultGuestConfig();
      const guestConfig = await homePage.configureRoomsAndGuests(defaultConfig.adults, defaultConfig.children, defaultConfig.childAge);
      Logger.info('Configured rooms and guests')
      Logger.info(`Guests: ${guestConfig.adults} adults, ${guestConfig.children} child (age ${guestConfig.childAge})`);
    });

    await test.step('Save room and guest selection', async () => {
      await homePage.roomsGuestsSaveButton.click();
      await homePage.roomsGuestsSaveButton.waitFor({ state: 'hidden' });
      Logger.info('Saved room and guest selection');
    });

    await test.step('Search for holidays and retry if no flights available', async () => {
      await homePage.searchHolidays();
      await homePage.checkFlightAvailability();
      Logger.info('Initiated search for holidays');
    })

    await test.step('Select first available hotel', async () => {
      bookingData.hotelName = await searchResultsPage.selectFirstAvailableHotel();
      expect(bookingData.hotelName).toBeTruthy();
      expect(bookingData.hotelName).not.toBe('Unknown Hotel');
      Logger.info(`Selected hotel: ${bookingData.hotelName}`);
    });

    await test.step('Continue from hotel details', async () => {
      await hotelDetailsPage.clickContinue();
      Logger.info('Continued from hotel details');
    });

    await test.step('Click on book now button', async () => {
      await tuiBookingPage.clickOnBookNow();
      Logger.info('Clicked on book now button');
    });

    await test.step('Validate passenger details fields', async () => {
      const validationResult = await passengerDetailsPage.validateFields();
      expect.soft(validationResult.hasErrors).toBe(true); 
      if (validationResult.hasErrors) {
        Logger.error(`Validation errors found: ${validationResult.errors.join(', ')}`);
      } else {
        Logger.warn('No validation errors');
      }
    });

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
      });
  });
});