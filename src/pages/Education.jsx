import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommunityLeaderboard from '../components/CommunityLeaderboard'
import { 
  GraduationCap, 
  Play, 
  Award, 
  CheckCircle, 
  Star,
  Trophy,
  Target,
  BookOpen,
  Video,
  Users,
  Calendar,
  Droplets,
  Heart,
  Shield,
  Lightbulb
} from 'lucide-react'
import { toast } from 'sonner'

const Education = () => {
  const [userProgress, setUserProgress] = useState({
    totalPoints: 1250,
    level: 3,
    badges: ['water-safety', 'hygiene-expert', 'community-helper'],
    completedModules: ['water-basics', 'hygiene-practices', 'disease-prevention'],
    currentStreak: 7
  })

  const [quizAnswers, setQuizAnswers] = useState({})

  const educationModules = [
    {
      id: 'water-basics',
      title: 'Water Safety Basics',
      description: 'Learn fundamental principles of water safety and quality',
      duration: '15 min',
      points: 100,
      icon: Droplets,
      completed: true,
      lessons: [
        'Understanding Water Quality',
        'Common Water Contaminants',
        'Safe Water Storage',
        'Water Treatment Methods'
      ]
    },
    {
      id: 'hygiene-practices',
      title: 'Personal Hygiene',
      description: 'Essential hygiene practices for disease prevention',
      duration: '12 min',
      points: 80,
      icon: Heart,
      completed: true,
      lessons: [
        'Hand Washing Techniques',
        'Food Safety Guidelines',
        'Personal Cleanliness',
        'Environmental Hygiene'
      ]
    },
    {
      id: 'disease-prevention',
      title: 'Disease Prevention',
      description: 'How to prevent water-borne diseases in your community',
      duration: '20 min',
      points: 150,
      icon: Shield,
      completed: true,
      lessons: [
        'Common Water-borne Diseases',
        'Early Warning Signs',
        'Prevention Strategies',
        'Community Response'
      ]
    },
    {
      id: 'community-action',
      title: 'Community Action',
      description: 'Mobilizing your community for better health outcomes',
      duration: '18 min',
      points: 120,
      icon: Users,
      completed: false,
      lessons: [
        'Community Leadership',
        'Organizing Health Campaigns',
        'Working with Authorities',
        'Sustainable Practices'
      ]
    }
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What is the recommended minimum time for hand washing?",
      options: ["10 seconds", "20 seconds", "30 seconds", "1 minute"],
      correct: 1,
      explanation: "Hand washing should be done for at least 20 seconds with soap and clean water to effectively remove germs."
    },
    {
      id: 2,
      question: "Which of these is a common sign of water contamination?",
      options: ["Clear color", "No smell", "Unusual taste or odor", "Normal temperature"],
      correct: 2,
      explanation: "Unusual taste, odor, or color can indicate water contamination and should be investigated immediately."
    },
    {
      id: 3,
      question: "What should you do if you suspect a water-borne disease outbreak?",
      options: ["Wait and see", "Report to health authorities", "Ignore it", "Treat yourself"],
      correct: 1,
      explanation: "Immediate reporting to health authorities is crucial for early intervention and preventing spread."
    }
  ]

  const badges = [
    { id: 'water-safety', name: 'Water Safety Expert', icon: Droplets, color: 'blue' },
    { id: 'hygiene-expert', name: 'Hygiene Champion', icon: Heart, color: 'red' },
    { id: 'community-helper', name: 'Community Helper', icon: Users, color: 'green' },
    { id: 'quiz-master', name: 'Quiz Master', icon: Trophy, color: 'yellow' },
    { id: 'streak-keeper', name: '7-Day Streak', icon: Calendar, color: 'purple' }
  ]

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 2450, village: 'Rampur' },
    { rank: 2, name: 'Raj Kumar', points: 2380, village: 'Jharia' },
    { rank: 3, name: 'Sunita Devi', points: 2250, village: 'Kalahandi' },
    { rank: 4, name: 'You', points: 1250, village: 'Your Village' },
    { rank: 5, name: 'Amit Singh', points: 1180, village: 'Gaya' }
  ]

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const submitQuiz = () => {
    const correctAnswers = quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length
    const score = Math.round((correctAnswers / quizQuestions.length) * 100)
    
    if (score >= 70) {
      toast.success(`Great job! You scored ${score}%. Badge earned: Quiz Master!`)
      setUserProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + 50,
        badges: [...prev.badges, 'quiz-master']
      }))
    } else {
      toast.error(`You scored ${score}%. Try again to earn the Quiz Master badge!`)
    }
  }

  const startModule = (moduleId) => {
    toast.success("Module started! Complete all lessons to earn points and badges.")
  }

  const pledgeActions = [
    "I will wash my hands with soap for at least 20 seconds",
    "I will only drink clean, treated water",
    "I will keep my water storage containers clean",
    "I will report any water quality issues immediately",
    "I will educate my family about water safety",
    "I will participate in community health activities",
    "I will maintain proper hygiene practices daily"
  ]

  const [pledgeProgress, setPledgeProgress] = useState(3)

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
            <GraduationCap className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Education & Awareness
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn, practice, and earn rewards while protecting your community's health
          </p>
        </motion.div>

        {/* User Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{userProgress.totalPoints}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">Level {userProgress.level}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Current Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{userProgress.badges.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Badges Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">{userProgress.currentStreak}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="quiz">Interactive Quiz</TabsTrigger>
            <TabsTrigger value="pledge">7-Day Pledge</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Learning Modules */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="interactive-card h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${module.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                              <Icon className={`h-6 w-6 ${module.completed ? 'text-green-600' : 'text-blue-600'}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{module.title}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline">{module.duration}</Badge>
                                <Badge variant="outline">{module.points} pts</Badge>
                              </div>
                            </div>
                          </div>
                          {module.completed && (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {module.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          {module.lessons.map((lesson, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className={`h-4 w-4 ${module.completed ? 'text-green-600' : 'text-gray-400'}`} />
                              <span className="text-sm">{lesson}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className="w-full" 
                          variant={module.completed ? "outline" : "default"}
                          onClick={() => startModule(module.id)}
                        >
                          {module.completed ? (
                            <>
                              <Award className="h-4 w-4 mr-2" />
                              Review Module
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Learning
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* Interactive Quiz */}
          <TabsContent value="quiz" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>Water Safety Knowledge Quiz</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quizQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="font-medium text-lg">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant={quizAnswers[question.id] === optionIndex ? "default" : "outline"}
                            className="justify-start h-auto p-4 text-left"
                            onClick={() => handleQuizAnswer(question.id, optionIndex)}
                          >
                            <span className="mr-2 font-bold">{String.fromCharCode(65 + optionIndex)}.</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                      {quizAnswers[question.id] !== undefined && (
                        <div className={`p-3 rounded-lg ${quizAnswers[question.id] === question.correct ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                          <p className={`text-sm ${quizAnswers[question.id] === question.correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                            {quizAnswers[question.id] === question.correct ? '✓ Correct!' : '✗ Incorrect.'} {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button onClick={submitQuiz} className="w-full" disabled={Object.keys(quizAnswers).length < quizQuestions.length}>
                    <Trophy className="h-4 w-4 mr-2" />
                    Submit Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* 7-Day Pledge */}
          <TabsContent value="pledge" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span>7-Day Clean Water Pledge</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress: Day {pledgeProgress} of 7</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round((pledgeProgress / 7) * 100)}% Complete</span>
                    </div>
                    <Progress value={(pledgeProgress / 7) * 100} className="h-3" />
                  </div>
                  
                  <div className="space-y-3">
                    {pledgeActions.map((action, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${index < pledgeProgress ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index < pledgeProgress ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                          {index < pledgeProgress ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <span className="text-xs text-white font-bold">{index + 1}</span>
                          )}
                        </div>
                        <span className={`${index < pledgeProgress ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-300'}`}>
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {pledgeProgress < 7 && (
                    <Button 
                      className="w-full mt-6" 
                      onClick={() => {
                        setPledgeProgress(prev => Math.min(prev + 1, 7))
                        toast.success("Great job! Keep up the good work!")
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Today's Action Complete
                    </Button>
                  )}
                  
                  {pledgeProgress === 7 && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                        Congratulations! 🎉
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        You've completed the 7-Day Clean Water Pledge! Badge earned: Streak Keeper
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Community */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span>Community Leaderboard</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboard.map((user) => (
                        <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${user.name === 'You' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${user.rank <= 3 ? 'bg-yellow-500' : 'bg-gray-500'}`}>
                              {user.rank <= 3 ? <Trophy className="h-4 w-4" /> : user.rank}
                            </div>
                            <div>
                              <div className={`font-medium ${user.name === 'You' ? 'text-blue-600' : ''}`}>
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {user.village}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{user.points}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-purple-500" />
                      <span>Your Badges</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {badges.map((badge) => {
                        const Icon = badge.icon
                        const earned = userProgress.badges.includes(badge.id)
                        return (
                          <div key={badge.id} className={`p-4 rounded-lg text-center border ${earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                            <Icon className={`h-8 w-8 mx-auto mb-2 ${earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                            <h3 className={`font-medium text-sm ${earned ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500'}`}>
                              {badge.name}
                            </h3>
                            {earned && (
                              <Star className="h-4 w-4 text-yellow-500 mx-auto mt-1" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Community Leaderboard */}
          <TabsContent value="community" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CommunityLeaderboard />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Education

