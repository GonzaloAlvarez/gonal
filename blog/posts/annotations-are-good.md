title: Annotations are good
date: 2015/9/10 10:15:00
#categories:
#    - spring
#    - java
draft: true
#tags:
#    - gif
#    - annotations
#    - java
#    - spring
---
Using annotations in your code will make it easier to read, hence more maintainable, and far more powerful. Yet, some people try to make us think that are the new evil to avoid.
<!-- more -->

{% blockquote Scratch Pad http://scratchpad101.com/2015/08/06/annotations-are-evil/ %}
While people say – it’s easier to read the Code, it’s easier to debug the code with annotations in the mix, they forget what’s it’s not code in code anymore – they have embedded configuration in code. And as far as I remember Configurations were supposed to be externalized. The problem is more severe in cases where we use ORM frameworks like Hibernate and JPA.
{% endblockquote %}

And that, kids, is mixing apples and oranges.

{% svideo patrickstewardfacepalm %}

I get it. You have a lot of frustration when using hibernate with annotations, and that's understandable. Others have recognize that is a pain. But I personally align with
what Martin Fowler said years ago:

{% blockquote ORM Hate, Martin Fowler http://martinfowler.com/bliki/OrmHate.html %}

Listening to some critics, you'd think that the best thing for a modern software developer to do is roll their own ORM. The implication is that tools like Hibernate and Active Record have just become bloatware, so you should come up with your own lightweight alternative. Now I've spent many an hour griping at bloatware, but ORMs really don't fit the bill - and I say this with bitter memory. For much of the 90's I saw project after project deal with the object/relational mapping problem by writing their own framework - it was always much tougher than people imagined. Usually you'd get enough early success to commit deeply to the framework and only after a while did you realize you were in a quagmire - this is where I sympathize greatly with Ted Neward's famous quote that object-relational mapping is the [Vietnam of Computer Science](http://blogs.tedneward.com/2006/06/26/The+Vietnam+Of+Computer+Science.aspx).

{% endblockquote %}

But you are missing the point by blaming annotations. Annotations are very useful tool. Let me elaborate.
