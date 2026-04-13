import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home, Calculator, Percent, Circle, Layers, Scale, Thermometer, Award } from 'lucide-react'
import HomePage from './pages/HomePage'
import FractionMultiplyGame from './pages/FractionMultiplyGame'
import FractionDivideGame from './pages/FractionDivideGame'
import PercentShopGame from './pages/PercentShopGame'
import CircleLabGame from './pages/CircleLabGame'
import CylinderGame from './pages/CylinderGame'
import RatioGame from './pages/RatioGame'
import NegativeNumberGame from './pages/NegativeNumberGame'

function App() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/fraction-multiply', label: '分数乘法', icon: Calculator },
    { path: '/fraction-divide', label: '分数除法', icon: Scale },
    { path: '/percent-shop', label: '百分数商店', icon: Percent },
    { path: '/circle-lab', label: '圆实验室', icon: Circle },
    { path: '/cylinder', label: '圆柱圆锥', icon: Layers },
    { path: '/ratio', label: '比例', icon: Scale },
    { path: '/negative', label: '负数冒险', icon: Thermometer },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                数学乐园
              </span>
            </Link>

            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="xl:hidden">
              <Link
                to="/"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
              >
                全部游戏
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="animate-fade-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fraction-multiply" element={<FractionMultiplyGame />} />
          <Route path="/fraction-divide" element={<FractionDivideGame />} />
          <Route path="/percent-shop" element={<PercentShopGame />} />
          <Route path="/circle-lab" element={<CircleLabGame />} />
          <Route path="/cylinder" element={<CylinderGame />} />
          <Route path="/ratio" element={<RatioGame />} />
          <Route path="/negative" element={<NegativeNumberGame />} />
        </Routes>
      </main>

      <footer className="mt-20 bg-white/60 backdrop-blur border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500">
            <p className="font-medium">人教版六年级数学游戏化学习</p>
            <p className="text-xs mt-1">在快乐中掌握知识 🎮</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
