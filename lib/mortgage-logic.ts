export interface MortgageInputs {
  homePrice: number;
  downPaymentPercent: number;
  downPaymentDollar: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
}

export interface MortgageResults {
  principal: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoaFees: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCost: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const {
    homePrice,
    downPaymentDollar,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoaFees,
  } = inputs;

  // Calculate principal
  const principal = Math.max(0, homePrice - downPaymentDollar);

  // Monthly rates
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate monthly principal and interest
  let monthlyPrincipalAndInterest = 0;
  if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
    monthlyPrincipalAndInterest =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else if (principal > 0 && numberOfPayments > 0) {
    monthlyPrincipalAndInterest = principal / numberOfPayments;
  }

  // Monthly property tax and insurance
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;

  // Total monthly payment
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    hoaFees;

  // Calculate amortization schedule
  const amortizationSchedule: AmortizationEntry[] = [];
  let remainingBalance = principal;

  for (let month = 1; month <= numberOfPayments && remainingBalance > 0.01; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPrincipalAndInterest - interestPayment;
    const newBalance = Math.max(0, remainingBalance - principalPayment);

    amortizationSchedule.push({
      month,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: newBalance,
    });

    remainingBalance = newBalance;
  }

  // Calculate total interest paid
  const totalInterestPaid = amortizationSchedule.reduce(
    (sum, entry) => sum + entry.interest,
    0
  );

  // Total cost
  const totalCost =
    downPaymentDollar +
    totalMonthlyPayment * numberOfPayments +
    (propertyTax + homeInsurance) * loanTerm +
    hoaFees * numberOfPayments;

  return {
    principal,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoaFees: hoaFees,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCost,
    amortizationSchedule,
  };
}

export function syncDownPayment(
  homePrice: number,
  downPaymentPercent: number,
  downPaymentDollar: number,
  mode: "percent" | "dollar"
): { downPaymentPercent: number; downPaymentDollar: number } {
  if (homePrice <= 0) {
    return { downPaymentPercent: 0, downPaymentDollar: 0 };
  }

  if (mode === "percent") {
    const dollar = (homePrice * downPaymentPercent) / 100;
    return {
      downPaymentPercent: Math.max(0, Math.min(100, downPaymentPercent)),
      downPaymentDollar: Math.max(0, Math.min(homePrice, dollar)),
    };
  } else {
    const percent = (downPaymentDollar / homePrice) * 100;
    return {
      downPaymentPercent: Math.max(0, Math.min(100, percent)),
      downPaymentDollar: Math.max(0, Math.min(homePrice, downPaymentDollar)),
    };
  }
}

