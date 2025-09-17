import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Mic, 
  MapPin, 
  Users, 
  Calendar, 
  Thermometer,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Upload,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

const HealthReporting = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterRole: '',
    location: '',
    patientAge: '',
    patientGender: '',
    symptoms: [],
    severity: '',
    duration: '',
    waterSource: '',
    additionalNotes: '',
    language: 'en'
  })

  const symptoms = [
    'Diarrhea', 'Vomiting', 'Fever', 'Abdominal Pain', 'Dehydration',
    'Nausea', 'Headache', 'Fatigue', 'Loss of Appetite', 'Skin Rash'
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'mr', name: 'मराठी (Marathi)' }
  ]

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      toast.success("Voice recording started. Speak clearly in your preferred language.")
    } else {
      toast.success("Voice recording stopped. Converting to text...")
      // Simulate voice-to-text conversion
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          additionalNotes: prev.additionalNotes + " [Voice input: Patient showing symptoms of waterborne illness, needs immediate attention]"
        }))
        toast.success("Voice converted to text successfully!")
      }, 2000)
    }
  }

  const handleLocationCapture = () => {
    toast.success("Capturing GPS location...")
    // Simulate GPS capture
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        location: "Village: Rampur, District: Gaya, State: Bihar (GPS: 24.7136, 84.9994)"
      }))
      toast.success("Location captured successfully!")
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Health report submitted successfully! Alert sent to authorities.")
    // Reset form
    setFormData({
      reporterName: '',
      reporterRole: '',
      location: '',
      patientAge: '',
      patientGender: '',
      symptoms: [],
      severity: '',
      duration: '',
      waterSource: '',
      additionalNotes: '',
      language: 'en'
    })
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
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Community Health Reporting
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Report health symptoms and water-related issues to help prevent disease outbreaks in your community
          </p>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-blue-600" />
                <Label htmlFor="language">Select Language / भाषा चुनें</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reporter Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Reporter Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reporterName">Your Name</Label>
                    <Input
                      id="reporterName"
                      value={formData.reporterName}
                      onChange={(e) => setFormData(prev => ({ ...prev, reporterName: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporterRole">Your Role</Label>
                    <Select value={formData.reporterRole} onValueChange={(value) => setFormData(prev => ({ ...prev, reporterRole: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asha">ASHA Worker</SelectItem>
                        <SelectItem value="anm">ANM</SelectItem>
                        <SelectItem value="volunteer">Community Volunteer</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Village, District, State"
                        required
                      />
                      <Button type="button" variant="outline" onClick={handleLocationCapture}>
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Patient Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Patient Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientAge">Age</Label>
                      <Input
                        id="patientAge"
                        type="number"
                        value={formData.patientAge}
                        onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
                        placeholder="Age in years"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientGender">Gender</Label>
                      <Select value={formData.patientGender} onValueChange={(value) => setFormData(prev => ({ ...prev, patientGender: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={formData.severity} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration of Symptoms</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Few hours</SelectItem>
                        <SelectItem value="1day">1 day</SelectItem>
                        <SelectItem value="2-3days">2-3 days</SelectItem>
                        <SelectItem value="week">About a week</SelectItem>
                        <SelectItem value="longer">More than a week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Symptoms Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  <span>Symptoms (Select all that apply)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {symptoms.map(symptom => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={formData.symptoms.includes(symptom)}
                        onCheckedChange={() => handleSymptomToggle(symptom)}
                      />
                      <Label htmlFor={symptom} className="text-sm cursor-pointer">
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.symptoms.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Selected symptoms:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.symptoms.map(symptom => (
                        <Badge key={symptom} variant="secondary">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Water Source & Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span>Water Source & Additional Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="waterSource">Primary Water Source</Label>
                  <Select value={formData.waterSource} onValueChange={(value) => setFormData(prev => ({ ...prev, waterSource: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="well">Hand Pump / Well</SelectItem>
                      <SelectItem value="borewell">Borewell</SelectItem>
                      <SelectItem value="river">River / Stream</SelectItem>
                      <SelectItem value="pond">Pond / Lake</SelectItem>
                      <SelectItem value="tanker">Water Tanker</SelectItem>
                      <SelectItem value="piped">Piped Water Supply</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <div className="space-y-2">
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder="Any additional information about the patient's condition, recent travel, or other relevant details..."
                      rows={4}
                    />
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleVoiceRecording}
                        className={isRecording ? 'bg-red-100 border-red-300 text-red-700' : ''}
                      >
                        <Mic className={`h-4 w-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                        {isRecording ? 'Stop Recording' : 'Voice Input'}
                      </Button>
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <Button type="submit" size="lg" className="gradient-health text-white px-8">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Submit Health Report
            </Button>
          </motion.div>
        </form>

        {/* Offline Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 dark:text-green-300">
              Offline-first design: Data will sync when connection is available
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HealthReporting

