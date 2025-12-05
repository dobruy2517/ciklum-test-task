import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { getRandomElement } from '../utils/helpers';

export class TuiHomePage extends BasePage {

  readonly acceptCookiesButton: Locator;
  readonly departureInput: Locator;
  readonly departureOptions: Locator;
  readonly destinationOptions: Locator;
  readonly destinationInput: Locator;
  readonly departureDateInput: Locator;
  readonly roomsGuestsButton: Locator;
  readonly adultsSelect: Locator;
  readonly childrenSelect: Locator;
  readonly childAgeSelect: Locator;
  readonly searchButton: Locator;
  readonly airportsSection: Locator;
  readonly airportsSectionSaveButton: Locator;
  readonly destinationSection: Locator;
  readonly destinationCities: Locator;
  readonly destinationSectionSaveButton: Locator;
  readonly departureDateSection: Locator;
  readonly departureAvailableDates: Locator;
  readonly dapartureDateSectionSaveButton: Locator;
  readonly nightsCountSelect: Locator;
  readonly roomsGuestsSelect: Locator;
  readonly roomsGuestsSaveButton: Locator;


  constructor(page: Page) {
    super(page);
    // Note: Selectors may need to be updated based on actual site structure
    this.acceptCookiesButton = page.locator('#cmCloseBanner');
    this.departureInput = page.locator('[data-test-id="airport-input"]');
    this.airportsSection = page.locator('section[aria-label="airports"]');
    this.destinationSection = page.locator('section[aria-label="destinations"]');
    this.departureOptions = this.airportsSection.locator('[aria-label="airport list"] li input:not([disabled])');
    this.destinationOptions = this.destinationSection.locator('li>:not([class*="disabled"])');
    this.destinationCities = this.destinationSection.getByRole('checkbox');
    this.airportsSectionSaveButton = this.airportsSection.getByRole('button');
    this.destinationSectionSaveButton = this.destinationSection.getByRole('button');
    this.destinationInput = page.locator('[data-test-id="destination-input"]~[class="inputs__children"]');
    this.departureDateInput = page.locator('[data-test-id="departure-date-input"]');
    this.roomsGuestsButton = page.locator('[data-test-id="rooms-and-guest-input"]');
    this.roomsGuestsSelect = page.locator('[aria-label="room and guest"]');
    this.adultsSelect = page.locator('[aria-label="adult select"] select');
    this.childrenSelect = page.locator('[aria-label="child select"] select');
    this.childAgeSelect = page.locator('[aria-label="age select"] select');
    this.searchButton = page.locator('button:has-text("Zoeken")').or(page.locator('[data-testid="search-button"]'));
    this.departureDateSection = page.locator('section[aria-label="Departure date"]');
    this.departureAvailableDates = this.departureDateSection.locator('td[class*="SelectLegacyDate__cell"][class*="SelectLegacyDate__available"]');
    this.dapartureDateSectionSaveButton = this.departureDateSection.getByRole('button');
    this.nightsCountSelect = page.locator('[data-test-id="duration-input"]');
    this.roomsGuestsSaveButton = this.roomsGuestsSelect.getByRole('button');
  }

  async goto(): Promise<void> {
    await this.navigate('https://www.tui.nl/h/nl');
  }

  async acceptCookies(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }

  async selectRandomDeparture(): Promise<string> {
    // await this.departureSelect.waitFor();
    await this.departureInput.click();
    await this.airportsSection.waitFor({ state: 'visible' });
    let options = await this.departureOptions.all();
    if (options.length === 0) {
      options = await this.departureOptions.all();
    }
    const selected = getRandomElement(options).locator('..');
    await selected.check();
    return await selected.textContent() || '';
  }

  async saveAirportSelection(): Promise<void> {
    await this.airportsSectionSaveButton.click();
    await this.airportsSection.waitFor({ state: 'hidden' });
  }

  async saveDestinationSelection(): Promise<void> {
    await this.destinationSectionSaveButton.click();
    await this.destinationSectionSaveButton.waitFor({ state: 'hidden' });
  }

  async saveDepartureDateSelection(): Promise<void> {
    await this.dapartureDateSectionSaveButton.click();
    await this.dapartureDateSectionSaveButton.waitFor({ state: 'hidden' });
  }

  async selectRandomDestination(): Promise<string> {
    await this.destinationInput.click();
    await this.destinationInput.waitFor({ state: 'visible' });
    const options = await this.destinationOptions.all();
    const selected = getRandomElement(options);
    await selected.click();
    const cities = await this.destinationCities.all()
    const cityCheckbox = getRandomElement(cities);
    await cityCheckbox.check();
    return await selected.textContent() || '';
  }

  async selectAvailableDepartureDate(): Promise<string> {
    // Assuming date picker is available, select first available date
    // This might need adjustment based on actual date picker
    let dateText: string = '';
    await this.departureDateInput.click();
    const availableDate = this.departureAvailableDates.all();
    const date = getRandomElement(await availableDate);
    if (!date) {
      this.selectRandomDeparture();
      this.saveAirportSelection();
      this.selectRandomDestination();
      this.saveDestinationSelection();
      this.selectAvailableDepartureDate();
    } else {
      await date.click();
      dateText = await date.textContent() || '';
    }
    return dateText;
  }

  async selectRandomNightCount() {
    const options = await this.nightsCountSelect.locator('option').all();
    const selected = getRandomElement(options)
    const selectedValue = await selected.getAttribute("value");
    await this.nightsCountSelect.selectOption(selectedValue || '7');
  }

  async configureRoomsAndGuests(adultCount: string, childCount: string, childAge?: string): Promise<{ adults: string; children: string; childAge: string }> {
    await this.roomsGuestsButton.click();
    await this.adultsSelect.selectOption(adultCount);
    await this.childrenSelect.selectOption(childCount);
    await this.childAgeSelect.waitFor({ state: 'visible' });
    if (childAge) {
      await this.childAgeSelect.selectOption(childAge);
    } else {
      const ageOptions = await this.childAgeSelect.locator('option').allTextContents();
      const availableAges = ageOptions.filter(age => age.trim() !== '');
      const childAge = getRandomElement(availableAges);
      await this.childAgeSelect.selectOption(childAge);
    }
    return { adults: adultCount, children: childCount, childAge: childAge || 'Not specified' };
  }

  async searchHolidays(): Promise<void> {
    await this.searchButton.click();
  }

  async checkFlightAvailability() {
    const isfkightErrorVisible = await this.flightAvailabilityErrorBanner.isVisible();
    if (isfkightErrorVisible) {
      await this.page.goBack();
      await this.selectAvailableDepartureDate();
      await this.searchHolidays();
      await this.checkFlightAvailability();
    }
  }
}
