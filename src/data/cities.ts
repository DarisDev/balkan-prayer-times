import { City } from '@/types/prayer';

export const balkanCities: City[] = [
  // Kosovo
  { name: 'Pristina', country: 'Kosovo', latitude: 42.6629, longitude: 21.1655 },
  { name: 'Prizren', country: 'Kosovo', latitude: 42.2139, longitude: 20.7397 },
  { name: 'Peja', country: 'Kosovo', latitude: 42.6593, longitude: 20.2887 },
  { name: 'Gjakova', country: 'Kosovo', latitude: 42.3803, longitude: 20.4308 },
  { name: 'Mitrovica', country: 'Kosovo', latitude: 42.8914, longitude: 20.8660 },
  { name: 'Ferizaj', country: 'Kosovo', latitude: 42.3702, longitude: 21.1553 },
  
  // Albania
  { name: 'Tirana', country: 'Albania', latitude: 41.3275, longitude: 19.8187 },
  { name: 'Shkodra', country: 'Albania', latitude: 42.0693, longitude: 19.5033 },
  { name: 'Durrës', country: 'Albania', latitude: 41.3246, longitude: 19.4565 },
  { name: 'Vlorë', country: 'Albania', latitude: 40.4660, longitude: 19.4910 },
  { name: 'Elbasan', country: 'Albania', latitude: 41.1125, longitude: 20.0822 },
  
  // Montenegro
  { name: 'Podgorica', country: 'Montenegro', latitude: 42.4304, longitude: 19.2594 },
  { name: 'Ulcinj', country: 'Montenegro', latitude: 41.9297, longitude: 19.2086 },
  { name: 'Bar', country: 'Montenegro', latitude: 42.0903, longitude: 19.1000 },
  { name: 'Plav', country: 'Montenegro', latitude: 42.5964, longitude: 19.9439 },
  { name: 'Rožaje', country: 'Montenegro', latitude: 42.8403, longitude: 20.1672 },
  
  // North Macedonia
  { name: 'Skopje', country: 'North Macedonia', latitude: 41.9981, longitude: 21.4254 },
  { name: 'Tetovo', country: 'North Macedonia', latitude: 42.0069, longitude: 20.9715 },
  { name: 'Gostivar', country: 'North Macedonia', latitude: 41.7958, longitude: 20.9086 },
  { name: 'Kumanovo', country: 'North Macedonia', latitude: 42.1322, longitude: 21.7144 },
  { name: 'Struga', country: 'North Macedonia', latitude: 41.1775, longitude: 20.6783 },
  
  // Bosnia and Herzegovina
  { name: 'Sarajevo', country: 'Bosnia', latitude: 43.8563, longitude: 18.4131 },
  { name: 'Mostar', country: 'Bosnia', latitude: 43.3438, longitude: 17.8078 },
  { name: 'Zenica', country: 'Bosnia', latitude: 44.2017, longitude: 17.9078 },
  { name: 'Tuzla', country: 'Bosnia', latitude: 44.5384, longitude: 18.6763 },
  { name: 'Bihać', country: 'Bosnia', latitude: 44.8169, longitude: 15.8708 },
  { name: 'Travnik', country: 'Bosnia', latitude: 44.2264, longitude: 17.6658 },
];

export const countriesWithCities = balkanCities.reduce((acc, city) => {
  if (!acc[city.country]) {
    acc[city.country] = [];
  }
  acc[city.country].push(city);
  return acc;
}, {} as Record<string, City[]>);

export const defaultCity = balkanCities.find(c => c.name === 'Pristina')!;
