const url = require('url')
const axios = require('axios')
const { size } = require('lodash')
const Parsers = require('./parsers')
const { Default } = require('./default')
const { RecipeError } = require('./errors')
const { Parser } = require('./parser')

const parse = async urlString => {
  const { hostname } = url.parse(urlString)
  let p = Parsers[hostname] || Default
  const fetch = p.fetch || axios.get
  const { data } = await fetch(urlString, {})
  const recipe = parser(p)(data, { urlString })
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
