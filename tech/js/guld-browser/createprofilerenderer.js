const electron = require('electron')
const ipc = electron.ipcRenderer

console.log('create profiler renderer jk')

var password = document.getElementById("githubPassword")
  , confirm_password = document.getElementById("confirmGithubPassword")
  , githubUserID = document.getElementById("githubUserID");

function validatePassword(){
    document.getElementById("error").textContent="";
    if (githubUserID.value=="" ){
         document.getElementById("error").textContent="GitHub User ID cannot be blank";
        return false
    }
    if (password.value=="" ){
        document.getElementById("error").textContent="password cannot be blank";
        return false
    }
    if (confirm_password .value=="" ){
        document.getElementById("error").textContent="confirmation password cannot be blank";
        return false
    }
  if(password.value != confirm_password.value) {
    document.getElementById("error").textContent="Passwords do not match";
    return false
  } 
  return true
}


document.getElementById('createprofile').addEventListener('click', _ =>{
    valid = validatePassword()
    if (valid){
        ipc.send('createprofile-start')
    }
})