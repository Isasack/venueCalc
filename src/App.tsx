import { useState } from 'react'
import { motion } from 'framer-motion'
import { CITIES, DISTANCES, CAPACITIES } from './utils/config'
import { usePriceCalculator } from './functions/usePriceCalculator'
import { Dropdown } from './components/Dropdown'
import { CategorySelector } from './components/CategorySelector'
import { PlanSelector } from './components/PlanSelector'
import { BillingToggle } from './components/BillingToggle'
import { OrderSummary } from './components/OrderSummary'

export default function App() {
  const [city, setCity] = useState('')
  const [distance, setDistance] = useState('')
  const [capacity, setCapacity] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [premium, setPremium] = useState(false)
  const [period, setPeriod] = useState<'monthly'|'quarterly'|'annually'>('monthly')

  const summary = usePriceCalculator({ city, distance, capacity, categories, premium, period })
  const toggleCategory = (id: string) => {
    setCategories(prev => prev.includes(id) ? prev.filter(x => x!==id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-start justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full grid grid-cols-2 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Subscription Price Calculator</h1>
          <Dropdown
            label="Closest City"
            options={CITIES.map(c=>({ label: c.name, value: c.name }))}
            value={city}
            onChange={setCity}
          />
          <Dropdown
            label="Distance from CBD"
            options={DISTANCES.map(d=>({ label: d.label, value: d.label }))}
            value={distance}
            onChange={setDistance}
          />
          <Dropdown
            label="Max Standing Capacity"
            options={CAPACITIES.map(c=>({ label: c.label, value: c.label }))}
            value={capacity}
            onChange={setCapacity}
          />
          <CategorySelector selected={categories} onToggle={toggleCategory} />
          <PlanSelector premium={premium} onChange={setPremium} />
          <BillingToggle period={period} onChange={p=> setPeriod(p)} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 text-sm text-slate-600 hover:text-slate-900"
            onClick={() => {
              setCity('');
              setDistance('');
              setCapacity('');
              setCategories([]);
              setPremium(false);
              setPeriod('monthly');
            }}
          >Reset</motion.button>
        </div>
        <OrderSummary summary={summary} />
      </motion.div>
    </div>
  )
}