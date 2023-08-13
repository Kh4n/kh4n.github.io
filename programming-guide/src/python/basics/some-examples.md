# Some Examples
We just went over a lot, so I will go through some examples here to try to solidify the concepts a bit more. Even with the elementary things I just showed, we can still do a lot!

## Comments
Before we get started, I wanted to discuss one more feature pretty much every programming language has, Python included: comments!

Here is an example:
```python
# this is adding two numbers together (duh?)
what = 1 + 1
```
The comment is completely ignored by Python! It will not affect the program. You may be wondering why is this useful, here are a few reasons:

1. Lets you write a note that explains what a line, function, or piece of code does:
```python
# computes the volume of a cylinder with radius a and height b, approximated to 2 significant figures
def someFunction(a, b):
    # 3.14 is an approximation of PI
    return 3.14 * a * a * b
``` 
2. Lets you "toggle" a line of code for debugging purposes
```python
a = 1
b = 2
b = b + a + 3
# rather than delete this line and have to retype it, I can just comment it out temporarily
# b = a + 4
print(a + b)
```
Output:
```
7
```
3. Documentation of code. I won't show an example right now as it is out of scope, but basically documentation of what the code does is very often done in the comments of the code, and an external tool then takes that code and turns it into a little website of sorts that can be used as a reference for other developers

These examples may seem kind of pointless right now, but imagine if you are in a codebase with thousands of functions and millions of lines of code (tons of these exist); you'd really want to be able to know what some part of the code does without having to read every line. Even in a small codebase it is very useful. Also, just because you are the sole author/contributor doesn't give you a license to stop commenting: you should still comment in case:
1. Another person needs to take over your code or join in
2. Another person needs to interface with your code
3. You want to understand what the hell you wrote 10 months down the line :)
You'd be surprised how easy it is to forget!

## Examples
Ok let's go. Feel free to read through and copy paste which ones you find interesting; you do not have to run everything, just read through and take note of anything interesting

```python
# let's get some comment etiquette out of the way
# this is the correct place to comment, above a line of code
a = 3 + 3
a = 3 + 3 # do not comment after a line, it is harder to read, and many style guides have strict line length limit (120 is typical)
# I will often put comments on the same line in my examples just to make it clear what I am referencing
# do as I say, not as I do :)

# remember that functions do not need to have parameters:
def sayGoodbye():
    print("goodbye")

def sayHelloBefore(string):
    print("Hello " + string)

# the pass keyword does nothing, helpful because Python requires every function to have a body but sometimes we wan't something empty as a placeholder as we fill things in
def empty():
    pass

ret = empty()
# Output: None
print(ret)
```