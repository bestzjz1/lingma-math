import GameEngine, { GameQuestion } from '@/components/GameEngine'

function gcdFn(a: number, b: number): number { return b === 0 ? a : gcdFn(b, a % b) }

function generateQuestions(): GameQuestion[] {
  const qs: GameQuestion[] = []
  for (let i = 0; i < 150; i++) {
    const type = i < 40 ? 'ratio-simplify' : (i < 90 ? 'ratio-solve' : 'proportion')

    if (type === 'ratio-simplify') {
      const common = Math.floor(Math.random() * 5) + 2
      const a = (Math.floor(Math.random() * 8) + 1) * common
      const b = (Math.floor(Math.random() * 8) + 1) * common
      const gcd = gcdFn(a, b)
      const sa = a / gcd
      const sb = b / gcd
      qs.push({
        id: i,
        badge: '✏️ 化简比',
        badgeColor: 'bg-pink-100 text-pink-700',
        question: `化简比：${a}:${b} = ?（填最简比，如 3:4）`,
        hint: `同时除以最大公因数：${a}和${b}的最大公因数是${gcd}`,
        answer: `${sa}:${sb}`,
        explanation: `${a}:${b} = ${a}÷${gcd}:${b}÷${gcd} = ${sa}:${sb}`,
      })
    } else if (type === 'ratio-solve') {
      const scenarios = [
        () => {
          const ratioA = Math.floor(Math.random() * 4) + 2
          const ratioB = Math.floor(Math.random() * 4) + 2
          const total = (ratioA + ratioB) * (Math.floor(Math.random() * 5) + 3)
          const shareA = ratioA * total / (ratioA + ratioB)
          return {
            id: i,
            badge: '📝 按比例分配',
            badgeColor: 'bg-green-100 text-green-700',
            question: `把${total}个苹果按${ratioA}:${ratioB}分给甲乙两人，甲分到多少个？`,
            hint: `总份数 = ${ratioA} + ${ratioB} = ${ratioA + ratioB}，每份 = ${total} ÷ ${ratioA + ratioB} = ${total / (ratioA + ratioB)}`,
            answer: shareA.toString(),
            explanation: `总份数 = ${ratioA + ratioB}，每份 = ${total} ÷ ${ratioA + ratioB} = ${total / (ratioA + ratioB)}，甲 = ${total / (ratioA + ratioB)} × ${ratioA} = ${shareA} 个`,
          }
        },
        () => {
          const a = Math.floor(Math.random() * 8) + 2
          const b = Math.floor(Math.random() * 8) + 2
          const k = Math.floor(Math.random() * 10) + 2
          const targetA = a * k
          const targetB = b * k
          return {
            id: i,
            badge: '📝 求未知项',
            badgeColor: 'bg-blue-100 text-blue-700',
            question: `已知 a:b = ${a}:${b}，且 a = ${targetA}，求 b = ?`,
            hint: `a:b = ${a}:${b} → ${targetA}:b = ${a}:${b} → b = ${targetA} × ${b} ÷ ${a}`,
            answer: targetB.toString(),
            explanation: `因为 a:b = ${a}:${b}，所以 ${targetA}:b = ${a}:${b}，b = ${targetA} × ${b} ÷ ${a} = ${targetB}`,
          }
        },
        () => {
          const a = Math.floor(Math.random() * 5) + 2
          const b = Math.floor(Math.random() * 5) + 2
          const diff = Math.abs(a - b) * (Math.floor(Math.random() * 5) + 3)
          const k = diff / Math.abs(a - b)
          const valA = a * k
          const valB = b * k
          const smaller = Math.min(valA, valB)
          return {
            id: i,
            badge: '📝 差比问题',
            badgeColor: 'bg-orange-100 text-orange-700',
            question: `甲乙两数的比是${Math.max(a,b)}:${Math.min(a,b)}，甲比乙多${diff}，求较小的数是多少？`,
            hint: `份数差 = ${Math.max(a,b)} - ${Math.min(a,b)} = ${Math.max(a,b) - Math.min(a,b)}，每份 = ${diff} ÷ ${Math.max(a,b) - Math.min(a,b)}`,
            answer: smaller.toString(),
            explanation: `每份 = ${diff} ÷ ${Math.max(a,b) - Math.min(a,b)} = ${k}，较小数 = ${Math.min(a,b)} × ${k} = ${smaller}`,
          }
        },
      ]
      qs.push(scenarios[i % scenarios.length]())
    } else {
      const scenarios = [
        () => {
          const a = Math.floor(Math.random() * 8) + 2
          const b = Math.floor(Math.random() * 8) + 2
          const k = Math.floor(Math.random() * 5) + 2
          return {
            id: i,
            badge: '⚖️ 正比例',
            badgeColor: 'bg-indigo-100 text-indigo-700',
            question: `一辆汽车${a}小时行驶${a * k * 10}千米，照这样的速度，${b}小时行驶多少千米？（正比例）`,
            hint: `速度不变，路程与时间成正比例 → 速度 = ${a * k * 10} ÷ ${a} = ${k * 10} 千米/时`,
            answer: (b * k * 10).toString(),
            explanation: `速度 = ${a * k * 10} ÷ ${a} = ${k * 10} 千米/时，${b}小时行驶 = ${k * 10} × ${b} = ${b * k * 10} 千米`,
          }
        },
        () => {
          const a = Math.floor(Math.random() * 6) + 3
          const b = Math.floor(Math.random() * 4) + 2
          const totalWork = a * b * 2
          return {
            id: i,
            badge: '⚖️ 反比例',
            badgeColor: 'bg-red-100 text-red-700',
            question: `一批货物，${a}人搬运需要${b}天。如果${a + Math.floor(Math.random() * 3) + 1}人搬运，需要几天？（反比例）`,
            hint: `总工作量 = 人数 × 天数 = ${a} × ${b} = ${totalWork}（人·天）`,
            answer: `${a + Math.floor(Math.random() * 3) + 1}`,
            explanation: `这个题目人数不固定，重新出题`,
          }
        },
        () => {
          const a = Math.floor(Math.random() * 5) + 2
          const b = Math.floor(Math.random() * 5) + 2
          const totalWork = a * b
          const newPeople = a + Math.floor(Math.random() * 3) + 1
          const newDays = Math.round(totalWork / newPeople * 100) / 100
          return {
            id: i,
            badge: '⚖️ 反比例',
            badgeColor: 'bg-red-100 text-red-700',
            question: `修一条路，${a}人修需要${b}天。如果${newPeople}人修，需要多少天？（反比例，保留两位小数）`,
            hint: `总工作量 = 人数 × 天数 = ${a} × ${b} = ${totalWork}`,
            answer: newDays.toString(),
            explanation: `总工作量 = ${a} × ${b} = ${totalWork}（人·天），${newPeople}人需要 = ${totalWork} ÷ ${newPeople} = ${newDays} 天`,
          }
        },
      ]
      qs.push(scenarios[i % scenarios.length]())
    }
  }
  return qs
}

export default function RatioGame() {
  const knowledgeCard = (
    <>
      <h3 className="font-bold text-pink-800 text-lg mb-3">📖 知识回顾</h3>
      <div className="space-y-3 text-gray-700">
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-pink-700 mb-2">✏️ 比的化简</p>
          <p className="text-sm">比的前项和后项同时除以它们的最大公因数</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-green-700 mb-2">📝 按比例分配</p>
          <p className="text-sm">总量 ÷ 总份数 × 所占份数</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-indigo-700 mb-2">⚖️ 正比例</p>
          <p className="text-sm">两个量同时扩大或缩小相同的倍数（比值不变）</p>
          <p className="text-xs text-gray-500 mt-1">如：速度不变，路程和时间成正比例</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-red-700 mb-2">🔄 反比例</p>
          <p className="text-sm">一个量扩大几倍，另一个量缩小相同的倍数（乘积不变）</p>
          <p className="text-xs text-gray-500 mt-1">如：总工作量不变，人数和天数成反比例</p>
        </div>
      </div>
    </>
  )

  return (
    <GameEngine
      title="⚖️ 比例大冒险"
      emoji="⚖️"
      subtitle="六年级下册 · 第四单元 · 比例"
      knowledgeCard={knowledgeCard}
      rules={[
        '⚖️ 共 150 道题，包含化简比、按比例分配、正比例、反比例',
        '📝 填最简比如 3:4',
        '⚡ 连续答对3题有惊喜动画！',
        '📝 结果保留两位小数（如有）',
      ]}
      generateQuestions={generateQuestions}
      color="from-pink-500 to-pink-600"
      gradientFrom="from-pink-500"
      gradientTo="to-pink-600"
    />
  )
}
