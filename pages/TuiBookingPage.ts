import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TuiBookingPage extends BasePage {
  readonly bookNowButton: Locator;

  constructor(page: Page) {
    super(page);
    this.bookNowButton = page.locator('.ProgressbarNavigation__container button[aria-label="button"]');
  }

  async clickOnBookNow(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.bookNowButton.waitFor();
    await this.bookNowButton.click();
  }
}