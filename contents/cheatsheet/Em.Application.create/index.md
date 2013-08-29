---
title: Em.Application.create
template: topic.jade
tags: [ 'application', 'namespace', 'create' ]
description: creates an instance that will be your app and your app's namespace
arguments:
    "{}":
        required: false
        open: true
---

### Debugging

```javascript
var App = window.App = Em.Application.extend({
    LOG_STACKTRACE_ON_DEPRECATION : true,
    LOG_TRANSITIONS               : true,
    LOG_TRANSITIONS_INTERNAL      : true,
    LOG_VIEW_LOOKUPS              : true,
    LOG_ACTIVE_GENERATION         : true
})
```