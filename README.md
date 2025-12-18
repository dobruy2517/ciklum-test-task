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

## CI/CD

The project includes GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs on pushes and pull requests to main/master branches
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads test reports as artifacts
- Retains reports for 30 days
