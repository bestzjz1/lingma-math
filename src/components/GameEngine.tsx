import { ArrowLeft, CheckCircle, XCircle, Trophy, Star, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export interface GameQuestion {
  id: number
  question: string
  answer: string
  hint?: string
  explanation?: string
  badge?: string
  badgeColor?: string
}

interface GameEngineProps {
  title: string
  emoji: string
  subtitle: string
  knowledgeCard: React.ReactNode
  rules: string[]
  generateQuestions: () => GameQuestion[]
  color: string
  gradientFrom: string
  gradientTo: string
}

export default function GameEngine({
  title, emoji, subtitle, knowledgeCard, rules,
  generateQuestions, gradientFrom, gradientTo
}: GameEngineProps) {
  const [phase, setPhase] = useState<'intro' | 'play' | 'result'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [questions, setQuestions] = useState<GameQuestion[]>([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [celebration, setCelebration] = useState(false)

  const normalizeAnswer = (ans: string | number): string => {
    return ans.toString().replace(/\s+/g, '')
      .replace(/[\uff00-\uffef]/g, (c) => {
        const code = c.charCodeAt(0)
        if (code >= 0xFF01 && code <= 0xFF5E) return String.fromCharCode(code - 0xFEE0)
        if (code === 0xFF0F) return '/'
        return c
      })
      .toLowerCase()
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
    setPhase('play')
  }

  const checkAnswer = () => {
    if (!questions[currentQ] || !userAnswer) return
    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(questions[currentQ].answer)
    setCorrect(isCorrect)
    setShowResult(true)
    setTotal(total + 1)
    if (isCorrect) {
      const ns = streak + 1
      setStreak(ns)
      setBestStreak(Math.max(ns, bestStreak))
      setScore(score + 1)
      if (ns > 0 && ns % 3 === 0) {
        setCelebration(true)
        setTimeout(() => setCelebration(false), 2000)
      }
    } else {
      setStreak(0)
    }
  }

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) setPhase('result')
    else { setCurrentQ(currentQ + 1); setUserAnswer(''); setShowResult(false) }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') showResult ? nextQuestion() : checkAnswer()
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  if (phase === 'intro') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" /><span>返回首页</span>
          </Link>
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{emoji}</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">{knowledgeCard}</div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">🎮 游戏规则</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              {rules.map((r, i) => <li key={i}>• {r}</li>)}
            </ul>
          </div>
          <button onClick={startGame} className={`w-full py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
            🚀 开始挑战
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const grade = accuracy >= 90 ? '🏆 太棒了！你是数学大师！' : accuracy >= 70 ? '⭐ 做得不错！继续加油！' : '💪 再练练，你可以更好的！'
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
          <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5" /><span>再来一次</span>
          </button>
          <Link to="/" className="block w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center">返回首页</Link>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  if (!q) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-green-500" /><span className="font-bold text-green-600">{score}</span></span>
            <span className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-500" /><span className="font-bold text-yellow-600">{accuracy}%</span></span>
            <span className="flex items-center space-x-1">🔥<span className="font-bold text-red-500">{streak}</span></span>
          </div>
          <span className="text-sm text-gray-500">{currentQ + 1} / {questions.length}</span>
        </div>

        {celebration && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-3xl shadow-2xl animate-bounce-in">
              <p className="text-2xl font-bold">🎉 连续答对 {streak} 题！</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
          {q.badge && (
            <div className="mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${q.badgeColor || 'bg-blue-100 text-blue-700'}`}>{q.badge}</span>
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 py-6">{q.question}</h2>

          {!showResult ? (
            <div className="space-y-4">
              {q.hint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg text-sm text-yellow-700">💡 {q.hint}</div>
              )}
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={handleKey}
                placeholder="输入你的答案..." className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors" autoFocus />
              <button onClick={checkAnswer} disabled={!userAnswer}
                className={`w-full py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}>
                提交答案
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-6 rounded-xl border-2 ${correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <div className="flex items-center justify-center space-x-3 mb-3">
                  {correct ? (
                    <><CheckCircle className="w-8 h-8 text-green-600" /><span className="text-2xl font-bold text-green-700">回答正确！🎉</span></>
                  ) : (
                    <><XCircle className="w-8 h-8 text-red-600" /><span className="text-2xl font-bold text-red-700">回答错误</span></>
                  )}
                </div>
                {!correct && (
                  <div className="text-center">
                    <p className="text-gray-700 mb-1">正确答案：<span className="font-bold text-green-600 text-xl">{q.answer}</span></p>
                    {q.explanation && <p className="text-sm text-gray-500 mt-2">📖 {q.explanation}</p>}
                  </div>
                )}
              </div>
              <button onClick={nextQuestion} className={`w-full py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300`}>
                {currentQ + 1 >= questions.length ? '查看结果' : '下一题 →'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
            style={{ width: `${((currentQ + (showResult ? 1 : 0)) / questions.length) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )
}
