import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp, 
  Users, 
  Droplets, 
  Heart, 
  Shield, 
  Target,
  Crown,
  Zap,
  CheckCircle,
  Calendar,
  MapPin,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

const CommunityLeaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedCategory, setSelectedCategory] = useState('overall')
  const [animationKey, setAnimationKey] = useState(0)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1)
    }, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const leaderboardData = {
    overall: [
      {
        id: 1,
        name: "Rampur Village",
        state: "Bihar",
        score: 2850,
        rank: 1,
        previousRank: 1,
        population: 1250,
        achievements: ["Water Guardian", "Health Champion", "Community Leader"],
        metrics: {
          waterTests: 45,
          healthReports: 28,
          alertsResponded: 15,
          educationCompleted: 89
        },
        streak: 45,
        level: "Platinum",
        avatar: "🏆"
      },
      {
        id: 2,
        name: "Jharia Township",
        state: "Jharkhand",
        score: 2720,
        rank: 2,
        previousRank: 3,
        population: 2100,
        achievements: ["Water Guardian", "Health Champion"],
        metrics: {
          waterTests: 52,
          healthReports: 31,
          alertsResponded: 12,
          educationCompleted: 76
        },
        streak: 38,
        level: "Gold",
        avatar: "🥈"
      },
      {
        id: 3,
        name: "Kalahandi District",
        state: "Odisha",
        score: 2680,
        rank: 3,
        previousRank: 2,
        population: 3500,
        achievements: ["Water Guardian", "Education Pioneer"],
        metrics: {
          waterTests: 38,
          healthReports: 42,
          alertsResponded: 18,
          educationCompleted: 92
        },
        streak: 52,
        level: "Gold",
        avatar: "🥉"
      },
      {
        id: 4,
        name: "Gaya Rural",
        state: "Bihar",
        score: 2450,
        rank: 4,
        previousRank: 4,
        population: 1800,
        achievements: ["Health Champion", "Response Hero"],
        metrics: {
          waterTests: 35,
          healthReports: 25,
          alertsResponded: 22,
          educationCompleted: 68
        },
        streak: 29,
        level: "Silver",
        avatar: "🏅"
      },
      {
        id: 5,
        name: "Tribal Area Collective",
        state: "Chhattisgarh",
        score: 2380,
        rank: 5,
        previousRank: 6,
        population: 950,
        achievements: ["Community Leader", "Education Pioneer"],
        metrics: {
          waterTests: 28,
          healthReports: 35,
          alertsResponded: 8,
          educationCompleted: 95
        },
        streak: 33,
        level: "Silver",
        avatar: "🎖️"
      },
      {
        id: 6,
        name: "Sundarbans Region",
        state: "West Bengal",
        score: 2220,
        rank: 6,
        previousRank: 5,
        population: 2800,
        achievements: ["Water Guardian"],
        metrics: {
          waterTests: 48,
          healthReports: 18,
          alertsResponded: 14,
          educationCompleted: 58
        },
        streak: 21,
        level: "Bronze",
        avatar: "🏆"
      }
    ]
  }

  const achievements = [
    { name: "Water Guardian", icon: Droplets, color: "blue", description: "Completed 30+ water quality tests" },
    { name: "Health Champion", icon: Heart, color: "red", description: "Submitted 20+ health reports" },
    { name: "Community Leader", icon: Users, color: "purple", description: "Led community initiatives" },
    { name: "Education Pioneer", icon: Star, color: "yellow", description: "90%+ education completion rate" },
    { name: "Response Hero", icon: Shield, color: "green", description: "Responded to 15+ alerts" }
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 'Bronze': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Award className="h-6 w-6 text-orange-500" />
      default: return <Trophy className="h-5 w-5 text-gray-500" />
    }
  }

  const getRankChange = (current, previous) => {
    if (current < previous) return { icon: ArrowUp, color: 'text-green-600', text: `+${previous - current}` }
    if (current > previous) return { icon: ArrowDown, color: 'text-red-600', text: `-${current - previous}` }
    return { icon: Minus, color: 'text-gray-400', text: '0' }
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Trophy className="h-8 w-8 text-yellow-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Community Leaderboard
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Celebrating communities leading the way in health and water safety practices
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex space-x-2">
                {['weekly', 'monthly', 'yearly'].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="capitalize"
                  >
                    {period}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border rounded-md bg-background text-sm"
                >
                  <option value="overall">Overall Performance</option>
                  <option value="water">Water Quality</option>
                  <option value="health">Health Reporting</option>
                  <option value="education">Education</option>
                  <option value="response">Alert Response</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        key={animationKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {leaderboardData.overall.slice(0, 3).map((community, index) => (
          <motion.div
            key={community.id}
            variants={itemVariants}
            className={`${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
          >
            <Card className={`relative overflow-hidden ${
              index === 0 ? 'ring-2 ring-yellow-400 transform md:scale-105' : ''
            }`}>
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-2"
                  >
                    {community.avatar}
                  </motion.div>
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(community.rank)}
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-1">{community.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{community.state}</p>
                
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getLevelColor(community.level)}`}>
                  {community.level}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-xl">{community.score.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Zap className="h-4 w-4" />
                    <span>{community.streak} day streak</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  {community.achievements.slice(0, 2).map((achievement, idx) => {
                    const achievementData = achievements.find(a => a.name === achievement)
                    const Icon = achievementData?.icon || Star
                    return (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Icon className="h-3 w-3 mr-1" />
                        {achievement}
                      </Badge>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Complete Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {leaderboardData.overall.map((community, index) => {
                const rankChange = getRankChange(community.rank, community.previousRank)
                const ChangeIcon = rankChange.icon
                
                return (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b last:border-b-0 transition-colors"
                  >
                    {/* Rank */}
                    <div className="flex items-center space-x-3 w-20">
                      <span className="text-2xl font-bold text-gray-400">#{community.rank}</span>
                      <div className={`flex items-center ${rankChange.color}`}>
                        <ChangeIcon className="h-4 w-4" />
                        <span className="text-xs ml-1">{rankChange.text}</span>
                      </div>
                    </div>
                    
                    {/* Community Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{community.avatar}</span>
                        <div>
                          <h4 className="font-semibold text-lg">{community.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{community.state}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{community.population.toLocaleString()} people</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{community.metrics.waterTests}</div>
                        <div className="text-gray-500">Water Tests</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{community.metrics.healthReports}</div>
                        <div className="text-gray-500">Health Reports</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{community.metrics.educationCompleted}%</div>
                        <div className="text-gray-500">Education</div>
                      </div>
                    </div>
                    
                    {/* Score and Level */}
                    <div className="text-right">
                      <div className="font-bold text-xl">{community.score.toLocaleString()}</div>
                      <div className={`inline-block px-2 py-1 rounded text-xs ${getLevelColor(community.level)}`}>
                        {community.level}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievement Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Available Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Icon className={`h-8 w-8 text-${achievement.color}-500`} />
                    <div>
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default CommunityLeaderboard

