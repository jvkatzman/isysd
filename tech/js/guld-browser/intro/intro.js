const path = require('path')
const url = require('url')
const fs = require('fs-extra')
const marked = require('marked')
const {app, ipcMain, protocol, BrowserWindow} = require('electron')
var windows = windows || {'intro': null}
try {
  gap
} catch (e) {
  console.error(e)
  var gap = require('./gap.json')
}
try {
  guld.PERSPECTIVE
} catch (e) {
  console.error(e)
  var guld = require('guld').Guld(gap)
}

function introWindow () {
  protocol.registerFileProtocol('gap', (request, callback) => {
    const url = request.url.substr(5).split('#')[0]
    const querystring = require('querystring')
    callback(querystring.unescape(path.normalize(`${guld.PERSPECTIVE}/${url}`)))
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  windows['intro'] = new BrowserWindow({fullscreen:true, frame: false})
  windows['intro'].loadURL(url.format({
    pathname: path.normalize(`${guld.PERSPECTIVE}/tech/js/guld/reveal.js/blocktree-story.html`),
    protocol: 'file:',
    slashes: true
  }))

  windows['intro'].once('ready-to-show', function () {
    windows['intro'].show()
  })

  windows['intro'].on('closed', function () {
    windows['intro'] = null
  })
}

module.exports = {introWindow: introWindow}
