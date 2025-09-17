import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Languages,
  Sparkles,
  Heart,
  Droplets,
  AlertTriangle,
  CheckCircle,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react'
import { toast } from 'sonner'

const AIChatbot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'नमस्ते! मैं आरोग्यजल AI सहायक हूं। मैं आपकी स्वास्थ्य और पानी की सुरक्षा संबंधी समस्याओं में मदद कर सकता हूं। आप मुझसे हिंदी या अंग्रेजी में बात कर सकते हैं।',
      timestamp: new Date(),
      language: 'hi'
    },
    {
      id: 2,
      type: 'bot',
      content: 'Hello! I\'m AarogyaJal AI Assistant. I can help you with health and water safety questions. You can chat with me in Hindi or English.',
      timestamp: new Date(),
      language: 'en'
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isMinimized, setIsMinimized] = useState(false)
  
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Predefined responses for different types of queries
  const responses = {
    en: {
      greeting: [
        "Hello! How can I help you with your health and water safety concerns today?",
        "Hi there! I'm here to assist you with any questions about water quality or health issues.",
        "Welcome! Feel free to ask me anything about water safety, disease prevention, or health symptoms."
      ],
      waterQuality: [
        "For water quality concerns, I recommend testing your water source immediately. Boil water for at least 1 minute before drinking if you suspect contamination.",
        "Common signs of water contamination include unusual taste, odor, or color. If you notice any of these, avoid drinking the water and report it to local authorities.",
        "To ensure safe drinking water: 1) Boil for 1 minute, 2) Use water purification tablets, 3) Store in clean containers, 4) Test regularly."
      ],
      healthSymptoms: [
        "If you're experiencing diarrhea, vomiting, or stomach pain, it could be water-borne illness. Stay hydrated with clean water and seek medical attention if symptoms persist.",
        "Common water-borne disease symptoms include fever, nausea, and digestive issues. Please consult a healthcare provider for proper diagnosis and treatment.",
        "For immediate relief: drink clean fluids, rest, and avoid solid foods. If symptoms worsen or persist for more than 24 hours, seek medical help."
      ],
      prevention: [
        "Prevention tips: 1) Always drink boiled or purified water, 2) Wash hands frequently, 3) Eat freshly cooked food, 4) Avoid street food, 5) Keep surroundings clean.",
        "To prevent water-borne diseases: use proper sanitation, maintain clean water storage, practice good hygiene, and get regular health check-ups.",
        "Community prevention: ensure proper waste disposal, maintain clean water sources, educate others about hygiene, and report contamination immediately."
      ],
      emergency: [
        "This seems like an emergency situation. Please contact your local health authorities immediately or call emergency services. In the meantime, avoid the suspected water source.",
        "For urgent health concerns, please seek immediate medical attention. I can provide general guidance, but professional medical care is essential for serious symptoms.",
        "Emergency contacts: Local Health Department, Emergency Services (108), or visit the nearest healthcare facility immediately."
      ]
    },
    hi: {
      greeting: [
        "नमस्ते! आज मैं आपकी स्वास्थ्य और पानी की सुरक्षा संबंधी समस्याओं में कैसे मदद कर सकता हूं?",
        "आपका स्वागत है! मैं पानी की गुणवत्ता या स्वास्थ्य संबंधी किसी भी प्रश्न में आपकी सहायता के लिए यहां हूं।",
        "नमस्कार! पानी की सुरक्षा, बीमारी की रोकथाम, या स्वास्थ्य के लक्षणों के बारे में कुछ भी पूछने में संकोच न करें।"
      ],
      waterQuality: [
        "पानी की गुणवत्ता की समस्या के लिए, मैं तुरंत आपके पानी के स्रोत की जांच कराने की सलाह देता हूं। यदि संदूषण का संदेह है तो पीने से पहले पानी को कम से कम 1 मिनट तक उबालें।",
        "पानी के संदूषण के सामान्य संकेतों में असामान्य स्वाद, गंध या रंग शामिल हैं। यदि आप इनमें से कोई भी चीज़ देखते हैं, तो पानी पीने से बचें और स्थानीय अधिकारियों को रिपोर्ट करें।",
        "सुरक्षित पेयजल सुनिश्चित करने के लिए: 1) 1 मिनट तक उबालें, 2) पानी शुद्धीकरण गोलियों का उपयोग करें, 3) साफ कंटेनरों में स्टोर करें, 4) नियमित रूप से परीक्षण करें।"
      ],
      healthSymptoms: [
        "यदि आप दस्त, उल्टी या पेट दर्द का अनुभव कर रहे हैं, तो यह पानी से होने वाली बीमारी हो सकती है। साफ पानी से हाइड्रेटेड रहें और यदि लक्षण बने रहते हैं तो चिकित्सा सहायता लें।",
        "पानी से होने वाली बीमारी के सामान्य लक्षणों में बुखार, मतली और पाचन संबंधी समस्याएं शामिल हैं। कृपया उचित निदान और उपचार के लिए किसी स्वास्थ्य सेवा प्रदाता से सलाह लें।",
        "तत्काल राहत के लिए: साफ तरल पदार्थ पिएं, आराम करें, और ठोस भोजन से बचें। यदि लक्षण बिगड़ते हैं या 24 घंटे से अधिक समय तक बने रहते हैं, तो चिकित्सा सहायता लें।"
      ],
      prevention: [
        "रोकथाम के उपाय: 1) हमेशा उबला या शुद्ध पानी पिएं, 2) बार-बार हाथ धोएं, 3) ताज़ा पका हुआ भोजन खाएं, 4) स्ट्रीट फूड से बचें, 5) आसपास की सफाई रखें।",
        "पानी से होने वाली बीमारियों को रोकने के लिए: उचित स्वच्छता का उपयोग करें, साफ पानी का भंडारण बनाए रखें, अच्छी स्वच्छता का अभ्यास करें, और नियमित स्वास्थ्य जांच कराएं।",
        "सामुदायिक रोकथाम: उचित अपशिष्ट निपटान सुनिश्चित करें, साफ पानी के स्रोतों को बनाए रखें, दूसरों को स्वच्छता के बारे में शिक्षित करें, और तुरंत संदूषण की रिपोर्ट करें।"
      ],
      emergency: [
        "यह एक आपातकालीन स्थिति लगती है। कृपया तुरंत अपने स्थानीय स्वास्थ्य अधिकारियों से संपर्क करें या आपातकालीन सेवाओं को कॉल करें। इस बीच, संदिग्ध पानी के स्रोत से बचें।",
        "तत्काल स्वास्थ्य चिंताओं के लिए, कृपया तुरंत चिकित्सा सहायता लें। मैं सामान्य मार्गदर्शन प्रदान कर सकता हूं, लेकिन गंभीर लक्षणों के लिए पेशेवर चिकित्सा देखभाल आवश्यक है।",
        "आपातकालीन संपर्क: स्थानीय स्वास्थ्य विभाग, आपातकालीन सेवाएं (108), या तुरंत निकटतम स्वास्थ्य सुविधा पर जाएं।"
      ]
    }
  }

  const detectQueryType = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || 
        lowerMessage.includes('आपातकाल') || lowerMessage.includes('तुरंत')) {
      return 'emergency'
    }
    
    if (lowerMessage.includes('water') || lowerMessage.includes('contamination') || 
        lowerMessage.includes('पानी') || lowerMessage.includes('संदूषण')) {
      return 'waterQuality'
    }
    
    if (lowerMessage.includes('symptom') || lowerMessage.includes('sick') || 
        lowerMessage.includes('diarrhea') || lowerMessage.includes('fever') ||
        lowerMessage.includes('लक्षण') || lowerMessage.includes('बीमार') || 
        lowerMessage.includes('दस्त') || lowerMessage.includes('बुखार')) {
      return 'healthSymptoms'
    }
    
    if (lowerMessage.includes('prevent') || lowerMessage.includes('avoid') || 
        lowerMessage.includes('रोकथाम') || lowerMessage.includes('बचाव')) {
      return 'prevention'
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
        lowerMessage.includes('नमस्ते') || lowerMessage.includes('हैलो')) {
      return 'greeting'
    }
    
    return 'greeting'
  }

  const detectLanguage = (message) => {
    // Simple language detection based on character patterns
    const hindiPattern = /[\u0900-\u097F]/
    return hindiPattern.test(message) ? 'hi' : 'en'
  }

  const generateResponse = (userMessage) => {
    const queryType = detectQueryType(userMessage)
    const detectedLang = detectLanguage(userMessage)
    const responseArray = responses[detectedLang][queryType]
    const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)]
    
    return {
      content: randomResponse,
      language: detectedLang,
      confidence: Math.random() * 0.3 + 0.7 // Simulate 70-100% confidence
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language: detectLanguage(inputMessage)
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateResponse(inputMessage)
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        language: response.language,
        confidence: response.confidence
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    if (!isListening) {
      toast.success("Voice input activated! Speak now...")
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("मेरे पेट में दर्द हो रहा है और दस्त भी लग रहे हैं")
        toast.success("Voice input captured!")
      }, 3000)
    }
  }

  const handleTextToSpeech = (message) => {
    setIsSpeaking(!isSpeaking)
    if (!isSpeaking) {
      toast.success("Playing audio response...")
      setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)
    }
  }

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'hi' : 'en')
    toast.success(`Language switched to ${currentLanguage === 'en' ? 'Hindi' : 'English'}`)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={onToggle}
          className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className={`w-96 ${isMinimized ? 'h-16' : 'h-[600px]'} shadow-2xl border-2 border-blue-200`}>
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="h-6 w-6" />
              </motion.div>
              <div>
                <CardTitle className="text-lg">AarogyaJal AI</CardTitle>
                <p className="text-sm text-blue-100">Health Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:bg-blue-600"
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-600"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-blue-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-lg rounded-tl-lg border'
                    } p-3 shadow-sm`}>
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <div className="flex-shrink-0">
                            <Sparkles className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.type === 'bot' && (
                              <div className="flex items-center space-x-1">
                                {message.confidence && (
                                  <Badge variant="outline" className="text-xs">
                                    {Math.round(message.confidence * 100)}% confident
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTextToSpeech(message.content)}
                                  className="h-6 w-6 p-0"
                                >
                                  {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-r-lg rounded-tl-lg border p-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={currentLanguage === 'en' ? "Ask about health or water safety..." : "स्वास्थ्य या पानी की सुरक्षा के बारे में पूछें..."}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
                      isListening ? 'text-red-600' : 'text-gray-400'
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { text: currentLanguage === 'en' ? "Water Quality" : "पानी की गुणवत्ता", icon: Droplets },
                  { text: currentLanguage === 'en' ? "Health Symptoms" : "स्वास्थ्य लक्षण", icon: Heart },
                  { text: currentLanguage === 'en' ? "Emergency" : "आपातकाल", icon: AlertTriangle },
                  { text: currentLanguage === 'en' ? "Prevention" : "रोकथाम", icon: CheckCircle }
                ].map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage(action.text)}
                        className="text-xs"
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {action.text}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

export default AIChatbot

