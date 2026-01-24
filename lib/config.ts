export interface State {
  slug: string;
  displayName: string;
}

export const STATES: State[] = [
  { slug: "alabama", displayName: "Alabama" },
  { slug: "alaska", displayName: "Alaska" },
  { slug: "arizona", displayName: "Arizona" },
  { slug: "arkansas", displayName: "Arkansas" },
  { slug: "california", displayName: "California" },
  { slug: "colorado", displayName: "Colorado" },
  { slug: "connecticut", displayName: "Connecticut" },
  { slug: "delaware", displayName: "Delaware" },
  { slug: "florida", displayName: "Florida" },
  { slug: "georgia", displayName: "Georgia" },
  { slug: "hawaii", displayName: "Hawaii" },
  { slug: "idaho", displayName: "Idaho" },
  { slug: "illinois", displayName: "Illinois" },
  { slug: "indiana", displayName: "Indiana" },
  { slug: "iowa", displayName: "Iowa" },
  { slug: "kansas", displayName: "Kansas" },
  { slug: "kentucky", displayName: "Kentucky" },
  { slug: "louisiana", displayName: "Louisiana" },
  { slug: "maine", displayName: "Maine" },
  { slug: "maryland", displayName: "Maryland" },
  { slug: "massachusetts", displayName: "Massachusetts" },
  { slug: "michigan", displayName: "Michigan" },
  { slug: "minnesota", displayName: "Minnesota" },
  { slug: "mississippi", displayName: "Mississippi" },
  { slug: "missouri", displayName: "Missouri" },
  { slug: "montana", displayName: "Montana" },
  { slug: "nebraska", displayName: "Nebraska" },
  { slug: "nevada", displayName: "Nevada" },
  { slug: "new-hampshire", displayName: "New Hampshire" },
  { slug: "new-jersey", displayName: "New Jersey" },
  { slug: "new-mexico", displayName: "New Mexico" },
  { slug: "new-york", displayName: "New York" },
  { slug: "north-carolina", displayName: "North Carolina" },
  { slug: "north-dakota", displayName: "North Dakota" },
  { slug: "ohio", displayName: "Ohio" },
  { slug: "oklahoma", displayName: "Oklahoma" },
  { slug: "oregon", displayName: "Oregon" },
  { slug: "pennsylvania", displayName: "Pennsylvania" },
  { slug: "rhode-island", displayName: "Rhode Island" },
  { slug: "south-carolina", displayName: "South Carolina" },
  { slug: "south-dakota", displayName: "South Dakota" },
  { slug: "tennessee", displayName: "Tennessee" },
  { slug: "texas", displayName: "Texas" },
  { slug: "utah", displayName: "Utah" },
  { slug: "vermont", displayName: "Vermont" },
  { slug: "virginia", displayName: "Virginia" },
  { slug: "washington", displayName: "Washington" },
  { slug: "west-virginia", displayName: "West Virginia" },
  { slug: "wisconsin", displayName: "Wisconsin" },
  { slug: "wyoming", displayName: "Wyoming" },
];

export const CREDIT_TIERS = ["excellent", "good", "fair", "poor"] as const;

export type CreditTier = typeof CREDIT_TIERS[number];

export const POST_COUNT = 50;
