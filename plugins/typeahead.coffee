# This plugin should be refactored to be more generic.

module.exports = ( env, callback ) ->

  fs            = require 'fs'
  StaticFile    = env.plugins.StaticFile
  ContentTree   = env.ContentTree

  class TypeaheadJson extends StaticFile

    getView: ->
      return ( env, locals, contents, templates, callback ) ->
        # locals, contents etc not used in this plugin

        @items = []

        make_item = ( page, parent ) ->
          if parent then parent = make_item parent, null
          tokens = page.tags ? []
          tokens.push page.title
          item =
            url: page.url
            value: page.title
            description: page.description ? ''
            tokens: tokens
            parent: parent
            arguments: page.arguments ? []

        add_to_items = ( page, parent ) =>
          @items.push make_item page, parent
          for topic in page.topics
            add_to_items topic, page

        cheatsheet = env.helpers.nest( contents.cheatsheet )
        for page in cheatsheet.topics
          add_to_items page, cheatsheet

        buffer = new Buffer( JSON.stringify(@items) )
        callback null, buffer


  TypeaheadJson.fromFile = (filepath, callback) ->
    callback null, new TypeaheadJson(filepath)

  env.registerContentPlugin 'typeahead', '**/*typeahead.json', TypeaheadJson

  callback()