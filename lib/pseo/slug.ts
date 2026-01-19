export interface SlugParts {
  priceK: number;
  rate: number;
  region: string;
}

export function parseSlug(slug: string): SlugParts | null {
  const parts = slug.split("-");
  if (parts.length < 3) return null;

  const rateStr = parts[parts.length - 1];
  const priceKStr = parts[0];
  const regionParts = parts.slice(1, -1);

  const priceK = parseInt(priceKStr.replace("k", ""), 10);
  if (isNaN(priceK) || priceK <= 0) return null;

  const rate = parseFloat(rateStr.replace("-", "."));
  if (isNaN(rate) || rate < 0 || rate > 20) return null;

  const region = regionParts.join("-");
  if (!region || region.length === 0) return null;

  return { priceK, rate, region };
}

export function generateSlug(priceK: number, rate: number, region: string): string {
  const normalizedRegion = region
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  
  const rateStr = rate.toFixed(1).replace(".", "-");
  return `${priceK}k-${normalizedRegion}-${rateStr}`;
}

