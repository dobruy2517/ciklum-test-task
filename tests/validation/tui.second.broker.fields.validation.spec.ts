import { test } from '../../fixtures/extendedTestfixture';

test.describe('Second Passenger validation Tests', () => {

  test.beforeEach(async ({ navigateToPassengerDetails }) => {
    await navigateToPassengerDetails();
  });

  test('Validation of error messages for second passenger on passenger details page for all empty fields', async ({
     passengerDetailsPage,
     bookingData,
     errorMessages,
     generateTestDescription,
    }) => {

    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });

    await test.step('Validate second passenger details fields', async () => {
      await passengerDetailsPage.attemptToContinue();
      await passengerDetailsPage.verifyErrorMessages(1, {
        firstName: errorMessages.empty.firstName,
        lastName: errorMessages.empty.lastName
      });
    });
  });

  //todo Expected to fail because they can accept special characters in street
  test.fixme('Validation of incorrect inputs main passenger details fields on passenger details page', async ({
    passengerDetailsPage,
    bookingData,
    errorMessages,
    generateTestDescription,
  }) => {

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });

    await test.step('Validate second passenger details fields', async () => {
      await passengerDetailsPage.fillFirstName(1, "1234");
      await passengerDetailsPage.fillLastName(1, "!@#$");
      await passengerDetailsPage.fillEmail(1, "invalid-email");
      await passengerDetailsPage.fillPhone(1, "abcd");
      await passengerDetailsPage.fillAddress(1, "5678");
      await passengerDetailsPage.fillHouseNumber(1, "!@#");
      await passengerDetailsPage.fillPostalCode(1, "abcd");
      await passengerDetailsPage.fillCity(1, "1234");
      await passengerDetailsPage.attemptToContinue();
      await passengerDetailsPage.verifyErrorMessages(1, errorMessages.invalid);
    });
  });
});