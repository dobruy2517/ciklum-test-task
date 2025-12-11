import { Locator, Page } from '@playwright/test';
import { Logger } from '../../utils/logger';

export class SelectionComponent {
  readonly page: Page;
  readonly inputLocator: Locator;
  readonly sectionLocator: Locator;
  readonly optionsLocator: Locator;
  readonly saveButtonLocator: Locator;

  constructor(
    page: Page,
    inputLocator: Locator,
    sectionLocator: Locator,
    optionsLocator: Locator,
    saveButtonLocator: Locator
  ) {
    this.page = page;
    this.inputLocator = inputLocator;
    this.sectionLocator = sectionLocator;
    this.optionsLocator = optionsLocator;
    this.saveButtonLocator = saveButtonLocator;
  }

  async openSection(): Promise<void> {
    await this.inputLocator.click();
    await this.sectionLocator.waitFor({ state: 'visible' });
  }

  async selectRandomOption(): Promise<string> {
    let count = 0;
    let attempts = 0;
    const maxAttempts = 100;
    while (count === 0 && attempts < maxAttempts) {
      count = await this.optionsLocator.count();
      if (count === 0) {
        await this.page.waitForTimeout(100);
      }
      attempts++;
    }
    if (count === 0) {
      throw new Error('No options available after waiting');
    }
    const options = await this.optionsLocator.all();
    const selected = options[Math.floor(Math.random() * options.length)];
    const selectedCheckbox = selected.locator('..');
    await selectedCheckbox.check();
    const selectedText = await selectedCheckbox.innerText() || '';
    Logger.info(`Selected option: ${selectedText}`);
    return selectedText;
  }

  async saveSelection(): Promise<void> {
    await this.saveButtonLocator.click();
    await this.sectionLocator.waitFor({ state: 'hidden' });
  }
}