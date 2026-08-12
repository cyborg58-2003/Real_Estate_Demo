import { useState, useMemo } from "react";
import { Calculator, DollarSign, Percent, Info } from "lucide-react";
import { formatPrice } from "@/data/properties";

type Props = {
  homePrice: number;
};

export function MortgageCalculator({ homePrice }: Props) {
  const [price, setPrice] = useState<number>(homePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [annualInsurance, setAnnualInsurance] = useState<number>(4200);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(350);

  const calculations = useMemo(() => {
    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = Math.max(0, price - downPayment);
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    let monthlyPrincipalAndInterest = 0;
    if (monthlyInterestRate > 0 && numberOfPayments > 0) {
      monthlyPrincipalAndInterest =
        (loanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else {
      monthlyPrincipalAndInterest = loanAmount / (numberOfPayments || 1);
    }

    const monthlyPropertyTax = (price * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = annualInsurance / 12;

    const totalMonthly =
      monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + monthlyHoa;

    return {
      downPayment,
      loanAmount,
      monthlyPrincipalAndInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      totalMonthly,
    };
  }, [price, downPaymentPercent, interestRate, loanTermYears, propertyTaxRate, annualInsurance, monthlyHoa]);

  const pAndIPercent = Math.round(
    (calculations.monthlyPrincipalAndInterest / (calculations.totalMonthly || 1)) * 100
  );
  const taxPercent = Math.round(
    (calculations.monthlyPropertyTax / (calculations.totalMonthly || 1)) * 100
  );
  const insurancePercent = Math.round(
    (calculations.monthlyInsurance / (calculations.totalMonthly || 1)) * 100
  );
  const hoaPercent = Math.max(0, 100 - (pAndIPercent + taxPercent + insurancePercent));

  return (
    <div className="border border-border bg-panel p-6 sm:p-8">
      <div className="flex items-center gap-2.5 border-b border-border pb-4">
        <Calculator className="h-5 w-5 text-foreground/60" strokeWidth={1.4} />
        <h3 className="font-serif text-xl text-foreground">Mortgage & Financing Estimator</h3>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-5 font-sans text-sm">
          {/* Home Price */}
          <div>
            <div className="flex justify-between text-[0.82rem] text-foreground/75">
              <span>Home Purchase Price</span>
              <span className="font-serif text-base font-semibold">{formatPrice(price)}</span>
            </div>
            <input
              type="range"
              min={500_000}
              max={10_000_000}
              step={50_000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between text-[0.82rem] text-foreground/75">
              <span>
                Down Payment ({downPaymentPercent}%)
              </span>
              <span className="font-serif text-base">{formatPrice(calculations.downPayment)}</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="interest-rate" className="block text-[0.72rem] uppercase tracking-[0.15em] text-foreground/50">
                Interest Rate
              </label>
              <div className="relative mt-1">
                <input
                  id="interest-rate"
                  type="number"
                  step="0.1"
                  min="1"
                  max="15"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full border border-border bg-background py-2 pl-3 pr-7 text-foreground outline-none focus:border-foreground/40"
                />
                <Percent className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-foreground/40" />
              </div>
            </div>

            <div>
              <label htmlFor="loan-term" className="block text-[0.72rem] uppercase tracking-[0.15em] text-foreground/50">
                Loan Term
              </label>
              <select
                id="loan-term"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="mt-1 w-full border border-border bg-background py-2 px-3 text-foreground outline-none focus:border-foreground/40"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results & Breakdown */}
        <div className="flex flex-col justify-between border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
              Estimated Monthly Payment
            </span>
            <p className="mt-1 font-serif text-3xl text-foreground sm:text-4xl">
              {formatPrice(Math.round(calculations.totalMonthly))}
              <span className="font-sans text-sm text-foreground/50">/mo</span>
            </p>

            {/* Visual Progress Bar */}
            <div className="mt-4 flex h-3.5 w-full overflow-hidden rounded-full bg-border">
              <div
                style={{ width: `${pAndIPercent}%` }}
                className="bg-primary"
                title={`Principal & Interest (${pAndIPercent}%)`}
              />
              <div
                style={{ width: `${taxPercent}%` }}
                className="bg-amber-600"
                title={`Property Tax (${taxPercent}%)`}
              />
              <div
                style={{ width: `${insurancePercent}%` }}
                className="bg-emerald-600"
                title={`Home Insurance (${insurancePercent}%)`}
              />
              <div
                style={{ width: `${hoaPercent}%` }}
                className="bg-sky-600"
                title={`HOA (${hoaPercent}%)`}
              />
            </div>

            {/* Breakdown List */}
            <dl className="mt-5 space-y-2.5 font-sans text-[0.82rem]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  Principal & Interest
                </span>
                <span className="font-serif text-base">
                  {formatPrice(Math.round(calculations.monthlyPrincipalAndInterest))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                  Property Taxes ({propertyTaxRate}%)
                </span>
                <span className="font-serif text-base">
                  {formatPrice(Math.round(calculations.monthlyPropertyTax))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  Homeowners Insurance
                </span>
                <span className="font-serif text-base">
                  {formatPrice(Math.round(calculations.monthlyInsurance))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-600" />
                  HOA Fees
                </span>
                <span className="font-serif text-base">{formatPrice(monthlyHoa)}</span>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex items-start gap-2 text-[0.75rem] text-foreground/45">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              Estimates are provided for illustrative purposes only. Actual interest rates, taxes, and monthly payments may vary based on credit history and lender terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
