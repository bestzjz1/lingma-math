import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Cake, Trophy, Star, RefreshCw } from 'lucide-react'
import { useState } from 'react'

interface Question {
  id: number
  type: 'visual' | 'formula' | 'word'
  question: string
  visual?: string
  answer: string
  hint: string
  explanation: string
}

export default function FractionMultiplyGame() {
  const [gamePhase, setGamePhase] = useState<'intro' | 'play' | 'result'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const generateQuestions = (): Question[] => {
    const qs: Question[] = []
    
    // Generate 15 questions with more variety
    for (let i = 0; i < 15; i++) {
      const type = i < 4 ? 'visual' : (i < 9 ? 'word' : 'formula')
      
      if (type === 'visual') {
        const n1 = Math.floor(Math.random() * 4) + 1
        const d1 = Math.floor(Math.random() * 4) + 2
        const n2 = Math.floor(Math.random() * 4) + 1
        const d2 = Math.floor(Math.random() * 4) + 2
        const resultNum = n1 * n2
        const resultDen = d1 * d2
        const gcd = gcdFn(resultNum, resultDen)
        const sNum = resultNum / gcd
        const sDen = resultDen / gcd
        
        const foods = ['🍰', '🍕', '🍫', '🍩', '🧁']
        const food = foods[i % foods.length]
        
        qs.push({
          id: i,
          type: 'visual',
          question: `${food} 分数乘法：${n1}/${d1} × ${n2}/${d2} = ?`,
          visual: `把一块蛋糕先平均分成${d1}份，取其中${n1}份；再把这${n1}份平均分成${d2}份，取其中${n2}份`,
          answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
          hint: `分数乘法：分子×分子 / 分母×分母 → ${n1}×${n2} / ${d1}×${d2}`,
          explanation: `${n1}/${d1} × ${n2}/${d2} = ${n1}×${n2} / ${d1}×${d2} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen}`,
        })
      } else if (type === 'word') {
        const scenarios = [
          () => {
            const total = Math.floor(Math.random() * 5) + 3
            const n = Math.floor(Math.random() * 3) + 1
            const d = Math.floor(Math.random() * 4) + 2
            const resultNum = n * total
            const resultDen = d
            const gcd = gcdFn(resultNum, resultDen)
            const sNum = resultNum / gcd
            const sDen = resultDen / gcd
            return {
              id: i,
              type: 'word' as const,
              question: `小明有${total}个苹果，吃了其中的${n}/${d}。小明吃了多少个苹果？`,
              answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
              hint: `${total} × ${n}/${d} = ${resultNum}/${resultDen}`,
              explanation: `${total} × ${n}/${d} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen} 个`,
            }
          },
          () => {
            const length = Math.floor(Math.random() * 8) + 4
            const n = Math.floor(Math.random() * 3) + 1
            const d = Math.floor(Math.random() * 4) + 2
            const resultNum = n * length
            const resultDen = d
            const gcd = gcdFn(resultNum, resultDen)
            const sNum = resultNum / gcd
            const sDen = resultDen / gcd
            return {
              id: i,
              type: 'word' as const,
              question: `一条绳子长${length}米，用去了${n}/${d}，用去了多少米？`,
              answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
              hint: `${length} × ${n}/${d}`,
              explanation: `${length} × ${n}/${d} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen} 米`,
            }
          },
          () => {
            const area = Math.floor(Math.random() * 6) + 3
            const n1 = Math.floor(Math.random() * 2) + 1
            const d1 = Math.floor(Math.random() * 3) + 2
            const n2 = Math.floor(Math.random() * 2) + 1
            const d2 = Math.floor(Math.random() * 3) + 2
            const resultNum = n1 * n2 * area
            const resultDen = d1 * d2
            const gcd = gcdFn(resultNum, resultDen)
            const sNum = resultNum / gcd
            const sDen = resultDen / gcd
            return {
              id: i,
              type: 'word' as const,
              question: `一块地的面积是${area}公顷，种了${n1}/${d1}的玉米，玉米地中${n2}/${d2}种了甜玉米。甜玉米地面积是多少公顷？`,
              answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
              hint: `${area} × ${n1}/${d1} × ${n2}/${d2}`,
              explanation: `${area} × ${n1}/${d1} × ${n2}/${d2} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen} 公顷`,
            }
          },
          () => {
            const price = Math.floor(Math.random() * 80) + 20
            const n = Math.floor(Math.random() * 3) + 1
            const d = Math.floor(Math.random() * 4) + 2
            const resultNum = n * price
            const resultDen = d
            const gcd = gcdFn(resultNum, resultDen)
            const sNum = resultNum / gcd
            const sDen = resultDen / gcd
            return {
              id: i,
              type: 'word' as const,
              question: `一本书原价${price}元，现在售价是原价的${n}/${d}，现价是多少元？`,
              answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
              hint: `${price} × ${n}/${d}`,
              explanation: `${price} × ${n}/${d} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen} 元`,
            }
          },
          () => {
            const students = Math.floor(Math.random() * 40) + 20
            const n = Math.floor(Math.random() * 3) + 1
            const d = Math.floor(Math.random() * 4) + 2
            const resultNum = n * students
            const resultDen = d
            const gcd = gcdFn(resultNum, resultDen)
            const sNum = resultNum / gcd
            const sDen = resultDen / gcd
            return {
              id: i,
              type: 'word' as const,
              question: `六年级一班有${students}名学生，其中${n}/${d}是男生。男生有多少人？`,
              answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
              hint: `${students} × ${n}/${d}`,
              explanation: `${students} × ${n}/${d} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen} 人`,
            }
          },
        ]
        qs.push(scenarios[i % scenarios.length]())
      } else {
        const n1 = Math.floor(Math.random() * 5) + 1
        const d1 = Math.floor(Math.random() * 5) + 2
        const n2 = Math.floor(Math.random() * 5) + 1
        const d2 = Math.floor(Math.random() * 5) + 2
        const resultNum = n1 * n2
        const resultDen = d1 * d2
        const gcd = gcdFn(resultNum, resultDen)
        const sNum = resultNum / gcd
        const sDen = resultDen / gcd
        
        qs.push({
          id: i,
          type: 'formula',
          question: `计算：${n1}/${d1} × ${n2}/${d2} = ?（填最简分数）`,
          answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
          hint: `分数乘法：分子×分子 / 分母×分母`,
          explanation: `${n1}/${d1} × ${n2}/${d2} = ${n1}×${n2} / ${d1}×${d2} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen}`,
        })
      }
    }
    
    return qs
  }

  const gcdFn = (a: number, b: number): number => {
    return b === 0 ? a : gcdFn(b, a % b)
  }

  const normalizeAnswer = (ans: string | number): string => {
    return ans.toString().replace(/\s+/g, '').toLowerCase()
  }

  const startGame = () => {
    setQuestions(generateQuestions())
    setCurrentQ(0)
    setScore(0)
    setTotal(0)
    setStreak(0)
    setBestStreak(0)
    setUserAnswer('')
    setShowResult(false)
    setGamePhase('play')
  }

  const checkAnswer = () => {
    if (!questions[currentQ] || !userAnswer) return
    
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(questions[currentQ].answer)
    setIsCorrect(correct)
    setShowResult(true)
    setTotal(total + 1)
    
    if (correct) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setBestStreak(Math.max(newStreak, bestStreak))
      setScore(score + 1)
      if (newStreak > 0 && newStreak % 3 === 0) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 2000)
      }
    } else {
      setStreak(0)
    }
  }

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setGamePhase('result')
    } else {
      setCurrentQ(currentQ + 1)
      setUserAnswer('')
      setShowResult(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) nextQuestion()
      else checkAnswer()
    }
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  if (gamePhase === 'intro') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" /><span>返回首页</span>
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Cake className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🧁 分数乘法挑战</h1>
            <p className="text-gray-600">六年级上册 · 第一单元 · 分数乘法</p>
          </div>

          {/* Knowledge Card */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
            <h3 className="font-bold text-blue-800 text-lg mb-3">📖 知识回顾</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>分数乘法规则：</strong></p>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-blue-600">
                  <span className="inline-block align-middle text-center">
                    <span className="block">a</span>
                    <span className="block border-t-2 border-blue-600 my-1"></span>
                    <span className="block">b</span>
                  </span>
                  <span className="mx-2">×</span>
                  <span className="inline-block align-middle text-center">
                    <span className="block">c</span>
                    <span className="block border-t-2 border-blue-600 my-1"></span>
                    <span className="block">d</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block align-middle text-center">
                    <span className="block">a × c</span>
                    <span className="block border-t-2 border-blue-600 my-1"></span>
                    <span className="block">b × d</span>
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">分子×分子 / 分母×分母</p>
              </div>
              <p><strong>💡 小提示：</strong>计算结果要化为最简分数哦！</p>
            </div>
          </div>

          {/* Game Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">🎮 游戏规则</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>🍰 共 15 道题，分三个难度递增</li>
              <li>🎯 前三题有图形提示，帮助你理解</li>
              <li>⚡ 连续答对3题有惊喜动画！</li>
              <li>📝 输入分数格式如：2/3 或 1</li>
            </ul>
          </div>

          <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
            🚀 开始挑战
          </button>
        </div>
      </div>
    )
  }

  if (gamePhase === 'result') {
    const grade = accuracy >= 90 ? '🏆 太棒了！你是分数大师！' : accuracy >= 70 ? '⭐ 做得不错！继续加油！' : '💪 再练练，你可以更好的！'
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-4 shadow-xl animate-bounce-in">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">挑战完成！</h2>
            <p className="text-xl text-gray-600">{grade}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div><p className="text-3xl font-bold text-green-600">{score}</p><p className="text-sm text-gray-600">答对</p></div>
              <div><p className="text-3xl font-bold text-blue-600">{total}</p><p className="text-sm text-gray-600">总题</p></div>
              <div><p className="text-3xl font-bold text-yellow-600">{accuracy}%</p><p className="text-sm text-gray-600">正确率</p></div>
              <div><p className="text-3xl font-bold text-purple-600">{bestStreak}</p><p className="text-sm text-gray-600">最长连对</p></div>
            </div>
          </div>

          <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5" /><span>再来一次</span>
          </button>
          <Link to="/" className="block w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  // Play phase
  const q = questions[currentQ]
  if (!q) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Score Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-green-500" /><span className="font-bold text-green-600">{score}</span></span>
            <span className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-500" /><span className="font-bold text-yellow-600">{accuracy}%</span></span>
            <span className="flex items-center space-x-1">🔥<span className="font-bold text-red-500">{streak}</span></span>
          </div>
          <span className="text-sm text-gray-500">{currentQ + 1} / {questions.length}</span>
        </div>

        {/* Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-3xl shadow-2xl animate-bounce-in">
              <div className="text-center">
                <p className="text-2xl font-bold">🎉 连续答对 {streak} 题！</p>
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
          <div className="mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              q.type === 'visual' ? 'bg-blue-100 text-blue-700' : q.type === 'word' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {q.type === 'visual' ? '🍰 图形题' : q.type === 'word' ? '📝 应用题' : '✏️ 计算题'}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 py-6">{q.question}</h2>
          
          {q.visual && (
            <div className="bg-blue-50 rounded-xl p-4 mb-4 text-center text-gray-600 text-sm border border-blue-200">
              💡 {q.visual}
            </div>
          )}

          {!showResult ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg text-sm text-yellow-700">
                💡 {q.hint}
              </div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入答案（分数如 2/3）..."
                className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                autoFocus
              />
              <button onClick={checkAnswer} disabled={!userAnswer}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                提交答案
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-6 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <div className="flex items-center justify-center space-x-3 mb-3">
                  {isCorrect ? (
                    <><CheckCircle className="w-8 h-8 text-green-600" /><span className="text-2xl font-bold text-green-700">回答正确！🎉</span></>
                  ) : (
                    <><XCircle className="w-8 h-8 text-red-600" /><span className="text-2xl font-bold text-red-700">回答错误</span></>
                  )}
                </div>
                {!isCorrect && (
                  <div className="text-center">
                    <p className="text-gray-700 mb-1">正确答案：<span className="font-bold text-green-600 text-xl">{q.answer}</span></p>
                    <p className="text-sm text-gray-500 mt-2">📖 {q.explanation}</p>
                  </div>
                )}
              </div>
              <button onClick={nextQuestion}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300">
                {currentQ + 1 >= questions.length ? '查看结果' : '下一题 →'}
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
            style={{ width: `${((currentQ + (showResult ? 1 : 0)) / questions.length) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )
}
