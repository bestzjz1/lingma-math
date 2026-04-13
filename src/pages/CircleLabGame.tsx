import GameEngine, { GameQuestion } from '@/components/GameEngine'

function generateQuestions(): GameQuestion[] {
  const qs: GameQuestion[] = []
  for (let i = 0; i < 15; i++) {
    const type = i < 5 ? 'circumference' : (i < 10 ? 'area' : 'mixed')
    const PI = 3.14

    if (type === 'circumference') {
      const radius = Math.floor(Math.random() * 10) + 1
      const diameter = radius * 2
      const circumference = Math.round(radius * 2 * PI * 100) / 100
      const useDiameter = i % 2 === 0
      if (useDiameter) {
        qs.push({
          id: i,
          badge: '📐 周长（已知直径）',
          badgeColor: 'bg-orange-100 text-orange-700',
          question: `一个圆的直径是${diameter}cm，求它的周长（π取3.14）？`,
          hint: `圆的周长 = π × 直径 = 3.14 × ${diameter}`,
          answer: circumference.toString(),
          explanation: `C = πd = 3.14 × ${diameter} = ${circumference} cm`,
        })
      } else {
        qs.push({
          id: i,
          badge: '📐 周长（已知半径）',
          badgeColor: 'bg-orange-100 text-orange-700',
          question: `一个圆的半径是${radius}cm，求它的周长（π取3.14）？`,
          hint: `圆的周长 = 2 × π × 半径 = 2 × 3.14 × ${radius}`,
          answer: circumference.toString(),
          explanation: `C = 2πr = 2 × 3.14 × ${radius} = ${circumference} cm`,
        })
      }
    } else if (type === 'area') {
      const radius = Math.floor(Math.random() * 8) + 1
      const area = Math.round(radius * radius * PI * 100) / 100
      qs.push({
        id: i,
        badge: '📏 面积',
        badgeColor: 'bg-purple-100 text-purple-700',
        question: `一个圆的半径是${radius}cm，求它的面积（π取3.14）？`,
        hint: `圆的面积 = π × 半径² = 3.14 × ${radius}² = 3.14 × ${radius * radius}`,
        answer: area.toString(),
        explanation: `S = πr² = 3.14 × ${radius}² = 3.14 × ${radius * radius} = ${area} cm²`,
      })
    } else {
      const scenarios = [
        () => {
          const r = Math.floor(Math.random() * 5) + 3
          const c = Math.round(2 * PI * r * 100) / 100
          const s = Math.round(PI * r * r * 100) / 100
          return {
            id: i,
            badge: ' 综合应用',
            badgeColor: 'bg-pink-100 text-pink-700',
            question: `一个圆形花坛的半径是${r}m，绕花坛走一圈是多少米？花坛面积是多少平方米？（填周长，π取3.14）`,
            hint: `周长 = 2πr = 2 × 3.14 × ${r}`,
            answer: c.toString(),
            explanation: `周长：C = 2 × 3.14 × ${r} = ${c} m；面积：S = 3.14 × ${r}² = ${s} m²`,
          }
        },
        () => {
          const d = Math.floor(Math.random() * 10) + 4
          const r = d / 2
          const s = Math.round(PI * r * r * 100) / 100
          return {
            id: i,
            badge: '🔗 综合应用',
            badgeColor: 'bg-pink-100 text-pink-700',
            question: `一个圆桌的直径是${d}dm，桌面面积是多少平方分米？（π取3.14）`,
            hint: `先求半径 = 直径 ÷ 2 = ${d} ÷ 2 = ${r}，再求面积 = πr²`,
            answer: s.toString(),
            explanation: `半径 = ${d} ÷ 2 = ${r} dm，面积 = 3.14 × ${r}² = 3.14 × ${r * r} = ${s} dm²`,
          }
        },
        () => {
          const r1 = Math.floor(Math.random() * 5) + 3
          const r2 = Math.floor(Math.random() * 3) + 1
          const s1 = Math.round(PI * r1 * r1 * 100) / 100
          const s2 = Math.round(PI * r2 * r2 * 100) / 100
          const diff = Math.round((s1 - s2) * 100) / 100
          return {
            id: i,
            badge: '🔗 综合应用',
            badgeColor: 'bg-pink-100 text-pink-700',
            question: `大圆半径${r1}cm，小圆半径${r2}cm，大圆面积比小圆面积大多少平方厘米？（π取3.14）`,
            hint: `大圆面积 - 小圆面积 = π(${r1}² - ${r2}²)`,
            answer: diff.toString(),
            explanation: `大圆面积：3.14 × ${r1}² = ${s1}；小圆面积：3.14 × ${r2}² = ${s2}；差：${s1} - ${s2} = ${diff} cm²`,
          }
        },
      ]
      qs.push(scenarios[i % scenarios.length]())
    }
  }
  return qs
}

export default function CircleLabGame() {
  const knowledgeCard = (
    <>
      <h3 className="font-bold text-orange-800 text-lg mb-3">📖 知识回顾</h3>
      <div className="space-y-3 text-gray-700">
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-orange-700 mb-2">📐 圆的周长</p>
          <p className="text-lg font-mono text-center my-2">C = πd = 2πr</p>
          <p className="text-sm text-gray-500">d = 直径，r = 半径，π ≈ 3.14</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-purple-700 mb-2">📏 圆的面积</p>
          <p className="text-lg font-mono text-center my-2">S = πr²</p>
          <p className="text-sm text-gray-500">r = 半径</p>
        </div>
        <p><strong>💡 关键关系：</strong>直径 = 2 × 半径（d = 2r）</p>
      </div>
    </>
  )

  return (
    <GameEngine
      title="📐 圆实验室"
      emoji="📐"
      subtitle="六年级上册 · 第五单元 · 圆"
      knowledgeCard={knowledgeCard}
      rules={[
        '📐 共 15 道题，包含周长、面积和综合应用',
        ' π取3.14进行计算',
        '⚡ 连续答对3题有惊喜动画！',
        '📝 结果保留两位小数（如有）',
      ]}
      generateQuestions={generateQuestions}
      color="from-orange-500 to-orange-600"
      gradientFrom="from-orange-500"
      gradientTo="to-orange-600"
    />
  )
}
