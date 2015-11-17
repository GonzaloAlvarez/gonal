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

Let me show you some great examples of annotations.

## Lombok

Project lombok is a great boilerplate code generator that uses annotations to remove the need to add common methods, such as getters, setters or hash/equals.

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

## @Override

Another key annotation very widely used in the OO programming with Java is the @Override annotation.

{% codeblock @Override %}
public interface Vehicle {
  public int getNumberOfWheels();
}

public class Car implements Vehicle {

  @Override
  public int getNumberOfWheels() {
    return 4;
  }
}
{% endcodeblock %}

The @Override annotation here has two important usages. First, it will let us know if we made a mistake while naming the function 'getNumberOfWheels' in the class. And second, if the interface changes for whatever the reason, it will notify us of that change, to ensure that we are aware of it.

The @Override annotation is simply critical when you use external 3rd party libraries that you want to keep updated from time to time.

## JUnit

Not sure if you test your code, but if you don't I don't wanna know. No, seriously, test your code.

{% svideo thumbsuppoehler Promise me you will use unit tests%}

Anyways, if you test your code with unit tests (please, please, do), you've probably stumbled across the @Test annotation. And maybe the @Before. And if you are fairly savvy, you are even aware of the existence of @Ignore.

There are plenty of tutorials on how to use JUnit all over the web ([Vogella](http://www.vogella.com/tutorials/JUnit/article.html), [Mkyong](http://www.mkyong.com/tutorials/junit-tutorials/)). Here a very simple example:

{% codeblock JUnit %}
public class CarTests {

  @Test
  public void getNumberOfWheelsTest() {
    Car carTest = new Car();
    int wheels = carTest.getNumberOfWheels();

    assertEquals(4, wheels);
  }
}
{% endcodeblock %}

## Spring JavaConfig

And we get to the core of the issue here: JavaConfig. Spring, as you may know, is (among other things) a dependency injection framework, so we can make use of the inversion of control principle. Anyways, even if you don't know that, the idea is that Spring allows you to setup some objects in memory that can be instantiated upon need (</oversimplification>).

In order to define those objects, called beans, you usually had to write fairly complex XML files pointing to fully qualified class names that would use other class names to work. This is extremely error prone. Let me show you an example of the legacy XML documantion:

{% codeblock Spring XML Documentation %}
<beans>
    <!-- first, define your individual @Configuration classes as beans -->
    <bean class="com.myapp.config.AppConfig"/>
    <bean class="com.myapp.config.DataConfig"/>

    <!-- be sure to include the JavaConfig bean post-processor -->
    <bean class="org.springframework.config.java.process.ConfigurationPostProcessor"/>
</beans>
{% endcodeblock %}

Now, this all changed with Spring 3, where JavaConfig showed up as a game changer. Before you had to start up your application to see if there was an error in your (xml-based) configuration. With annotations, the IDE would tell you if you made a mistake. Let's see how it looks with annotations:

{% codeblock Spring XML Documentation %}
@Configuration
public class DataSourceConfig {
    @Bean
    public DataSource dataSource() {
        return new DriverManagerDataSource(...);
    }
}

@Configuration
@AnnotationDrivenConfig
@Import(DataSourceConfig.class)
public class AppConfig extends ConfigurationSupport {
    @Autowired DataSourceConfig dataSourceConfig;

    @Bean
    public void TransferService transferService() {
        return new TransferServiceImpl(dataSourceConfig.dataSource());
    }
}
{% endcodeblock %}

How beautiful is that. You create all your configuration using annotations, so you are sure you don't make any mistakes because otherwise your IDE will let you know. That is simply amazing, if you ask me. Not to mention that you can now start using @Inject or @Named.

## Conclusion

Annotations are here to stay. They do a lot of things, and some of them may not be perfect, but there is no reason to hate them, or to claim that they are killing Java. Find out for yourself if you want to be making your code flexible and powerful, or you rather discuss about abstract arguable concepts.
