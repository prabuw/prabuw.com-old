---
title: 'Hangman ~ an exploration into finite state machines with XState'
cover: 'hangman.jpg'
date: '2020-05-10'
slug: 'hangman-and-finite-state-machines'
template: 'post'
draft: true
tags:
  - finite state machines
  - javascript
---

Since the coronvirus panademic has gotten us all homebound ([#stayhome](https://twitter.com/hashtag/stayhome)), I thought I would take this opportunity to try out a library that had piqued by interest &mdash; [XState](https://xstate.js.org/docs/) by [@DavidKPiano](https://twitter.com/DavidKPiano).

I built a game of [hangman](/hangman) with it. For the curious, check out the [code](https://github.com/prabuw/prabuw.com/blob/master/src/pages/hangman.jsx).

#### Why is this library interesting to me?

During the last couple of years, I have worked on single page applications of different sizes. One common theme I have found is that managing state can get _complex_ and _messy_. This isn't a new revelation and has been heavily discussed within the community.

Regardless of your ecosystem (React, Angular, Vue or <u>_insert your framework of choice here_</u>), there are a myriad of options for state managment. I believe this library provides a unique approach to managing state, but first we need to understand some of its concepts!

#### What is XState?

As per the library's [docs](https://xstate.js.org/docs/about/concepts.html):

> XState is a library for creating, interpreting, and executing finite state machines and statecharts, as well as managing invocations of those machines as actors.

That is a lot of jargon! Let's try to simplify it.

#### What is a finite state machine?

A [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine) is officially defined as a mathematical model of computation. In layman's terms, a finite state machine is way to describe the behaviour of a system. This is a broad definition, so let's try to narrow it down.

A finite state machine has the following properties:

- There are a fixed number (_finite_) of states.
- The machine can only be in one state at any given point in time.
- The machine starts in an initial state.
- The machine can have zero or more final states.
    - In a final state the system comes to an end.
    - State machines can operate in a never-ending loop, where there aren't final states.
- There are a finite number of _events_.
    - An _event_ is input provided to the machine, which allows the machine to transition from the current state to the next.

The defintion above is still abstract and a picture paints a thousand words. Let's look at an example of a finite state machine that models a basic traffic light.

##### Example state machine: a simple traffic light

<iframe style="width:100%;height:185px" src="https://xstate.js.org/viz/?gist=752e51f243104c7a6ac4bde3b0d45eeb&embed=1"></iframe>

- The states are `red`, `green` and `amber`.
    - The initial state is `red`
    - There are no final states in this example.
- The events are `GO`, `SLOW.DOWN` and `STOP`.
- To transition from one state to another, the following criteria must be met:
    - A valid event to the current state must be sent.
    - For example, if the state machine is the `red` state currently, an event of `GO` must be sent to transition to the `green` state. Sending an event of `STOP` will be ignored in this situation.

In reality, a world traffic light will contain more states and events.

#### Statecharts and actors

In the original definition provided by XState contained _statecharts_ and _actors_ &mdash; what are they?

---

#### Features of XState I used

#### My findings on XState

- States in a XState state machine are defined as strings. They resemble values in an enumeration.
- For storing the "actual" state (XState refers to it as _extended state_) of a component or application, the library provides a property called [context](https://xstate.js.org/docs/guides/context.html) to hold the extended state within the state machine.
    - I prefer to limit XState's context to extended state that will be affected by transitions in the state machine.
    - For example, I stored the state for `word`, `lettersGuessed` and `guessesLeft` in the context.
    - Alternatively, you can store the extended state outside of the state machine. However, I prefer not to since they are highly related and keeping them in sync can lead to errors.
- When transitioning between states, the library provides a mechanism called [actions](https://xstate.js.org/docs/guides/actions.html) to perform side-effects.
    - I found this useful to mutate the extended state in the game.
    - For example, I decremented the `guessesLeft` property when a guess was unsuccessful.
- XState provides a mechanism called [guards](https://xstate.js.org/docs/guides/guards.html), which allows you to define conditional state transitions.
    - For example, I used this to determine whether to transition to the `won` state by verifying if all the letters in the word have been guessed.
- Events are simple JavaScript objects, which are sent to the state machine to trigger a transition from the current state to the next.
    - They must contain property called `type` with a string value to identify the event.
    - A event can hold extra data. This is useful to send contextual data with the event.
    - For example, I sent the letter that was guessed with the `GUESS` event.
    - The state machine will reject an event that is not valid for the current state.
    - A rejected event is logged to the developer tools in the browser but otherwise is invisible to the user.
- XState provides a free [tool](https://xstate.js.org/viz) to visualise a state machine.
    - You can store and embed the visualisation as I have done below.
    - I find this invaluable when modelling a system.
- XState provides a [React hook](https://xstate.js.org/docs/recipes/react.html#hooks) to easily integrate with React components.

<iframe style="width:100%;height:270px;margin-bottom:2rem" src="https://xstate.js.org/viz/?gist=051656ac573ac527b7b48f53e1883d40&embed=1"></iframe>

#### Conclusion

My first attempt of the game used React's built in component state &mdash; [useState](https://reactjs.org/docs/hooks-state.html). It was more than adequate. There wasn't a need to involve a library such as XState but this was an exploration of the library and finite state machines.

As I added more functionality I noticed verifying the game's functionality became more tedious. I know, I know, I should add some [tests](https://kentcdodds.com/blog/write-tests) at some point. I found using a state machine and also XState's visualiser helped me model the game with more confidence.

For a more complex component or application, I believe this library can be very useful along side other solutions to state management. It [isn't a silver bullet](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf) for state management but it certainly will be a valuable tool in my toolbox.




