module.exports = (env, callback) ->

  path              = require 'path'
  highlight         = require("highlight").Highlight
  JsonPage          = env.plugins.JsonPage

  getFunctionBody = ( code ) ->
    code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

  class CodeModulePage extends JsonPage
    constructor: ( @filepath, @metadata, @markdown ) ->

    @property 'description', ->
      return @metadata.description

    @property 'code', ->
      return @metadata.code

    @property 'tests', ->
      return @metadata.tests

    @property 'html', ->
      return @markdown

  CodeModulePage.fromFile = ( filepath, callback ) ->
    module = require( env.utils.stripExtension( filepath.full ) )
    if !module.hasOwnProperty('code')
      error =
        filename: filepath.relative
        message: "Code module is missing code"
    if error then return callback error
    metadata =
      description:  module.description or ''
      template:     module.template or 'test.jade'
      code:         getFunctionBody module.code.toString()
      tests:        getFunctionBody module.tests.toString()
      filename:     module.filename or path.basename( filepath.full, '.coffee' ) + ".html"
    markdown = module.html or ''
    page = new this filepath, metadata, markdown
    callback null, page

  env.registerContentPlugin 'codemodules', 'cheatsheet/**/*.coffee', CodeModulePage

  env.plugins.CodeModulePage  = CodeModulePage
  env.helpers.highlight       = highlight

  callback()