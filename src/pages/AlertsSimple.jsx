import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, AlertTriangle, MessageSquare, Phone, Mail } from 'lucide-react'

const AlertsSimple = () => {
  const [alertSettings, setAlertSettings] = useState({
    sms: true,
    whatsapp: true,
    email: true,
    voice: false,
    webPush: true
  })

  const alerts = [
    {
      id: 1,
      title: "High Risk Water Contamination Detected",
      message: "Bacterial contamination levels exceed safe limits in Rampur village water supply.",
      severity: "high",
      location: "Rampur Village, Bihar",
      timestamp: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      title: "Disease Outbreak Alert",
      message: "Increased reports of diarrheal illness in Jharia area.",
      severity: "medium",
      location: "Jharia, Jharkhand",
      timestamp: "4 hours ago",
      status: "investigating"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bell className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Alerts & Notifications
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multi-channel alert system for real-time health and water safety notifications
          </p>
        </div>

        {/* Alerts List */}
        <div className="space-y-4 mb-8">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`${alert.severity === 'high' ? 'border-red-200 dark:border-red-800' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h3 className="text-lg font-semibold">{alert.title}</h3>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{alert.location}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                  <Button size="sm">
                    Acknowledge
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Channel Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">98.5% delivered</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">SMS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sent:</span>
                  <span className="font-medium">15,420</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivered:</span>
                  <span className="font-medium text-green-600">15,380</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <Badge variant="outline">99.2% delivered</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sent:</span>
                  <span className="font-medium">12,850</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivered:</span>
                  <span className="font-medium text-green-600">12,820</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
                <Badge variant="outline">99.8% delivered</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sent:</span>
                  <span className="font-medium">8,960</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivered:</span>
                  <span className="font-medium text-green-600">8,940</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Phone className="h-8 w-8 text-orange-600" />
                <Badge variant="outline">98.7% delivered</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">Voice Calls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sent:</span>
                  <span className="font-medium">2,340</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivered:</span>
                  <span className="font-medium text-green-600">2,310</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AlertsSimple

