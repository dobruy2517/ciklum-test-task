import { test, expect } from '../../fixtures/extendedTestfixture';

test.describe('Passenger Details Page Validation Tests', () => {

  test.beforeEach(async ({ navigateToPassengerDetails }) => {
    await navigateToPassengerDetails();
  });

  test('Validation of error messages on passenger details page for all empty fields', async (
    {
      passengerDetailsPage,
      bookingData,
      generateTestDescription,
    }) => {

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
      });

    await test.step('Validate passenger details fields', async () => {
      const validationResult = await passengerDetailsPage.validateFields();
      expect.soft(validationResult.hasErrors).toBe(true);
    });
  });
});