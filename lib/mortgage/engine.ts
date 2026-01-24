export interface MortgageInputs {
  homePrice: number;
  downPaymentValue: number;
  loanTerm: 10 | 15 | 20 | 30;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface MortgageResults {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  payoffLabel: string;
  amortizationSchedule: AmortizationEntry[];
  principal: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoaFees: number;
  totalCost: number;
}

function roundToCents(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatDuration(years: number, months: number): string {
  const parts: string[] = [];
  
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "Year" : "Years"}`);
  }
  
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "Month" : "Months"}`);
  }
  
  if (parts.length === 0) {
    return "0 Months";
  }
  
  return parts.join(" ");
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const {
    homePrice,
    downPaymentValue,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoaFees,
  } = inputs;

  const principal = Math.max(0, homePrice - downPaymentValue);
  const numberOfPayments = loanTerm * 12;
  const monthlyRate = interestRate / 100 / 12;

  let monthlyPrincipalAndInterest = 0;
  
  if (principal > 0 && numberOfPayments > 0) {
    if (interestRate === 0 || monthlyRate === 0) {
      monthlyPrincipalAndInterest = principal / numberOfPayments;
    } else {
      const factor = Math.pow(1 + monthlyRate, numberOfPayments);
      monthlyPrincipalAndInterest = (principal * monthlyRate * factor) / (factor - 1);
    }
  }

  monthlyPrincipalAndInterest = roundToCents(monthlyPrincipalAndInterest);

  const monthlyPropertyTax = roundToCents(propertyTax / 12);
  const monthlyHomeInsurance = roundToCents(homeInsurance / 12);
  const monthlyHoaFees = roundToCents(hoaFees);

  const totalMonthlyPayment = roundToCents(
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyHoaFees
  );

  // Amortization schedule with rounding safety
  const amortizationSchedule: AmortizationEntry[] = [];
  let remainingBalance = principal;
  let totalInterestAccumulated = 0;

  for (let month = 1; month <= numberOfPayments && remainingBalance > 0.01; month++) {
    const interestPayment = roundToCents(remainingBalance * monthlyRate);
    const principalPayment = roundToCents(monthlyPrincipalAndInterest - interestPayment);
    
    // Ensure we don't overpay on the last payment
    let actualPrincipalPayment = principalPayment;
    if (remainingBalance - principalPayment < 0.01) {
      actualPrincipalPayment = remainingBalance;
    }
    
    const newBalance = roundToCents(Math.max(0, remainingBalance - actualPrincipalPayment));
    
    amortizationSchedule.push({
      month,
      principal: actualPrincipalPayment,
      interest: interestPayment,
      remainingBalance: newBalance,
    });

    remainingBalance = newBalance;
    totalInterestAccumulated += interestPayment;
  }

  // Ensure final balance is exactly 0
  if (amortizationSchedule.length > 0) {
    const lastEntry = amortizationSchedule[amortizationSchedule.length - 1];
    if (lastEntry.remainingBalance < 0.01) {
      lastEntry.remainingBalance = 0;
    }
  }

  const totalInterest = roundToCents(totalInterestAccumulated);
  const totalPayment = roundToCents(
    downPaymentValue +
    (monthlyPrincipalAndInterest * numberOfPayments) +
    totalInterest +
    (propertyTax * loanTerm) +
    (homeInsurance * loanTerm) +
    (hoaFees * numberOfPayments)
  );

  const totalCost = totalPayment;

  // Calculate payoff duration
  const actualMonths = amortizationSchedule.length;
  const years = Math.floor(actualMonths / 12);
  const months = actualMonths % 12;
  const payoffLabel = formatDuration(years, months);

  return {
    monthlyPayment: totalMonthlyPayment,
    totalInterest,
    totalPayment,
    payoffLabel,
    amortizationSchedule,
    principal,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoaFees,
    totalCost,
  };
}
