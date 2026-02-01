import { z } from "zod";

export const mortgageInputSchema = z.object({
  homePrice: z.number().min(0, "Home price must be 0 or greater"),
  downPayment: z.number().min(0, "Down payment must be 0 or greater"),
  termYears: z.number().min(1, "Term must be at least 1 year").max(50, "Term must be 50 years or less"),
  rateBps: z.number().min(0, "Rate must be 0 or greater").max(20000, "Rate must be 200% or less"),
});

export type MortgageInput = z.infer<typeof mortgageInputSchema>;

export const defaultMortgageInput: MortgageInput = {
  homePrice: 400000,
  downPayment: 80000,
  termYears: 30,
  rateBps: 650, // 6.50%
};
