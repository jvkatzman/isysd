const remote = require('electron').remote

function isAwake() {
  console.log("am awake")
}

function isAsleep() {
  var window = remote.getCurrentWindow()
  window.close()
}

document.getElementById('i-am-awake').addEventListener('click', isAwake)
document.getElementById("i-am-still-asleep").addEventListener("click", isAsleep)
