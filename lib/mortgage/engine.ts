/**
 * Mortgage calculation engine
 * All functions are pure, deterministic, and handle edge cases correctly.
 */

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  payoffLabel: string;
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Calculate monthly mortgage payment
 * Handles rate == 0 correctly
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  rateBps: number,
  termYears: number
): number {
  if (loanAmount <= 0) {
    return 0;
  }

  if (termYears <= 0) {
    return 0;
  }

  const rate = rateBps / 10000;
  const numPayments = termYears * 12;

  if (rate === 0) {
    // Zero interest: simple division
    return Math.round((loanAmount / numPayments) * 100) / 100;
  }

  const monthlyRate = rate / 12;
  const denominator = 1 - Math.pow(1 + monthlyRate, -numPayments);

  if (denominator === 0) {
    return 0;
  }

  const payment = (loanAmount * monthlyRate) / denominator;
  return Math.round(payment * 100) / 100;
}

/**
 * Calculate total mortgage results
 */
export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  termYears: number,
  rateBps: number
): MortgageResult {
  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyPayment = calculateMonthlyPayment(loanAmount, rateBps, termYears);
  const numPayments = termYears * 12;
  const totalPayment = Math.round(monthlyPayment * numPayments * 100) / 100;
  const principal = loanAmount;
  const totalInterest = Math.max(0, Math.round((totalPayment - principal) * 100) / 100);

  // payoffLabel returns duration string ONLY
  const payoffLabel = formatPayoffLabel(termYears);

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    principal,
    payoffLabel,
  };
}

/**
 * Format payoff label as duration string
 * Returns string like "30 years" or "15 years"
 */
function formatPayoffLabel(termYears: number): string {
  if (isNaN(termYears) || !isFinite(termYears) || termYears <= 0) {
    return "0 years";
  }

  const rounded = Math.round(termYears);
  return rounded === 1 ? "1 year" : `${rounded} years`;
}

/**
 * Generate amortization schedule
 * Final balance MUST equal exactly 0
 * Uses rounding safety (cents)
 */
export function generateAmortizationSchedule(
  loanAmount: number,
  rateBps: number,
  termYears: number
): AmortizationEntry[] {
  const schedule: AmortizationEntry[] = [];
  const monthlyPayment = calculateMonthlyPayment(loanAmount, rateBps, termYears);
  const numPayments = termYears * 12;
  const rate = rateBps / 10000;
  const monthlyRate = rate / 12;

  let balance = Math.round(loanAmount * 100) / 100;

  for (let month = 1; month <= numPayments; month++) {
    let interest: number;
    let principal: number;

    if (rate === 0) {
      // Zero interest case
      interest = 0;
      principal = Math.round((loanAmount / numPayments) * 100) / 100;
    } else {
      // Calculate interest for this month
      interest = Math.round(balance * monthlyRate * 100) / 100;
      principal = Math.round((monthlyPayment - interest) * 100) / 100;
    }

    // For the last payment, ensure balance goes to exactly 0
    if (month === numPayments) {
      principal = Math.round(balance * 100) / 100;
      interest = Math.round((monthlyPayment - principal) * 100) / 100;
      balance = 0;
    } else {
      balance = Math.round((balance - principal) * 100) / 100;
    }

    schedule.push({
      month,
      principal: Math.round(principal * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  // Safety check: ensure final balance is exactly 0
  if (schedule.length > 0) {
    schedule[schedule.length - 1].balance = 0;
  }

  return schedule;
}
