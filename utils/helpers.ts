import { Page } from '@playwright/test';

/**
 * Wait for a specific amount of time
 * @param ms - milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 * @param length - length of the string
 */
export function generateRandomString(length: number = 10): string {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Take a screenshot with a custom name
 * @param page - Playwright page object
 * @param name - name of the screenshot
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
}

/**
 * Get current timestamp in a readable format
 */
export function getTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Get a random element from an array
 * @param array - the array to pick from
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random integer between min and max inclusive
 * @param min - minimum value
 * @param max - maximum value
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
