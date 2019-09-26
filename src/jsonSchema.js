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
  let x 
  const r = recipe($)
  if (r) {
    if (r.totalTime) {
      return moment.duration(r.totalTime).asSeconds()
    }
    let p = r.prepTime
    let c = r.cookTime
    if (p) {
      x = moment.duration(p).asSeconds()
    }
    if (c) {
      x = x === undefined? c:  x+moment.duration(c).asSeconds()
    }
   }
 return x
}

exports.ingredient_lists = $ => { 
      const r = recipe($);
      return r? [ { lines: _.map(r.recipeIngredient, string => parseIngredient(string))} ]: undefined
    }
exports.procedure_lists  = $ => { 
      const r = recipe($);
      return r? [ { lines:  _.map(r.recipeInstructions, step => { return {text: step.text}}) } ]: undefined
    }

exports.yield = $ => recipe($)?.recipeYield
exports.title = $ => recipe($)?.name
exports.description = $ => recipe($)?.description
exports.source_author = $ => recipe($)?.author.name
exports.image_url = $ => recipe($).image? _.last(recipe($).image): undefined
