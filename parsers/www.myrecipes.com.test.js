const { parser } = require('../src/parser')
const RecipeParser = require('./www.myrecipes.com')
const Default = require('../src/default')

describe('myrecipes.com', () => {
    let recipe
  beforeAll(async () => {
    const urlString = 'https://www.myrecipes.com/recipe/roasted-red-pepper-hummus-veggie-wraps'
    const {data} = await RecipeParser.fetch(urlString, {})
//    console.log(data)
    recipe = parser(Default)(data, { urlString })
    console.log(JSON.stringify(recipe))
  })

  test('title', async () => {
    expect(recipe.title).toEqual('Roasted Red Pepper Hummus Veggie Wraps')
  })

})