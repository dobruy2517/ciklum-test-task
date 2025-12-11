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

    async getFirstNameLocator() {
        return this.container.locator('[name*="firstName"]');
    }

    async getLastNameLocator() {
        return this.container.locator('[name*="lastName"]');
    }

    async getEmailLocator() {
        return this.container.locator('[name="email"]');
    }

    async getPhoneLocator() {
        return this.container.locator('[name="mobileNum"]');
    }
    async getDayOfBirthLocator() {
        return this.container.locator('[aria-label="day"]');
    }

    async getMonthOfBirthLocator() {
        return this.container.locator('[aria-label="month"]');
    }

    async getYearOfBirthLocator() {
        return this.container.locator('[aria-label="year"]');
    }

    async getAddressLocator() {
        return this.container.locator('[name="address1"]');
    }

    async getHouseNumberLocator() {
        return this.container.locator('[name="houseNum"]');
    }

    async getPostalCodeLocator() {
        return this.container.locator('[name="postCode"]');
    }

    async getCityLocator() {
        return this.container.locator('[name="town"]');
    }

    async getGenderLocator(): Promise<Locator> {
        return this.container.locator('[name*="gender"]');
    }



    async fillFirstName(firstName: string) {
        Logger.info(`Filling first name: ${firstName}`);
        await (await this.getFirstNameLocator()).fill(firstName);
    }
    async fillLastName(lastName: string) {
        Logger.info(`Filling last name: ${lastName}`);
        await (await this.getLastNameLocator()).fill(lastName);
    }
    async fillEmail(email: string) {
        Logger.info(`Filling email: ${email}`);
        await (await this.getEmailLocator()).fill(email);
    }
    async fillPhone(phone: string) {
        Logger.info(`Filling phone: ${phone}`);
        await (await this.getPhoneLocator()).fill(phone);
    }
    async fillDayOfBirth(dayOfBirth: string) {
        Logger.info(`Filling day of birth: ${dayOfBirth}`);
        await (await this.getDayOfBirthLocator()).fill(dayOfBirth);
    }
    async fillMonthOfBirth(monthOfBirth: string) {
        Logger.info(`Filling month of birth: ${monthOfBirth}`);
        await (await this.getMonthOfBirthLocator()).fill(monthOfBirth);
    }
    async fillYearOfBirth(yearOfBirth: string) {
        Logger.info(`Filling year of birth: ${yearOfBirth}`);
        await (await this.getYearOfBirthLocator()).fill(yearOfBirth);
    }
    async fillAddress(address: string) {
        Logger.info(`Filling address: ${address}`);
        await (await this.getAddressLocator()).fill(address);
    }
    async fillHouseNumber(houseNumber: string) {
        Logger.info(`Filling house number: ${houseNumber}`);
        await (await this.getHouseNumberLocator()).fill(houseNumber);
    }
    async fillPostalCode(postalCode: string) {
        Logger.info(`Filling postal code: ${postalCode}`);
        await (await this.getPostalCodeLocator()).fill(postalCode);
    }
    async fillCity(city: string) {
        Logger.info(`Filling city: ${city}`);
        await (await this.getCityLocator()).fill(city);
    }

    async selectGender(gender: string) {
        Logger.info(`Selecting gender: ${gender}`);
        await (await this.getGenderLocator()).selectOption(gender);
    }

    async fillAllPassengerDetails(data: Passenger) {
        Logger.info('Filling all passenger details');
        await (await this.getFirstNameLocator()).fill(data.firstName);
        await (await this.getLastNameLocator()).fill(data.lastName);
        await (await this.getDayOfBirthLocator()).fill(data.dayOfBirth);
        await (await this.getMonthOfBirthLocator()).fill(data.monthOfBirth);
        await (await this.getYearOfBirthLocator()).fill(data.yearOfBirth);
        await (await this.getEmailLocator()).fill(data.email);
        await (await this.getPhoneLocator()).fill(data.phone);
        await (await this.getAddressLocator()).fill(data.address);
        await (await this.getHouseNumberLocator()).fill(data.houseNumber);
        await (await this.getPostalCodeLocator()).fill(data.postalCode);
        await (await this.getCityLocator()).fill(data.city);
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