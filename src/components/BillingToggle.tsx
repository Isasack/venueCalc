import { Switch } from '@/components/ui/switch';

type Props = { period: 'monthly'|'quarterly'|'annually'; onChange: (p: 'monthly'|'quarterly'|'annually') => void };
export function BillingToggle({ period, onChange }: Props) {
  return (
    <div className="flex items-center mb-4">
      <span className="text-sm font-medium mr-3">Billed annually</span>
      <Switch checked={period==='annually'} onCheckedChange={checked => onChange(checked ? 'annually' : 'monthly')} aria-label="Billed annually" />
      <span className="ml-2 text-sm font-medium text-green-600">SAVE 15%</span>
    </div>
  );
}