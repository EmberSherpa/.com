module.exports = (env, callback) ->

  utils = env.utils
  path  = require 'path'

  page = env.plugins.MarkdownPage
  ContentTree = env.ContentTree

  onePagerView = (env, locals, contents, templates, callback) ->
    ### Behaves like templateView but allso adds topics to the context ###

    if @template == 'none'
      return callback null, null

    template = templates[@template]
    if not template?
      callback new Error "page '#{ @filename }' specifies unknown template '#{ @template }'"
      return

    @setTopics()

    ctx =
      env: env
      page: this
      contents: contents

    env.utils.extend ctx, locals

    template.render ctx, callback

  class OnePagerPage extends page
    directory: null
    topics: {}

    constructor: ( @filepath, @metadata, @markdown ) ->
      @directory = path.dirname( @filepath.full )

    getView: -> 'onepager'

    setTopics: ->
      ContentTree.fromDirectory env, @directory, ( err, tree ) =>
        @topics = ContentTree.flatten( tree )[1..]

    @property 'description', 'getDescription'
    getDescription: ->
      if @metadata.description then @metadata.description

  OnePagerPage.fromFile = (args...) ->
    page.fromFile.apply(this, args)

  env.registerContentPlugin 'topics', 'topics/**', OnePagerPage

  # register the template view used by the page plugin
  env.registerView 'onepager', onePagerView

  env.registerGenerator 'onepager', (contents, callback) ->
    callback null, contents

  callback()