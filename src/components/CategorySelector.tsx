import React from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Gift, Heart } from 'lucide-react'
import { EVENT_CATEGORIES } from '../utils/config'
import { OptionButton } from './OptionButton'

type CategorySelectorProps = {
  selected: string[]
  onToggle: (id: string) => void
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'Private & Corporate Social Events': <Users size={20} />,
  'Conferences & Meetings': <Calendar size={20} />,
  'Gala Dinners & Balls': <Gift size={20} />,
  'Weddings': <Heart size={20} />,
}

export function CategorySelector({ selected, onToggle }: CategorySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Event Categories</h2>
        <p className="text-sm text-gray-600">Select one or more categories that match your event type</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      >
        {EVENT_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.name}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ delay: idx * 0.05 }}
          >
            <OptionButton
              isSelected={selected.includes(cat.name)}
              onClick={() => onToggle(cat.name)}
              icon={ICON_MAP[cat.name]}
              label={cat.name}
              description={`Professional ${cat.name.toLowerCase()} solutions`}
            />
          </motion.div>
        ))}
      </motion.div>

      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 'auto' }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-700">
            <span className="font-medium">{selected.length}</span> {selected.length === 1 ? 'category' : 'categories'} selected
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}