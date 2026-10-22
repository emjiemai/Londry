// Measures the OLD londry.uz (the WordPress site) with Lighthouse, from the terminal, no browser window.
//
// The domain now points to the new site, but the old one still lives on its old server. This script tells ONLY the test browser
// to look londry.uz up as that server's address; nothing is changed in DNS and nobody else is affected.
//
//   node scripts/lighthouse-old-site.mjs            phone test (default)
//   node scripts/lighthouse-old-site.mjs desktop    desktop test
//   node scripts/lighthouse-old-site.mjs phone 95.46.96.13    another server address, if the old hosting ever moves
//
// It writes lighthouse-old-<phone|desktop>.report.html (open it in any browser) and prints the scores.
// Needs Node 20+ and Google Chrome installed. The old hosting must still exist: after it is cancelled this stops working.
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const preset = process.argv[2] === 'desktop' ? 'desktop' : 'phone'
const oldIp = process.argv[3] ?? '95.46.96.13'
const name = `lighthouse-old-${preset}`
const flags = `--chrome-flags="--headless=new --host-resolver-rules=\\"MAP londry.uz ${oldIp}, MAP www.londry.uz ${oldIp}\\""`
const command = [
  'npx --yes lighthouse@latest https://londry.uz/',
  flags,
  '--quiet --only-categories=performance,accessibility,best-practices,seo',
  '--output=html --output=json',
  `--output-path=./${name}`,
  preset === 'desktop' ? '--preset=desktop' : '',
].join(' ')

console.log(`Testing the old londry.uz on ${oldIp} (${preset}). This takes about a minute...`)
execSync(command, { stdio: ['ignore', 'inherit', 'inherit'] })

const report = JSON.parse(readFileSync(`${name}.report.json`, 'utf8'))
const score = (key) => Math.round(report.categories[key].score * 100)
const audit = (id) => report.audits[id].displayValue
console.log(`\nOld londry.uz, ${preset}`)
console.log(`  Speed ${score('performance')}   Accessibility ${score('accessibility')}   Best practices ${score('best-practices')}   SEO ${score('seo')}`)
console.log(`  First content ${audit('first-contentful-paint')}   Main content ${audit('largest-contentful-paint')}   Blocking ${audit('total-blocking-time')}   ${audit('total-byte-weight')}`)
console.log(`\nFull report: ${name}.report.html`)
