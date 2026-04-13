import GameEngine, { GameQuestion } from '@/components/GameEngine'

function generateQuestions(): GameQuestion[] {
  const qs: GameQuestion[] = []
  for (let i = 0; i < 15; i++) {
    const type = i < 5 ? 'discount' : (i < 10 ? 'tax' : 'interest')

    if (type === 'discount') {
      const originalPrice = Math.floor(Math.random() * 800) + 200
      const discount = [8, 85, 9, 75, 6][i % 5]
      const actualPrice = Math.round(originalPrice * discount / 10)
      qs.push({
        id: i,
        badge: '💰 打折',
        badgeColor: 'bg-green-100 text-green-700',
        question: `一件衣服原价${originalPrice}元，现在打${discount === 85 ? '八五' : discount === 75 ? '七五' : discount === 6 ? '六' : discount === 8 ? '八' : '九'}折出售，现价是多少元？`,
        hint: `现价 = 原价 × ${discount === 85 ? '85' : discount === 75 ? '75' : discount === 6 ? '60' : discount + '0'}% = ${originalPrice} × ${discount / 10}`,
        answer: actualPrice.toString(),
        explanation: `${originalPrice} × ${discount / 10} = ${actualPrice} 元`,
      })
    } else if (type === 'tax') {
      const income = Math.floor(Math.random() * 5000) + 1000
      const taxRate = [3, 5, 10][i % 3]
      const tax = income * taxRate / 100
      qs.push({
        id: i,
        badge: '📋 纳税',
        badgeColor: 'bg-orange-100 text-orange-700',
        question: `某商店月收入${income}元，需要缴纳${taxRate}%的营业税，应缴纳税款多少元？`,
        hint: `应纳税额 = 收入 × 税率 = ${income} × ${taxRate}%`,
        answer: tax % 1 === 0 ? tax.toString() : tax.toFixed(2),
        explanation: `${income} × ${taxRate}% = ${income} × ${taxRate / 100} = ${tax} 元`,
      })
    } else {
      const principal = [1000, 2000, 5000, 10000][i % 4]
      const rate = [2, 3, 4, 5][i % 4]
      const years = [1, 2, 3][i % 3]
      const interest = principal * rate / 100 * years
      qs.push({
        id: i,
        badge: '🏦 利息',
        badgeColor: 'bg-blue-100 text-blue-700',
        question: `小明把${principal}元存入银行，年利率${rate}%，存${years}年，到期利息是多少元？`,
        hint: `利息 = 本金 × 利率 × 时间 = ${principal} × ${rate}% × ${years}`,
        answer: interest % 1 === 0 ? interest.toString() : interest.toFixed(2),
        explanation: `${principal} × ${rate}% × ${years} = ${principal} × ${rate / 100} × ${years} = ${interest} 元`,
      })
    }
  }
  return qs
}

export default function PercentShopGame() {
  const knowledgeCard = (
    <>
      <h3 className="font-bold text-green-800 text-lg mb-3">📖 知识回顾</h3>
      <div className="space-y-3 text-gray-700">
        <p><strong>百分数的三大应用：</strong></p>
        <div className="grid gap-3">
          <div className="bg-white rounded-xl p-4">
            <p className="font-bold text-green-700 mb-2">️ 打折问题</p>
            <p className="text-sm">现价 = 原价 × 折扣（八折 = 80% = 0.8）</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="font-bold text-orange-700 mb-2">📋 纳税问题</p>
            <p className="text-sm">应纳税额 = 收入 × 税率</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="font-bold text-blue-700 mb-2">🏦 利息问题</p>
            <p className="text-sm">利息 = 本金 × 年利率 × 存款年限</p>
          </div>
        </div>
        <p><strong>💡 折扣换算：</strong>八折 = 80%，七五折 = 75%，六折 = 60%</p>
      </div>
    </>
  )

  return (
    <GameEngine
      title="🛒 百分数商店"
      emoji="🛒"
      subtitle="六年级上册第六单元 · 下册第二单元 · 百分数"
      knowledgeCard={knowledgeCard}
      rules={[
        '🛒 共 15 道题，包含打折、纳税、利息',
        ' 打八折 = 原价的80%，打七五折 = 75%',
        '⚡ 连续答对3题有惊喜动画！',
        '💰 答案如果是小数，保留两位',
      ]}
      generateQuestions={generateQuestions}
      color="from-green-500 to-green-600"
      gradientFrom="from-green-500"
      gradientTo="to-green-600"
    />
  )
}
