# THIS FILE DOENS"T WORK BECAUSE THE SHORTCODE DOESN'T SUPPORT MULTILINE

module.exports = ( env, callback ) ->

  register_shortcode  = env.plugins.register_shortcode
  ContentPlugin       = env.ContentPlugin
  hljs                = require 'highlight.js'  

  register_code_shortcode = (language) ->
    register_shortcode language, ( attr, content ) ->
      code = hljs.highlight(language, content).value
      return """<div class="highlight #{ language }">
        <div class="ribbon"></div>
        <div class="scroller"></div>
        <div class="code"><pre>#{ content }</pre></div>
      </div>"""

  register_code_shortcode("javascript")
  register_code_shortcode("handlebars")
  register_code_shortcode("html")    

  callback()