const gpg = require('gpg')

function genKey () {
  var options = `%echo Generating a basic OpenPGP key
Key-Type: RSA
Key-Length: 2048
Subkey-Type: RSA
Subkey-Length: 2048
Name-Real: ${answers.username}
Name-Comment:
Name-Email: ${answers.email}
Expire-Date: 0
Passphrase:
%commit
%echo done`
  gpg.call('', ['--batch', '--gen-key', options], (err, data) => {
    if (err) Promise.reject(err)
    else {
      return getFingerprint()
    }
  })
}

function getFingerprint () {
  gpg.call('', ['--fingerprint', '--with-colons', answers.email], (err, data) => {
    if (err) return Promise.reject(err)
    else {
      var da = data.toString('utf-8').split('\n')
      var fa = da[2].split(':')
      var fingerprint = fa[fa.length - 2]
      toset['user.signingkey'] = fingerprint
      toset['commit.gpgsign'] = true
      return gitconfig.set(toset, {location: 'local'})
    }
  })
}
