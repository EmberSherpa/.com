---
title: Adjusting to Ember App Kit
description: Everything you need to know about what do differently when using Ember App Kit
tags: []
template: article.jade
---

### Templates

#### Use object identifiers instead of objects
Source: @joefiorini on [Introduction to Ember App Kit on Ember Discuss](http://discuss.emberjs.com/t/introduction-to-ember-app-kit/2683/3)

You should no longer refer to my Ember objects by identifier but by module name. Meaning where in Ember without EAK I would write:
{{render post.comments}}
to render the PostComments template using App.PostComments as the controller, in EAK I could say:

{{render "post/comments"}}
and have it load templates/post/comments and the controller in app/controllers/post/comments. This also allows me to use dashes in my file names rather than underscores or camel-casing.
