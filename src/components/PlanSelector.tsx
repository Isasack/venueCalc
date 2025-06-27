import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Crown } from 'lucide-react'
import { OptionButton } from './OptionButton'

type PlanSelectorProps = {
  premium: boolean
  onChange: (p: boolean) => void
}

export function PlanSelector({ premium, onChange }: PlanSelectorProps) {
  const plans = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Core features: venue listing, basic analytics & lead management',
      icon: <Shield size={20} />,
      isPremium: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'All Standard features plus priority placement, advanced analytics & dedicated support',
      icon: <Crown size={20} />,
      isPremium: true,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Plan Type</h2>
        <p className="text-sm text-gray-600">Choose the plan that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
          >
            <OptionButton
              isSelected={premium === plan.isPremium}
              onClick={() => onChange(plan.isPremium)}
              icon={plan.icon}
              label={plan.name}
              description={plan.description}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${premium
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
              : 'bg-gradient-to-r from-blue-400 to-blue-500'}`
          }
          />
          <p className="text-sm font-medium text-gray-700">{premium ? 'Premium Plan Active' : 'Standard Plan Active'}</p>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {premium
            ? 'Unlock advanced analytics, priority support, and premium integrations'
            : 'Access to core features with standard support'}
        </p>
      </motion.div>
    </motion.div>
  )
}
