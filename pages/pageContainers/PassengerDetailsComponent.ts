import { Locator, Page } from "playwright";
import { Passenger } from "../../types/Passenger";
import { Logger } from "../../utils/logger";

export class PassengerDetailsComponent {
    readonly page: Page;
    readonly container: Locator;


    constructor(page: Page, container: Locator) {
        this.page = page;
        this.container = container;
    }

    getFirstNameLocator(): Locator {
        return this.container.locator('[name*="firstName"]');
    }

    getLastNameLocator(): Locator {
        return this.container.locator('[name*="lastName"]');
    }

    getEmailLocator(): Locator {
        return this.container.locator('[name="email"]');
    }

    getPhoneLocator(): Locator {
        return this.container.locator('[name="mobileNum"]');
    }

    getDayOfBirthLocator(): Locator {
        return this.container.locator('[aria-label="day"]');
    }

    getMonthOfBirthLocator(): Locator {
        return this.container.locator('[aria-label="month"]');
    }

    getYearOfBirthLocator(): Locator {
        return this.container.locator('[aria-label="year"]');
    }

    getAddressLocator(): Locator {
        return this.container.locator('[name="address1"]');
    }

    getHouseNumberLocator(): Locator {
        return this.container.locator('[name="houseNum"]');
    }

    getPostalCodeLocator(): Locator {
        return this.container.locator('[name="postCode"]');
    }

    getCityLocator(): Locator {
        return this.container.locator('[name="town"]');
    }

    getGenderLocator(): Locator {
        return this.container.locator('[name*="gender"]');
    }



    async fillFirstName(firstName: string): Promise<void> {
        Logger.info(`Filling first name: ${firstName}`);
        await this.getFirstNameLocator().fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        Logger.info(`Filling last name: ${lastName}`);
        await this.getLastNameLocator().fill(lastName);
    }

    async fillEmail(email: string): Promise<void> {
        Logger.info(`Filling email: ${email}`);
        await this.getEmailLocator().fill(email);
    }

    async fillPhone(phone: string): Promise<void> {
        Logger.info(`Filling phone: ${phone}`);
        await this.getPhoneLocator().fill(phone);
    }

    async fillDayOfBirth(dayOfBirth: string): Promise<void> {
        Logger.info(`Filling day of birth: ${dayOfBirth}`);
        await this.getDayOfBirthLocator().fill(dayOfBirth);
    }

    async fillMonthOfBirth(monthOfBirth: string): Promise<void> {
        Logger.info(`Filling month of birth: ${monthOfBirth}`);
        await this.getMonthOfBirthLocator().fill(monthOfBirth);
    }

    async fillYearOfBirth(yearOfBirth: string): Promise<void> {
        Logger.info(`Filling year of birth: ${yearOfBirth}`);
        await this.getYearOfBirthLocator().fill(yearOfBirth);
    }

    async fillAddress(address: string): Promise<void> {
        Logger.info(`Filling address: ${address}`);
        await this.getAddressLocator().fill(address);
    }

    async fillHouseNumber(houseNumber: string): Promise<void> {
        Logger.info(`Filling house number: ${houseNumber}`);
        await this.getHouseNumberLocator().fill(houseNumber);
    }

    async fillPostalCode(postalCode: string): Promise<void> {
        Logger.info(`Filling postal code: ${postalCode}`);
        await this.getPostalCodeLocator().fill(postalCode);
    }

    async fillCity(city: string): Promise<void> {
        Logger.info(`Filling city: ${city}`);
        await this.getCityLocator().fill(city);
    }

    async selectGender(gender: string): Promise<void> {
        Logger.info(`Selecting gender: ${gender}`);
        await this.getGenderLocator().selectOption(gender);
    }

    async fillAllPassengerDetails(data: Passenger): Promise<void> {
        Logger.info('Filling all passenger details');
        await this.getFirstNameLocator().fill(data.firstName);
        await this.getLastNameLocator().fill(data.lastName);
        await this.getDayOfBirthLocator().fill(data.dayOfBirth);
        await this.getMonthOfBirthLocator().fill(data.monthOfBirth);
        await this.getYearOfBirthLocator().fill(data.yearOfBirth);
        await this.getEmailLocator().fill(data.email);
        await this.getPhoneLocator().fill(data.phone);
        await this.getAddressLocator().fill(data.address);
        await this.getHouseNumberLocator().fill(data.houseNumber);
        await this.getPostalCodeLocator().fill(data.postalCode);
        await this.getCityLocator().fill(data.city);
        await this.selectGender(data.gender);
    }

    async getErrorMessage(fieldLocator: Locator): Promise<string | null> {
        const errorMessageLocator = fieldLocator.locator('..').getByRole('alert');
        if (await errorMessageLocator.isVisible()) {
            return await errorMessageLocator.innerText();
        }
        Logger.error(`No error message found for the field: ${fieldLocator.toString()}`);
        return null;
    }

    async getGenderErrorMessage(): Promise<string | null> {
        return await (await this.getGenderLocator()).locator('..').getByRole('paragraph').innerText();
    }
}