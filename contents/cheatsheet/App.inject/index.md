---
title: App.inject
template: 
tags: [ application, inject ]
description: add a property onto every object of a specific type
arguments:
    type:
        required: true
        description: object type to add a property to
    property:
        required: true
        description: name of property to set
    injection:
        required: true
        description: value to inject, can be a lookup string ( ie. controller:application )
api_url: http://emberjs.com/api/classes/Ember.Application.html#method_inject
---

