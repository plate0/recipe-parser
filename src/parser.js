const cheerio = require('cheerio')
const _ = require('lodash')
const html = require('./html')

/*
 *
 */
const dom = func => (html, opts) => func(cheerio.load(html), opts)

/*
 *
 */
const handler = (val, key) =>
  typeof val === 'function' ? val : (html[key] || html.text)(val)

/*
 *
 */
const mapValues = object => (...args) =>
  _.mapValues(object, v => (v ? v(...args) : undefined))

/*
 * A Parser expects DOM (Cheerio loaded) and returns a parsed recipe
 *
 * If a function, knows what it is doing, needs to call dom(...)
 */
const parser = partial =>
  typeof partial === 'function'
    ? partial
    : dom(mapValues(_.mapValues({ ...html.defaults, ...partial }, handler)))

module.exports = {
  dom,
  mapValues,
  parser
}
