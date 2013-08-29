module.exports = ( env, callback ) ->

  register_shortcode  = env.plugins.register_shortcode
  logger              = env.logger
  ContentPlugin       = env.ContentPlugin
  jade                = require( 'jade' )
  hljs                = require( 'highlight.js' )

  register_shortcode 'codemodule', ( attr, content ) ->
    unless @ instanceof ContentPlugin then logger.log( logger.WARN, "You have to bind apply_shortcodes to the page, try apply_shortcodes.call(@, content)" )

    template = """
div.codemodule.embed
  div.highlight.javascript
    div.ribbon
    div.scroller
      div.code
        pre
          != code
  a.btn.btn-small.btn-info(href=url) Run Tests
"""

    name = content + ".coffee"
    # check that src Code Module exists
    if not @parent[ name ]? then return name + " does not exist."

    cm = @parent[ name ]

    ctx =
      code: hljs.highlight( 'javascript', cm.code ).value
      url: cm.url
    
    return jade.render template, ctx

  callback()