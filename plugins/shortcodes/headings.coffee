module.exports = ( env, callback ) ->

  register_shortcode  = env.plugins.register_shortcode
  ContentPlugin       = env.ContentPlugin
  jade                = require( 'jade' )  

  to_slug = (str) ->
    str = str.replace(/^\s+|\s+$/g, "")
    from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
    to   = "aaaaeeeeiiiioooouuuunc------"
    for i in [i..from.length]
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
    # remove accents, swap ñ for n, etc  
    str = str.replace(/\s+/g, "-").replace(/-+/g, "-")
    # remove invalid chars, collapse whitespace and replace by -, collapse dashes
    return str # unnecessary line, but for clarity

  register_heading_shortcode = (heading) ->
    register_shortcode heading, ( attr, content ) ->
      template = """#{ heading }(id=id)= content"""
      ctx =
        content: content
        id: to_slug(content)
      
      return jade.render template, ctx

  register_heading_shortcode("h1")
  register_heading_shortcode("h2")
  register_heading_shortcode("h3")
  register_heading_shortcode("h4")
  register_heading_shortcode("h5")
  register_heading_shortcode("h6")

  callback()