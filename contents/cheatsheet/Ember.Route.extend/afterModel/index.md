---
title: afterModel
description: hooked called after models are resolved ( use for late redirect )
arguments:
    model:
        required: false
        description: resolved promise
    transition: optional - promise
value: "function"
api_url: http://emberjs.com/api/classes/Ember.Route.html#method_afterModel
template: topic.jade
---

This hook is *executed* when model is resolved.