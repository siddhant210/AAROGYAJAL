import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Shield, Droplets, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroBanner from '../assets/hero-banner.png'

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-16 h-16 bg-cyan-200 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600 font-medium">
                <Shield className="h-5 w-5" />
                <span>Smart Health & Water Safety Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">AarogyaJal</span>
                <span className="block text-blue-600">Protecting</span>
                <span className="block">Communities</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                One Drop at a Time
              </p>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              Advanced AI-powered health monitoring and early warning system for water-borne diseases in rural and tribal communities. Real-time detection, multilingual support, and community-driven health protection.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link to="/health-reporting">
                <Button size="lg" className="gradient-health text-white border-0 hover:shadow-lg transition-all duration-300">
                  Start Reporting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">24/7 Monitoring</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Real-time health tracking</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Droplets className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Water Safety</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quality assurance</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative z-10"
            >
              <img
                src={heroBanner}
                alt="AarogyaJal - Smart Health & Water Safety Platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: '0.5s' }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: '1.5s' }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection

