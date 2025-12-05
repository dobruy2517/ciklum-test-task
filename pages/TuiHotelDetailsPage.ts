import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TuiHotelDetailsPage extends BasePage {
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.continueButton = page.locator('.ProgressbarNavigation__container button[aria-label="button"]');
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.waitFor();
    await this.continueButton.click();
  }
}