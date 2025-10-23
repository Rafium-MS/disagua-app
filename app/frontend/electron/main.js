const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const devUrl = process.env.VITE_DEV_SERVER_URL

  if (devUrl) {
    win.loadURL(devUrl)
  } else {
    const indexHtml = path.join(__dirname, '..', 'dist', 'index.html')
    win.loadFile(indexHtml)
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
