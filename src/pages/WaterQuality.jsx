import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import StatusIndicator from '../components/StatusIndicator'
import { 
  Droplets, 
  Activity, 
  Thermometer, 
  Zap, 
  Camera, 
  Upload,
  RefreshCw,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { toast } from 'sonner'

const WaterQuality = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [manualTestData, setManualTestData] = useState({
    location: '',
    testDate: '',
    ph: '',
    turbidity: '',
    chlorine: '',
    bacteria: '',
    tds: '',
    temperature: '',
    notes: ''
  })

  // Mock IoT sensor data
  const sensorData = {
    ph: { value: 7.2, status: 'good', unit: 'pH', target: '6.5-8.5' },
    turbidity: { value: 2.1, status: 'excellent', unit: 'NTU', target: '<5' },
    chlorine: { value: 0.8, status: 'good', unit: 'mg/L', target: '0.2-1.0' },
    bacteria: { value: 12, status: 'fair', unit: 'CFU/100ml', target: '<10' },
    tds: { value: 180, status: 'good', unit: 'mg/L', target: '<500' },
    temperature: { value: 24.5, status: 'excellent', unit: '°C', target: '20-25' }
  }

  // Mock trend data
  const trendData = [
    { time: '00:00', ph: 7.1, turbidity: 2.3, chlorine: 0.7 },
    { time: '04:00', ph: 7.0, turbidity: 2.1, chlorine: 0.8 },
    { time: '08:00', ph: 7.2, turbidity: 1.9, chlorine: 0.9 },
    { time: '12:00', ph: 7.3, turbidity: 2.0, chlorine: 0.8 },
    { time: '16:00', ph: 7.2, turbidity: 2.1, chlorine: 0.8 },
    { time: '20:00', ph: 7.1, turbidity: 2.2, chlorine: 0.7 }
  ]

  const predictionData = [
    { day: 'Mon', risk: 15, quality: 85 },
    { day: 'Tue', risk: 22, quality: 78 },
    { day: 'Wed', risk: 18, quality: 82 },
    { day: 'Thu', risk: 35, quality: 65 },
    { day: 'Fri', risk: 28, quality: 72 },
    { day: 'Sat', risk: 20, quality: 80 },
    { day: 'Sun', risk: 16, quality: 84 }
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success("Sensor data refreshed successfully!")
    }, 2000)
  }

  const handleManualSubmit = (e) => {
    e.preventDefault()
    toast.success("Manual test data submitted successfully!")
    setManualTestData({
      location: '',
      testDate: '',
      ph: '',
      turbidity: '',
      chlorine: '',
      bacteria: '',
      tds: '',
      temperature: '',
      notes: ''
    })
  }

  const handleImageUpload = () => {
    toast.success("Image uploaded! AI is analyzing test kit results...")
    setTimeout(() => {
      setManualTestData(prev => ({
        ...prev,
        ph: '7.1',
        chlorine: '0.9',
        notes: prev.notes + ' [AI Analysis: Test strip shows pH 7.1, Chlorine 0.9 mg/L]'
      }))
      toast.success("AI analysis complete! Values extracted from test kit image.")
    }, 3000)
  }

  const getStatusFromValue = (parameter, value) => {
    const ranges = {
      ph: { excellent: [6.8, 7.5], good: [6.5, 8.0], fair: [6.0, 8.5] },
      turbidity: { excellent: [0, 2], good: [2, 5], fair: [5, 10] },
      chlorine: { excellent: [0.5, 1.0], good: [0.2, 1.5], fair: [0.1, 2.0] },
      bacteria: { excellent: [0, 5], good: [5, 10], fair: [10, 20] },
      tds: { excellent: [0, 150], good: [150, 300], fair: [300, 500] },
      temperature: { excellent: [20, 25], good: [15, 30], fair: [10, 35] }
    }

    const range = ranges[parameter]
    if (!range) return 'good'

    if (value >= range.excellent[0] && value <= range.excellent[1]) return 'excellent'
    if (value >= range.good[0] && value <= range.good[1]) return 'good'
    if (value >= range.fair[0] && value <= range.fair[1]) return 'fair'
    return 'poor'
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
            <Droplets className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Water Quality Monitoring
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time IoT sensor monitoring and manual water quality testing for community safety
          </p>
        </motion.div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">IoT Dashboard</TabsTrigger>
            <TabsTrigger value="manual">Manual Testing</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          {/* IoT Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Real-time Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <span>Live Sensor Data</span>
                    <Badge variant="outline" className="status-low">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Online
                    </Badge>
                  </CardTitle>
                  <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(sensorData).map(([key, data]) => (
                      <div key={key} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium capitalize">{key}</h3>
                          <StatusIndicator status={data.status} type="water" size="sm" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {data.value} {data.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          Target: {data.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trend Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>24-Hour pH Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6.5, 7.5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Turbidity & Chlorine Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="turbidity" stroke="#06b6d4" strokeWidth={2} />
                      <Line type="monotone" dataKey="chlorine" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Manual Testing */}
          <TabsContent value="manual" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    <span>Manual Water Quality Test Entry</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Test Location</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="location"
                            value={manualTestData.location}
                            onChange={(e) => setManualTestData(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Village, Water Source"
                            required
                          />
                          <Button type="button" variant="outline">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="testDate">Test Date & Time</Label>
                        <Input
                          id="testDate"
                          type="datetime-local"
                          value={manualTestData.testDate}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, testDate: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ph">pH Level</Label>
                        <Input
                          id="ph"
                          type="number"
                          step="0.1"
                          value={manualTestData.ph}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, ph: e.target.value }))}
                          placeholder="6.5 - 8.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                        <Input
                          id="turbidity"
                          type="number"
                          step="0.1"
                          value={manualTestData.turbidity}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, turbidity: e.target.value }))}
                          placeholder="< 5 NTU"
                        />
                      </div>
                      <div>
                        <Label htmlFor="chlorine">Chlorine (mg/L)</Label>
                        <Input
                          id="chlorine"
                          type="number"
                          step="0.1"
                          value={manualTestData.chlorine}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, chlorine: e.target.value }))}
                          placeholder="0.2 - 1.0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="bacteria">Bacteria (CFU/100ml)</Label>
                        <Input
                          id="bacteria"
                          type="number"
                          value={manualTestData.bacteria}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, bacteria: e.target.value }))}
                          placeholder="< 10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tds">TDS (mg/L)</Label>
                        <Input
                          id="tds"
                          type="number"
                          value={manualTestData.tds}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, tds: e.target.value }))}
                          placeholder="< 500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="temperature">Temperature (°C)</Label>
                        <Input
                          id="temperature"
                          type="number"
                          step="0.1"
                          value={manualTestData.temperature}
                          onChange={(e) => setManualTestData(prev => ({ ...prev, temperature: e.target.value }))}
                          placeholder="20 - 25"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Input
                        id="notes"
                        value={manualTestData.notes}
                        onChange={(e) => setManualTestData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any observations or additional information"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={handleImageUpload}>
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Test Kit Image
                      </Button>
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Lab Report
                      </Button>
                    </div>

                    <Button type="submit" className="gradient-water text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit Test Results
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Predictions */}
          <TabsContent value="predictions" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span>Contamination Risk Prediction</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="risk" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Elevated risk predicted for Thursday
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-green-500" />
                    <span>Water Quality Forecast</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="quality" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Overall Quality Score</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Intervention Simulator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span>What-if Intervention Simulator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Water Chlorination</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Increase chlorine levels to 1.2 mg/L
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Reduction</span>
                          <span className="text-green-600 font-medium">-45%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Quality Improvement</span>
                          <span className="text-green-600 font-medium">+25%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Source Protection</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Install protective barriers around wells
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Reduction</span>
                          <span className="text-green-600 font-medium">-30%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Quality Improvement</span>
                          <span className="text-green-600 font-medium">+15%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Filtration System</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Deploy community water filters
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Reduction</span>
                          <span className="text-green-600 font-medium">-60%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Quality Improvement</span>
                          <span className="text-green-600 font-medium">+40%</span>
                        </div>
                      </div>
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

export default WaterQuality

