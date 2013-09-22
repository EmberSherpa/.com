module.exports = (env, callback) ->

  hljs      = require("highlight.js")

  type = (obj) ->
    if obj == undefined or obj == null
      return String obj
    classToType = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object'
    }
    return classToType[Object.prototype.toString.call(obj)]

  get = (page, property) ->
    if page && page[property]? then page[property]
    else if page && page.metadata? && page.metadata[property]? then page.metadata[property]
    else ""

  # Return pages on the same level this given page
  get_children = (page) ->
    children = []
    Object.keys(page.parent || {}).map (key) ->
      child = page.parent[key]
      if child isnt page
        if child["index.md"]? then children.push child["index.md"]
        else if child["index.json"]? then children.push child["index.json"]
    return children

  highlight = (code, language) ->
    if not language then language = 'javascript'
    hljs.highlight( language, code ).value

  env.helpers.get = get
  env.helpers.get_children = get_children
  env.helpers.highlight = highlight

  callback()