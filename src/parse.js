const url = require('url')
const axios = require('axios')
const { size, keys, pick, isFunction} = require('lodash')
const Default = require('./default')
const { RecipeError } = require('./errors')
const { parser } = require('./parser')
const template = require('./html').defaults

const parse = async urlString => {
  const { hostname } = url.parse(urlString)
  const Parsers = require('../parsers')
  let p = Parsers[hostname] || Default
  const fetch = p.fetch || axios.get
  const { data } = await fetch(urlString, {})
  const recipe = parser(_.isFunction(p)? p: _.pick(p, _.keys(template)))(data, { urlString })
  if (
    !recipe.title ||
    !size(recipe.ingredient_lists) ||
    !size(recipe.procedure_lists)
  ) {
    throw new RecipeError('invalid recipe', recipe)
  }
  return recipe
}

module.exports = {
  parse
}
