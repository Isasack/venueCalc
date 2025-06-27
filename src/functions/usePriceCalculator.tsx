import { useMemo } from 'react'
import { CITIES, DISTANCES, CAPACITIES } from '../utils/config'

type Inputs = {
  city: string
  distance: string
  capacity: string
  categories: string[]
  premium: boolean
  period: 'monthly' | 'quarterly' | 'annually'
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

    // 2) Category pricing per spec
    let catSum = 0
    if (categories.includes('social'))                               catSum += 200
    if (categories.includes('conference') || categories.includes('gala')) catSum += 300
    if (categories.includes('weddings'))                             catSum += 100

    // 3) Premium multiplier
    if (premium) catSum *= 1.5

    // 4) Base monthly ex-GST
    const monthlyEx = weight * catSum

    // 5) Period multiplier & annual discount
    let exGst = monthlyEx
    if (period === 'quarterly') {
      exGst = monthlyEx * 3
    } else if (period === 'annually') {
      exGst = monthlyEx * 12 * 0.85   // 15% off
    }

    // 6) GST and total
    const gst = exGst * 0.10
    const total = exGst + gst

    return {
      weight,     // variable‐weight factor
      catSum,     // total category cost after premium
      monthlyEx,  // base monthly ex-GST
      exGst,      // final ex-GST for selected period
      gst,
      total,
    }
  }, [city, distance, capacity, categories.join(','), premium, period])
}
