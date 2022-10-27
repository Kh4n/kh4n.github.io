# More on Variables

Let's learn a bit more about different values variables can take, namely their *types*, as well as a bit about functions.

## Variables and Values
Earlier we assigned a string to a variable:
```python
ourStr = "Hello World!"
```
Next, lets try a number and a *boolean*. Run the following code:
```python
a = 2
b = True
print(a)
print(b)
```
Output:
```
2
True
```
We can do operations on these values as well, try this:
```python
a = 3 + 3
b = a - 10
print(b)
```
Output:
```
-4
```
Try experimenting with other math expressions! For booleans, here are some examples:
```python
a = True
b = False
c = a or b
d = a and b
e = a and not b
print(c)
print(d)
print(e)
```
Output:
```
True
False
True
```
This should make logical sense: True or False (either needs to be true) means True. True and False (both need to be true) means false. For `e`, we negated the False, making it True, thereby following the same logic as `c`. Don't think about these too much: boolean expressions make more sense over time and in general do not get very complicated.

## What about strings?
Well, strings have operations as well:
```python
a = "Hello"
b = " World!"
print(a + b)
```
Output:
```
Hello World!
```
There are more, but we will get into those after we learn about functions

Variables are important, but the next section which talks about functions is even more important to understand. I had to introduce variables first though, as it would be cumbersome to explain them at the same time as functions.