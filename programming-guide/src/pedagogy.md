# Pedagogy
Here I will explain some of the choices that I made with regard to this guide. Feel free to skip this section if you don't care about this; it is not important to read this if you are just trying to learn programming.

## Language order
On first glance, the order of languages chosen seems a little bizarre. Python first makes total sense, but C next? Isn't that an "advanced" programming language? Also isn't Java beginner friendly, shouldn't we be learning that first?

Here is my explanation:
1. Python: this is a great first language. It has very few pitfalls, is easy to pick up, and can let beginners feel the "joy of programming".
    - Another huge advantage is that I can teach a huge part of this language without doing the "you'll learn about this in depth later so just take it at face value for now" thing which I really hate. I will have to do that a few times as it is unavoidable, but Python first really mitigates that
    - Python has few pitfalls, but is not completely devoid of them, so there may be slightly better choices, but I am really experienced with Python so it makes sense to me to use it
2. C: this is the weird one. The core reasoning behind this is due to what C and Java are supposed to teach
    - Here is what I am using each to teach, which is pretty common in general as well:
        - C is to help people learn low level concepts and create a core understanding about how a computer works and how languages interact with the computer
        - Java is to help understand OOP and software design
    - My key takeaway after learning these languages in the opposite order many years ago is this:
    **the concepts in C are deceptively _easy_ to learn, while the concepts in Java are deceptively _difficult_ to learn**
        - Computer internals may seem intimidating at first but are really straightforward to understand at a medium-high level and give an excellent baseline to learn other languages that abstract over these concepts
        - Software design is very different: it is hard to understand properly, hard to apply, and the best practices are changing rapidly all the time. OOP may seem easy at first to beginners: "just make correlations to real world objects". But this methodology completely falls apart in the real world and results in some really, *really* bad design that can frustrate newcomers to the field
3. Java: this may also seem strange given its age, but it is still one of the most in demand languages, and is pretty simple when it comes to software design
    - Other languages have too many sophisticated features that can clutter understanding
    - Learning C first means we don't need to be confused by objects vs primitives and what not
    - A kind of underrated language these days: everyone hates on it (I used to as well), but I have come to appreciate its simplicity, even if it is a bit verbose
        - The newer APIs in the language are also a big boon

## Avoiding the "we'll come back to this later" phenomenon
I mentioned earlier that I really hate this phrase in tutorials: it can be hard as a learner to just ignore the fact that you are using something you can't fully understand. As stated, I can't totally avoid this, but I will try very hard to reduce this phrase as much as possible. Here are the ways I will mitigate this:
- Python first will allow us to get the basics down without much trouble
- I will try to give high level explanations that will allow you to "black box" things effectively
- I will go in depth right at the spot as much as I can without it being too tiresome

## Other goals and general ideas
- I want to make this easy to read and not tiresome
- I want to make it approachable and not intimidating
- I want to make it fluid when reading but still work as decently as a reference
    - The main focus is straightforward reading, as maintaining a reference is difficult, but I want people to be able to come back to certain sections if there is something they forgot or want to reread
- I do not want people to just memorize things and move on, so I will make that as hard as I can by giving as few things to memorize as possible
- I do not want large code sections, especially not at the beginning
    - I want to discourage copy/paste as much as possible
    - Also newcomers tend to glaze over when seeing a wall of code
        - Hell, I feel my eyes start to glaze over sometimes :)
- I do not want a tutorial "feel" to this guide. Tutorials are kind of bad as they are perpetually out of date and tend to encourage copy/paste as well as lack of understanding
    - Instead, I want people to learn and understand core concepts and be able to apply them freely to their own projects