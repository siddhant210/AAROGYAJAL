import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StatsCard from '../components/StatsCard'
import StatusIndicator from '../components/StatusIndicator'
import { 
  BarChart3, 
  Map, 
  Users, 
  AlertTriangle, 
  Droplets, 
  Heart,
  Download,
  Filter,
  RefreshCw,
  MapPin,
  TrendingUp,
  Activity,
  Shield,
  Bell
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data for dashboard
  const overviewStats = [
    {
      title: "Active Alerts",
      value: 23,
      icon: AlertTriangle,
      description: "Requiring immediate attention",
      trend: -12,
      color: "red"
    },
    {
      title: "Communities Monitored",
      value: 1250,
      icon: Users,
      description: "Villages under surveillance",
      trend: 8,
      color: "blue"
    },
    {
      title: "Water Sources",
      value: 3420,
      icon: Droplets,
      description: "Being monitored",
      trend: 15,
      color: "blue"
    },
    {
      title: "Health Reports",
      value: 156,
      icon: Heart,
      description: "This week",
      trend: 22,
      color: "green"
    }
  ]

  const alertData = [
    { region: 'Bihar', high: 8, medium: 12, low: 5 },
    { region: 'Jharkhand', high: 3, medium: 8, low: 15 },
    { region: 'Odisha', high: 5, medium: 10, low: 12 },
    { region: 'Chhattisgarh', high: 2, medium: 6, low: 18 },
    { region: 'West Bengal', high: 4, medium: 9, low: 14 }
  ]

  const diseaseData = [
    { name: 'Diarrhea', value: 45, color: '#ef4444' },
    { name: 'Cholera', value: 25, color: '#f97316' },
    { name: 'Typhoid', value: 20, color: '#eab308' },
    { name: 'Hepatitis A', value: 10, color: '#22c55e' }
  ]

  const trendData = [
    { month: 'Jan', outbreaks: 12, prevented: 8 },
    { month: 'Feb', outbreaks: 15, prevented: 12 },
    { month: 'Mar', outbreaks: 8, prevented: 18 },
    { month: 'Apr', outbreaks: 22, prevented: 15 },
    { month: 'May', outbreaks: 18, prevented: 25 },
    { month: 'Jun', outbreaks: 14, prevented: 28 }
  ]

  const recentAlerts = [
    {
      id: 1,
      location: "Rampur Village, Bihar",
      type: "Water Contamination",
      severity: "high",
      time: "2 hours ago",
      status: "investigating"
    },
    {
      id: 2,
      location: "Jharia, Jharkhand",
      type: "Disease Outbreak",
      severity: "medium",
      time: "4 hours ago",
      status: "resolved"
    },
    {
      id: 3,
      location: "Kalahandi, Odisha",
      type: "Water Quality Alert",
      severity: "low",
      time: "6 hours ago",
      status: "monitoring"
    }
  ]

  const resourceAllocation = [
    {
      region: "Bihar",
      medicines: 85,
      waterTankers: 12,
      medicalTeams: 8,
      priority: "high"
    },
    {
      region: "Jharkhand",
      medicines: 92,
      waterTankers: 8,
      medicalTeams: 6,
      priority: "medium"
    },
    {
      region: "Odisha",
      medicines: 78,
      waterTankers: 15,
      medicalTeams: 10,
      priority: "high"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Authority Dashboard
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real-time monitoring and management of community health and water safety
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {overviewStats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Incidents</TabsTrigger>
            <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alert Distribution */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Distribution by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={alertData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="high" stackId="a" fill="#ef4444" />
                        <Bar dataKey="medium" stackId="a" fill="#f97316" />
                        <Bar dataKey="low" stackId="a" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Disease Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Disease Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={diseaseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {diseaseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Trend Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Outbreak Prevention Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="outbreaks" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="prevented" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interactive Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Map className="h-5 w-5 text-blue-500" />
                    <span>Interactive Outbreak Heatmap</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Simulated map with heat zones */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Interactive Map View
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Real-time outbreak heatmap with drill-down capabilities
                        </p>
                      </div>
                    </div>
                    
                    {/* Heat zone indicators */}
                    <div className="absolute top-20 left-20 w-12 h-12 bg-red-500 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute top-32 right-32 w-8 h-8 bg-yellow-500 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute bottom-24 left-32 w-6 h-6 bg-green-500 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute bottom-32 right-24 w-10 h-10 bg-orange-500 rounded-full opacity-60 animate-pulse" />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-sm">High Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span className="text-sm">Medium Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="text-sm">Low Risk</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter Regions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-red-500" />
                    <span>Recent Alerts & Incidents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{alert.location}</span>
                          </div>
                          <StatusIndicator status={alert.severity} type="health" size="sm" />
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{alert.time}</span>
                          <Badge variant={alert.status === 'resolved' ? 'default' : 'secondary'}>
                            {alert.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Resource Allocation Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {resourceAllocation.map((region) => (
                      <div key={region.region} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{region.region}</h3>
                          <StatusIndicator 
                            status={region.priority === 'high' ? 'high' : region.priority === 'medium' ? 'medium' : 'low'} 
                            type="health" 
                            size="sm" 
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{region.medicines}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Medicine Stock</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{region.waterTankers}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Water Tankers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{region.medicalTeams}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Medical Teams</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Exportable Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-medium mb-2">Weekly Summary</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Comprehensive weekly health and water quality report
                      </p>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-medium mb-2">Trend Analysis</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Monthly trends and predictive analytics report
                      </p>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Excel
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-medium mb-2">Performance Metrics</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        System performance and intervention effectiveness
                      </p>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
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

export default Dashboard

