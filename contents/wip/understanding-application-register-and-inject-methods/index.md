---
title: Understanding application register & inject methods in Ember.js
tags: [ Ember, development ]
template: 
date: 2013-09-03
description: detailed summary of App.register and App.inject methods
author: taras
---

Ember.js is built on the ability to "inject" functionality into disparate parts of the the framework and applications that are created with Ember. This is called [dependency injection](http://en.wikipedia.org/wiki/Dependency_injection). This reduces boilerplate and encourages reuse by allowing to break code into smaller bunches and inject it as necessary. This allows Ember Data to *feel* like its part of Ember even though its in a separate repository.


<span class="more"></span>

#### Summary

- Each Ember app has a container that's responsible for creating and tracking created objects
- **App.register** & **App.inject** methods are used to configure how App's container creates objects
- Use **App.inject** to add a property to every instance of a type
- Use **App.register** to add a type that can be injected with **App.inject**
- App's container can be found at ```App.__container__```, but **DO NOT** access it directly, except for debugging
- Internally, ```App.__container__.lookup(type)``` method is used  to get/create objects

#### Explanation

To make dependency injection predictable and reliable, Ember apps have a [container](https://github.com/emberjs/ember.js/blob/master/packages/container/lib/main.js) that's responsible for instantiating objects and keeping track of them. The container is able to find objects by type using its *lookup* method. For example, ```App.__container__.lookup ('controller:application')``` returns an instance of *App.ApplicationController* if it was declared, otherwise it automatically generates an instance from an *Ember.Controller*.

As an app developer, you're discouraged from accessing your app's container directly, but you can use the [App.register](#App.register) method which will pass your arguments onto the container. Once you registered your types, you can inject them into instances of other types using [App.inject](#App.inject) method.

<span id="App.register"></span>
##### ```App.register(type, factory, options)```

- **type** is a string that can be used with ```App.__container__.lookup(type)``` to get this object ( example: 'model:user' or 'fruit:favorite' )
- **factory** is the object that's used to create the return value ( example: ```App.Person``` or ```Orange``` )
- **options** is a hash that tells the container what to do with the factory object ( default: { instantiate: true, singleton: true } )

##### ```App.inject(factoryNameOrType, property, injectionName)```

- **factoryNameOrType** is a string that's used to find object instances to inject into ( example: 'model:user' or 'model' )
- **property** is a string name of the property that will be set ( example: "session" )
- **injectionName** is string type that's passed to *lookup* to get value to be set

#### Code Example

[codemodule]app-register[/codemodule]