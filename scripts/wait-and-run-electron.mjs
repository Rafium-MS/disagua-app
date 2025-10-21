import waitOn from 'wait-on'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDevServerUrl = 'http://localhost:5173'
const devServerUrl = process.env.VITE_DEV_SERVER_URL || defaultDevServerUrl
const waitResource = process.env.WAIT_ON_RESOURCE || devServerUrl
const timeout = Number.parseInt(process.env.WAIT_ON_TIMEOUT || '30000', 10)

function resolveElectronBinary() {
  const binName = process.platform === 'win32' ? 'electron.cmd' : 'electron'
  return resolve(__dirname, '..', 'node_modules', '.bin', binName)
}

try {
  await waitOn({
    resources: [waitResource],
    timeout,
    validateStatus: (status) => status >= 200 && status < 400
  })
} catch (error) {
  console.error(`Failed to detect dev server at "${waitResource}" before starting Electron.`)
  if (error instanceof Error) {
    console.error(error.message)
  }
  process.exit(1)
}

const electronBinary = resolveElectronBinary()

const electronProcess = spawn(
  electronBinary,
  ['.'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: devServerUrl
    },
    shell: process.platform === 'win32'
  }
)

electronProcess.on('exit', (code) => {
  process.exit(code ?? 0)
})

electronProcess.on('error', (error) => {
  console.error('Failed to start Electron:', error)
  process.exit(1)
})
