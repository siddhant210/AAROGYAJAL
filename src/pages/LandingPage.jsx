import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import StatsCard from '../components/StatsCard'
import { 
  Users, 
  Droplets, 
  Shield, 
  AlertTriangle, 
  Heart, 
  BarChart3, 
  Smartphone, 
  Globe,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const stats = [
    {
      title: "Alerts Sent",
      value: 15420,
      icon: AlertTriangle,
      description: "Early warnings delivered",
      trend: 12,
      color: "yellow"
    },
    {
      title: "Water Tests Done",
      value: 8750,
      icon: Droplets,
      description: "Quality assessments completed",
      trend: 8,
      color: "blue"
    },
    {
      title: "Outbreaks Prevented",
      value: 342,
      icon: Shield,
      description: "Disease outbreaks stopped",
      trend: 15,
      color: "green"
    },
    {
      title: "Communities Protected",
      value: 1250,
      icon: Users,
      description: "Villages under monitoring",
      trend: 20,
      color: "purple"
    }
  ]

  const features = [
    {
      icon: Heart,
      title: "Community Health Reporting",
      description: "ASHA workers and volunteers can easily log symptoms with voice-to-text support and multilingual interface.",
      features: ["Voice-to-text input", "Multilingual support", "Offline-first design", "Geo-tagging"]
    },
    {
      icon: Droplets,
      title: "Water Quality Monitoring",
      description: "Real-time IoT sensor data and manual test entry with AI-powered image analysis for test kit results.",
      features: ["IoT sensor dashboard", "Manual test entry", "AI image analysis", "Trend predictions"]
    },
    {
      icon: BarChart3,
      title: "AI Prediction & Mapping",
      description: "Advanced machine learning models detect outbreaks early with interactive heatmaps and risk assessment.",
      features: ["ML outbreak detection", "Interactive heatmaps", "Risk level mapping", "What-if simulator"]
    },
    {
      icon: Smartphone,
      title: "Multi-channel Alerts",
      description: "Instant notifications through SMS, WhatsApp, email, and voice calls with severity-based categorization.",
      features: ["SMS & WhatsApp", "Email notifications", "Voice calls", "Web push alerts"]
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Report Health Issues",
      description: "Community health workers report symptoms and water quality issues through our easy-to-use interface.",
      icon: Heart
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our advanced AI algorithms analyze patterns and predict potential disease outbreaks in real-time.",
      icon: BarChart3
    },
    {
      step: 3,
      title: "Early Warning",
      description: "Automated alerts are sent to authorities and communities through multiple channels for immediate action.",
      icon: AlertTriangle
    },
    {
      step: 4,
      title: "Prevent Outbreaks",
      description: "Quick response and intervention prevent disease spread, protecting entire communities.",
      icon: Shield
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real-time statistics showing the positive impact of AarogyaJal across rural and tribal communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A simple 4-step process that protects communities from water-borne diseases
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced technology solutions designed specifically for rural and tribal communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="interactive-card h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Protect Your Community?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of communities already using AarogyaJal to prevent water-borne diseases and protect public health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/health-reporting">
                <Button size="lg" variant="secondary" className="text-blue-600 hover:text-blue-700">
                  Start Health Reporting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Dashboard
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

