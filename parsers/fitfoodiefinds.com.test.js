const util = require('util')
const { parser } = require('../src/parser')
const RecipeParser = require('./fitfoodiefinds.com')
const importer = parser(RecipeParser)
const { testAsset } = require('../test')

describe('fitfoodiefinds', () => {
  let result

  beforeAll(async () => {
    const source = await testAsset('fitfoodiefinds.com/sw-bb-cc-salad.html')
    result = await importer(source)
    debug(util.inspect(result))
  })

  test.skip('title', async () => {
    expect(result.title).toBe('Southwestern Black Bean Couscous Salad')
  })

  test('source_author', async () => {
    expect(result.source_author).toBe('Lee Hersh')
  })

  test('image_url', async () => {
    expect(result.image_url).toBe('https://fitfoodiefinds.com/wp-content/uploads/2016/04/square11-150x150.png')
  })

  test('duration', async () => {
    expect(result.duration).toEqual(1800)
  })

  test('yield', async () => {
    expect(result.yield).toEqual('6')
  })

  test('ingredient lists', async () => {
    expect(result.ingredient_lists).toHaveLength(2)
    expect(result.ingredient_lists[0].name).toBe('For the Salad')
    expect(result.ingredient_lists[0].lines).toHaveLength(6)
    expect(result.ingredient_lists[1].name).toBe('For the Dressing')
    expect(result.ingredient_lists[1].lines).toHaveLength(5)
  })
  
  test('procedure lists', async () => {
    expect(result.procedure_lists).toHaveLength(1)
    expect(result.procedure_lists[0].name).toBeUndefined()
    expect(result.procedure_lists[0].lines).toHaveLength(4)
  })
  
})

describe('fitfoodiefinds no sections', () => {
  let result
  const importer = parser(RecipeParser)

  beforeAll(async () => {
    const source = await testAsset('fitfoodiefinds.com/sw-bb-cc-salad2.html')
    result = await importer(source)
  })
  
  test('ingredient lists', async () => {
    expect(result.ingredient_lists).toHaveLength(1)
    expect(result.ingredient_lists[0].name).toBeUndefined()
    expect(result.ingredient_lists[0].lines).toHaveLength(11)
  })
})

function debug(msg) {
  console.log(`\x1b[7m${msg}\x1b[0m`)
}