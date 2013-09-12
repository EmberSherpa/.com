module.exports = (env, callback) ->
  env.contentPlugins.map (plugin) ->
    # make wintersmith-browserify only process files from assets/js
    if plugin.group == 'scripts'
      plugin.pattern = '**/*combined.js'  
  if env.mode == 'preview' && env.locals.dev? then env.locals.url = env.locals.dev
  callback()