import { test } from '../../fixtures/extendedTestfixture';

test.describe('Main Passenger validation Tests', () => {

  test.beforeEach(async ({ navigateToPassengerDetails }) => {
    await navigateToPassengerDetails();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });


  test('Validation of error messages for main passenger on passenger details page for all empty fields', async (
    {
      passengerDetailsPage,
      bookingData,
      errorMessages,
      generateTestDescription
    }
  ) => {

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });

    await test.step('Validate main passenger details fields', async () => {
      await passengerDetailsPage.attemptToContinue();
      await passengerDetailsPage.verifyErrorMessages(0, errorMessages.empty);
    });
  });

  //todo Expected to fail because 'street' input can accept special characters
  test.fixme('Validation of incorrect inputs main passenger details fields on passenger details page', async (
    { passengerDetailsPage,
      bookingData,
      errorMessages,
      generateTestDescription
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
      await passengerDetailsPage.verifyErrorMessages(0, errorMessages.invalid);
    });
  });
});