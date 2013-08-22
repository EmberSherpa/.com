---
title: afterModel
description: hooked called after models are resolved ( use for late redirect )
arguments:
    model: optional - resolved promise
    transition: optional - promise
api_url: http://emberjs.com/api/classes/Ember.Route.html#method_afterModel
template: index.jade
---

This hook is *executed* when model is resolved.

[codemodule src="cancel-transition"]