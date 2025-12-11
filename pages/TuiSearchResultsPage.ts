import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { locators } from '../locators/locators';

export class TuiSearchResultsPage extends BasePage {
  readonly resultsSection: Locator;
  readonly hotelCards: Locator;
  readonly hotelNameLocator: string;
  readonly selectHotelButtonLocator: string;

  constructor(page: Page) {
    super(page);
    // Selectors for search results
    this.resultsSection = page.locator(locators.searchResultsPage.resultsSection);
    this.hotelCards = this.resultsSection.locator(locators.searchResultsPage.hotelCards);
    this.hotelNameLocator = locators.searchResultsPage.hotelName;
    this.selectHotelButtonLocator = locators.searchResultsPage.selectHotelButton;
  }

  async waitForSearchResults(): Promise<void> {
    Logger.info('Waiting for search results to load');
    await this.resultsSection.waitFor();
    Logger.info('Search results loaded');
  }

  async selectFirstAvailableHotel(): Promise<string> {
    const name = await this.hotelCards.first().locator(this.hotelNameLocator).textContent() || 'Unknown Hotel';
    await this.hotelCards.first().locator(this.selectHotelButtonLocator).click();
    const hotelName = name.trim();
    Logger.info(`Selected hotel: ${hotelName}`);
    return hotelName;
  }
}