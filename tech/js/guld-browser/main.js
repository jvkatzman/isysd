const path = require('path')
const url = require('url')
const fs = require('fs-extra')
const electron = require('electron')
// const marked = require('marked')
const gap = require('./gap.json')
//const guld = require('guld').Guld(gap)

const gpg = require('../../gapp/lib/gpg.js')

const {app, ipcMain, protocol, BrowserWindow} = require('electron')

const ipc = electron.ipcMain

var windows = {'main': null} // create windows before intro, and hope...
// const intro = require(path.normalize(`${guld.PERSPECTIVE}/tech/js/guld/electron/intro/intro.js`))
// const introWindow = intro.introWindow


var configured, displayWindow

configured = true

// jk - figure out configured here

if (configured) {
    displayWindow = "userprofile.html"
} else
{ 
    displayWindow ="createprofile.html"
}

function createWindow () {

  windows['main'] = new BrowserWindow({width: 800, height: 600})

  windows['main'].loadURL(url.format({
    pathname: path.join(__dirname,displayWindow), 
    protocol: 'file:',
    slashes: true
  }))

  windows['main'].on('closed', function () {
    windows['main'] = null
  })
}


// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('activate', function () {
  if (windows['main'] === null) {
    createWindow()
  }
})
