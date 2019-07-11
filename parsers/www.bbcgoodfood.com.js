const html = require('../src/html')
const { _parseDuration: parseDuration } = require('../src/duration')

exports.ingredient_lists = $ => {
    $('.ingredients-list__glossary-link').remove()
    let lines = html.recipeSchemaIngredientLists($)
    if (lines.length !== 0) {
      return [{ lines }]
    }
    return undefined
}

exports.duration = $ => {
    let prep = parseDuration($(".recipe-details__cooking-time-prep span"))
    let cook = parseDuration($(".recipe-details__cooking-time-cook span"))
    return ((prep? prep: 0) + (cook? cook: 0) || undefined)
}