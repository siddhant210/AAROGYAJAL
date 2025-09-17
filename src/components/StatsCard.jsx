import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  color = 'blue',
  animateValue = true,
  delay = 0 
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (animateValue && typeof value === 'number') {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value, animateValue])

  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    green: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    yellow: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
    red: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      <Card className="interactive-card h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {title}
              </p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold animate-count-up">
                  {typeof displayValue === 'number' 
                    ? displayValue.toLocaleString() 
                    : displayValue
                  }
                </h3>
                {trend && (
                  <span className={`text-xs font-medium ${
                    trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend > 0 ? '+' : ''}{trend}%
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StatsCard

