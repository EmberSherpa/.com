---
title: "renderTemplate"
description: "hook to override default template rendered for this route"
value: function
arguments:
    controller:
        required: true
        description: controller object instantiated for this route"
    model:
        required: false
        description: model(s) that were returned by route's model property"
template: topic.jade
---

call ```js this.render( options )``` to cause the templates to actually be rendered

WARNING: If you do not call ```this.render``` method in this function then your route will not produce output during render