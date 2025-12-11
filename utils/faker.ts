import { en, Faker, nl } from '@faker-js/faker';

const localeMap: Record<string, any> = {
  nl: nl,
  en: en,
};

const envLocale = process.env.LOCALE || 'nl';
const selectedLocale = localeMap[envLocale];

export const customFaker = new Faker({ locale: [selectedLocale] });
customFaker.seed(12345);

export function  getFakeName(){
  return customFaker.person.firstName();
}
export function  getFakeLastName(){
  return customFaker.person.lastName();
}
export function getFakeEmail(){
  return customFaker.internet.email();
}
export function getFakeCity(){
  return customFaker.location.city();
}
export function getFakePhone(){
  return customFaker.phone.number();
}
export function getFakeAddress(){
  return customFaker.location.streetAddress();
}

export function getFakePostalCode(){
  return customFaker.location.zipCode();
}
export function getFakeHouseNumber(){
  return customFaker.location.buildingNumber();
}

export function getFakeDayOfBirth(){
  return customFaker.date.birthdate().getDate().toString();
}   

export function getFakeMonthOfBirth(){
  return customFaker.date.birthdate().getMonth().toString();
}

export function getFakeYearOfBirth(){
  return customFaker.date.birthdate().getFullYear().toString();
}
