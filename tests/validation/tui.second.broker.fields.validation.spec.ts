import { test, expect } from '@playwright/test';
import { TuiHomePage } from '../../pages/TuiHomePage';
import { TuiSearchResultsPage } from '../../pages/TuiSearchResultsPage';
import { TuiHotelDetailsPage } from '../../pages/TuiHotelDetailsPage';
import { TuiPassengerDetailsPage } from '../../pages/TuiPassengerDetailsPage';
import { TuiBookingPage } from '@pages/TuiBookingPage';
import { Logger } from '@utils/logger';
import { TestData } from '@utils/testData';
import { generateTestDescription } from '@utils/helpers';
import { PassenderDetailsContainer } from '@pages/pageContainers/PassenderDetailsContainer';

test.describe('Second Passenger validation Tests', () => {
  let homePage: TuiHomePage;
  let searchResultsPage: TuiSearchResultsPage;
  let hotelDetailsPage: TuiHotelDetailsPage;
  let tuiBookingPage: TuiBookingPage;
  let passengerDetailsPage: TuiPassengerDetailsPage;

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(60000);
    homePage = new TuiHomePage(page);
    searchResultsPage = new TuiSearchResultsPage(page);
    hotelDetailsPage = new TuiHotelDetailsPage(page);
    tuiBookingPage = new TuiBookingPage(page);
    passengerDetailsPage = new TuiPassengerDetailsPage(page);
  });

  test('Validation of error messages for second passenger on passenger details page for all empty fields', async ({ page }) => {
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

    await test.step('Select random night count', async () => {
      await homePage.selectRandomNightCount();
      Logger.info('Selected random night count');
    })

    await test.step('Configure rooms and guests', async () => {
      bookingData.guestConfig = TestData.getDefaultGuestConfig();
      await homePage.configureRoomsAndGuests(bookingData.guestConfig.adults, bookingData.guestConfig.children);
      Logger.info('Configured rooms and guests')
      Logger.info(`Guests: ${bookingData.guestConfig.adults} adults, ${bookingData.guestConfig.children} child (age ${bookingData.guestConfig.childAge})`);
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

    await test.step('Validate second passenger details fields', async () => {
      const secondPassengerDetails = await passengerDetailsPage.getSecondPassengerContainer();
      await passengerDetailsPage.attemptToContinue();
      const firstNameErrorMessage = await passengerDetailsPage.getErrorMessageForFirstName(secondPassengerDetails);
      const lastNameErrorMessage = await passengerDetailsPage.getLastNameErrorMessage(secondPassengerDetails);
      

      expect.soft(lastNameErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().empty.lastName);
      expect.soft(firstNameErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().empty.firstName);
    });

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });
  });

  //todo Expected to fail because the can accept sepcial characters in street
  test('Validation of incorrect inputs main passenger details fields on passenger details page', async ({ page }) => {
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

    await test.step('Select random night count', async () => {
      await homePage.selectRandomNightCount();
      Logger.info('Selected random night count');
    })

    await test.step('Configure rooms and guests', async () => {
      bookingData.guestConfig = TestData.getDefaultGuestConfig();
      await homePage.configureRoomsAndGuests(bookingData.guestConfig.adults, bookingData.guestConfig.children);
      Logger.info('Configured rooms and guests')
      Logger.info(`Guests: ${bookingData.guestConfig.adults} adults, ${bookingData.guestConfig.children} child (age ${bookingData.guestConfig.childAge})`);
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

    await test.step('Validate main passenger details fields', async () => {
      const secondPassengerDetails = await passengerDetailsPage.getMainPassengerContainer();
      await secondPassengerDetails.fillFirstName("1234");
      await secondPassengerDetails.fillLastName("!@#$");
      await secondPassengerDetails.fillEmail("invalid-email");
      await secondPassengerDetails.fillPhone("abcd");
      await secondPassengerDetails.fillAddress("5678");
      await secondPassengerDetails.fillHouseNumber("!@#");
      await secondPassengerDetails.fillPostalCode("abcd");
      await secondPassengerDetails.fillCity("1234");
      await passengerDetailsPage.attemptToContinue();
      const firstNameErrorMessage = await passengerDetailsPage.getErrorMessageForFirstName(secondPassengerDetails);
      const lastNameErrorMessage = await passengerDetailsPage.getLastNameErrorMessage(secondPassengerDetails);
      const emailErrorMessage = await passengerDetailsPage.getErrorMessageForEmail(secondPassengerDetails);
      const phoneErrorMessage = await passengerDetailsPage.getErrorMessageForPhone(secondPassengerDetails);
      const streetNameErrorMessage = await passengerDetailsPage.getErrorMessageForStreetName(secondPassengerDetails);
      const houseNumberErrorMessage = await passengerDetailsPage.getErrorMessageForHouseNumber(secondPassengerDetails);
      const postalCodeErrorMessage = await passengerDetailsPage.getErrorMessageForPostalCode(secondPassengerDetails);
      const cityErrorMessage = await passengerDetailsPage.getErrorMessageForCity(secondPassengerDetails);

      expect.soft(streetNameErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.streetName);
      expect.soft(houseNumberErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.houseNumber);
      expect.soft(postalCodeErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.postalCode);
      expect.soft(cityErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.city);
      expect.soft(phoneErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.phone);
      expect.soft(emailErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.email);
      expect.soft(lastNameErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.lastName);
      expect.soft(firstNameErrorMessage).toBe(TestData.getPassengerErrormassagesMappingLabels().invalid.firstName);
    });

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });
  });
});