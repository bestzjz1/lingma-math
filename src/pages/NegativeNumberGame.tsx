import GameEngine, { GameQuestion } from '@/components/GameEngine'

function generateQuestions(): GameQuestion[] {
  const qs: GameQuestion[] = []
  for (let i = 0; i < 150; i++) {
    const type = i < 50 ? 'temperature' : (i < 100 ? 'depth' : 'compare')

    if (type === 'temperature') {
      const temp = Math.floor(Math.random() * 15) + 1
      const change = Math.floor(Math.random() * 10) + 1
      const scenarios = [
        () => {
          return {
            id: i,
            badge: '🌡️ 温度',
            badgeColor: 'bg-red-100 text-red-700',
            question: `某地早晨气温是${temp}℃，中午上升了${change}℃，傍晚又下降了${change + 3}℃，傍晚气温是多少℃？`,
            hint: `${temp} + ${change} - ${change + 3}`,
            answer: (temp + change - change - 3).toString(),
            explanation: `${temp} + ${change} - ${change + 3} = ${temp + change} - ${change + 3} = ${temp - 3}℃`,
          }
        },
        () => ({
          id: i,
          badge: '🌡️ 温度',
          badgeColor: 'bg-red-100 text-red-700',
          question: `零下${temp}℃记作 -${temp}℃，零上${temp}℃记作 +${temp}℃。零下${temp}℃比零上${temp}℃低多少度？`,
          hint: `温差 = ${temp} - (-${temp}) = ${temp} + ${temp}`,
          answer: (temp * 2).toString(),
          explanation: `${temp} - (-${temp}) = ${temp} + ${temp} = ${temp * 2}℃`,
        }),
        () => ({
          id: i,
          badge: '🌡️ 温度',
          badgeColor: 'bg-red-100 text-red-700',
          question: `哈尔滨某天最高气温是零上3℃，最低气温是零下${temp}℃，这天的温差是多少℃？`,
          hint: `温差 = 3 - (-${temp}) = 3 + ${temp}`,
          answer: (3 + temp).toString(),
          explanation: `3 - (-${temp}) = 3 + ${temp} = ${3 + temp}℃`,
        }),
      ]
      qs.push(scenarios[i % scenarios.length]())
    } else if (type === 'depth') {
      const depth = Math.floor(Math.random() * 500) + 100
      const change = Math.floor(Math.random() * 200) + 50
      const scenarios = [
        () => ({
          id: i,
          badge: '🌊 海拔',
          badgeColor: 'bg-blue-100 text-blue-700',
          question: `珠穆朗玛峰海拔+8848米，死海湖面海拔约-430米，两地海拔相差多少米？`,
          hint: `海拔差 = 8848 - (-430) = 8848 + 430`,
          answer: '9278',
          explanation: `8848 - (-430) = 8848 + 430 = 9278 米`,
        }),
        () => ({
          id: i,
          badge: '🌊 潜水',
          badgeColor: 'bg-blue-100 text-blue-700',
          question: `潜水员在海平面以下${depth}米处，上升了${change}米，现在在什么位置？（用正负数表示，海平面以下用负数）`,
          hint: `- ${depth} + ${change}`,
          answer: `-${depth - change}`,
          explanation: `-${depth} + ${change} = -${depth - change} 米（海平面以下${depth - change}米）`,
        }),
        () => ({
          id: i,
          badge: '🌊 深度',
          badgeColor: 'bg-blue-100 text-blue-700',
          question: `一艘潜艇在海平面以下${depth}米，另一艘在海平面以下${depth + change}米，哪艘潜艇更深？深多少米？（填深的米数）`,
          hint: `比较 -${depth} 和 -${depth + change}`,
          answer: change.toString(),
          explanation: `-${depth + change} 比 -${depth} 更深，深 ${depth + change} - ${depth} = ${change} 米`,
        }),
      ]
      qs.push(scenarios[i % scenarios.length]())
    } else {
      const a = Math.floor(Math.random() * 20) + 5
      const b = Math.floor(Math.random() * 20) + 1
      const scenarios = [
        () => ({
          id: i,
          badge: '⚡ 计算',
          badgeColor: 'bg-orange-100 text-orange-700',
          question: `计算：-${a} + ${b} = ?`,
          hint: `异号相加，取绝对值较大的符号，用大绝对值减小绝对值`,
          answer: (b - a).toString(),
          explanation: `-${a} + ${b} = ${b - a}（${b > a ? '正数' : '负数'}，因为${Math.max(a, b)} > ${Math.min(a, b)}）`,
        }),
        () => ({
          id: i,
          badge: '⚡ 计算',
          badgeColor: 'bg-orange-100 text-orange-700',
          question: `计算：${a} - (-${b}) = ?`,
          hint: `减去一个负数 = 加上它的相反数 → ${a} + ${b}`,
          answer: (a + b).toString(),
          explanation: `${a} - (-${b}) = ${a} + ${b} = ${a + b}`,
        }),
        () => ({
          id: i,
          badge: '⚡ 计算',
          badgeColor: 'bg-orange-100 text-orange-700',
          question: `计算：-${a} - ${b} = ?`,
          hint: `两个负数相加 → -(${a} + ${b})`,
          answer: `-${a + b}`,
          explanation: `-${a} - ${b} = -(${a} + ${b}) = -${a + b}`,
        }),
      ]
      qs.push(scenarios[i % scenarios.length]())
    }
  }
  return qs
}

export default function NegativeNumberGame() {
  const knowledgeCard = (
    <>
      <h3 className="font-bold text-red-800 text-lg mb-3">📖 知识回顾</h3>
      <div className="space-y-3 text-gray-700">
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-red-700 mb-2">🌡️ 正负数的意义</p>
          <p className="text-sm">正数：表示零上温度、海平面以上、收入等</p>
          <p className="text-sm">负数：表示零下温度、海平面以下、支出等</p>
          <p className="text-sm">0：既不是正数也不是负数</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-blue-700 mb-2">📐 数轴</p>
          <p className="text-sm">数轴上，右边的数总比左边的数大</p>
          <p className="text-sm">负数 &lt; 0 &lt; 正数</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-green-700 mb-2">⚡ 运算规则</p>
          <p className="text-sm">• 减去一个负数 = 加上它的相反数</p>
          <p className="text-sm">• 异号相加：取绝对值大的符号</p>
          <p className="text-sm">• 同号相加：取相同的符号，绝对值相加</p>
        </div>
        <p><strong>💡 记忆口诀：</strong>负负得正，正负得负（减法变加法）</p>
      </div>
    </>
  )

  return (
    <GameEngine
      title="🌡️ 负数冒险记"
      emoji="🌡️"
      subtitle="六年级下册 · 第一单元 · 负数"
      knowledgeCard={knowledgeCard}
      rules={[
        '🌡️ 共 150 道题，包含温度、海拔、计算',
        '📝 负数用 - 号表示，如 -5',
        '⚡ 连续答对3题有惊喜动画！',
        '🌊 海拔：海平面以上为正，以下为负',
      ]}
      generateQuestions={generateQuestions}
      color="from-red-500 to-red-600"
      gradientFrom="from-red-500"
      gradientTo="to-red-600"
    />
  )
}
