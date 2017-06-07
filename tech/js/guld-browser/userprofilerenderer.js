const electron = require('electron')
const ipc = electron.ipcRenderer

console.log('user profiler renderer jk')

document.getElementById('profilestart').addEventListener('click', _ =>{
    console.log('start click')
    ipc.send('profile-start')
})