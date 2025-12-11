export interface GuestConfig {
  adults: string;
  children: string;
  childAge?: string;
}

export const defaultGuestConfig: GuestConfig = {
  adults: '2',
  children: '1',
  childAge: '5'
};

export function createRandomGuestConfig(): GuestConfig {
  const adults = Math.floor(Math.random() * 4) + 1; // 1-4 adults
  const children = Math.floor(Math.random() * 3); // 0-2 children
  const childAge = children > 0 ? (Math.floor(Math.random() * 12) + 1).toString() : undefined; // 1-12 if children

  return {
    adults: adults.toString(),
    children: children.toString(),
    childAge
  };
}