import { EVENT_CATEGORIES } from '../utils/config'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { motion } from 'framer-motion'

type Props = { selected: string[]; onToggle: (id: string) => void }
export function CategorySelector({ selected, onToggle }: Props) {
  return (
    <div className="mb-4">
      <p className="block text-sm font-medium mb-2">Event Categories</p>
      <ToggleGroup type="multiple" className="grid grid-cols-2 gap-2">
        {EVENT_CATEGORIES.map(cat => (
          <motion.div key={cat.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <ToggleGroupItem
              value={cat.id}
              className={`py-2 px-3 rounded text-sm font-medium whitespace-normal break-words focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 ${
                selected.includes(cat.id)
                  ? 'bg-slate-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
              onClick={() => onToggle(cat.id)}
            >
              {cat.name}
            </ToggleGroupItem>
          </motion.div>
        ))}
      </ToggleGroup>
    </div>
  )
}