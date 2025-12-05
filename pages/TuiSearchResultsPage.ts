import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TuiSearchResultsPage extends BasePage {
  readonly resultsSection: Locator;
  readonly hotelCards: Locator;
  readonly hotelNameLocator: string;
  readonly selectHotelButtonLocator: string;

  constructor(page: Page) {
    super(page);
    // Selectors for search results
    this.resultsSection = page.locator('[data-test-id="search-results-list"]');
    this.hotelCards = this.resultsSection.locator('section[data-test-id="result-item"]');
    this.hotelNameLocator = '[data-test-id="hotel-name"]';
    this.selectHotelButtonLocator = 'div[class*="ResultListItemV2__packagePrice"] button[data-test-id="continue-button"]';
  }

  async selectFirstAvailableHotel(): Promise<string> {
    await this.resultsSection.waitFor();
    const name = await this.hotelCards.first().locator(this.hotelNameLocator).textContent() || 'Unknown Hotel';
    await this.hotelCards.first().locator(this.selectHotelButtonLocator).click();
    return name.trim();
  }
}