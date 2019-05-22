# THe three ways to write a parser

## Usage

```
const { parserForUrl } = require('recipe-parsers')
const parser = parserForUrl('https://example.com/recipe')
const parsed = parser(dom)
```

If yo uwant all the parerss, you can do `Parsers`.

The library will always return a parser. If no specific one for that hostname is found, it will return out generic parser. The generic parser looks for certain dom-elements and can hand it off to a sub-parser, or try it's best.


# Total
```
module.exports = parser(
  defaults({
    description,
    duration,
    yld,
    ingredient_lists,
    procedure_lists
  })
)
```

If the file exports a default export, and that export is a function, it is treated as the parser. If no domain is specified for the handler, it uses the filename. Therefore, name the file correctly. It will use it for tat hostname. If you want to specify additional/different hostnames than the file name, use:

```
module.exports = parser(
  defaults({
    description,
    duration,
    yld,
    ingredient_lists,
    procedure_lists
  }, ['www.example.com', 'example.com', 'example.org'])
)
```

# JS for Some attributes
If the defaults work fine and you only need to correct some attributes, then you can export those attributes only. Lowercase names. All exports are functions that take the Cheerio dom handler as their only parameter

```

exports.duration = ($: any) => {
  return moment.duration($('#cooking-time').text()).asSeconds()
}
```

It will use the default parser for everything else.

# json/js strings
If you only need to prompt the handler with some CSS selectors for finding elements, yo ucan export a JSON object, or JS strings only.

```
exports.description = 'p.description'

exports.ingredient_lists = '.special-recipe ul li'
```

or

file: `myrecipesite.json`
```
{
  "description": "p.description"
}
```
