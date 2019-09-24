const { parseIngredient } = require('ingredient-parser')
const moment = require('moment')
const cheerio = require('cheerio')
const _ = require('lodash')

function recipe($) {
  let result
  const scripts = $('script[type="application/ld+json"]')
  _.forEach(scripts, (script) => {
    const data = script.children[0].data
    const json = JSON.parse(data)
    if (json['@context'] === 'https://schema.org') {
      _.forEach(json['@graph'], (graph) => {
        if (graph['@type'] === 'Recipe') {
          result = graph
          return false
        }
      })
      if (result) {
        return false
      }
    }
  })
  return result
}

exports.duration = $ => {
  if (recipe($).totalTime) {
    return moment.duration(recipe($).totalTime).asSeconds()
  }
  let p = recipe($).prepTime? moment.duration(recipe($).prepTime).asSeconds(): 0
  let c = recipe($).cookTime? moment.duration(recipe($).cookTime).asSeconds(): 0
  return p+c
}

exports.ingredient_lists = $ => [ { lines: _.map(recipe($).recipeIngredient, string => parseIngredient(string))} ]
exports.procedure_lists  = $ => [ { lines:  _.map(recipe($).recipeInstructions, step => { return {text: step.text}}) } ]

exports.yield = $ => recipe($).recipeYield
exports.title = $ => recipe($).name
exports.description = $ => recipe($).description
exports.source_author = $ => recipe($).author.name
exports.image_url = $ => _.last(recipe($).image)
