// src/App.tsx
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
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
  const [period, setPeriod] = useState<'monthly' | 'annually'>('monthly')
  const [error, setError] = useState('')

  const summary = usePriceCalculator({ city, distance, capacity, categories, premium, period })
  const toggleCategory = (id: string) =>
    setCategories(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))

  useEffect(() => {
    setError(!city || !distance || !capacity || categories.length === 0
      ? 'Please complete all required fields and select at least one category.'
      : ''
    )
  }, [city, distance, capacity, categories])

  return (
    <motion.section
      style={{
        backgroundImage:
          'radial-gradient(ellipse 125% 125% at 50% 100%, #020617 50%, #202960)'
      }}
      className="relative h-screen overflow-hidden"
    >
      {/* STARFIELD (fixed behind everything) */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={600} factor={4} fade speed={1} />
        </Canvas>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-10 h-full overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-16 text-gray-900">
          {/* header */}
          <div className="flex flex-col items-center text-center mb-12 text-gray-100">
            <span className="inline-block rounded-full bg-gray-600/50 px-3 py-1 text-sm">
              version 1.0.0
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white">VenueCalc</h1>
            <p className="mt-2 text-lg text-gray-300">
              Calculate venue subscription pricing for prospective customers
            </p>
          </div>

          {/* two-column layout */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* LEFT */}
            <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg flex flex-col space-y-6 text-gray-900">
              <Dropdown
                label="Closest City"
                options={CITIES.map(c => ({ label: c.name, value: c.name }))}
                value={city}
                onChange={setCity}
              />
              <Dropdown
                label="Distance from CBD"
                options={DISTANCES.map(d => ({ label: d.label, value: d.label }))}
                value={distance}
                onChange={setDistance}
              />
              <Dropdown
                label="Max Standing Capacity"
                options={CAPACITIES.map(c => ({ label: c.label, value: c.label }))}
                value={capacity}
                onChange={setCapacity}
              />

              <CategorySelector selected={categories} onToggle={toggleCategory} />

              <div className="mt-auto">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col space-y-6">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
                <PlanSelector premium={premium} onChange={setPremium} />
                <BillingToggle period={period} onChange={setPeriod} />
              </div>

              <OrderSummary
                summary={summary}
                premium={premium}
                categories={categories}
                period={period}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white bg-opacity-90 p-3 rounded-xl shadow-lg text-gray-700"
                onClick={() => {
                  setCity('')
                  setDistance('')
                  setCapacity('')
                  setCategories([])
                  setPremium(false)
                  setPeriod('monthly')
                }}
              >
                Reset Form
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
