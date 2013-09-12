---
title: Ember CRUD example app without Ember Data
template: article.jade
tags: [ ember.js ]
description: "Learn to understand Ember architecture by building a CRUD app without Ember Data."
author: tarasm
date: 2013-09-11 15:00
menu:
  Demo:
    Run App: "app/index.html"
    Run Tests: "app/tests/index.html"
  Table of contents:
    Getting Started: "#start"
    Project Layout: "#layout"
    Grunt: "#grunt"
    JSHint: "#jshint"
    QUnit & Karma: "#qunit"
    ACMAScript 6 Modules: "#acmascript6"
  Links:
    Ember App Kit: "https://github.com/stefanpenner/ember-app-kit"
    Grunt: "http://gruntjs.com/"
    JSHint: "http://www.jshint.com/"
    Karma: "http://karma-runner.github.io/0.10/index.html"
    ECMAScript 6 modules: "http://wiki.ecmascript.org/doku.php?id=harmony:modules"
    Bower: "http://bower.io/"
    Ember Data: "https://github.com/emberjs/data"
    Ember Model: "https://github.com/ebryn/ember-model"
    EPF: "http://epf.io/"
---

When I started learning Ember.js, I spent a lot of time trying different persistence layers. In the process, tried *Ember Data*<span class="small">, at the time it was at Revision 13,</span> *Ember Model* and *EPF*. Without a solid understanding of the Ember architecture, it was difficult to tell where Ember stopped and the persistance layer began. When something wasn't working, I couldn't be sure if my code had a bug, if I was using the library incorrectly or there was a bug in the library that I was using. I decided that the best way for me to learn was to create a simple CRUD app that didn't use one of the existing persistance layers. 

This article will walk you through the *Ember CRUD Example* app to help you understand how Ember works and how to organize your project.

<span id="start"></span>
### Getting Started

To start, 

1. fork the [Ember CRUD Example](https://github.com/taras/ember-crud-example) repository on GitHub
2. clone your fork to your computer
3. in your working directory
  1. install Node.js modules with ```npm install``` ( assuming you have npm installed, if not [Introduction to npm](http://howtonode.org/introduction-to-npm) )
  2. install Bower components with ```bower install``` ( assuming you have bower installed, if not ```npm install -g bower```)
  3. install Grunt with ```npm install -g grunt-cli``` if you don't already have it installed
4. Verify that everything works
  1. start the dev server with ```grunt server```
  2. go to <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>
  3. your app should look like the <a href="app/index.html">demo</a>

<div class="dialog dialog-warning">If you're having difficulty with the setup, checkout the <a href="support.html">support page</a> or talk to me via <a href="https://clarity.fm/tarasm">Clarity.fm</a></div>

Going forward, I'll refer to files in your working directory. 

<span id="layout"></span>
### Project Layout

I started off writing the entire project in 2 files(app.js and index.html), but I wanted my code to look as close to a real project as possible, so I refactored my code to use *Ember App Kit*. *Ember App Kit* includes [Grunt](#grunt), [JSHint](#jshint), [QUnit with Karma](#qunit) test runner and [ECMAScript 6 modules](#ecmascript6).

<span id="grunt"></span>
#### Grunt

Grunt is a task runner that is used to automate repetitive action that occur during development. Tasks are configurd via the **/Gruntfile.js** file (look in root of your working directory). Ember App Kit comes preconfigured with a comprehensive set of tasks. Here is a list of the once that you'll use most frequently.

* ```grunt``` - build your app and run the tests.
* ```grunt server``` - run the server in development mode and auto-rebuilding when files change
* ```grunt test:server``` - run the server in test mode and re-run the tests when files change

For a complete list of tasks checkout the **/Gruntfile.js**.

<span id="jshint"></span>
#### JSHint

JSHint reports common errors in your code. In *Ember App Kit*, JSHint is used as a Grunt task that runs when you run ```grunt```, ```grunt server``` or any of the ```grunt test``` tasks. You can also run it manually with ```grunt jshint```. 

When any of these commands run, you'll see a line that starts with **Running "jshint:all" (jshint) task**

![JSHint Example](js-hint.jpg)

<span id="qunit"></span>
#### QUnit & Karma

QUnit is the testing framework that is recommended by the Ember.js Core Team. Karma is a test runner that allows us to run tests in the browser or headless via PhantomJS.

Here are some of the ways that you can execute the tests:

* ```grunt test``` runs the tests one time.
* ```grunt test:server``` opens Karma test runner and re-runs the tests everytime a file changes
* in the browser, go to [http://localhost:8000/tests/](http://localhost:8000/tests) directory

<span id="acmascript6"></span>
#### ACMAScript 6 Modules

Ember provides namespacing which allows you to keep your app's classes out of the global scope. Modules take this a step further by requiring you to explicitely import objects into your scope. *ACMAScript 6 modules* is a features that's coming in the next version of JavaScript, but you can use them today with the help of *es6-module-transpiler*.  You don't have to know how it works, but you need to know how to use it.

Every module can import objects from other modules and export modules to make them available to other modules. A good example of this is in **/app/routes/application.js**.

At the top of the file, we import Photo model from 'ember-crud-example/models/photo' with ```import Photo from 'ember-crud-example/models/photo';```. This makes the *Photo* model from *ember-crud-example/models/photo* module available within the *application* module. 

In turn, *application* module exports *ApplicationRoute* to make it available to other modules with ```export default ApplicationRoute;```

<div class="dialog dialog-warning">You don't have to set your classes into the App namespace. ( ie. ~~```App.ApplicationRoute = Ember.Route.extend({}); ```~~ ), but you have to import your *App* from the *app* module with ```import App from 'ember-crud-example/app';```.
</div>

**ember-crud-example** is the namespace and it's configured via the *namespace* property in **/package.json**.
