// src/components/OrderSummary.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { CalendarClock, Repeat, Calendar } from 'lucide-react'

type Summary = ReturnType<
  typeof import('../functions/usePriceCalculator').usePriceCalculator
>

type OrderSummaryProps = {
  summary: Summary
  premium: boolean
  categories: string[]
  period: 'monthly' | 'annually'
}

export function OrderSummary({
  summary,
  premium,
  categories,
  period,
}: OrderSummaryProps) {
  const planName = premium ? 'Premium Plan' : 'Standard Plan'
  const catList  = categories.join(', ')

  // base monthly (never discounted)
  const monthlyBase = summary.monthlyEx

  // if billed annually, apply 15% off everywhere:
  const discountFactor = period === 'annually' ? 0.85 : 1

  // Monthly numbers
  const monthlyEx    = monthlyBase * discountFactor
  const monthlyGst   = monthlyEx * 0.10
  const monthlyTotal = monthlyEx + monthlyGst

  // Quarterly numbers (3× monthly)
  const quarterlyEx    = monthlyBase * 3 * discountFactor
  const quarterlyGst   = quarterlyEx * 0.10
  const quarterlyTotal = quarterlyEx + quarterlyGst

  // Annual numbers (12× monthly)
  const annualEx    = monthlyBase * 12 * discountFactor
  const annualGst   = annualEx * 0.10
  const annualTotal = annualEx + annualGst

  // Savings only make sense when billed annually:
  const youSavePerMonth   = period === 'annually' ? monthlyBase - monthlyEx : 0
  const youSavePerQuarter = period === 'annually' ? monthlyBase*3 - quarterlyEx : 0
  const youSavePerYear    = period === 'annually' ? monthlyBase*12 - annualEx : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Plan + cats + billing */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">{planName}</span> – {catList} • billed{' '}
            <span className="font-medium">
              {period === 'monthly' ? 'monthly' : 'annually'}
            </span>
          </div>

          {/* MONTHLY BLOCK */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-600">
                <CalendarClock className="w-4 h-4 mr-2" />
                Monthly (ex-GST)
              </span>
              <span className="text-sm text-gray-900">${monthlyEx.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-600">
                <CalendarClock className="w-4 h-4 mr-2" />
                GST (10%)
              </span>
              <span className="text-sm text-gray-900">${monthlyGst.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center text-sm text-gray-700">
                <CalendarClock className="w-4 h-4 mr-2" />
                Total / month
              </span>
              <span className="text-sm text-gray-900">${monthlyTotal.toFixed(2)}</span>
            </div>
            {period === 'annually' && (
              <div className="text-xs text-green-600">
                You save ${youSavePerMonth.toFixed(2)} / mo
              </div>
            )}
          </div>

          {/* QUARTERLY BLOCK */}
          <div className="pt-4 border-t space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-600">
                <Repeat className="w-4 h-4 mr-2" />
                Quarterly (ex-GST)
              </span>
              <span className="text-sm text-gray-900">${quarterlyEx.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-600">
                <Repeat className="w-4 h-4 mr-2" />
                GST (10%)
              </span>
              <span className="text-sm text-gray-900">${quarterlyGst.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-medium">
              <span className="flex items-center text-sm text-gray-700">
                <Repeat className="w-4 h-4 mr-2" />
                Total / quarter
              </span>
              <span className="text-sm text-gray-900">${quarterlyTotal.toFixed(2)}</span>
            </div>
            {period === 'annually' && (
              <div className="text-xs text-green-600">
                You save ${youSavePerQuarter.toFixed(2)} / qtr
              </div>
            )}
          </div>

          {/* ANNUAL BLOCK */}
          <div className="pt-4 border-t space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Annual (ex-GST)
              </span>
              <span className="text-sm text-gray-900">${annualEx.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                GST (10%)
              </span>
              <span className="text-sm text-gray-900">${annualGst.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center text-sm text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Total / year
              </span>
              <span className="text-sm text-gray-900">${annualTotal.toFixed(2)}</span>
            </div>
            {period === 'annually' && (
              <div className="text-xs text-green-600">
                You save ${youSavePerYear.toFixed(2)} / yr (15% off)
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
