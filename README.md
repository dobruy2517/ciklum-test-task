# UI Tests Framework - Playwright + TypeScript

A comprehensive UI testing framework built with Playwright and TypeScript for automated validation testing of the TUI.nl booking website, featuring the Page Object Model pattern for maintainable and scalable test automation.

## Features

- TypeScript - Strong typing for better code quality and IDE support
- Playwright - Modern, reliable browser automation across Chromium, Firefox, and WebKit
- Page Object Model - Clean separation of test logic and page interactions
- Custom Fixtures - Reusable test fixtures for efficient test setup
- Parallel Execution - Fast test execution with built-in parallelization
- Multiple Reporters - HTML, list, and JSON reporting out of the box
- Path Aliases - Clean imports using configured aliases
- Validation Testing - Focused on form field validation for TUI booking flows
- Test Data Generation - Uses Faker.js for realistic test data
- Logging - Winston-based logging for test execution tracking
- CI/CD - GitHub Actions workflow for automated testing

## Project Structure

```
ciklum-test-task/
├── .github/workflows/          # CI/CD workflows
│   └── ci.yml
├── config/                     # Configuration files
│   └── urls.ts
├── fixtures/                   # Custom test fixtures
│   └── index.ts
├── locators/                   # Page element locators
│   └── locators.ts
├── pages/                      # Page Object Models
│   ├── BasePage.ts            # Base page class with common methods
│   ├── TuiHomePage.ts         # TUI homepage interactions
│   ├── TuiSearchResultsPage.ts # TUI search results page
│   ├── TuiHotelDetailsPage.ts  # TUI hotel details page
│   ├── TuiBookingPage.ts       # TUI booking page
│   ├── TuiPassengerDetailsPage.ts # TUI passenger details page
│   ├── TuiErrorPage.ts         # TUI error page
│   └── pageContainers/         # Page components
│       ├── PassengerDetailsComponent.ts
│       └── SelectionComponent.ts
├── test-data/                  # Test data files
│   ├── bookingData.ts
│   ├── errorMessages.ts
│   └── guestConfigs.ts
├── tests/                      # Test specifications
│   └── validation/             # Validation test suites
│       ├── tui.main.broker.fields.validation.spec.ts
│       ├── tui.passenger.page.fields.validation.spec.ts
│       └── tui.second.broker.fields.validation.spec.ts
├── types/                      # TypeScript type definitions
│   └── Passenger.ts
├── utils/                      # Utility functions and helpers
│   ├── faker.ts               # Faker.js utilities
│   ├── helpers.ts             # Common helper functions
│   ├── logger.ts              # Winston logger configuration
│   └── testData.ts            # Test data utilities
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project dependencies
├── .env                       # Environment variables
└── .gitignore
```

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
npx playwright install
```

## Environment Variables

The framework supports the following environment variables for configuration:

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `BASE_URL` | Base URL for Playwright tests | `https://www.tui.nl` | `https://staging.tui.nl` |
| `LOCALE` | Locale for URL paths and test data generation | `nl` | `de`, `en` |
| `WORKERS` | Number of parallel test workers | `1` | `4` |
| `CI` | Automatically set by CI systems (affects retries and workers) | `undefined` | `true` |

### Setting Environment Variables

Create a `.env` file in the project root:

```bash
BASE_URL=https://www.tui.nl
LOCALE=nl
WORKERS=4
```

Or set them in your shell:

```bash
export BASE_URL=https://staging.tui.nl
export LOCALE=de
```

### CI Environment Variables

The GitHub Actions workflow automatically sets:

```yaml
env:
  BASE_URL: https://www.tui.nl
  LOCALE: nl
  WORKERS: 4
```

## Running Tests

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

### Run specific validation test
```bash
npx playwright test tests/validation/tui.main.broker.fields.validation.spec.ts
```

## Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '../fixtures';

test.describe('Passenger Details Validation', () => {

  test('Validate error messages for empty fields', async ({
    passengerDetailsPage,
    bookingData,
    errorMessages,
    generateTestDescription,
    navigateToPassengerDetails
  }) => {

    // Attach booking summary to Playwright report
    test.info().annotations.push({
      type: 'Booking Summary',
      description: generateTestDescription(bookingData)
    });

    await test.step('Validate passenger details fields', async () => {
      await passengerDetailsPage.attemptToContinue();
      const firstNameError = await passengerDetailsPage.getErrorMessageForFirstName(0);
      expect.soft(firstNameError).toBe(errorMessages.empty.firstName);
    });
  });
});
```

### Using Custom Fixtures

The framework provides custom fixtures for page objects, test data, and utilities:

- `homePage` - TuiHomePage instance
- `searchResultsPage` - TuiSearchResultsPage instance
- `hotelDetailsPage` - TuiHotelDetailsPage instance
- `bookingPage` - TuiBookingPage instance
- `passengerDetailsPage` - TuiPassengerDetailsPage instance
- `bookingData` - Generated booking test data
- `errorMessages` - Expected error message constants
- `generateTestDescription` - Function to create test descriptions
- `navigateToPassengerDetails` - Fixture that navigates to passenger details page

## Creating Page Objects

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

## Configuration

Configuration is managed in `playwright.config.ts`. Key settings include:

- `testDir`: Location of test files (./tests)
- `fullyParallel`: Run tests in parallel
- `retries`: Number of retries for failed tests (2 on CI, 0 locally)
- `workers`: Number of parallel workers (5 on CI)
- `reporter`: Test result reporters (HTML, list, JSON)
- `projects`: Browser configurations (Chromium, Firefox, WebKit)
- `baseURL`: Base URL for tests (https://www.tui.nl)
- `trace`: Collect traces for debugging
- `screenshot`: Capture screenshots on failure
- `video`: Record videos on failure

## Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Reports include:
- Test execution results
- Screenshots on failure
- Videos of failed tests
- Trace files for debugging
- Custom annotations with booking summaries

## Utilities

Common utility functions are available in `utils/`:

- `helpers.ts` - General helper functions like `generateTestDescription` and `goToPassengerDetailsPage`
- `faker.ts` - Faker.js utilities for generating test data
- `testData.ts` - Test data generation and management
- `logger.ts` - Winston logger configuration for test logging

## TUI Validation Tests

This project includes automated validation tests for the TUI.nl booking website:

- **Test Suites**: Located in `tests/validation/`
- **Focus**: Field validation on passenger details forms
- **Coverage**: Empty field validation, invalid input validation
- **Page Objects**: TUI-specific page objects for each step of the booking process
- **Features**:
  - Validation of error messages for required fields
  - Validation of error messages for invalid inputs
  - Soft assertions for comprehensive error checking
  - Booking data generation with realistic test data
  - Console logging and report annotations

The tests validate the complete passenger details form validation flow.

## CI/CD

The project includes GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs on pushes and pull requests to main/master branches
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads test reports as artifacts
- Retains reports for 30 days

## Best Practices

1. Use Page Objects - Keep locators and actions in page objects
2. Write Descriptive Tests - Use clear test names and descriptions
3. Use Custom Fixtures - Create reusable fixtures for common setups
4. Leverage Path Aliases - Use configured path aliases for clean imports
5. Handle Waits Properly - Use Playwright's auto-waiting features
6. Keep Tests Independent - Each test should be runnable in isolation
7. Use Soft Assertions - For comprehensive validation checking
8. Add Annotations - Include booking summaries in test reports

## Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Faker.js Documentation](https://fakerjs.dev)
- [Winston Logging](https://github.com/winstonjs/winston)
