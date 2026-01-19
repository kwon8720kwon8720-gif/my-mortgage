import { generateSlug, type SlugParts } from "./slug";

const PRICE_RANGES = [
  200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
  1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
];

const INTEREST_RATES = [
  3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0,
];

const REGIONS = [
  "california",
  "texas",
  "florida",
  "new-york",
  "pennsylvania",
  "illinois",
  "ohio",
  "georgia",
  "north-carolina",
  "michigan",
  "new-jersey",
  "virginia",
  "washington",
  "arizona",
  "massachusetts",
  "tennessee",
  "indiana",
  "missouri",
  "maryland",
  "wisconsin",
  "colorado",
  "minnesota",
  "south-carolina",
  "alabama",
  "louisiana",
  "kentucky",
  "oregon",
  "oklahoma",
  "connecticut",
  "utah",
  "nevada",
  "iowa",
  "arkansas",
  "mississippi",
  "kansas",
  "new-mexico",
  "nebraska",
  "west-virginia",
  "idaho",
  "hawaii",
  "new-hampshire",
  "maine",
  "montana",
  "rhode-island",
  "delaware",
  "south-dakota",
  "north-dakota",
  "alaska",
  "vermont",
  "wyoming",
];

let allSlugsCache: string[] | null = null;
let devSlugsCache: string[] | null = null;

function generateAllSlugs(): string[] {
  const slugs: string[] = [];
  
  for (const priceK of PRICE_RANGES) {
    for (const rate of INTEREST_RATES) {
      for (const region of REGIONS) {
        slugs.push(generateSlug(priceK, rate, region));
      }
    }
  }
  
  return slugs;
}

function generateDevSlugs(): string[] {
  const slugs: string[] = [];
  const devPrices = [300, 500, 700, 1000];
  const devRates = [4.0, 5.5, 7.0, 8.5];
  const devRegions = ["california", "texas", "florida", "new-york", "pennsylvania"];
  
  for (const priceK of devPrices) {
    for (const rate of devRates) {
      for (const region of devRegions) {
        slugs.push(generateSlug(priceK, rate, region));
      }
    }
  }
  
  return slugs;
}

export const pagesCache = {
  getAllSlugs(): string[] {
    if (allSlugsCache === null) {
      allSlugsCache = generateAllSlugs();
    }
    return allSlugsCache;
  },

  getDevSlugs(): string[] {
    if (devSlugsCache === null) {
      devSlugsCache = generateDevSlugs();
    }
    return devSlugsCache;
  },

  getSlugsForBuild(): string[] {
    if (process.env.NODE_ENV === "production") {
      return this.getAllSlugs();
    }
    return this.getDevSlugs();
  },
};

