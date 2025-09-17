import { Link } from 'react-router-dom'
import { Droplets, Heart, Shield, Users, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AarogyaJal</h3>
                <p className="text-sm text-slate-300">Smart Health & Water Safety</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              Protecting Communities, One Drop at a Time. Advanced AI-powered health monitoring and water safety platform for rural and tribal communities.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Community Health</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Water Safety</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/health-reporting" className="text-slate-300 hover:text-white transition-colors">
                  Health Reporting
                </Link>
              </li>
              <li>
                <Link to="/water-quality" className="text-slate-300 hover:text-white transition-colors">
                  Water Quality
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-slate-300 hover:text-white transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-slate-300 hover:text-white transition-colors">
                  Alerts
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Features</h4>
            <ul className="space-y-2 text-slate-300">
              <li>• AI Outbreak Detection</li>
              <li>• Real-time Water Monitoring</li>
              <li>• Multi-channel Alerts</li>
              <li>• Voice-to-Text Reporting</li>
              <li>• Multilingual Support</li>
              <li>• Offline-first Design</li>
              <li>• Community Leaderboard</li>
              <li>• Blockchain Security</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="h-4 w-4" />
                <span>support@aarogyajal.org</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="h-4 w-4" />
                <span>+91 1800-HEALTH</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="h-4 w-4" />
                <span>Rural Health Initiative, India</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Users className="h-4 w-4" />
                <span>24/7 Community Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-300 text-sm">
              © 2024 AarogyaJal. All rights reserved. Empowering communities through technology.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300 text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-slate-300 text-sm">by</span>
              <span className="text-white font-semibold">Send Nodes</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

