import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { locators } from '../locators/locators';

export class TuiBookingPage extends BasePage {
  readonly bookNowButton: Locator;

  constructor(page: Page) {
    super(page);
    this.bookNowButton = page.locator(locators.bookingPage.bookNowButton);
  }

  async clickOnBookNow(): Promise<void> {
    Logger.info('Clicking on book now button');
    await this.page.waitForLoadState('domcontentloaded');
    if(await this.bookNowButton.isVisible()) {
      await this.bookNowButton.click();
    }
  }
}