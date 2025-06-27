import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export type OptionButtonProps = {
  isSelected: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  description?: string
  'aria-label'?: string
}

export function OptionButton({
  isSelected,
  onClick,
  icon,
  label,
  description,
  'aria-label': ariaLabel,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel || label}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={
        `
        relative w-full h-full p-4 rounded-xl border transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2
        ${isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      {/* Selection indicator */}
      <motion.div
        initial={false}
        animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
      >
        <Check className="w-4 h-4 text-white" />
      </motion.div>

      {/* Content */}
      <div className="flex items-start space-x-3">
        <motion.div
          animate={{ color: isSelected ? '#3b82f6' : '#6b7280', scale: isSelected ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          {icon}
        </motion.div>
        <div className="flex-1 text-left">
          <motion.h3
            animate={{ color: isSelected ? '#1e40af' : '#374151' }}
            className="font-semibold text-sm leading-tight"
          >
            {label}
          </motion.h3>
          {description && (
            <motion.p
              animate={{ color: isSelected ? '#3b82f6' : '#6b7280' }}
              className="text-xs mt-1 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.button>
  )
}
