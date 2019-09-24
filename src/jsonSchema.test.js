const util = require('util')
const parser = require('./jsonSchema')
const { testAsset } = require('../test')
const cheerio = require('cheerio')

describe('json schema', () => {
  let $
  
  beforeAll(async () => {
    const html = await testAsset('cookieandkate.com/ExtraVegetableFriedRice.html')
    $ = cheerio.load(html)
//    debug(util.inspect(result, {depth: 4}))
  })

  test('title', async () => {
    expect(parser.title($)).toBe('Extra Vegetable Fried Rice')
  })
  test('description', async () => {
    expect(parser.description($)).toMatch(/^Learn how to make vegetable fried rice/)
  })

  test('source_author', async () => {
    expect(parser.source_author($)).toBe('Cookie and Kate')
  })

  test('image_url', async () => {
    expect(parser.image_url($)).toBe("https://cookieandkate.com/images/2017/05/vegetable-fried-rice.jpg")
  })

  test('duration', async () => {
    expect(parser.duration($)).toEqual(2100)
  })

  test('yield', async () => {
    expect(parser.yield($)).toEqual('2 to 3 servings')
  })

  test('ingredient lists', async () => {
    expect(parser.ingredient_lists($)).toHaveLength(1)
    expect(parser.ingredient_lists($)[0].name).toBeUndefined()
    expect(parser.ingredient_lists($)[0].lines).toHaveLength(15)
    expect(parser.ingredient_lists($)[0].lines[0]).toMatchObject({
      name: '+ 2 tablespoons avocado oil or safflower oil, divided',
      quantity_numerator: 3,
      quantity_denominator: 2, 
      unit: 'tsp'

    })
  })
  
  test('procedure lists', async () => {
    expect(parser.procedure_lists($)).toHaveLength(1)
    expect(parser.procedure_lists($)[0].name).toBeUndefined()
    expect(parser.procedure_lists($)[0].lines).toHaveLength(7)
    expect(parser.procedure_lists($)[0].lines[0]).toMatchObject({
//      name: expect.toBe(null), Doesn't work, see https://stackoverflow.com/questions/53369407/include-tobecloseto-in-jest-tomatchobject
      text: expect.stringMatching(/^This recipe comes together quickly/)
    })
  })
  
})

function debug(msg) {
  console.log(`\x1b[7m${msg}\x1b[0m`)
}
