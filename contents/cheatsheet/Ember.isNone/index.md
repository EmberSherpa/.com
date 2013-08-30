---
title: Ember.isNone
template: topic.jade
tags: [ isNull, null, none, nill, NaN ]
description: Returns true if the passed value is null or undefined.
arguments:
    obj:
        required: false
        description: value that you'd like to check
---

```javascript
Ember.isNone();              // true
Ember.isNone(null);          // true
Ember.isNone(undefined);     // true
Ember.isNone('');            // false
Ember.isNone([]);            // false
Ember.isNone(function() {});  // false
```