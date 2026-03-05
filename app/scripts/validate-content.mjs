import fs from 'fs'

const file = new URL('../src/data/content.js', import.meta.url)
const content = fs.readFileSync(file, 'utf8')

const blockedPatterns = [/(Template)/i, /\+27\s?13\s?000/i]
const hits = blockedPatterns.filter((re) => re.test(content))

if (hits.length) {
  console.error('❌ Content validation failed: placeholder emergency data detected in src/data/content.js')
  process.exit(1)
}

console.log('✅ Content validation passed')
