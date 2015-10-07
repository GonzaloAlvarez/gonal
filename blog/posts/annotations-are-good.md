title: Annotations are good
date: 2015/9/20 10:15:00
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

{% svideo patrickstewardfacepalm That is mixing apples and oranges%}

I get it. You have a lot of frustration when using **hibernate** with annotations, and that's understandable. But by using annotations you are not mixing configuration with code or making your code less maintainable. If something, you are making it more flexible and readable, hence more maintainable.

But you know what, you are not the first one claiming that annotations are pure evil. [Robin Sharp](https://web.archive.org/web/20060702222249/http://www.softwarereality.com/programming/annotations.jsp) posted the same empty concept back in 2005. An apocalyptic rant already 10 years ago based on the exact same ideas. But you are doing it really wrong by blaming annotations. Annotations are a very useful tool. Let me elaborate.

Annotations were introduced first in [Java 5.0](https://docs.oracle.com/javase/1.5.0/docs/guide/language/annotations.html), and ever since its usage
has grown significantly. The initial justification for them was the need to avoid boilerplate code. And that particular reason is beautifully shown with Lombok:

{% codeblock Hocus Pocus lang:java https://projectlombok.org/ Lombok Documentation %}
@Data
public class User {
  private String username;
  private String passwordHash;
  private List<Role> roles;
}
{% endcodeblock %}

The **@Data** annotation gives us to have 3 getters (*getUsername*,*getPasswordHash*,*getRoles*), 3 setters (*setUsername*,*setPasswordHash*,*setRoles*), the *equals* function and the *hashCode* function with a single line. So you go from 41 lines of code to 6.

You can see the full before and after in the [@Data](https://projectlombok.org/features/Data.html) documentation. And start using it.

{% svideo aladdinwow A whole new world of wonders ahead! %}

Some more examples of beautiful annotations for you to dive deep:
* [Predefined Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/predefined.html) - Basic Java Annotations
* [JSR-330](https://docs.oracle.com/cd/E19798-01/821-1841/gjxvg/index.html) - Dependency injection
* [JSR-311](http://download.oracle.com/otn-pub/jcp/jaxrs-1.0-fr-eval-oth-JSpec/jaxrs-1.0-final-spec.pdf?AuthParam=1443937300_ec5a28b1cefbc0110bcbe919270cb9f1) - REST Services

And so many more that are pure gold. Not to mention any of the [Spring](https://spring.io/) annotations that are being widely used and remain extremely healthy.

**TL;DR** - You can safely ignore those who say that annotations are killing java. They were wrong many years ago, and they still are. Annotations are great.
