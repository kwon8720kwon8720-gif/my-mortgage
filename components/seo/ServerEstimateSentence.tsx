import { formatMoney } from "@/lib/utils";
import { calculateMortgage, type MortgageInputs } from "@/lib/mortgage/engine";

interface ServerEstimateSentenceProps {
  inputs: MortgageInputs;
}

export function ServerEstimateSentence({ inputs }: ServerEstimateSentenceProps) {
  const results = calculateMortgage(inputs);
  
  return (
    <p className="text-slate-700 mb-6">
      Based on these illustrative assumptions, your estimated monthly payment would be approximately {formatMoney(results.monthlyPayment)}.
    </p>
  );
}
