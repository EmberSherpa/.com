async     = require 'async'

module.exports = (env, callback) ->

  JsonPage  = env.plugins.JsonPage

  class ContributorsPage extends JsonPage
    constructor: (@filepath, @metadata, @markdown) ->
      console.log @filepath
      console.log @metadata

    @property 'contributors', -> 
      return 'hello'

  class ContributorPage extends JsonPage

    constructor: (@filepath, @metadata, @markdown) ->

    @property 'title', ->
      if @metadata.name? then return @metadata.name else @metadata.title

    @property 'photo', ->
      if @metadata.photo? then return @metadata.photo

  ContributorPage.fromFile = JsonPage.fromFile
  ContributorsPage.fromFile = JsonPage.fromFile

  env.registerContentPlugin 'contributor', 'contributors/!(index.json)', ContributorPage
  env.registerContentPlugin 'contributors', 'contributors/index.json', ContributorsPage

  callback() # tell the plugin manager we are done