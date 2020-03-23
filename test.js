import test from 'ava'
import createTestServer from 'create-test-server'
import puppeteer from 'puppeteer'
import fs from 'fs'

async function withPage(t, run) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', (message) => {
    for (let i = 0; i < message.args().length; i += 1) {
      console.log(`${i}: ${message.args()[i]}`)
    }
  })
  try {
    await run(t, page)
  } finally {
    await page.close()
    await browser.close()
  }
}

function testScript() {
  const input = document.createElement('input')
  input.type = 'file'
  const file = new window.File([], 'test.txt', {type: 'text/plain'})

  const {files: initialFiles} = input
  const {constructor} = initialFiles
  window.setInputFiles(input, [file, file])
  const {files: testFiles} = input
  window.setInputFiles(input, [])
  const {files: emptyFiles} = input

  return {
    'initial files length': initialFiles.length === 0,
    'test files constructor': testFiles.constructor === constructor,
    'test files length': testFiles.length === 2,
    'test files item': testFiles.item(1) === file,
    'empty files': emptyFiles.length === 0,
  }
}

async function testEsm(page, file) {
  const server = await createTestServer()
  server.get('/', (request, response) => {
    response.type('text/html')
    response.end(`
      <script type="module">
      import setInputFiles from '${file}'
      window.setInputFiles = setInputFiles
      </script>
      `)
  })
  server.get(file.slice(1), (request, response) => {
    response.type('text/javascript')
    response.end(fs.readFileSync(file))
  })

  await page.goto(server.url)
  return page.evaluate(testScript)
}

test('esm build', withPage, async (t, page) => {
  const results = await testEsm(page, './dist/set-input-files.mjs')
  for (const [, result] of Object.entries(results)) {
    t.true(result)
  }
})

test('umd build', withPage, async (t, page) => {
  await page.goto('about:blank')
  await page.addScriptTag({path: './dist/set-input-files.js'})

  const results = await page.evaluate(testScript)

  for (const [, result] of Object.entries(results)) {
    t.true(result)
  }
})
