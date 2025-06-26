import { useMemo } from 'react'
import { CITIES, DISTANCES, CAPACITIES, EVENT_CATEGORIES } from '../utils/config'

type Inputs = {
  city: string
  distance: string
  capacity: string
  categories: string[]
  premium: boolean
  period: 'monthly' | 'quarterly' | 'annually'
}

export function usePriceCalculator({ city, distance, capacity, categories, premium, period }: Inputs) {
  return useMemo(() => {
    // lookup weights
    const cityW = CITIES.find(c => c.name === city)?.weight ?? 0
    const distW = DISTANCES.find(d => d.label === distance)?.weight ?? 0
    const capW = CAPACITIES.find(c => c.label === capacity)?.weight ?? 0

    const weight = cityW * distW * capW

    // sum base prices
    let catSum = EVENT_CATEGORIES
      .filter(cat => categories.includes(cat.id))
      .reduce((sum, cat) => sum + cat.price, 0)
    if (premium) catSum *= 1.5

    // base monthly
    const base = weight * catSum

    // period multiplier
    let multiplier = 1
    let discount = 0
    if (period === 'quarterly') multiplier = 3
    if (period === 'annually') {
      multiplier = 12
      discount = 0.15
    }

    const subtotal = base * multiplier * (1 - discount)
    const gst = subtotal * 0.1
    const total = subtotal + gst

    return { weight, catSum, base, subtotal, gst, total }
  }, [city, distance, capacity, categories.join(','), premium, period])
}