import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

type Props = { summary: ReturnType<typeof import('../functions/usePriceCalculator').usePriceCalculator> }
export function OrderSummary({ summary }: Props) {
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
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (10%)</span><span>${summary.gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span><span>${summary.total.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4">Proceed</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}