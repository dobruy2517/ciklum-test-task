import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { checkFlightAvailability, getRandomElement, goToPassengerDetailsPage } from '../utils/helpers';
import { Logger } from '../utils/logger';
import { locators } from '../locators/locators';
import { urls } from '../config/urls';
import { SelectionComponent } from './pageContainers/SelectionComponent';

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
  readonly departureCalendar: Locator;
  readonly departureAvailableDates: Locator;
  readonly departureDateSectionSaveButton: Locator;
  readonly nightsCountSelect: Locator;
  readonly roomsGuestsSelect: Locator;
  readonly roomsGuestsSaveButton: Locator;
  readonly airportsSelection: SelectionComponent;
  readonly destinationSelection: SelectionComponent;
  readonly dateSelection: SelectionComponent;


  constructor(page: Page) {
    super(page);
    // Note: Selectors may need to be updated based on actual site structure
    this.acceptCookiesButton = page.locator(locators.homePage.acceptCookiesButton);
    this.departureInput = page.locator(locators.homePage.departureInput);
    this.airportsSection = page.locator(locators.homePage.airportsSection);
    this.destinationSection = page.locator(locators.homePage.destinationSection);
    this.departureOptions = this.airportsSection.locator(locators.homePage.departureOptions);
    this.destinationOptions = this.destinationSection.locator(locators.homePage.destinationOptions);
    this.destinationCities = this.destinationSection.locator(locators.homePage.destinationCities);
    this.airportsSectionSaveButton = this.airportsSection.locator(locators.homePage.airportsSectionSaveButton);
    this.destinationSectionSaveButton = this.destinationSection.locator(locators.homePage.destinationSectionSaveButton);
    this.destinationInput = page.locator(locators.homePage.destinationInput);
    this.departureDateInput = page.locator(locators.homePage.departureDateInput);
    this.roomsGuestsButton = page.locator(locators.homePage.roomsGuestsButton);
    this.roomsGuestsSelect = page.locator(locators.homePage.roomsGuestsSelect);
    this.adultsSelect = page.locator(locators.homePage.adultsSelect);
    this.childrenSelect = page.locator(locators.homePage.childrenSelect);
    this.childAgeSelect = page.locator(locators.homePage.childAgeSelect);
    this.searchButton = page.locator(locators.homePage.searchButton);
    this.departureDateSection = page.locator(locators.homePage.departureDateSection);
    this.departureCalendar = this.departureDateSection.locator(locators.homePage.departureCalendar);
    this.departureAvailableDates = this.departureDateSection.locator(locators.homePage.departureAvailableDates);
    this.departureDateSectionSaveButton = this.departureDateSection.locator(locators.homePage.departureDateSectionSaveButton);
    this.nightsCountSelect = page.locator(locators.homePage.nightsCountSelect);
    this.roomsGuestsSaveButton = this.roomsGuestsSelect.locator(locators.homePage.roomsGuestsSaveButton);

    this.airportsSelection = new SelectionComponent(
      page,
      this.departureInput,
      this.airportsSection,
      this.departureOptions,
      this.airportsSectionSaveButton
    );

    this.destinationSelection = new SelectionComponent(
      page,
      this.destinationInput,
      this.destinationSection,
      this.destinationOptions,
      this.destinationSectionSaveButton
    );

    this.dateSelection = new SelectionComponent(
      page,
      this.departureDateInput,
      this.departureDateSection,
      this.departureAvailableDates,
      this.departureDateSectionSaveButton
    );

    // Set up listener for flight availability check on page load
  }

  async goto(): Promise<void> {
    Logger.info('Navigating to TUI homepage');
    await this.navigate(urls.home);
  }

  async acceptCookies(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible()) {
      Logger.info('Accepting cookies');
      await this.acceptCookiesButton.click();
    }
  }

  async selectRandomDeparture(): Promise<string> {
    await this.departureInput.click();
    const departure = await this.airportsSelection.selectRandomOption();
    await this.airportsSelection.saveSelection();
    Logger.info(`Selected departure airport: ${departure}`);
    return departure;
  }

  async saveAirportSelection(): Promise<void> {
    Logger.info('Saving airport selection');
    await this.airportsSectionSaveButton.click();
    await this.airportsSection.waitFor({ state: 'hidden' });
  }

  async saveDestinationSelection(): Promise<void> {
    Logger.info('Saving destination selection');
    await this.destinationSectionSaveButton.click();
    await this.destinationSectionSaveButton.waitFor({ state: 'hidden' });
  }

  async saveDepartureDateSelection(): Promise<void> {
    Logger.info('Saving departure date selection');
    await this.departureDateSectionSaveButton.click();
    await this.departureDateSectionSaveButton.waitFor({ state: 'hidden' });
  }

  async selectRandomDestination(): Promise<string> {
    await this.destinationSelection.openSection();
    await this.destinationSelection.sectionLocator.waitFor({ state: 'visible' });
    await expect(this.destinationOptions.first()).toBeVisible();
    const options = await this.destinationOptions.all();
    const selected = getRandomElement(options);
    await selected.click();
    const cities = await this.destinationCities.all()
    const cityCheckbox = getRandomElement(cities).locator('..');
    await cityCheckbox.check();
    const destination = await selected.textContent() || '';
    Logger.info(`Selected destination: ${destination}`);
    return destination;
  }

  async selectAvailableDepartureDate(): Promise<string> {
    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      await this.departureDateInput.click();
      await expect(this.departureAvailableDates.first()).toBeVisible();
      const availableDates = await this.departureAvailableDates.all();
      if (availableDates.length > 0) {
        const date = getRandomElement(availableDates);
        await date.click();
        const dateText = await date.textContent() || '';
        Logger.info(`Selected departure date: ${dateText}`);
        return dateText;
      } else {
        await this.selectRandomDeparture();
        // await this.saveAirportSelection();
        await this.selectRandomDestination();
        await this.saveDestinationSelection();
      }
    }
    throw new Error('No available departure date found after maximum retries');
  }

  async selectRandomNightCount() {
    Logger.info('Selecting random night count');
    const options = await this.nightsCountSelect.locator('option').all();
    const selected = getRandomElement(options)
    const selectedValue = await selected.getAttribute("value");
    await this.nightsCountSelect.selectOption(selectedValue || '7');
  }

  async configureRoomsAndGuests(adultCount: string, childCount: string, childAge?: string): Promise<{ adults: string; children: string; childAge: string }> {
    Logger.info(`Configuring rooms and guests: adults=${adultCount}, children=${childCount}, childAge=${childAge || 'random'}`);
    await this.roomsGuestsButton.click();
    await this.adultsSelect.selectOption(adultCount);
    await this.childrenSelect.selectOption(childCount);
    await this.childAgeSelect.waitFor({ state: 'visible' });
    let finalChildAge = childAge;
    if (childAge) {
      await this.childAgeSelect.selectOption(childAge);
    } else {
      const ageOptions = await this.childAgeSelect.locator('option').allTextContents();
      const availableAges = ageOptions.filter(age => age.trim() !== '');
      finalChildAge = getRandomElement(availableAges);
      await this.childAgeSelect.selectOption(finalChildAge);
    }
    const result = { adults: adultCount, children: childCount, childAge: finalChildAge || 'Not specified' };
    Logger.info(`Configured guests: ${result.adults} adults, ${result.children} children (age ${result.childAge})`);
    return result;
  }

  async searchHolidays(): Promise<void> {
    Logger.info('Initiating search for holidays');
    await this.searchButton.click();
  }
}
