module.exports = (env, callback) ->

  utils = env.utils
  path  = require 'path'

  page            = env.plugins.MarkdownPage
  ContentTree     = env.ContentTree
  ContentPlugin   = env.ContentPlugin

  nest = (tree) ->
    ### Return all the items in the *tree* as an array of content plugins. ###
    index = tree[ 'index.md' ]
    index.topics = []
    for key, value of tree
      if key == 'index.md'
        # skip
      else if value instanceof ContentTree
        index.topics.push nest value
      else if value instanceof ContentPlugin
        index.topics.push value
      else
        # skip
    return index

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
    topics: []

    constructor: ( @filepath, @metadata, @markdown ) ->
      @directory = path.dirname( @filepath.full )

    getView: -> 'onepager'

    setTopics: ->
      ContentTree.fromDirectory env, @directory, ( err, tree ) =>
        tree = nest tree
        @topics = tree.topics

    @property 'description', 'getDescription'
    getDescription: ->
      if @metadata.description then @metadata.description

    @property 'arguments', 'getArguments'
    getArguments: ->
      if @metadata.arguments then @metadata.arguments

    @property 'argument_names', 'getArgumentNames'
    getArgumentNames: ->
      args = @getArguments()
      result = ""
      if args
        result = "( "
        i = 0
        console.log args.length
        for key, value of args
          i = i + 1
          result += key
          if i != Object.keys(args).length
            result += ", "
        result += " )"
      return result




  OnePagerPage.fromFile = (args...) ->
    page.fromFile.apply(this, args)

  env.registerContentPlugin 'topics', 'topics/**', OnePagerPage

  # register the template view used by the page plugin
  env.registerView 'onepager', onePagerView

  env.registerGenerator 'onepager', (contents, callback) ->
    callback null, contents

  callback()