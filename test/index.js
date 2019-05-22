const { readFile } = require('fs')

const testAsset = path => {
  return new Promise((resolve, reject) => {
    readFile(`test/${path}`, { encoding: 'utf8' }, (err, content) => {
      if (err) {
        return reject(err)
      }
      return resolve(content)
    })
  })
}

module.exports = {
  testAsset
}
