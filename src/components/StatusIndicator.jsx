import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'

const StatusIndicator = ({ 
  status, 
  type = 'health', 
  showIcon = true, 
  size = 'default' 
}) => {
  const getStatusConfig = (status, type) => {
    const configs = {
      health: {
        low: {
          label: 'Low Risk',
          className: 'status-low',
          icon: CheckCircle
        },
        medium: {
          label: 'Medium Risk',
          className: 'status-medium',
          icon: AlertCircle
        },
        high: {
          label: 'High Risk',
          className: 'status-high',
          icon: AlertTriangle
        }
      },
      water: {
        excellent: {
          label: 'Excellent',
          className: 'water-excellent',
          icon: CheckCircle
        },
        good: {
          label: 'Good',
          className: 'water-good',
          icon: CheckCircle
        },
        fair: {
          label: 'Fair',
          className: 'water-fair',
          icon: AlertCircle
        },
        poor: {
          label: 'Poor',
          className: 'water-poor',
          icon: AlertTriangle
        }
      }
    }

    return configs[type][status] || configs[type]['low']
  }

  const config = getStatusConfig(status, type)
  const Icon = config.icon

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${size === 'sm' ? 'text-xs px-2 py-1' : ''}`}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />}
      {config.label}
    </Badge>
  )
}

export default StatusIndicator

