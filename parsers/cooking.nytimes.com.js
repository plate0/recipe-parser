const moment = require('moment')

exports.yield = $ =>
  $('ul.recipe-time-yield li')
    .first()
    .find('span')
    .last()
    .text()
    .trim()

exports.duration = $ =>
  moment.duration($('meta[itemprop="cookTime"]').attr('content')).asSeconds()

exports.preheats = '.recipe-steps'
exports.ingredient_lists = 'ul.recipe-ingredients li'
exports.procedure_lists = 'ol.recipe-steps li'
