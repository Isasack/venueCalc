// src/functions/usePriceCalculator.ts
import { useMemo } from 'react'
import { CITIES, DISTANCES, CAPACITIES } from '../utils/config'

type Inputs = {
  city: string
  distance: string
  capacity: string
  categories: string[]
  premium: boolean
  period: 'monthly' | 'annually'
}

export function usePriceCalculator({
  city,
  distance,
  capacity,
  categories,
  premium,
  period,
}: Inputs) {
  return useMemo(() => {
    // 1) Lookup weights
    const cityW = CITIES.find(c => c.name === city)?.weight ?? 0
    const distW = DISTANCES.find(d => d.label === distance)?.weight ?? 0
    const capW = CAPACITIES.find(c => c.label === capacity)?.weight ?? 0
    const weight = cityW * distW * capW

    // 2) Category pricing (match on the full label)
    let catSum = 0
    if (categories.includes('Private & Corporate Social Events')) {
      catSum += 200
    }
    if (
      categories.includes('Conferences & Meetings') ||
      categories.includes('Gala Dinners & Balls')
    ) {
      catSum += 300
    }
    if (categories.includes('Weddings')) {
      catSum += 100
    }

    // 3) Premium multiplier
    if (premium) {
      catSum *= 1.5
    }

    // 4) Base monthly ex-GST
    const monthlyEx = weight * catSum

    // 5) Select period
    let exGst: number
    if (period === 'monthly') {
      exGst = monthlyEx
    } else {
      // annual: 12× with 15% off
      exGst = monthlyEx * 12 * 0.85
    }

    // 6) GST and total
    const gst = exGst * 0.10
    const total = exGst + gst

    return {
      weight,
      catSum,
      monthlyEx,
      exGst,
      gst,
      total,
    }
  }, [city, distance, capacity, categories.join(','), premium, period])
}
