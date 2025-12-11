import { Locator, Page } from '@playwright/test';
import { Logger } from '../utils/logger';
import { locators } from '../locators/locators';
import type { TuiHomePage } from './TuiHomePage';

export class BasePage {
  readonly page: Page;
  readonly flightAvailabilityErrorBanner: Locator;
  readonly loader: Locator;


  constructor(page: Page) {
    this.page = page;
    this.flightAvailabilityErrorBanner = page.locator(locators.homePage.flightAvailabilityErrorBanner);
    this.loader = page.locator('.SummaryRoomComponent__skfadingcircle');
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForLoaderHidden(): Promise<void> {
    await this.loader.waitFor({ state: 'hidden' });
  }
}
