/**
 * @jest-environment node
 */
const _ = require('lodash')
const axios = require('axios')
const adapter = require('axios/lib/adapters/http')

exports.fetch =  async (url, options={}) => {
  let config = {
      headers: {
        Cookie: "euConsent=true; euConsentId=79af88de-7209-4335-8d2f-c3d328e5d812"
      },
      transformRequest: logHeaders,
      adapter: adapter
  }
  _.merge(options, config)
  return axios.get(url, options)
}

function logHeaders(data, headers) {
  console.log(`\x1b[97m${JSON.stringify(headers)}\x1b[0m`)
}


var config = {
  url: 'https://google.com',
}