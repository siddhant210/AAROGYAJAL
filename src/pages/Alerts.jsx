import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import StatusIndicator from '../components/StatusIndicator'
import { 
  Bell, 
  AlertTriangle, 
  MessageSquare, 
  Phone, 
  Mail,
  Smartphone,
  Volume2,
  Settings,
  Clock,
  MapPin,
  Users,
  Filter,
  Search,
  CheckCircle,
  X,
  Send
} from 'lucide-react'
import { toast } from 'sonner'

const Alerts = () => {
  const [alertSettings, setAlertSettings] = useState({
    sms: true,
    whatsapp: true,
    email: true,
    voice: false,
    webPush: true,
    severity: 'medium' // minimum severity to receive alerts
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')

  const alerts = [
    {
      id: 1,
      title: "High Risk Water Contamination Detected",
      message: "Bacterial contamination levels exceed safe limits in Rampur village water supply. Immediate action required.",
      severity: "high",
      type: "water-quality",
      location: "Rampur Village, Bihar",
      timestamp: "2024-01-15T10:30:00Z",
      status: "active",
      channels: ["sms", "whatsapp", "email", "voice"],
      recipients: 1250,
      acknowledged: false
    },
    {
      id: 2,
      title: "Disease Outbreak Alert",
      message: "Increased reports of diarrheal illness in Jharia area. Enhanced surveillance activated.",
      severity: "medium",
      type: "health",
      location: "Jharia, Jharkhand",
      timestamp: "2024-01-15T08:15:00Z",
      status: "investigating",
      channels: ["sms", "whatsapp", "email"],
      recipients: 850,
      acknowledged: true
    },
    {
      id: 3,
      title: "Water Quality Improvement",
      message: "Water quality parameters have returned to normal levels in Kalahandi region.",
      severity: "low",
      type: "update",
      location: "Kalahandi, Odisha",
      timestamp: "2024-01-15T06:45:00Z",
      status: "resolved",
      channels: ["sms", "whatsapp"],
      recipients: 650,
      acknowledged: true
    },
    {
      id: 4,
      title: "Preventive Chlorination Schedule",
      message: "Scheduled water chlorination will begin tomorrow at 6 AM. Water may taste different temporarily.",
      severity: "low",
      type: "maintenance",
      location: "Gaya District, Bihar",
      timestamp: "2024-01-14T16:20:00Z",
      status: "scheduled",
      channels: ["sms", "whatsapp", "email"],
      recipients: 2100,
      acknowledged: true
    },
    {
      id: 5,
      title: "Emergency Water Distribution",
      message: "Emergency water tankers deployed to affected areas. Distribution points established at community centers.",
      severity: "high",
      type: "emergency",
      location: "Multiple Villages, Bihar",
      timestamp: "2024-01-14T14:10:00Z",
      status: "active",
      channels: ["sms", "whatsapp", "email", "voice"],
      recipients: 3200,
      acknowledged: false
    }
  ]

  const channelStats = [
    { name: 'SMS', sent: 15420, delivered: 15380, failed: 40, icon: MessageSquare, color: 'blue' },
    { name: 'WhatsApp', sent: 12850, delivered: 12820, failed: 30, icon: MessageSquare, color: 'green' },
    { name: 'Email', sent: 8960, delivered: 8940, failed: 20, icon: Mail, color: 'purple' },
    { name: 'Voice Calls', sent: 2340, delivered: 2310, failed: 30, icon: Phone, color: 'orange' }
  ]

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'water-quality': return <Droplets className="h-4 w-4" />
      case 'health': return <AlertTriangle className="h-4 w-4" />
      case 'emergency': return <AlertTriangle className="h-4 w-4" />
      case 'maintenance': return <Settings className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity
    return matchesSearch && matchesSeverity
  })

  const acknowledgeAlert = (alertId) => {
    toast.success("Alert acknowledged successfully!")
  }

  const dismissAlert = (alertId) => {
    toast.success("Alert dismissed!")
  }

  const testAlert = () => {
    toast.success("Test alert sent successfully to all configured channels!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bell className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Alerts & Notifications
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multi-channel alert system for real-time health and water safety notifications
          </p>
        </motion.div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="channels">Channel Performance</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>

          {/* Active Alerts */}
          <TabsContent value="alerts" className="space-y-6">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search alerts by title or location..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="all">All Severities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                >
                  <Card className={`${alert.severity === 'high' ? 'border-red-200 dark:border-red-800' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-1 rounded ${getSeverityColor(alert.severity)}`}>
                              {getTypeIcon(alert.type)}
                            </div>
                            <h3 className="text-lg font-semibold">{alert.title}</h3>
                            <StatusIndicator status={alert.severity} type="health" size="sm" />
                            <Badge variant={alert.status === 'active' ? 'destructive' : alert.status === 'resolved' ? 'default' : 'secondary'}>
                              {alert.status}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {alert.message}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatTimestamp(alert.timestamp)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{alert.recipients.toLocaleString()} recipients</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="text-sm text-gray-500">Sent via:</span>
                            {alert.channels.map(channel => (
                              <Badge key={channel} variant="outline" className="text-xs">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          {!alert.acknowledged && alert.status === 'active' && (
                            <Button size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Acknowledge
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => dismissAlert(alert.id)}>
                            <X className="h-4 w-4 mr-1" />
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Channel Performance */}
          <TabsContent value="channels" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {channelStats.map((channel, index) => {
                const Icon = channel.icon
                const deliveryRate = ((channel.delivered / channel.sent) * 100).toFixed(1)
                return (
                  <Card key={channel.name}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg bg-${channel.color}-100 dark:bg-${channel.color}-900/30`}>
                          <Icon className={`h-5 w-5 text-${channel.color}-600`} />
                        </div>
                        <Badge variant="outline">{deliveryRate}% delivered</Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Sent:</span>
                          <span className="font-medium">{channel.sent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Delivered:</span>
                          <span className="font-medium text-green-600">{channel.delivered.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Failed:</span>
                          <span className="font-medium text-red-600">{channel.failed}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Alert Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">SMS Alert Delivered</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Water contamination alert sent to 1,250 recipients</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Send className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">WhatsApp Alert Sent</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Disease outbreak alert dispatched</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">5 min ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Voice Alert Completed</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Emergency voice calls to 2,310 numbers</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">15 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Alert Settings */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        <div>
                          <Label htmlFor="sms">SMS Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive alerts via SMS</p>
                        </div>
                      </div>
                      <Switch
                        id="sms"
                        checked={alertSettings.sms}
                        onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, sms: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <div>
                          <Label htmlFor="whatsapp">WhatsApp Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive alerts via WhatsApp</p>
                        </div>
                      </div>
                      <Switch
                        id="whatsapp"
                        checked={alertSettings.whatsapp}
                        onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, whatsapp: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-purple-600" />
                        <div>
                          <Label htmlFor="email">Email Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch
                        id="email"
                        checked={alertSettings.email}
                        onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, email: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-orange-600" />
                        <div>
                          <Label htmlFor="voice">Voice Call Alerts</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive emergency alerts via voice calls</p>
                        </div>
                      </div>
                      <Switch
                        id="voice"
                        checked={alertSettings.voice}
                        onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, voice: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <Label htmlFor="webPush">Web Push Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive alerts in your browser</p>
                        </div>
                      </div>
                      <Switch
                        id="webPush"
                        checked={alertSettings.webPush}
                        onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, webPush: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="severity">Minimum Alert Severity</Label>
                    <select
                      id="severity"
                      value={alertSettings.severity}
                      onChange={(e) => setAlertSettings(prev => ({ ...prev, severity: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="low">All Alerts (Low, Medium, High)</option>
                      <option value="medium">Medium and High Only</option>
                      <option value="high">High Priority Only</option>
                    </select>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Choose the minimum severity level for alerts you want to receive
                    </p>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Button onClick={testAlert}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Test Alert
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Alerts

