import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Passenger } from './pageContainers/Passenger';
import { PassenderDetailsContainer } from './pageContainers/PassenderDetailsContainer';
import { getFakeAddress, getFakeCity, getFakeDayOfBirth, getFakeEmail, getFakeHouseNumber, getFakeLastName, getFakeMonthOfBirth, getFakeName, getFakePhone, getFakePostalCode, getFakeYearOfBirth } from '@utils/faker';
import { get } from 'http';

export class TuiPassengerDetailsPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessages: Locator;
  readonly passengersContainer: Locator;
  readonly passengerContainers: PassenderDetailsContainer[];

  constructor(page: Page,) {
    super(page);
    this.firstNameInput = page.locator('input[name="firstName"]').or(page.locator('[data-testid="first-name"]'));
    this.lastNameInput = page.locator('input[name="lastName"]').or(page.locator('[data-testid="last-name"]'));
    this.emailInput = page.locator('input[name="email"]').or(page.locator('[data-testid="email"]'));
    this.phoneInput = page.locator('input[name="phone"]').or(page.locator('[data-testid="phone"]'));
    this.continueButton = page.locator('.WCMS_component button[role="button"]');
    this.errorMessages = page.getByRole('alert');
    this.passengersContainer = page.locator('.PassengerFormV2__passengerContainer');
    this.passengerContainers = [];
  }

  async initializePassengerContainers(): Promise<void> {
    const containers = await this.passengersContainer.all();
    for (const container of containers) {
      this.passengerContainers.push(new PassenderDetailsContainer(this.page, container));
    }
  }

  async fillPassengerDetails(): Promise<void> {
    await this.initializePassengerContainers();
    for (const container of this.passengerContainers) {
      const passenger = {
        firstName: getFakeName(),
        lastName: getFakeLastName(),
        dayOfBirth: getFakeDayOfBirth(),
        monthOfBirth: getFakeMonthOfBirth(),
        yearOfBirth: getFakeYearOfBirth(),
        email: getFakeEmail(),
        phone: getFakePhone(),
        address: getFakeAddress(),
        houseNumber: getFakeHouseNumber(),
        postalCode: getFakePostalCode(),
        city: getFakeCity(),
      };
      await container.fillAllPassengerDetails(passenger);
    }
  }

  async checkForValidationErrors(): Promise<string[]> {
    const errors = await this.errorMessages.allTextContents();
    return errors.filter(error => error.trim() !== '');
  }

  async attemptToContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async validateFields(): Promise<{ hasErrors: boolean; errors: string[] }> {
    // Try to continue without filling to trigger validations
    await this.attemptToContinue();
    const errors = await this.checkForValidationErrors();
    return { hasErrors: errors.length > 0, errors };
  }
}