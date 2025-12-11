/**
 * Centralized locators for all page objects
 * Using semantic keys instead of raw CSS/XPath selectors for better maintainability
 */

export const locators = {
  // Home Page Locators
  homePage: {
    acceptCookiesButton: '#cmCloseBanner',
    departureInput: '[data-test-id="airport-input"]',
    airportsSection: 'section[aria-label="airports"]',
    destinationSection: 'section[aria-label="destinations"]',
    departureOptions: '[aria-label="airport list"] li input:not([disabled])',
    destinationOptions: 'li>:not([class*="disabled"])',
    destinationCities: 'input[type="checkbox"]',
    airportsSectionSaveButton: 'button',
    destinationSectionSaveButton: 'button',
    destinationInput: '[data-test-id="destination-input"]~[class="inputs__children"]',
    departureDateInput: '[data-test-id="departure-date-input"]',
    roomsGuestsButton: '[data-test-id="rooms-and-guest-input"]',
    roomsGuestsSelect: '[aria-label="room and guest"]',
    adultsSelect: '[aria-label="adult select"] select',
    childrenSelect: '[aria-label="child select"] select',
    childAgeSelect: '[aria-label="age select"] select',
    searchButton: 'button:has-text("Zoeken"), [data-testid="search-button"]',
    departureDateSection: 'section[aria-label="Departure date"]',
    departureCalendar: ".SelectLegacyDate__calendar",
    departureAvailableDates: 'td[class*="SelectLegacyDate__cell"][class*="SelectLegacyDate__available"]',
    departureDateSectionSaveButton: 'button',
    nightsCountSelect: '[data-test-id="duration-input"]',
    roomsGuestsSaveButton: 'button',
    flightAvailabilityErrorBanner: '#wrErrorBanner',
  },

  // Passenger Details Page Locators
  passengerDetailsPage: {
    firstNameInput: 'input[name="firstName"], [data-testid="first-name"]',
    lastNameInput: 'input[name="lastName"], [data-testid="last-name"]',
    emailInput: 'input[name="email"], [data-testid="email"]',
    phoneInput: 'input[name="phone"], [data-testid="phone"]',
    continueButton: '.WCMS_component button[role="button"]',
    errorMessages: '[role="alert"]',
    passengersContainer: 'div.PassengerFormV2__passengerContainer',
    passengerForm: 'form[id="pax-form"]',
    // Dynamic locators for passenger fields (used with index)
    passengerFields: {
      firstName: '[name*="firstName"]',
      lastName: '[name*="lastName"]',
      email: '[name="email"]',
      phone: '[name="mobileNum"]',
      dayOfBirth: '[aria-label="day"]',
      monthOfBirth: '[aria-label="month"]',
      yearOfBirth: '[aria-label="year"]',
      address: '[name="address1"]',
      houseNumber: '[name="houseNum"]',
      postalCode: '[name="postCode"]',
      city: '[name="town"]',
      gender: '[name*="gender"]',
    },
  },

  // Search Results Page Locators
  searchResultsPage: {
    resultsSection: '[data-test-id="search-results-list"]',
    hotelCards: 'section[data-test-id="result-item"]',
    hotelName: '[data-test-id="hotel-name"]',
    selectHotelButton: 'div[class*="ResultListItemV2__packagePrice"] button[data-test-id="continue-button"]',
  },

  // Booking Page Locators
  bookingPage: {
    bookNowButton: '.ProgressbarNavigation__container button[aria-label="button"]',
  },

  // Hotel Details Page Locators
  hotelDetailsPage: {
    continueButton: '.ProgressbarNavigation__container button[aria-label="button"]',
  },
} as const;