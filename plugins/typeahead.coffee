module.exports = ( env, callback ) ->

  fs            = require 'fs'
  StaticFile    = env.plugins.StaticFile
  ContentTree  = env.ContentTree

  class TypeaheadJson extends StaticFile

    getView: ->
      return ( env, locals, contents, templates, callback ) ->
        # locals, contents etc not used in this plugin

        items = []
        flat = ContentTree.flatten( contents )
        for page in flat
          item =
            title: page.title
            url: page.url
            value: page.filepath.relative
            description: page.description ? ''
            tokens: page.tokens ? []
          items.push item
        buffer = new Buffer( JSON.stringify(items) )
        callback null, buffer


  TypeaheadJson.fromFile = (filepath, callback) ->
    # normally you would want to read the file here, the static plugin however
    # just pipes it to the file/http response
    callback null, new TypeaheadJson(filepath)

  env.registerContentPlugin 'typeahead', 'typeahead.json', TypeaheadJson

  callback()