module.exports = ( env, callback ) ->

  class Shortcode
    constructor: (@name, @replacer) ->

  class Shortcodes
    this.registered = []

  register_shortcode = ( code, replacer ) ->
    Shortcodes.registered.push new Shortcode code, replacer

  apply_shortcodes = ( content ) ->
    for code in Shortcodes.registered
      findCode = new RegExp '\\[' + code.name + '(.*=\".*\")?\\](.*\\[\/' + code.name + '\])?', 'g'

      replacer = (match, attribstr, content) =>
        # create attribute dictionary
        attributes = {}

        for entry in attribstr.split ' '
          offset = entry.indexOf('=')
          key = entry.substring(0, offset)
          value = entry.substring(offset + 1)
          value = value.replace /"/g, ''
          attributes[key] = value if key != ""

        # strip closing tag off content if exists
        content = content.substring(0, content.lastIndexOf('[/')) if content?

        # run shortcode replacer function
        code.replacer.call( @, attributes, content )

      content = content.replace findCode, replacer
      content.toString()

  env.plugins.register_shortcode  = register_shortcode
  env.plugins.apply_shortcodes    = apply_shortcodes

  callback()