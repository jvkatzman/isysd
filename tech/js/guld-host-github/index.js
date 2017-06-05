const GitHubApi = require('github')

var github = new GitHubApi({
  protocol: 'https',
  host: 'api.github.com',
  pathPrefix: '',
  headers: {
    'user-agent': 'guld'
  },
  Promise: Promise,
  followRedirects: false,
  timeout: 5000
})

function createGHToken (answers) {
  return new Promise(function (resolve, reject) {
    github.authenticate({
      type: 'basic',
      username: answers.ghuser,
      password: answers.ghpass
    })
    github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status', 'gist', 'read:gpg_key', 'read:public_key'],
      note: 'guld',
      note_url: 'https://guld.io'
    }, function (err, res) {
      if (err) reject(err)
      if (res && res.data && res.data.token) {
        ghconfig = {'token': res.data.token}
        gitconfig.set({
          'user.username': answers.ghuser
        }, {
          location: 'local'
        }).then(() => {
          fs.writeFile(confPath, JSON.stringify(ghconfig))
            .then(resolve())
            .catch((err) => {
              reject(err)
            })
        })
      }
    })
  })
}

function loadConf () {
  return new Promise(function (resolve, reject) {
    fs.readFile(confPath).then((lines) => {
      ghconfig = JSON.parse(lines.toString('utf-8'))
      if (ghconfig && ghconfig.token) {
        github.authenticate({
          type: 'oauth',
          token: ghconfig.token
        })
        resolve()
      } else {
        askGHLogin()
          .then(createGHToken)
      }
    }).catch((err) => {
      askGHLogin()
        .then(createGHToken)
    })
  })
}
