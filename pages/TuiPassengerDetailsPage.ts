import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Passenger } from '../types/Passenger';
import { Logger } from '../utils/logger';
import { getFakeAddress, getFakeCity, getFakeDayOfBirth, getFakeEmail, getFakeHouseNumber, getFakeLastName, getFakeMonthOfBirth, getFakeName, getFakePhone, getFakePostalCode, getFakeYearOfBirth } from '@utils/faker';
import { locators } from '../locators/locators';
import { PassengerDetailsComponent } from './pageContainers/PassengerDetailsComponent';

export class TuiPassengerDetailsPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessages: Locator;
  readonly passengerForm: Locator;
  readonly passengersContainer: Locator;

  constructor(page: Page,) {
    super(page);
    this.firstNameInput = page.locator(locators.passengerDetailsPage.firstNameInput);
    this.lastNameInput = page.locator(locators.passengerDetailsPage.lastNameInput);
    this.emailInput = page.locator(locators.passengerDetailsPage.emailInput);
    this.phoneInput = page.locator(locators.passengerDetailsPage.phoneInput);
    this.continueButton = page.locator(locators.passengerDetailsPage.continueButton);
    this.errorMessages = page.locator(locators.passengerDetailsPage.errorMessages);
    this.passengersContainer = page.locator(locators.passengerDetailsPage.passengersContainer);
    this.passengerForm = page.locator(locators.passengerDetailsPage.passengerForm);
  }

  private async getPassengerContainer(index: number): Promise<PassengerDetailsComponent> {
    await this.loader.waitFor({ state: 'hidden' });
    const containerLocator = this.passengersContainer.nth(index);
    return new PassengerDetailsComponent(this.page, containerLocator);
  }

  async getPassengerCount(): Promise<number> {
    await this.waitForPageLoad();
    await this.passengerForm.waitFor({ state: 'visible', timeout: 60000 });
    const containers = await this.passengersContainer.all();
    return containers.length;
  }


  async fillFirstName(index: number, firstName: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await expect(await container.getFirstNameLocator()).toBeVisible();
    await container.fillFirstName(firstName);
  }

  async fillLastName(index: number, lastName: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillLastName(lastName);
  }

  async fillEmail(index: number, email: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillEmail(email);
  }

  async fillPhone(index: number, phone: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillPhone(phone);
  }

  async fillDayOfBirth(index: number, dayOfBirth: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillDayOfBirth(dayOfBirth);
  }

  async fillMonthOfBirth(index: number, monthOfBirth: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillMonthOfBirth(monthOfBirth);
  }

  async fillYearOfBirth(index: number, yearOfBirth: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillYearOfBirth(yearOfBirth);
  }

  async fillAddress(index: number, address: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillAddress(address);
  }

  async fillHouseNumber(index: number, houseNumber: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillHouseNumber(houseNumber);
  }

  async fillPostalCode(index: number, postalCode: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillPostalCode(postalCode);
  }

  async fillCity(index: number, city: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillCity(city);
  }

  async selectGender(index: number, gender: string): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.selectGender(gender);
  }

  async fillAllPassengerDetails(index: number, data: Passenger): Promise<void> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    await container.fillAllPassengerDetails(data);
  }

  async getErrorMessage(fieldLocator: Locator): Promise<string | null> {
    const errorMessageLocator = fieldLocator.locator('..').getByRole('alert');
    if (await errorMessageLocator.isVisible()) {
      return await errorMessageLocator.innerText();
    }
    Logger.error(`No error message found for the field: ${fieldLocator.toString()}`);
    return null;
  }

  async getGenderErrorMessage(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    return await container.getGenderErrorMessage();
  }


  async fillPassengerDetails(): Promise<void> {
    const count = await this.getPassengerCount();
    for (let i = 0; i < count; i++) {
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
        gender: "MALE"
      };
      await this.fillAllPassengerDetails(i, passenger);
    }
  }

  async checkForValidationErrors(): Promise<string[]> {
    const errors = await this.errorMessages.allTextContents();
    return errors.filter(error => error.trim() !== '');
  }

  async attemptToContinue(): Promise<void> {
    const container = await this.getPassengerContainer(0);
    await expect(await container.getFirstNameLocator()).toBeVisible();
    await expect(this.loader).not.toBeVisible({ timeout: 60000 });
    await this.continueButton.click();
  }

  async validateFields(): Promise<{ hasErrors: boolean; errors: string[] }> {
    // Try to continue without filling to trigger validations
    await this.attemptToContinue();
    const errors = await this.checkForValidationErrors();
    const result = { hasErrors: errors.length > 0, errors };
    if (result.hasErrors) {
      Logger.error(`Validation errors found: ${result.errors.join(', ')}`);
    } else {
      Logger.warn('No validation errors');
    }
    return result;
  }


  async getErrorMessageForFirstName(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getFirstNameLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getLastNameErrorMessage(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getLastNameLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getErrorMessageForEmail(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getEmailLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getErrorMessageForPhone(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getPhoneLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getErrorMessageForStreetName(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getAddressLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getErrorMessageForHouseNumber(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getHouseNumberLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getErrorMessageForPostalCode(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getPostalCodeLocator();
    return await container.getErrorMessage(fieldLocator);
  }

  async getErrorMessageForCity(index: number): Promise<string | null> {
    await this.waitForLoaderHidden();
    const container = await this.getPassengerContainer(index);
    const fieldLocator = await container.getCityLocator();
    return await container.getErrorMessage(fieldLocator);
  }
}