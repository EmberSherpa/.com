---
title: Contributor Guide
template: page.jade
menu:
    Table of Contents:
        Introduction: "#introduction"
        Quick Guide to Wintersmith: "#wintersmith"
        Cheatsheet: "#cheatsheet"
        Metadata: "#metadata"
        Arguments: "#arguments"
        Local: "#local"
    Links:
        Repository: http://github.com/taras/embersherpa
        Issues: http://github.com/taras/embersherpa/issues
---

<span id="introduction"></span>

The easiest way to contribute is to either edit content on GitHub or [create an issue](https://github.com/taras/embersherpa/issues/new). Every page inside of the cheatsheet has an <a href="https://github.com/taras/embersherpa/edit/master/contents/contribute/index.md" class="gh-btn inline"><span class="gh-ico"></span><span class="gh-text">Edit</span></a> button in the top right corner of the page. On GitHub, you can edit pages but not add new pages. To add pages to the cheatsheet, you have to <iframe src="/assets/github-btn.html?user=taras&repo=embersherpa&type=fork" allowtransparency="true" frameborder="0" scrolling="0" width="55px" height="20px"></iframe> the repository on GitHub and setup the project locally.

<h4 id="wintersmith">Quick Guide to Wintersmith</h4>

* Wintersmith is a static site generator that we're using to generate Ember Sherpa
* it generates pages from files in **/contents/** directory
* each page of the site is an index.md file in a directory
* directory name becomes the url for the page
* each page has metadata in [YAML format](http://www.yaml.org/refcard.html) that's used to configure its presentation
* ```title``` & ```template``` meta properties are common to all page types
* Learn more on [Wintersmith.io](http://wintersmith.io)

<h4 id="content-guild">Content Guide</h4>

Ember Sherpa is designed for Ember.js developers to use while they're in the zone. Unnecessary verbiage wastes precious time. Please, keep the following guidelines in mind while contributing:

* keep verbosity to a minimum
* stay pragmatic and exclude controversial topics
* explore controversial topics on your blog or [discuss.emberjs.com](http://discuss.emberjs.com)

<h4 id="cheatsheet">The Cheatsheet</h4>

* [/cheatsheet/](/cheatsheet/) is dynamically generated from content in [/contents/cheatsheet/](https://github.com/taras/embersherpa/tree/master/contents/cheatsheet) directory
    * each item in the cheatsheet is a directory in **/contents/cheatsheet/** with index.md
    * the directory name becomes the url of the item
* page hierarchy
    * directories in **/contents/cheatsheet/** are methods
    * sub-directories are properties

**Example hierarchy**

```
/contents/cheatsheet/Em.View.extend # directory for extend method
/contents/cheatsheet/Em.View.extend/templateName # sub-directory for templateName property
/contents/cheatsheet/Em.View.extend/templateName/index.md # file with metadata and text for the page
```

**<span id="metadata">Metadata</span>**

| name        | required |  description                                                        | options                       | example                                |
| ----------- | :------: | :-----------------------------------------------------------------: | :---------------------------: | : -----------------------------------: |
| title       | yes      | title for this page, use proper capitalization                      |                               | ```Em.Object.extend```, ```YourApp.Router.map``` |
| tags        | yes      | keywords used in the search field ( page title automatically added  |                               | [ template, templateName, defaultTemplate ] |
| description | yes      | summary of this method or property, keep under 100 characters       |                               | provides data to be used by the controller and the view |
| arguments   | no       | arguments that a method or a function property accepts              |                               | [Arguments Examples](#arguments)       |
| value       | no       | example value or type of value                                      | function, object, [ ]         | "[ 'dataSize', 'href' ]"

** <span id="arguments">Arguments</span> **

```
---
title: Em.View.extend
template: topic.jade
tags: [ view ]
description: creates a class that is a descendant of Em.View
arguments:
    mixins:
        required: false
    "{}":
        required: false
        open: true
---
```

<h4 id="local">Local Installation</h4>

1. <iframe src="/assets/github-btn.html?user=taras&repo=embersherpa&type=fork" allowtransparency="true" frameborder="0" scrolling="0" width="55px" height="20px"></iframe>
2. Clone your repository
3. ```npm install```
4. ```bower install```
5. ```wintersmith preview```
6. Go to the site [http://localhost:8080](http://localhost:8080)

**Few words of caution about local development: **
<div class="alert alert-warning"><ul><li>In preview mode, url handling is funky: **you'll have to end your urls with trailing slash(/) otherwise you'll get a 404**</li><li>If you modify coffeescript or js, you'll probably have to restart your preview server</li><li>run in --verbose mode to see more information about what's going on ```wintersmith preview --verbose```</li></div>

<h4 id="stack">The stack</h4>

- [Flat UI](http://designmodo.github.io/Flat-UI/) on top of [Twitter Bootstrap 2.3.2](http://getbootstrap.com/2.3.2/)
- [Typeahead.js](http://twitter.github.io/typeahead.js/) used for search
- [Wintersmith](http://wintersmith.io/) used to generate html from content structure
- Templates are build with [Jade](http://jade-lang.com/reference/)
- Content is in [GitHub Style Markdown](https://help.github.com/articles/github-flavored-markdown)
- [Several custom built](https://github.com/taras/embersherpa/tree/master/plugins) Wintersmith plugins written in CoffeeScript
- [Grunt](http://gruntjs.com/) for automating tasks
- [Ember.js](http://emberjs.com/) only used to make writing JS in the browser easier ( for now )
- [Qunit](http://qunitjs.com/) used for running tests
- [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/) library and [Highlight.js Node module](https://npmjs.org/package/highlight.js) for code highlighting

