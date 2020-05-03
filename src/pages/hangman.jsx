import React from 'react';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import clsx from 'clsx';
import ReactRough, { Rectangle, Line, Circle, Ellipse } from 'react-rough';
import { Layout } from '../components/Layout';
import words from '../../static/words.json';

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

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

const hangmanMachine = Machine(
  {
    id: 'hangman',
    context: {
      guessesLeft: 10,
      lettersGuessed: buildAlphabet(),
      word: [],
    },
    initial: 'start',
    states: {
      start: {
        on: {
          '': {
            target: 'playing',
            actions: 'initialiseGame',
          },
        },
      },
      playing: {
        on: {
          '': [
            {
              target: 'won',
              cond: 'hasGuessedCorrectly',
            },
            {
              target: 'lost',
              cond: 'hasRunOutOfGuesses',
            },
          ],
          GUESS: [
            {
              target: 'playing',
              actions: 'applyGuess',
              cond: 'hasNotRunOutOfGuesses',
            },
          ],
        },
      },
      lost: {
        on: {
          RESET: 'start',
        },
      },
      won: {
        on: {
          RESET: 'start',
        },
      },
    },
  },
  {
    guards: {
      hasGuessedCorrectly: ctx => ctx.word.every(letter => letter.hasGuessed),
      hasRunOutOfGuesses: ctx => ctx.guessesLeft === 0,
      hasNotRunOutOfGuesses: ctx => ctx.guessesLeft > 0,
    },
    actions: {
      initialiseGame: assign({
        guessesLeft: () => 10,
        lettersGuessed: () => buildAlphabet(),
        word: () => {
          const word = words[Math.floor(Math.random() * words.length)];
          return word
            .toUpperCase()
            .split('')
            .map(letter => ({ value: letter, hasGuessed: false }));
        },
      }),
      applyGuess: assign((ctx, event) => ({
        guessesLeft: ctx.word.some(letter => letter.value === event.data.letter)
          ? ctx.guessesLeft
          : ctx.guessesLeft - 1,
        lettersGuessed: {
          ...ctx.lettersGuessed,
          [event.data.letter]: true,
        },
        word: ctx.word.map(letter => {
          if (letter.value !== event.data.letter) {
            return letter;
          }

          return {
            ...letter,
            hasGuessed: true,
          };
        }),
      })),
    },
  }
);

const Hangman = () => {
  const [state, send] = useMachine(hangmanMachine);
  const [center, setCenter] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    setCenter(ref.current ? ref.current.offsetWidth / 2 : 0);
  }, [ref.current]);

  const beamWidth = 200;
  const beamStartX = center - beamWidth / 2;
  const beamCenterX = beamStartX + beamWidth / 2 + 5;
  const beamY = 20;
  const beamHeight = 10;
  const nooseStartY = beamY + beamHeight;
  const nooseLen = 30;
  const nooseEndY = nooseStartY + nooseLen;
  const headRadius = 20;
  const bodyWidth = 40;
  const bodyHeight = 80;
  const bodyX = beamCenterX;
  const bodyY = beamY + beamHeight + nooseLen + headRadius * 2 + bodyHeight / 2;

  const leftArmRadians = degreesToRadians(150);

  const leftArmStartX = bodyX + (bodyWidth / 2) * Math.cos(leftArmRadians);
  const leftArmStartY = bodyY - (bodyHeight / 2) * Math.sin(leftArmRadians);
  const leftArmEndX = leftArmStartX * 0.95;
  const leftArmEndY = bodyY * 1.1;

  const rightArmRadians = degreesToRadians(30);

  const rightArmStartX = bodyX + (bodyWidth / 2) * Math.cos(rightArmRadians);
  const rightArmStartY = bodyY - (bodyHeight / 2) * Math.sin(rightArmRadians);
  const rightArmEndX = rightArmStartX * 1.05;
  const rightArmEndY = bodyY * 1.1;

  const leftLegRadians = degreesToRadians(225);

  const leftLegStartX = bodyX + (bodyWidth / 2) * Math.cos(leftLegRadians);
  const leftLegStartY = bodyY - (bodyHeight / 2) * Math.sin(leftLegRadians);
  const leftLegEndX = leftLegStartX * 0.95;
  const leftLegEndY = leftLegStartY * 1.25;

  const rightLegRadians = degreesToRadians(315);

  const rightLegStartX = bodyX + (bodyWidth / 2) * Math.cos(rightLegRadians);
  const rightLegStartY = bodyY - (bodyHeight / 2) * Math.sin(rightLegRadians);
  const rightLegEndX = rightLegStartX * 1.05;
  const rightLegEndY = rightLegStartY * 1.25;

  const parts = [
    <Rectangle id="base" fill="black" height={10} width={beamWidth} x={beamStartX} y={230} />,
    <Rectangle id="post" fill="black" height={220} width={10} x={beamStartX + 10} y={20} />,
    <Rectangle
      id="beam"
      fill="black"
      height={beamHeight}
      width={beamWidth}
      x={beamStartX}
      y={beamY}
    />,
    <Line id="noose" x1={beamCenterX} x2={beamCenterX} y1={nooseStartY} y2={nooseEndY} />,
    <Circle id="head" diameter={headRadius * 2} x={beamCenterX} y={nooseEndY + headRadius} />,
    <Ellipse id="body" height={bodyHeight} width={bodyWidth} x={beamCenterX} y={bodyY} />,
    <Line id="leftArm" x1={leftArmStartX} x2={leftArmEndX} y1={leftArmStartY} y2={leftArmEndY} />,
    <Line
      id="rightArm"
      x1={rightArmStartX}
      x2={rightArmEndX}
      y1={rightArmStartY}
      y2={rightArmEndY}
    />,
    <Line id="leftLeg" x1={leftLegStartX} x2={leftLegEndX} y1={leftLegStartY} y2={leftLegEndY} />,
    <Line
      id="rightLeg"
      x1={rightLegStartX}
      x2={rightLegEndX}
      y1={rightLegStartY}
      y2={rightLegEndY}
    />,
  ];

  return (
    <Layout>
      <section ref={ref} className="flex flex-col justify-center">
        <ReactRough height="250" width="100%" renderer="svg">
          {parts.slice(0, parts.length - state.context.guessesLeft).map(part => part)}
        </ReactRough>
        <div className="text-center">
          <button
            type="button"
            className={clsx(
              {
                hidden: state.value !== 'won' && state.value !== 'lost',
              },
              'inline text-xs bg-gray-300 hover:bg-gray-200 border-b-4 border-gray-500 mt-4 mr-1 py-1 px-4 hover:border-gray-300 rounded'
            )}
            onClick={() => send({ type: 'RESET' })}
          >
            {state.value === 'won' ? 'Next' : 'Try Again?'}
          </button>
        </div>
      </section>
      <hr />
      <section className="max-w-m mx-auto text-center">
        {state.context.word.map((letter, idx) => (
          <button
            type="button"
            key={idx}
            className={clsx(
              { 'bg-gray-700 brand-text-color': letter.hasGuessed || state.value === 'lost' },
              'rounded-full h-8 w-8 items-center justify-center border border-gray-700 my-1 mx-1 cursor-pointer'
            )}
          >
            {letter.hasGuessed || state.value === 'lost' ? letter.value : '?'}
          </button>
        ))}
        <div>
          <a
            target="BLANK"
            href={`https://www.thefreedictionary.com/${state.context.word
              .map(letter => letter.value)
              .join('')}`}
            className={clsx(
              {
                hidden: state.value !== 'won' && state.value !== 'lost',
              },
              'text-xs text-center pt-4'
            )}
          >
            Definition &#8599;
          </a>
        </div>
      </section>
      <hr />
      <section className="max-w-sm mx-auto text-center">
        {Object.entries(state.context.lettersGuessed).map(([letter, hasGuessed]) => (
          <button
            type="button"
            key={letter}
            className={clsx(
              { 'bg-gray-400': state.value !== 'playing' },
              { 'bg-gray-700 text-gray-200': hasGuessed },
              { 'hover:bg-gray-700 hover:text-gray-200': !hasGuessed && state.value === 'playing' },
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
