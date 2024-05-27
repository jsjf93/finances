import { roundCost } from "../../utils/roundCost";

type Props = {
  label: string;
  value: number;
};

export function SummaryText({ label, value }: Props) {
  return (
    <p className="text-sm flex justify-between">
      {label}: <span>£{roundCost(value)}</span>
    </p>
  );
}
