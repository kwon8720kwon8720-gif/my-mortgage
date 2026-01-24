import { z } from "zod";

export const mortgageInputSchema = z.object({
  homePrice: z.number().min(10000).max(100000000),
  downPaymentValue: z.number().min(0),
  loanTerm: z.enum([10, 15, 20, 30]),
  interestRate: z.number().min(0).max(20),
  propertyTax: z.number().min(0).max(5000000),
  homeInsurance: z.number().min(0).max(2000000),
  hoaFees: z.number().min(0).max(20000),
});

export type MortgageInputSchema = z.infer<typeof mortgageInputSchema>;
