module.exports.description = """Debugging Flags""";

module.exports.html = """
"""

module.exports.code = `function() {
// activate logging of binding related activities
Em.LOG_BINDINGS = true;

var App = window.App = Em.Application.extend({
    // activate logging of deprecated method or property usage
    LOG_STACKTRACE_ON_DEPRECATION : true,
    // activate basic logging of successful transitions
    LOG_TRANSITIONS               : true,
    // activate detailed logging of all routing steps
    LOG_TRANSITIONS_INTERNAL      : true,
    // activate logging of results of view and template searches by routes
    LOG_VIEW_LOOKUPS              : true,
    // activate logging of automatically generated routes and controllers
    LOG_ACTIVE_GENERATION         : true
});
}
`

module.exports.tests = `function() {
  // no tests yet
}
`