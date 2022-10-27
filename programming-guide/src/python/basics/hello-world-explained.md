# What just happened?
So what is going on here? Let's go through them one by one:
```python
print("Hello World")
```
1. `print`: this is a **function** which tells the computer to output text to the console
2. `"Hello World"`: this is called a *string*, which we need to surround with quotes. The reason we need to surround this with quotes will become apparent in a moment when we introduce variables.

## Experiment!
Before we go into functions and variables, feel free to experiment around and change the string's contents. Only add alphanumeric stuff for now (A-Z, a-z, 0-9). Like so, for example:
```python
print("Hello <your name>")
```
Feel free to substitute your name in here.

**IMPORTANT**: Whenever you see something like `<put stuff here>`, that means replace that *entire* thing with what you want to put in, including the angle brackets. For the example above, if your name was Khan, you would put:
```python
print("Hello Khan")
```
and not
```python
print("Hello <Khan>")
```
This is a common pattern across many guides and documentation in general so remember it. You may see the angle brackets replaces with square brackets (`[]`) or braces (`{}`). The rule remains the same (almost always).

In any case, for every section, feel free to tweak the examples a bit
**IMPORTANT**: Be sure to copy and paste these examples for now, as I do not want you to have errors yet. We will get into those shortly as well. If you get an error while experimenting do not worry about it, things will make more sense as we go.

## Variables
Before we get into functions and how to understand them, lets explore variables a bit. Copy and paste this next piece of code:
```python
ourStr = "Hello World!"
print(ourStr)
```
You should see:
```
Hello World!
```
as expected. So it should now be clearer as to why we need quotes: when something does not have quotes, it means something *different*, in this case a variable.

Going through the first line:
1. `ourStr`: this is the variable we are assigning to
2. `=`: the assignment *operator*. Tells Python "we want to assign something"
3. `"Hello World!`: the value we want to assign

In this example we took a string and stored it the variable `ourStr`. You can visualize it like so:
![Variables Visualized](../img/variables.svg)

`ourStr` is a kind of container for the *value* of "Hello World!". It is not "Hello World!" itself. That is an important distinction. We can have multiple variables with the same value:
```python
ourStr = "Hello World!"
ourStr2 = "Hello World!"
print(ourStr)
print(ourStr2)
```
Output:
```
Hello World!
Hello World!
```
We can also reassign the variable:
```python
ourStr = "Hello World!"
ourStr = "Hello World again!"
print(ourStr)
```
Output:
```
Hello World again!
```
We will learn more about variables as we go along, but in python they are truly quite simple and straightforward as you see here.