import { Link } from 'react-router-dom'
import { Calculator, Scale, Percent, Circle, Layers, Thermometer, Zap, Trophy, Star, Award } from 'lucide-react'

export default function HomePage() {
  const games = [
    {
      title: ' 分数乘法挑战',
      chapter: '六年级上册 第一单元',
      description: '通过切蛋糕、分披萨来学习分数乘法，从直观到抽象，轻松掌握！',
      icon: Calculator,
      path: '/fraction-multiply',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      tagColor: 'bg-blue-100 text-blue-700',
      difficulty: '★★☆',
    },
    {
      title: '🍕 分数除法冒险',
      chapter: '六年级上册 第三单元',
      description: '披萨分一分，除法变乘法！翻转除数，快乐计算。',
      icon: Scale,
      path: '/fraction-divide',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      tagColor: 'bg-cyan-100 text-cyan-700',
      difficulty: '★★★',
    },
    {
      title: '🛒 百分数商店',
      chapter: '六年级上册 第六单元',
      description: '开一家商店，计算打折、税率、利率，做个精明的数学小商人！',
      icon: Percent,
      path: '/percent-shop',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      tagColor: 'bg-green-100 text-green-700',
      difficulty: '★★☆',
    },
    {
      title: '📐 圆实验室',
      chapter: '六年级上册 第五单元',
      description: '探索圆的奥秘！计算周长和面积，玩转π的魔法。',
      icon: Circle,
      path: '/circle-lab',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      tagColor: 'bg-orange-100 text-orange-700',
      difficulty: '★★☆',
    },
    {
      title: '🏗️ 圆柱与圆锥工坊',
      chapter: '六年级下册 第三单元',
      description: '搭建圆柱和圆锥，计算表面积和体积，感受立体图形的魅力。',
      icon: Layers,
      path: '/cylinder',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      tagColor: 'bg-purple-100 text-purple-700',
      difficulty: '★★★',
    },
    {
      title: '⚖️ 比例大冒险',
      chapter: '六年级下册 第四单元',
      description: '调配魔法药水，掌握正比例和反比例，解开比例的秘密。',
      icon: Scale,
      path: '/ratio',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      tagColor: 'bg-pink-100 text-pink-700',
      difficulty: '★★★',
    },
    {
      title: '🌡️ 负数冒险记',
      chapter: '六年级下册 第一单元',
      description: '探索零下温度、海底深度，理解正负数的世界。',
      icon: Thermometer,
      path: '/negative',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      tagColor: 'bg-red-100 text-red-700',
      difficulty: '★★☆',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-xl animate-bounce-in">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            六年级数学乐园
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          基于人教版六年级数学教材，将知识点变成有趣的游戏！
        </p>
        <p className="text-base text-gray-500 max-w-xl mx-auto">
          上册：分数乘除法 · 圆 · 百分数 ｜ 下册：负数 · 圆柱圆锥 · 比例
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => {
          const Icon = game.icon
          return (
            <Link
              key={index}
              to={game.path}
              className={`${game.bgColor} rounded-2xl p-6 card-hover border-2 ${game.borderColor} hover:border-indigo-300`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${game.tagColor}`}>
                  难度 {game.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{game.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{game.chapter}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{game.description}</p>
            </Link>
          )
        })}
      </div>

      {/* Stats */}
      <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">7</p>
            <p className="text-sm text-gray-600">个互动游戏</p>
          </div>
          <div>
            <Calculator className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">6</p>
            <p className="text-sm text-gray-600">个知识单元</p>
          </div>
          <div>
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">∞</p>
            <p className="text-sm text-gray-600">道随机题目</p>
          </div>
          <div>
            <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">100%</p>
            <p className="text-sm text-gray-600">免费学习</p>
          </div>
        </div>
      </div>
    </div>
  )
}
