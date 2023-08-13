# Errors
Up until this point I have asked you to copy and paste all of the examples in to you editor. The reason for this is that I was not ready to introduce the concept of **errors** yet, which is when your program does something wrong and the computer tells you that you messed up somewhere. After this section, I will all but stop telling you to paste from the guide. Please type out every example unless I explicitly tell you otherwise.

Many programmers dread errors in the their code. I'm here to tell you that you should not fear errors at all; in fact they can be incredibly useful: the computer is your *friend*, telling you where you messed up, many times before you even ran your code.

## Our first error
Let's cause an error:
```python
print("hello world) # oops! forgot a closing quote
```

Type this into your editor and click run. You should see something like the following (may be slightly different):
```
  File "main.py", line 1
    print("hello world)
          ^
SyntaxError: unterminated string literal (detected at line 1)
```

Let's analyze this
```
File "main.py", line 1
```
means an error on line 1, pretty straightforward
```
    print("hello world)
          ^
SyntaxError: unterminated string literal (detected at line 1)
```
This is where things get slightly confusing. It is complaining about an "unterminated string literal". Simple enough: we didn't specify where our string would end (with a matching quote).

But why did it point to the start of the string? The reason for this is that Python tries to point you to the part of the string that *was* correct. Other languages will point to the end of string with a message like `expected one of '"',... but got ')'`. This is a somewhat common theme with Python.

The last confusing part is `SyntaxError`: an error in our "Syntax" presumably. You can think of this like a grammatical error or misspelling in language: you are not following the rules that the language follows, so the computer cannot tell what you want to do.

Let's look at some more syntax errors:
```python
def myFunction: # forgot the parentheses!
    pass
```
Error message:
```
  File "main.py", line 1
    def myFunction: # forgot the parentheses!
                  ^
SyntaxError: invalid syntax
```
Similar to the above, but a lot less helpful. This time it told us *what* went wrong (`invalid syntax`) but not *why* (eg. `missing parentheses`). Sometimes error messages are great, sometimes they aren't. It takes a lot of effort for developers who create these programming languages to write good messages for *every* possible error. This unfortunately means that we need to use our critical thinking skills sometimes and inspect the error. **Try correcting this error on your own.**

Think you got it? Most likely this is what we intended:
```python
def myFunction(): # better! a function with 0 parameters
    pass
```

## Traceback (most recent call last)
One of the most common error forms in Python is the following:
```python
a = 3 / 0
```
Error:
```
Traceback (most recent call last):
  File "main.py", line 1, in <module>
    a = 3 / 0
ZeroDivisionError: division by zero
```
In this case we divided by 0 which is undefined in math, so Python says that is an error (because it does not know what you wanted the value of `a` to be). Other languages may assign a `NaN` (not a number) instead, which Python does not.

All `Traceback` means that Python is telling you the errors in the order it received them, "most recent" meaning the last function call it encountered before it stopped processing your code. If your code was not in a function (like in the main body) it will say something like `in <module>`.

Here is a better example to illustrate this:
```python
def a():
    b()

def b():
    c()

def c():
    return 3 / 0

print(a())
```
Error:
```
Traceback (most recent call last):
  File "main.py", line 10, in <module>
    print(a())
  File "main.py", line 2, in a
    b()
  File "main.py", line 5, in b
    c()
  File "main.py", line 8, in c
    return 3 / 0
ZeroDivisionError: division by zero
```

As you can see Python listed ("traced") the error through each function call, so you can see that it called
- `print(a())` which called
- `b()` which called 
- `c()` which did
- `return 3 / 0` which was the error

## Sample errors
As we progress I will introduce more errors that are possible, but for now here is a small sampling based on concepts we have seen. For each example, see if you can fix them (solutions at the bottom):
```python
a = "unterminated string
```

```python
def myEmptyFunc():

print("hello!")
```

```python
def func():
print("hello!")
```

```python
PI = 3. 14
```

```python
myHardToTypeVariable1 = 2
myHardToTypeVariable2 = 3
c = myHardToTypeVariable1 + myHardToTypeVaraible2
```

And for a tricky one! See if you can use some resources online to solve this one:
```python
currentYear = 2023
myStr = "Current year: " + currentYear
print(myStr)
```
*Hint*: we know that this works:
```python
print("Rings: " + "4")
```
So is there some way for us to turn `4` into `"4"`?

## Why the computer can't (and shouldn't) "correct" us
Let's get something out of the way quickly: many people have the following complaint/question:
> "If the computer knew what was wrong, why didn't it just fix it for me"

There are two main reasons why this both not want you want *and* not possible in general:
1. We compared this error to a misspelling or grammatical error in language. How often has your phone corrected a message you were typing incorrectly? Maybe you meant to use some obscenity, but your phone decided you meant "duck" instead? Or perhaps you were typing a word it did not recognize, like a proper noun, or some form of slang? In the case of the phone this is relatively harmless; you can just issue a correction or edit the error yourself. But in programming this could be catastrophic: you may write a large piece of code with a small mistake, and the computer fixes it for you, only it does it wrong. Now you are in the worst possible situation: you think your code works, but it doesn't. You ship this program to customers, and maybe the app crashes, or it leaks their data. This would suck.
2. In the general case, more complicated errors may not be fixable by the computer because the code is too complex to analyze. I won't get it into details here but parsing and correcting code is wildly complicated, a challenge reserved mostly for *probabilistic*\* solutions like AI, which can only guarantee being right a percentage of the time (hence the term "probabilistic" as in "probably").

It's a big red flag for me when a programmer (especially one with experience) says they want the computer to fix the mistake for them. You absolutely do not want this. The computer is here to tell you what went wrong and why. The solution is on you, so you can tell the computer what you actually meant. As you learn more programming this will (hopefully) become more and more clear.

## SOLUTIONS
```python
# a = "unterminated string
a = "unterminated string"
```

```python
# def myEmptyFunc():
#
# print("hello!")
def myEmptyFunc():
    pass
print("hello!")
```

```python
# def func():
# print("hello!")
def func():
    print("hello!")
```

```python
# PI = 3. 14
PI = 3.14
```

```python
# myHardToTypeVariable1 = 2
# myHardToTypeVariable2 = 3
# c = myHardToTypeVariable1 + myHardToTypeVaraible2
myHardToTypeVariable1 = 2
myHardToTypeVariable2 = 3
c = myHardToTypeVariable1 + myHardToTypeVariable2
```

For the tricky one, here is a not so great solution:
```python
# currentYear = 2023
# myStr = "Current year: " + currentYear
# print(myStr)
currentYear = "2023"
myStr = "Current year: " + currentYear
print(myStr)
```

But here is something much better:
```python
currentYear = 2023
myStr = "Current year: " + str(currentYear)
print(myStr)
```
We used a new function called `str(...)` which in the "black box" method of visualizing functions looks like:
```
number -> str -> number as string
```
Allowing us to add it with another string (usually called "concatenation") as expected. If doesn't make 100% sense to you that is ok, we will go over types (the core of the issue here) a bit later. Just know that if things are the same kind (like numbers to numbers, strings to strings) we can do operations with them, otherwise we need to convert. We can't add a number to a string, because what would that mean exactly? Numbers have many different representations (eg. how many decimals to display), so there is not a default provided by Python: you must explicitly convert it every time. Other languages will do a basic conversion for you as a default. One approach is not necessarily better than the other, though Python's explicit nature in this regard can actually be helpful for beginners.

# Addendum
\*Contrary to what many believe, it is actually possible for a computer to "prove" that a piece of code is correct, given a bare set of assumptions. This is about as close as you can get to a computer knowing every part of you code is correct and telling you exactly what went wrong. Doing this, however, is expensive, tedious, and exceedingly difficult, and is reserved only for "mission critical" applications such as flight software, missile guidance, space flight software, etc., where a failure in code can have a *truly* catastrophic outcome.