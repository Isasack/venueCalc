import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { motion } from 'framer-motion'

type Props = { premium: boolean; onChange: (p: boolean) => void }
export function PlanSelector({ premium, onChange }: Props) {
  return (
    <div className="mb-4">
      <p className="block text-sm font-medium mb-2">Plan Type</p>
      <RadioGroup
        value={premium ? 'premium' : 'standard'}
        onValueChange={val => onChange(val === 'premium')}
        className="flex gap-2"
      >
        {['standard', 'premium'].map(type => (
          <motion.div key={type} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <RadioGroupItem
              value={type}
              className={`flex-1 py-2 px-4 rounded text-center font-medium focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 ${
                {
                  standard: !premium,
                  premium,
                }[type]
                  ? 'bg-slate-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </RadioGroupItem>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  )
}
