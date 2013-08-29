module.exports = (env, callback) ->

  path      = require 'path'
  hljs      = require("highlight.js")
  JsonPage  = env.plugins.JsonPage

  defaults =
    template: 'codemodule.jade' # template that renders pages
    pattern: '**/*.coffee' # glob pattern used to match pages

  # assign defaults any option not set in the config file
  options = env.config.codemodule or {}
  for key, value of defaults
    options[key] ?= defaults[key]

  getFunctionBody = ( code ) ->
    code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

  highlight = ( code, language ) ->
    if not language then language = 'javascript'
    hljs.highlight( language, code ).value

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

    @property 'scripts', ->
      return @metadata.scripts

  CodeModulePage.fromFile = ( filepath, callback ) ->
    module = require( env.utils.stripExtension( filepath.full ) )
    if !module.hasOwnProperty('code')
      error =
        filename: filepath.relative
        message: "Code module is missing code"
    if error then return callback error
    metadata =
      description:  module.description or ''
      template:     module.template or 'codemodule.jade'
      code:         getFunctionBody module.code.toString()
      tests:        getFunctionBody module.tests.toString()
      filename:     module.filename or path.basename( filepath.full, '.coffee' ) + ".html"
      scripts:      module.scripts or []
    markdown = module.html or ''
    page = new this filepath, metadata, markdown
    callback null, page

  env.registerContentPlugin 'codemodules', options.pattern, CodeModulePage

  env.plugins.CodeModulePage  = CodeModulePage
  env.helpers.highlight       = highlight

  callback()