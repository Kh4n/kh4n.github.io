# Hello World
Ah, the pinnacle of programming. Every programmer starts with a "hello world" program, as will you. Let's get started.

## Setup
Here I will be making a shift: many tutorials start with an agonizing development environment setup that can suck the joy out of many a beginner (or even experienced) programmer. Instead, we will be using the glory of an **Online IDE**. Fear not, it will have all the features you need, will be fully setup, and can be accessed from anywhere you have a browser.

You are free to use any online IDE, but I strongly recommend [Replit](http://repl.it). Sign up, create a new Repl, make sure to select Python. It should be Python version 3. You will see a code editor on the left. Here is what mine looks like (it may look different):
![Replit Screenshot](../img/replit-screenshot.png)

You see I have some code in the left side:
```python
import sys
print(sys.version_info.major)
```
Paste this in to whatever IDE or editor you are using, Replit or otherwise, and ensure that after you run (the green "Run" button in the case of Replit) the console on the right outputs a "3". This is to make sure we are on Python 3, and not 2. If you get an error, you are on the wrong version.

Ignore the other files that are there, and do not open them or edit them. They are not relevant.

Now that you are on the right version, delete that code and pretend that you never ran it, because now we will write our first legitimate piece of software.

## The actual code
In the editor, type:
```python
print("Hello World!")
```
and hit run. You should see the words printed on the right. This output area is known as the console. Later on we will discuss what is going on in more depth, as even a simple hello world program has much to be explained. Suffice it to say, the console is where you will see your program output, as it is (usually) very easy to output text to it in most languages, Python included. In fact, in Python it is only one line as you can see here.

So what is going on here? A couple of things: we wrote `print`, which is known as a *function*, one of the first and most important concepts to understand in programming. The part in quotes is 