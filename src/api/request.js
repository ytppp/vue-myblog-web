var JsonP = require('jsonp')

export function jsonp (options) {
  return new Promise((resolve, reject) => {
    JsonP(options.url, {
      param: 'callback'
    }, (err, response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(err)
      }
    })
  })
}
