module.exports = (env, callback) ->

  utils = env.utils
  path  = require 'path'

  page = env.plugins.MarkdownPage
  contentTree = env.ContentTree

  class OnePagerPage extends page
    constructor: (@filepath, @metadata, @markdown) ->
      dirname = path.dirname( @filepath.full )
      utils.readdirRecursive( dirname,
      ( error, @topics ) =>
        console.log "For: " + dirname
        @topics[1..].map( (@item) =>
          page.fromFile( { full: path.join( dirname, item ), relative: item },
          ( error, result ) =>
            @item = result
            console.log @item
          )
          return item
        )
      )

  OnePagerPage.fromFile = (args...) ->
    page.fromFile.apply(this, args)

  env.registerContentPlugin 'topics', 'topics/**', OnePagerPage

  env.registerGenerator 'onepager', (contents, callback) ->
    callback null, contents

  callback()