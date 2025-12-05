import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly flightAvailabilityErrorBanner: Locator;


  constructor(page: Page) {
    this.page = page;
    this.flightAvailabilityErrorBanner = page.locator('#wrErrorBanner');
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
}
