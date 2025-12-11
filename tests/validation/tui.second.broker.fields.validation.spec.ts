import { test, expect } from '../../fixtures';
import { defaultBookingData } from '../../test-data/bookingData';
import { generateTestDescription } from '../../utils/helpers';
import { TestData } from '../../utils/testData';

test.describe('Second Passenger validation Tests', () => {

  test('Validation of error messages for second passenger on passenger details page for all empty fields', async ({
     passengerDetailsPage, 
     bookingData, 
     errorMessages, 
     generateTestDescription, 
     navigateToPassengerDetails 
    }) => {

    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });

    await test.step('Validate second passenger details fields', async () => {
      await passengerDetailsPage.attemptToContinue();
      const firstNameErrorMessage = await passengerDetailsPage.getErrorMessageForFirstName(1);
      const lastNameErrorMessage = await passengerDetailsPage.getLastNameErrorMessage(1);
      expect.soft(lastNameErrorMessage).toBe(errorMessages.empty.lastName);
      expect.soft(firstNameErrorMessage).toBe(errorMessages.empty.firstName);
    });
  });

  //todo Expected to fail because the can accept sepcial characters in street
  test.fixme('Validation of incorrect inputs main passenger details fields on passenger details page', async ({
    passengerDetailsPage,
    bookingData,
    errorMessages,
    generateTestDescription,
    navigateToPassengerDetails
  }) => {

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });

    await test.step('Validate main passenger details fields', async () => {
      await passengerDetailsPage.fillFirstName(0, "1234");
      await passengerDetailsPage.fillLastName(0, "!@#$");
      await passengerDetailsPage.fillEmail(0, "invalid-email");
      await passengerDetailsPage.fillPhone(0, "abcd");
      await passengerDetailsPage.fillAddress(0, "5678");
      await passengerDetailsPage.fillHouseNumber(0, "!@#");
      await passengerDetailsPage.fillPostalCode(0, "abcd");
      await passengerDetailsPage.fillCity(0, "1234");
      await passengerDetailsPage.attemptToContinue();
      const firstNameErrorMessage = await passengerDetailsPage.getErrorMessageForFirstName(0);
      const lastNameErrorMessage = await passengerDetailsPage.getLastNameErrorMessage(0);
      const emailErrorMessage = await passengerDetailsPage.getErrorMessageForEmail(0);
      const phoneErrorMessage = await passengerDetailsPage.getErrorMessageForPhone(0);
      const streetNameErrorMessage = await passengerDetailsPage.getErrorMessageForStreetName(0);
      const houseNumberErrorMessage = await passengerDetailsPage.getErrorMessageForHouseNumber(0);
      const postalCodeErrorMessage = await passengerDetailsPage.getErrorMessageForPostalCode(0);
      const cityErrorMessage = await passengerDetailsPage.getErrorMessageForCity(0);

      expect.soft(streetNameErrorMessage).toBe(errorMessages.invalid.streetName);
      expect.soft(houseNumberErrorMessage).toBe(errorMessages.invalid.houseNumber);
      expect.soft(postalCodeErrorMessage).toBe(errorMessages.invalid.postalCode);
      expect.soft(cityErrorMessage).toBe(errorMessages.invalid.city);
      expect.soft(phoneErrorMessage).toBe(errorMessages.invalid.phone);
      expect.soft(emailErrorMessage).toBe(errorMessages.invalid.email);
      expect.soft(lastNameErrorMessage).toBe(errorMessages.invalid.lastName);
      expect.soft(firstNameErrorMessage).toBe(errorMessages.invalid.firstName);
    });
  });
});