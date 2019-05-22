const url = require('url')
const axios = require('axios')
const { size } = require('lodash')
const Parsers = require('./parsers')
const { Default, RecipeError, parser } = require('./src')

const parse = async urlString => {
  const { hostname } = url.parse(urlString)
  const recipeParser = Parsers[hostname] || Default
  const { data } = await axios(
    await (recipeParser.transform
      ? recipeParser.transform(urlString)
      : urlString)
  )
  const recipe = parser(recipeParser)(data)
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
