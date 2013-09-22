module.exports = ( env, callback ) ->

  register_shortcode  = env.plugins.register_shortcode
  logger              = env.logger
  ContentPlugin       = env.ContentPlugin
  jade                = require( 'jade' )  

  register_dialog_shortcode = (level) ->
    register_shortcode level, ( attr, content ) ->
      unless @ instanceof ContentPlugin then logger.log( logger.WARN, "You have to bind apply_shortcodes to the page, try apply_shortcodes.call(@, content)" )
      template = """.dialog.dialog-#{ level }!= content"""
      ctx =
        content: content
      
      return jade.render template, ctx

  register_dialog_shortcode 'info'
  register_dialog_shortcode 'warning'
  register_dialog_shortcode 'danger'

  callback()