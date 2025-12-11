import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { locators } from '../locators/locators';

export class TuiHotelDetailsPage extends BasePage {
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.continueButton = page.locator(locators.hotelDetailsPage.continueButton);
  }

  async clickContinue(): Promise<void> {
    Logger.info('Continuing from hotel details');
    await this.continueButton.waitFor();
    await this.continueButton.click();
  }
}