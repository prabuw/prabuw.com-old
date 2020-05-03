import React from 'react';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import clsx from 'clsx';
import { Layout } from '../components/Layout';

function buildAlphabet() {
  let start = 'A'.codePointAt(0);
  const end = 'Z'.codePointAt(0);

  const alphabet = {};

  while (start <= end) {
    alphabet[String.fromCodePoint(start)] = false;
    start += 1;
  }

  return alphabet;
}

//TODO: Tidy up machine
//Move actions to common area

const hangmanMachine = Machine({
  id: 'hangman',
  context: {
    guessesLeft: 10,
    lettersGuessed: buildAlphabet(),
    word: [],
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        '': {
          target: 'playing',
          actions: assign({
            guessesLeft: () => 10,
            lettersGuessed: () => buildAlphabet(),
            word: () => 'HELLO'.split('').map(letter => ({ value: letter, hasGuessed: false })),
          }),
        },
      },
    },
    playing: {
      on: {
        '': [
          {
            target: 'won',
            cond: ctx => ctx.word.every(letter => letter.hasGuessed),
          },
          {
            target: 'lost',
            cond: ctx => ctx.guessesLeft === 0,
          },
        ],
        GUESS: [
          {
            target: 'playing',
            actions: assign({
              guessesLeft: (ctx, event) =>
                ctx.word.some(letter => letter.value === event.data.letter)
                  ? ctx.guessesLeft
                  : ctx.guessesLeft - 1,
              lettersGuessed: (ctx, event) => ({
                ...ctx.lettersGuessed,
                [event.data.letter]: true,
              }),
              word: (ctx, event) =>
                ctx.word.map(letter => {
                  if (letter.value !== event.data.letter) {
                    return letter;
                  }

                  return {
                    ...letter,
                    hasGuessed: true,
                  };
                }),
            }),
            cond: ctx => ctx.guessesLeft > 0,
          },
        ],
      },
    },
    lost: {
      on: {
        RESET: 'idle',
      },
    },
    won: {
      on: {
        RESET: 'idle',
      },
    },
  },
});

//TODO: Fix colours

const Hangman = () => {
  const [state, send] = useMachine(hangmanMachine);

  return (
    <Layout>
      <section className="flex flex-col justify-center">
        <button
          type="button"
          className={clsx({
            hidden: state.value !== 'won' && state.value !== 'lost',
          })}
          onClick={() => send({ type: 'RESET' })}
        >
          Start
        </button>
      </section>
      <hr />
      <section className="max-w-sm mx-auto text-center">
        {state.context.word.map((letter, idx) => (
          <button
            type="button"
            key={idx}
            className={clsx(
              { 'bg-blue-500': letter.hasGuessed || state.value === 'lost' },
              'rounded-full h-8 w-8 items-center justify-center border border-gray-700 my-1 mx-1 cursor-pointer'
            )}
          >
            {letter.hasGuessed || state.value === 'lost' ? letter.value : '?'}
          </button>
        ))}
      </section>
      <hr />
      <section className="max-w-sm mx-auto text-center">
        {Object.entries(state.context.lettersGuessed).map(([letter, hasGuessed]) => (
          <button
            type="button"
            key={letter}
            className={clsx(
              { 'bg-gray-500': state.value !== 'playing' },
              { 'bg-blue-500': hasGuessed },
              { 'hover:bg-blue-800 hover:text-gray-300': !hasGuessed && state.value === 'playing' },
              'rounded-full h-8 w-8 items-center justify-center border border-gray-700 my-1 mx-1'
            )}
            disabled={hasGuessed}
            onClick={() => send({ type: 'GUESS', data: { letter } })}
          >
            {letter}
          </button>
        ))}
      </section>
    </Layout>
  );
};

export default Hangman;
