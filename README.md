# UI Tests Framework - Playwright + TypeScript

A comprehensive UI testing framework built with Playwright and TypeScript, featuring the Page Object Model pattern for maintainable and scalable test automation.

## 🚀 Features

- **TypeScript** - Strong typing for better code quality and IDE support
- **Playwright** - Modern, reliable browser automation across Chromium, Firefox, and WebKit
- **Page Object Model** - Clean separation of test logic and page interactions
- **Custom Fixtures** - Reusable test fixtures for efficient test setup
- **Parallel Execution** - Fast test execution with built-in parallelization
- **Multiple Reporters** - HTML, list, and JSON reporting out of the box
- **Path Aliases** - Clean imports using `@pages`, `@fixtures`, and `@utils`

## 📁 Project Structure

```
ui-tests-playwright/
├── pages/              # Page Object Models
│   ├── BasePage.ts    # Base page class with common methods
│   ├── PlaywrightHomePage.ts  # Example page object
│   ├── TuiHomePage.ts         # TUI homepage interactions
│   ├── TuiSearchResultsPage.ts # TUI search results
│   ├── TuiHotelDetailsPage.ts  # TUI hotel details
│   ├── TuiFlightSelectionPage.ts # TUI flight selection
│   └── TuiPassengerDetailsPage.ts # TUI passenger details
├── tests/             # Test specifications
│   ├── example.spec.ts
│   └── tui-booking.spec.ts  # TUI booking journey test
├── fixtures/          # Custom test fixtures
│   └── customFixtures.ts
├── utils/             # Utility functions and helpers
│   └── helpers.ts
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json         # Project dependencies
```

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

### Generate tests using codegen
```bash
npm run test:codegen
```

### Run TUI booking test specifically
```bash
npx playwright test tui-booking.spec.ts
```

## 📝 Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';

test('example test', async ({ page }) => {
  const homePage = new PlaywrightHomePage(page);
  await homePage.goto();
  
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Using Custom Fixtures

```typescript
import { test, expect } from '../fixtures/customFixtures';

test('test with fixture', async ({ playwrightHomePage }) => {
  await playwrightHomePage.goto();
  await expect(playwrightHomePage.getStartedLink).toBeVisible();
});
```

## 🏗️ Creating Page Objects

Page objects should extend `BasePage` and encapsulate page-specific locators and actions:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  readonly myElement: Locator;

  constructor(page: Page) {
    super(page);
    this.myElement = page.locator('#my-element');
  }

  async performAction(): Promise<void> {
    await this.myElement.click();
  }
}
```

## ⚙️ Configuration

Configuration is managed in `playwright.config.ts`. Key settings include:

- **testDir**: Location of test files
- **fullyParallel**: Run tests in parallel
- **retries**: Number of retries for failed tests
- **reporter**: Test result reporters
- **projects**: Browser configurations (Chromium, Firefox, WebKit)

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Reports include:
- Test execution results
- Screenshots on failure
- Videos of failed tests
- Trace files for debugging

## 🔧 Utilities

Common utility functions are available in `utils/helpers.ts`:

- `wait(ms)` - Wait for a specific duration
- `generateRandomString(length)` - Generate random strings
- `takeScreenshot(page, name)` - Take custom screenshots
- `getTimestamp()` - Get formatted timestamps
- `getRandomElement(array)` - Get random element from array
- `getRandomInt(min, max)` - Get random integer in range

## 🏖️ TUI Booking Test

This project includes an automated test for the TUI.nl booking journey:

- **Test File**: `tests/tui-booking.spec.ts`
- **Page Objects**: TUI-specific page objects for each step of the booking process
- **Features**:
  - Random selection of departure and destination airports
  - Random child age selection
  - Validation checks for passenger details fields
  - Console logging of all selected booking data
  - Page Object Model implementation

The test automates the complete booking flow from homepage to passenger details validation.

## 🎯 Best Practices

1. **Use Page Objects** - Keep locators and actions in page objects
2. **Write Descriptive Tests** - Use clear test names and descriptions
3. **Use Custom Fixtures** - Create reusable fixtures for common setups
4. **Leverage Path Aliases** - Use `@pages`, `@fixtures`, `@utils` for clean imports
5. **Handle Waits Properly** - Use Playwright's auto-waiting features
6. **Keep Tests Independent** - Each test should be runnable in isolation

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

1. Create a new branch for your feature
2. Write tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

## 📄 License

ISC
