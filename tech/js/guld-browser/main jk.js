const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

var authenticated

authenticated = true

let mainWindow


app.on('ready', _=> {
    console.log('ready')
    mainWindow = new BrowserWindow({
        height:800,
      
        width:800
    })
mainWindow.webContents.openDevTools()
//mainWindow.loadURL(`file://${__dirname}/listsecretkeys.html`)

if (authenticated) {
    mainWindow.loadURL(`file://${__dirname}/userprofile.html`)
} else
{ 
    mainWindow.loadURL(`file://${__dirname}/createprofile.html`)
}


    mainWindow.on('closed', _ =>{
        console.log('closed')
        mainWindow = null
    })

})// app.on

ipc.on('createprofile-start', _ =>{
    
    console.log('createprofile-start in main.js')
    mainWindow.loadURL(`file://${__dirname}/cave.html`)
})

ipc.on('profile-start', _ =>{
    
    console.log('profile-start in main.js')
    mainWindow.loadURL(`file://${__dirname}/userprofile.html`)
    // countdown( count =>{
    //     console.log("count: ", count)

    //     windows.forEach(win => {
    //         win.webContents.send('countdown',count)
    //     })

    //     //mainWindow.webContents.send('countdown',count)
    // }  )
})

