import GameEngine, { GameQuestion } from '@/components/GameEngine'

function gcdFn(a: number, b: number): number { return b === 0 ? a : gcdFn(b, a % b) }

function generateQuestions(): GameQuestion[] {
  const qs: GameQuestion[] = []
  for (let i = 0; i < 15; i++) {
    const n1 = Math.floor(Math.random() * 4) + 1
    const d1 = Math.floor(Math.random() * 4) + 2
    const n2 = Math.floor(Math.random() * 4) + 1
    const d2 = Math.floor(Math.random() * 4) + 2
    // a/b ÷ c/d = a/b × d/c = ad/bc
    const resultNum = n1 * d2
    const resultDen = d1 * n2
    const gcd = gcdFn(resultNum, resultDen)
    const sNum = resultNum / gcd
    const sDen = resultDen / gcd

    const type = i < 4 ? 'visual' : (i < 9 ? 'word' : 'formula')

    if (type === 'visual') {
      const foods = ['🍰', '', '🍫', '', '']
      const food = foods[i % foods.length]
      qs.push({
        id: i,
        badge: '🍰 图形题',
        badgeColor: 'bg-blue-100 text-blue-700',
        question: `${food} 分数除法：${n1}/${d1} ÷ ${n2}/${d2} = ?`,
        hint: `除以一个分数 = 乘以它的倒数 → ${n1}/${d1} × ${d2}/${n2}`,
        answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
        explanation: `${n1}/${d1} ÷ ${n2}/${d2} = ${n1}/${d1} × ${d2}/${n2} = ${n1}×${d2} / ${d1}×${n2} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen}`,
      })
    } else if (type === 'word') {
      const scenarios = [
        () => ({
          id: i,
          badge: '📝 应用题',
          badgeColor: 'bg-green-100 text-green-700',
          question: `一桶油重${d1}千克，每次用${n2}/${d2}千克，可以用多少次？`,
          hint: `总量 ÷ 每次用量 = 次数 → ${d1} ÷ ${n2}/${d2}`,
          answer: sDen === 1 ? (sNum * d1).toString() : `${sNum * d1}/${sDen}`,
          explanation: `${d1} ÷ ${n2}/${d2} = ${d1} × ${d2}/${n2} = ${d1 * d2}/${n2} = ${sDen === 1 ? sNum * d1 : (sNum * d1) + '/' + sDen} 次`,
        }),
        () => ({
          id: i,
          badge: '📝 应用题',
          badgeColor: 'bg-green-100 text-green-700',
          question: `一段公路全长${d1 * 10}米，已经修了${n1}/${d1}，剩下${d1 - n1}/${d1}。如果每天修${n2}/${d2}米，还需要多少天？`,
          hint: `先算剩下的长度：${d1 - n1}/${d1} × ${d1 * 10}`,
          answer: `${((d1 - n1) * d1 * 10) / d1 / n2 * d2}` ,
          explanation: `剩下：${d1 * 10} × ${d1 - n1}/${d1} = ${(d1 - n1) * 10}米。还需要：${(d1 - n1) * 10} ÷ ${n2}/${d2} = ${(d1 - n1) * 10} × ${d2}/${n2} 天`,
        }),
        () => ({
          id: i,
          badge: '📝 应用题',
          badgeColor: 'bg-green-100 text-green-700',
          question: `一根绳子长${d1}米，剪成每段${n2}/${d2}米的小段，可以剪几段？`,
          hint: `总长 ÷ 每段长 = 段数`,
          answer: sDen === 1 ? (sNum * d1).toString() : `${sNum * d1}/${sDen}`,
          explanation: `${d1} ÷ ${n2}/${d2} = ${d1} × ${d2}/${n2} = ${d1 * d2}/${n2} = ${sDen === 1 ? sNum * d1 : (sNum * d1) + '/' + sDen} 段`,
        }),
      ]
      qs.push(scenarios[i % scenarios.length]())
    } else {
      qs.push({
        id: i,
        badge: '✏️ 计算题',
        badgeColor: 'bg-purple-100 text-purple-700',
        question: `计算：${n1}/${d1} ÷ ${n2}/${d2} = ?（填最简分数）`,
        hint: `分数除法：翻转除数，变乘法 → ${n1}/${d1} × ${d2}/${n2}`,
        answer: sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`,
        explanation: `${n1}/${d1} ÷ ${n2}/${d2} = ${n1}/${d1} × ${d2}/${n2} = ${n1}×${d2} / ${d1}×${n2} = ${resultNum}/${resultDen} = ${sDen === 1 ? sNum : sNum + '/' + sDen}`,
      })
    }
  }
  return qs
}

export default function FractionDivideGame() {
  const knowledgeCard = (
    <>
      <h3 className="font-bold text-cyan-800 text-lg mb-3">📖 知识回顾</h3>
      <div className="space-y-3 text-gray-700">
        <p><strong>分数除法规则：</strong></p>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-xl font-bold text-cyan-600">
            <span className="inline-block align-middle text-center">
              <span className="block">a</span>
              <span className="block border-t-2 border-cyan-600 my-1"></span>
              <span className="block">b</span>
            </span>
            <span className="mx-2">÷</span>
            <span className="inline-block align-middle text-center">
              <span className="block">c</span>
              <span className="block border-t-2 border-cyan-600 my-1"></span>
              <span className="block">d</span>
            </span>
            <span className="mx-2">=</span>
            <span className="inline-block align-middle text-center">
              <span className="block">a</span>
              <span className="block border-t-2 border-cyan-600 my-1"></span>
              <span className="block">b</span>
            </span>
            <span className="mx-2">×</span>
            <span className="inline-block align-middle text-center">
              <span className="block">d</span>
              <span className="block border-t-2 border-cyan-600 my-1"></span>
              <span className="block">c</span>
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">除以一个分数 = 乘以它的倒数</p>
        </div>
        <p><strong>💡 记忆口诀：</strong>除号变乘号，除数翻个面（分子分母交换位置）</p>
      </div>
    </>
  )

  return (
    <GameEngine
      title="🍕 分数除法冒险"
      emoji="🍕"
      subtitle="六年级上册 · 第三单元 · 分数除法"
      knowledgeCard={knowledgeCard}
      rules={[
        '🍕 共 15 道题，分三个难度递增',
        ' 前三题有图形提示，帮助理解',
        '⚡ 连续答对3题有惊喜动画！',
        '📝 输入分数格式如：2/3 或 1',
        '💡 除以一个分数 = 乘以它的倒数',
      ]}
      generateQuestions={generateQuestions}
      color="from-cyan-500 to-cyan-600"
      gradientFrom="from-cyan-500"
      gradientTo="to-cyan-600"
    />
  )
}
