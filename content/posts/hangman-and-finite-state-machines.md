---
title: 'Hangman ~ an exploration into finite state machines with XState'
cover: 'hangman.jpg'
date: '2020-05-23'
slug: 'hangman-and-finite-state-machines'
template: 'post'
draft: false
tags:
  - finite state machines
  - javascript
---

Since the coronvirus panademic has gotten us all homebound ([#stayhome](https://twitter.com/hashtag/stayhome)), I thought I would take this opportunity to try out a library that had piqued my interest &mdash; [XState](https://xstate.js.org/docs/) by [@DavidKPiano](https://twitter.com/DavidKPiano).

I built a game of [hangman](/hangman) with it. For the curious, check out the [code](https://github.com/prabuw/prabuw.com/blob/master/src/pages/hangman.jsx).

#### Why is this library interesting to me?

During the last couple of years, I have worked on single page applications of different sizes. One common theme I have found is that managing state can get _complex_ and _messy_. This isn't a new revelation and has been heavily discussed within the community.

Regardless of your ecosystem (React, Angular, Vue or <u>_insert your framework of choice here_</u>), there are a myriad of options for state managment. I believe this library provides a unique approach to managing state, but first we need to understand some of its concepts.

#### What is XState?

As per the library's [docs](https://xstate.js.org/docs/about/concepts.html):

> XState is a library for creating, interpreting, and executing finite state machines and statecharts, as well as managing invocations of those machines as actors.

That is a lot of jargon! Let's try to simplify it.

#### What is a finite state machine?

A [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine) is officially defined as a [mathematical model](https://en.wikipedia.org/wiki/Finite-state_machine#Mathematical_model) of computation. A finite state machine is way to describe the behaviour of a system. This is a broad definition, so let's try to narrow it down.

A finite state machine has the following properties:

- There are a _finite_ number of states.
- The state machine starts in an initial state.
- The state machine can only be in _one_ state at any point of time.
- The state machine can have finite number of final states.
    - In a final state the state machine comes to a stop.
    - State machines can operate in a never-ending loop, where there aren't final states.
- There are a finite number of _events_.
    - An _event_ is input provided to the state machine, which can trigger a _transition_ from the current state to the next.

Let's look at an example of a finite state machine that models a basic traffic light.

##### Example state machine: a simple traffic light

<iframe style="width:100%;height:185px" src="https://xstate.js.org/viz/?gist=752e51f243104c7a6ac4bde3b0d45eeb&embed=1"></iframe>

- The states are `red`, `green` and `amber`.
    - The initial state is `red`
    - There are no final states in this example.
- The events are `GO`, `SLOW.DOWN` and `STOP`.
- To transition from one state to another, a valid event must be sent.
    - For example, if the state machine is in the `red` state. An event of type `GO` will trigger the transition to the `green` state. An event of type `STOP` will be ignored.

A real traffic light is fare more complexed. It contains a lot more states and events.

##### So what?

A system (or program) can be defined by its _variables_. In theory, the possible states of the system are function of the different values of its variables. As an example, if a system has 3 _independent_ variables of boolean type (_true_ or _false_) then there are in 2<sup>3</sup> (8) unique states that the system can be in. Some of these states could be invalid from the perspective of the author of the system.

Traditionally preventing a system from ending up in invalid states involves checking and manipulating the variables in the possible code paths. This can be error prone.
Over time most systems increase in complexity. This results in an increase of states and code paths. This makes the system more susceptible to errors.

In contrast, a state machine models the system as a set of discrete states and predefined transitions. The states replace the combinations of the variable values. Except we define valid states and transitions only.

#### Statecharts

The original definition provided by XState contains _statecharts_ &mdash; what are they?
Statecharts are an extension of state machines. Some of the key concepts they introduce are:

- Nested states
  - This is where a state can have it's own state machine.
  - They are often referred to as _substates_.
  - This allows a state machine to be organised in a _hierarchical_ manner.
- Actions
  - They allow behaviour to be executed when entering/exiting a state or transiting between states.
  - This allows modelling side effects as part of a state machine.
- Guards
  - They prevent a transition unless a predefined condition is met.
  - This allows you to encode logic directly into the state machine.

These features allow state machines to be more succint and prevent them from becoming unruley, also referred to as _state explosion_.

---

#### My findings on XState

_XState_ is a robust state management library from my initial foray into using it. There is a learning curve to understanding state machines and statecharts on top of the library. The documentation is thorough and provides good examples, which helped me a lot.

##### Key takeaways from using XState

- A state machine is represented as a JavaScript object.
- States are represented as the property names (strings) of a JavaScript object.
- For storing any extra state (XState refers to this as _extended state_) the library provides a property called [context](https://xstate.js.org/docs/guides/context.html) to store it within the state machine.
    - I prefer to only include state that will be changed as a part of the transitions in the state machine. This is to prevent the extended state from bloating. For example, I stored the state for `word`, `lettersGuessed` and `guessesLeft` in the context for the game.
    - An alternative to `context` is to keep the extra state outside of the state machine. I am against this idea because it I like to keep state and the logic that changes it close together.
- When transitioning between states, the library provides a mechanism called [actions](https://xstate.js.org/docs/guides/actions.html) to perform side-effects.
    - This is where a large part of the application behaviour lives.
    - This is where you can mutate the state machine's _extended state_. For example, I decremented the `guessesLeft` property when a guess was unsuccessful.
- XState provides a mechanism called [guards](https://xstate.js.org/docs/guides/guards.html), which allows you to define conditional state transitions.
    - This allowed me to encode core logic into the state machine. For example, I used this to determine whether to transition to the `won` state by verifying if all the letters in the word have been guessed.
- [Events](https://xstate.js.org/docs/guides/events.html) are simple JavaScript objects. They trigger the transitions between states.
    - They must contain property called `type` with a string value to identify the event.
    - The event can optionally hold extra data. For example, the `GUESS` event holds the guessed letter.
    - The state machine will reject an event that is not valid for the current state.
    - A rejected event is logged to the developer tools in the browser but otherwise is transparent to the user.
- XState provides a [tool](https://xstate.js.org/viz) to visualise a state machine.
    - Visualising a state machine is helpful when modelling a system.
- XState provides a [react hook](https://xstate.js.org/docs/recipes/react.html#hooks) to integrate with a react application. They also have integrations for other popular front-end ecosystems.

The state machine from the [hangman game](/hangman):

<iframe style="width:100%;height:270px;margin-bottom:2rem" src="https://xstate.js.org/viz/?gist=051656ac573ac527b7b48f53e1883d40&embed=1"></iframe>

#### Conclusion

My first attempt of the game used React's built in component state &mdash; [useState](https://reactjs.org/docs/hooks-state.html), which was more than adequate. There wasn't a need to involve a library such as XState but this was an exploration of the library and finite state machines.

As I added more functionality I noticed verifying the game's functionality became more tedious. I know, I know, I should add some [tests](https://kentcdodds.com/blog/write-tests) at some point. I found using a state machine and also XState's visualiser helped me model the game with more confidence.

For a more complex component or application, I believe this library can be useful along side other solutions to state management. It [isn't a silver bullet](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf) for state management but it certainly will be a valuable tool in my toolbox.

---

#### Extra resources for the inqusitive

- [https://statecharts.github.io](https://statecharts.github.io) &mdash; a comprehensive guide about state machines and statecharts.
- [State of the Art User Interfaces with State Machines](https://www.youtube.com/watch?v=Ras7QG9kxUk) &mdash; a talk by David Khourshid about the value of state machines in user interfaces.

