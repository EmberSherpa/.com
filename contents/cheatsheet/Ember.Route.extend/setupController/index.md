---
title: "setupController"
description: "function that can be used to configure the controller"
arguments:
    controller:
        required: true
        description: controller object instantiated for this route"
    model:
        required: false
        description: model(s) that were returned by route's model property"
tags: [ "controller", "model" ]
template: topic.jade
value: function
---

WARNING: Function assigned to this property has to set the model into the controller, otherwise the controller won’t have a model to use