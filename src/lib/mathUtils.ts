// Math utility functions shared across all game pages

// Simplify a fraction by finding GCD
export function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
  const d = gcd(Math.abs(numerator), Math.abs(denominator))
  return [numerator / d, denominator / d]
}

// Random integer in range [min, max]
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Shuffle array
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Check if user answer matches correct answer (handles spaces, Chinese chars)
export function normalizeAnswer(ans: string | number): string {
  return ans.toString()
    .replace(/\s+/g, '')
    .replace(/[\uff00-\uffef]/g, (c) => {
      const code = c.charCodeAt(0)
      if (code >= 0xFF01 && code <= 0xFF5E) return String.fromCharCode(code - 0xFEE0)
      if (code === 0xFF0F) return '/'
      return c
    })
    .toLowerCase()
}
