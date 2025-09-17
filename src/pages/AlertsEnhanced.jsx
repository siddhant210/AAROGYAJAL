import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Send,
  Zap,
  TrendingUp,
  Activity,
  Droplets
} from 'lucide-react'
import { toast } from 'sonner'

const AlertsEnhanced = () => {
  const [alertSettings, setAlertSettings] = useState({
    sms: true,
    whatsapp: true,
    email: true,
    voice: false,
    webPush: true,
    severity: 'medium'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [realTimeUpdates, setRealTimeUpdates] = useState(true)
  const [newAlertCount, setNewAlertCount] = useState(0)

  // Simulate real-time updates
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        setNewAlertCount(prev => prev + Math.floor(Math.random() * 2))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [realTimeUpdates])

  const alerts = [
    {
      id: 1,
      title: "Critical Water Contamination Alert",
      message: "E.coli bacteria detected at dangerous levels in Rampur village main water supply. Immediate boil water advisory issued.",
      severity: "high",
      type: "water-quality",
      location: "Rampur Village, Bihar",
      timestamp: "2024-01-15T10:30:00Z",
      status: "active",
      channels: ["sms", "whatsapp", "email", "voice"],
      recipients: 1250,
      acknowledged: false,
      priority: "urgent"
    },
    {
      id: 2,
      title: "Disease Outbreak Pattern Detected",
      message: "AI analysis shows 15% increase in diarrheal illness reports in Jharia area over past 48 hours. Enhanced surveillance activated.",
      severity: "medium",
      type: "health",
      location: "Jharia, Jharkhand",
      timestamp: "2024-01-15T08:15:00Z",
      status: "investigating",
      channels: ["sms", "whatsapp", "email"],
      recipients: 850,
      acknowledged: true,
      priority: "high"
    },
    {
      id: 3,
      title: "Water Quality Restored",
      message: "Chlorination treatment successful. Water quality parameters have returned to safe levels in Kalahandi region.",
      severity: "low",
      type: "update",
      location: "Kalahandi, Odisha",
      timestamp: "2024-01-15T06:45:00Z",
      status: "resolved",
      channels: ["sms", "whatsapp"],
      recipients: 650,
      acknowledged: true,
      priority: "normal"
    },
    {
      id: 4,
      title: "Preventive Maintenance Scheduled",
      message: "Scheduled water system chlorination begins tomorrow 6 AM. Temporary taste/odor changes expected for 2-4 hours.",
      severity: "low",
      type: "maintenance",
      location: "Gaya District, Bihar",
      timestamp: "2024-01-14T16:20:00Z",
      status: "scheduled",
      channels: ["sms", "whatsapp", "email"],
      recipients: 2100,
      acknowledged: true,
      priority: "normal"
    },
    {
      id: 5,
      title: "Emergency Response Deployed",
      message: "Mobile water treatment units and medical teams dispatched to affected areas. Distribution points operational at community centers.",
      severity: "high",
      type: "emergency",
      location: "Multiple Villages, Bihar",
      timestamp: "2024-01-14T14:10:00Z",
      status: "active",
      channels: ["sms", "whatsapp", "email", "voice"],
      recipients: 3200,
      acknowledged: false,
      priority: "urgent"
    }
  ]

  const channelStats = [
    { 
      name: 'SMS', 
      sent: 15420, 
      delivered: 15380, 
      failed: 40, 
      icon: MessageSquare, 
      color: 'blue',
      deliveryRate: 99.7,
      avgResponseTime: '2.3s',
      trend: '+5.2%'
    },
    { 
      name: 'WhatsApp', 
      sent: 12850, 
      delivered: 12820, 
      failed: 30, 
      icon: MessageSquare, 
      color: 'green',
      deliveryRate: 99.8,
      avgResponseTime: '1.8s',
      trend: '+8.1%'
    },
    { 
      name: 'Email', 
      sent: 8960, 
      delivered: 8940, 
      failed: 20, 
      icon: Mail, 
      color: 'purple',
      deliveryRate: 99.8,
      avgResponseTime: '5.2s',
      trend: '+3.4%'
    },
    { 
      name: 'Voice Calls', 
      sent: 2340, 
      delivered: 2310, 
      failed: 30, 
      icon: Phone, 
      color: 'orange',
      deliveryRate: 98.7,
      avgResponseTime: '12.5s',
      trend: '+1.9%'
    }
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
      case 'health': return <Activity className="h-4 w-4" />
      case 'emergency': return <AlertTriangle className="h-4 w-4" />
      case 'maintenance': return <Settings className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10'
      case 'high': return 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/10'
      case 'normal': return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10'
      default: return 'border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-900/10'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header with Real-time Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <motion.div
              animate={{ 
                scale: realTimeUpdates ? [1, 1.2, 1] : 1,
                rotate: realTimeUpdates ? [0, 360] : 0
              }}
              transition={{ 
                duration: 2, 
                repeat: realTimeUpdates ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Bell className="h-8 w-8 text-orange-500" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Alerts & Notifications
            </h1>
            {realTimeUpdates && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-700 dark:text-green-300">Live</span>
              </motion.div>
            )}
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multi-channel alert system with real-time monitoring and AI-powered threat detection
          </p>
        </motion.div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts" className="relative">
              Active Alerts
              {newAlertCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {newAlertCount}
                </motion.span>
              )}
            </TabsTrigger>
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
                      <Button 
                        variant={realTimeUpdates ? "default" : "outline"}
                        onClick={() => setRealTimeUpdates(!realTimeUpdates)}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Real-time
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alerts List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence>
                {filteredAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ scale: 1.02 }}
                    className={`${getPriorityColor(alert.priority)}`}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <motion.div 
                                className={`p-1 rounded ${getSeverityColor(alert.severity)}`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                {getTypeIcon(alert.type)}
                              </motion.div>
                              <h3 className="text-lg font-semibold">{alert.title}</h3>
                              <StatusIndicator status={alert.severity} type="health" size="sm" />
                              <Badge 
                                variant={alert.status === 'active' ? 'destructive' : alert.status === 'resolved' ? 'default' : 'secondary'}
                                className="animate-pulse"
                              >
                                {alert.status}
                              </Badge>
                              {alert.priority === 'urgent' && (
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <Badge variant="destructive" className="bg-red-600">
                                    URGENT
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {alert.message}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
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
                            
                            <div className="flex items-center space-x-2">
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
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Acknowledge
                                </Button>
                              </motion.div>
                            )}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" onClick={() => dismissAlert(alert.id)}>
                                <X className="h-4 w-4 mr-1" />
                                Dismiss
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          {/* Channel Performance */}
          <TabsContent value="channels" className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {channelStats.map((channel, index) => {
                const Icon = channel.icon
                return (
                  <motion.div key={channel.name} variants={itemVariants}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div 
                            className={`p-2 rounded-lg bg-${channel.color}-100 dark:bg-${channel.color}-900/30`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className={`h-5 w-5 text-${channel.color}-600`} />
                          </motion.div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">
                              {channel.deliveryRate}% delivered
                            </Badge>
                            <div className="flex items-center text-xs text-green-600">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {channel.trend}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Sent:</span>
                            <motion.span 
                              className="font-medium"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {channel.sent.toLocaleString()}
                            </motion.span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Delivered:</span>
                            <motion.span 
                              className="font-medium text-green-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.1 }}
                            >
                              {channel.delivered.toLocaleString()}
                            </motion.span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Failed:</span>
                            <motion.span 
                              className="font-medium text-red-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                            >
                              {channel.failed}
                            </motion.span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Avg Response:</span>
                            <span className="font-medium text-blue-600">
                              {channel.avgResponseTime}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
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
                    {[
                      { key: 'sms', icon: MessageSquare, label: 'SMS Notifications', desc: 'Receive alerts via SMS', color: 'blue' },
                      { key: 'whatsapp', icon: MessageSquare, label: 'WhatsApp Notifications', desc: 'Receive alerts via WhatsApp', color: 'green' },
                      { key: 'email', icon: Mail, label: 'Email Notifications', desc: 'Receive alerts via email', color: 'purple' },
                      { key: 'voice', icon: Phone, label: 'Voice Call Alerts', desc: 'Receive emergency alerts via voice calls', color: 'orange' },
                      { key: 'webPush', icon: Smartphone, label: 'Web Push Notifications', desc: 'Receive alerts in your browser', color: 'blue' }
                    ].map((setting, index) => {
                      const Icon = setting.icon
                      return (
                        <motion.div
                          key={setting.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-5 w-5 text-${setting.color}-600`} />
                            <div>
                              <Label htmlFor={setting.key}>{setting.label}</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{setting.desc}</p>
                            </div>
                          </div>
                          <Switch
                            id={setting.key}
                            checked={alertSettings[setting.key]}
                            onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, [setting.key]: checked }))}
                          />
                        </motion.div>
                      )
                    })}
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
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={testAlert}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Test Alert
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Advanced Settings
                      </Button>
                    </motion.div>
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

export default AlertsEnhanced

