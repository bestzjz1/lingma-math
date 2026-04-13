import GameEngine, { GameQuestion } from '@/components/GameEngine'

function generateQuestions(): GameQuestion[] {
  const qs: GameQuestion[] = []
  const PI = 3.14

  for (let i = 0; i < 15; i++) {
    const type = i < 5 ? 'cylinder-surface' : (i < 10 ? 'cylinder-volume' : 'cone')

    if (type === 'cylinder-surface') {
      const r = Math.floor(Math.random() * 5) + 1
      const h = Math.floor(Math.random() * 8) + 3
      // SA = 2πr² + 2πrh
      const baseArea = Math.round(PI * r * r * 100) / 100
      const sideArea = Math.round(2 * PI * r * h * 100) / 100
      const totalSA = Math.round((baseArea * 2 + sideArea) * 100) / 100
      qs.push({
        id: i,
        badge: '🏗️ 圆柱表面积',
        badgeColor: 'bg-purple-100 text-purple-700',
        question: `一个圆柱的底面半径${r}cm，高${h}cm，求它的表面积（π取3.14）？`,
        hint: `表面积 = 2 × 底面积 + 侧面积 = 2 × πr² + 2πrh`,
        answer: totalSA.toString(),
        explanation: `底面积 = 3.14 × ${r}² = ${baseArea}；侧面积 = 2 × 3.14 × ${r} × ${h} = ${sideArea}；表面积 = ${baseArea}×2 + ${sideArea} = ${totalSA} cm²`,
      })
    } else if (type === 'cylinder-volume') {
      const r = Math.floor(Math.random() * 5) + 1
      const h = Math.floor(Math.random() * 8) + 3
      const v = Math.round(PI * r * r * h * 100) / 100
      qs.push({
        id: i,
        badge: '📦 圆柱体积',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        question: `一个圆柱的底面半径${r}cm，高${h}cm，求它的体积（π取3.14）？`,
        hint: `圆柱体积 = 底面积 × 高 = πr²h = 3.14 × ${r}² × ${h}`,
        answer: v.toString(),
        explanation: `V = πr²h = 3.14 × ${r}² × ${h} = 3.14 × ${r * r} × ${h} = ${v} cm³`,
      })
    } else {
      const r = Math.floor(Math.random() * 5) + 2
      const h = Math.floor(Math.random() * 8) + 3
      const v = Math.round((1 / 3) * PI * r * r * h * 100) / 100
      const cylinderV = Math.round(PI * r * r * h * 100) / 100
      const scenarios = [
        () => ({
          id: i,
          badge: '🔺 圆锥体积',
          badgeColor: 'bg-pink-100 text-pink-700',
          question: `一个圆锥的底面半径${r}cm，高${h}cm，求它的体积（π取3.14）？`,
          hint: `圆锥体积 = 1/3 × πr²h = 1/3 × 3.14 × ${r}² × ${h}`,
          answer: v.toString(),
          explanation: `V = 1/3 × 3.14 × ${r}² × ${h} = 1/3 × ${cylinderV} = ${v} cm³`,
        }),
        () => ({
          id: i,
          badge: '🔺 圆柱与圆锥',
          badgeColor: 'bg-pink-100 text-pink-700',
          question: `一个圆柱和一个圆锥等底等高，圆柱体积是${cylinderV}cm³，圆锥体积是多少cm³？`,
          hint: `等底等高的圆锥体积 = 1/3 × 圆柱体积`,
          answer: v.toString(),
          explanation: `圆锥体积 = 1/3 × ${cylinderV} = ${v} cm³`,
        }),
        () => ({
          id: i,
          badge: '🔺 圆锥应用',
          badgeColor: 'bg-pink-100 text-pink-700',
          question: `一个圆锥形沙堆，底面半径${r}m，高${h}m，沙堆体积是多少立方米？（π取3.14）`,
          hint: `圆锥体积 = 1/3 × πr²h`,
          answer: v.toString(),
          explanation: `V = 1/3 × 3.14 × ${r}² × ${h} = ${v} m³`,
        }),
      ]
      qs.push(scenarios[i % scenarios.length]())
    }
  }
  return qs
}

export default function CylinderGame() {
  const knowledgeCard = (
    <>
      <h3 className="font-bold text-purple-800 text-lg mb-3">📖 知识回顾</h3>
      <div className="space-y-3 text-gray-700">
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-purple-700 mb-2">🏗️ 圆柱</p>
          <p className="text-sm mb-1">表面积 = 2 × 底面积 + 侧面积 = 2πr² + 2πrh</p>
          <p className="text-sm">体积 = 底面积 × 高 = πr²h</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-pink-700 mb-2">🔺 圆锥</p>
          <p className="text-sm">体积 = 1/3 × 底面积 × 高 = 1/3 × πr²h</p>
          <p className="text-sm text-gray-500 mt-1">等底等高的圆锥体积是圆柱的 1/3</p>
        </div>
        <p><strong>💡 侧面积展开：</strong>圆柱侧面展开是一个长方形，长 = 底面周长 = 2πr，宽 = 高h</p>
      </div>
    </>
  )

  return (
    <GameEngine
      title="🏗️ 圆柱与圆锥工坊"
      emoji="🏗️"
      subtitle="六年级下册 · 第三单元 · 圆柱与圆锥"
      knowledgeCard={knowledgeCard}
      rules={[
        '🏗️ 共 15 道题，包含圆柱表面积、圆柱体积、圆锥体积',
        ' π取3.14进行计算',
        '⚡ 连续答对3题有惊喜动画！',
        '📝 结果保留两位小数（如有）',
      ]}
      generateQuestions={generateQuestions}
      color="from-purple-500 to-purple-600"
      gradientFrom="from-purple-500"
      gradientTo="to-purple-600"
    />
  )
}
