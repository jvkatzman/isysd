const path = require('path')
const url = require('url')
const fs = require('fs-extra')
const marked = require('marked')
const gap = require('./gap.json')
const guld = require('guld').Guld(gap)
const {app, ipcMain, protocol, BrowserWindow} = require('electron')

var windows = {'main': null} // create windows before intro, and hope...
const intro = require(path.normalize(`${guld.PERSPECTIVE}/tech/js/guld/electron/intro/intro.js`))
const introWindow = intro.introWindow

function createWebWindow (url) {
  windows[url] = new electron.BrowserWindow({
    width: 960,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  })
  windows[url].loadURL(url)

  windows[url].once('ready-to-show', function () {
    windows[url].show()
  })

  windows[url].on('closed', function () {
    windows[url] = null
  })
}

function createWindow () {
  windows['main'] = new BrowserWindow({width: 800, height: 600})

  windows['main'].loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  windows['main'].on('closed', function () {
    windows['main'] = null
  })
}

app.on('ready', introWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (windows['main'] === null) {
    createWindow()
  }
})
