module.exports = (env, callback) ->

  utils = env.utils
  path  = require 'path'

  page = env.plugins.MarkdownPage
  contentTree = env.ContentTree

  class OnePagerPage extends page

    topics = []

    constructor: (@filepath, @metadata, @markdown) ->
      dirname = path.dirname( @filepath.full )
      thisPage = @
      utils.readdirRecursive( dirname,
      ( error, @topics ) =>
        @topics[1..].map( (@item) =>
          page.fromFile( { full: path.join( dirname, item ), relative: item },
          ( error, result ) =>
            thisPage.topics.push result
          )
        )
      )

  OnePagerPage.fromFile = (args...) ->
    page.fromFile.apply(this, args)

  env.registerContentPlugin 'topics', 'topics/**', OnePagerPage

  env.registerGenerator 'onepager', (contents, callback) ->
    callback null, contents

  callback()