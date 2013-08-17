module.exports = (env, callback) ->

  utils = env.utils
  path  = require 'path'

  page = env.plugins.MarkdownPage

  class OnePagerPage extends page
    constructor: (@filepath, @metadata, @markdown) ->
      dirname = path.dirname( @filepath.full )
      utils.readdirRecursive( dirname,
      ( error, result ) =>
        @topics = result[1..]
      )

  OnePagerPage.fromFile = (args...) ->
    page.fromFile.apply(this, args)

  env.registerContentPlugin 'topics', 'topics/**', OnePagerPage

  env.registerGenerator 'onepager', (contents, callback) ->
    callback null, contents


  callback()