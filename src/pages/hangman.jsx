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
      streak: 0,
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
              cond: 'haveRunOutOfGuesses',
            },
          ],
          GUESS: [
            {
              target: 'playing',
              actions: 'applyGuess',
              cond: 'haveGuessesLeft',
            },
          ],
        },
      },
      won: {
        on: {
          RESET: {
            target: 'start',
            actions: 'incrementStreak',
          },
        },
      },
      lost: {
        on: {
          RESET: {
            target: 'start',
            actions: 'resetStreak',
          },
        },
      },
    },
  },
  {
    guards: {
      hasGuessedCorrectly: ctx => ctx.word.every(letter => letter.hasBeenGuessed),
      haveRunOutOfGuesses: ctx => ctx.guessesLeft === 0,
      haveGuessesLeft: ctx => ctx.guessesLeft > 0,
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
            .map(letter => ({ value: letter, hasBeenGuessed: false }));
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
            hasBeenGuessed: true,
          };
        }),
      })),
      incrementStreak: assign(ctx => ({
        streak: ctx.streak + 1,
      })),
      resetStreak: assign(() => ({
        streak: 0,
      })),
    },
  }
);

const Hangman = () => {
  const [state, send] = useMachine(hangmanMachine);
  const [stageWidth, setStageWidth] = React.useState(0);
  const stage = React.useRef(null);
  React.useEffect(() => {
    setStageWidth(stage.current ? stage.current.offsetWidth : 0);
  }, [stage.current]);

  return (
    <Layout>
      <section ref={stage} className="flex flex-col justify-center">
        <Scene guessesLeft={state.context.guessesLeft} stageWidth={stageWidth} />
        <div className="text-center mt-4">
          <div
            className={clsx(
              { hidden: state.value !== 'playing' },
              'inline-block text-sm bg-brand px-4 py-1 border-solid border-b-4 border-yellow-400'
            )}
          >
            {`Streak: ${state.context.streak}`}
          </div>
          <button
            type="button"
            className={clsx(
              {
                hidden: state.value !== 'won' && state.value !== 'lost',
              },
              'inline-block text-sm bg-gray-300 border-solid border-b-4 border-gray-500 hover:bg-gray-200 hover:border-gray-300 px-4 py-1'
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
          <LetterButton
            key={idx}
            className={clsx(
              { 'bg-gray-700 text-green-400': state.value === 'won' },
              { 'bg-gray-700 text-red-400': state.value === 'lost' }
            )}
            hasLetterBeenGuessed={letter.hasBeenGuessed}
            disabled
          >
            {letter.hasBeenGuessed || state.value === 'lost' ? letter.value : '?'}
          </LetterButton>
        ))}
      </section>
      <hr />
      <section className="max-w-sm mx-auto text-center">
        {Object.entries(state.context.lettersGuessed).map(([letter, hasBeenGuessed]) => (
          <LetterButton
            key={letter}
            className={clsx(
              { 'bg-gray-400': state.value !== 'playing' },
              {
                'hover:bg-gray-700 hover:text-gray-200 focus:bg-gray-200 focus:text-gray-700':
                  !hasBeenGuessed && state.value === 'playing',
              }
            )}
            disabled={hasBeenGuessed}
            onClick={() => send({ type: 'GUESS', data: { letter } })}
            hasLetterBeenGuessed={hasBeenGuessed}
          >
            {letter}
          </LetterButton>
        ))}
      </section>
    </Layout>
  );
};

const Scene = ({ guessesLeft, stageWidth }) => {
  const stageCenter = stageWidth / 2;

  const postWidth = 10;
  const postHeight = 220;
  const postOffset = 10;

  const beamWidth = 200;
  const beamHeight = 10;
  const beamStartX = stageCenter - beamWidth / 2;
  const topBeamY = 20;
  const bottomBeamY = topBeamY + postHeight - beamHeight;

  const beamCenterX = beamStartX + beamWidth / 2 + postOffset / 2;

  const nooseStartY = topBeamY + beamHeight;
  const nooseLen = 30;
  const nooseEndY = nooseStartY + nooseLen;
  const headRadius = 20;
  const bodyWidth = 40;
  const bodyHeight = 80;
  const bodyX = beamCenterX;
  const bodyY = topBeamY + beamHeight + nooseLen + headRadius * 2 + bodyHeight / 2;

  const leftArmAngleFromBody = degreesToRadians(150);

  const leftArmStartX = bodyX + (bodyWidth / 2) * Math.cos(leftArmAngleFromBody);
  const leftArmStartY = bodyY - (bodyHeight / 2) * Math.sin(leftArmAngleFromBody);
  const leftArmEndX = leftArmStartX * 0.95;
  const leftArmEndY = bodyY * 1.1;

  const rightArmAngleFromBody = degreesToRadians(30);

  const rightArmStartX = bodyX + (bodyWidth / 2) * Math.cos(rightArmAngleFromBody);
  const rightArmStartY = bodyY - (bodyHeight / 2) * Math.sin(rightArmAngleFromBody);
  const rightArmEndX = rightArmStartX * 1.05;
  const rightArmEndY = bodyY * 1.1;

  const leftLegAngleFromBody = degreesToRadians(225);

  const leftLegStartX = bodyX + (bodyWidth / 2) * Math.cos(leftLegAngleFromBody);
  const leftLegStartY = bodyY - (bodyHeight / 2) * Math.sin(leftLegAngleFromBody);
  const leftLegEndX = leftLegStartX * 0.95;
  const leftLegEndY = leftLegStartY * 1.25;

  const rightLegAngleFromBody = degreesToRadians(315);

  const rightLegStartX = bodyX + (bodyWidth / 2) * Math.cos(rightLegAngleFromBody);
  const rightLegStartY = bodyY - (bodyHeight / 2) * Math.sin(rightLegAngleFromBody);
  const rightLegEndX = rightLegStartX * 1.05;
  const rightLegEndY = rightLegStartY * 1.25;

  /* Order here matters! */
  const sceneParts = [
    <Rectangle
      id="bottomBeam"
      fill="black"
      width={beamWidth}
      height={beamHeight}
      x={beamStartX}
      y={bottomBeamY}
    />,
    <Rectangle
      id="post"
      fill="black"
      width={postWidth}
      height={postHeight}
      x={beamStartX + postOffset}
      y={topBeamY}
    />,
    <Rectangle
      id="topBeam"
      fill="black"
      width={beamWidth}
      height={beamHeight}
      x={beamStartX}
      y={topBeamY}
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
    <ReactRough height="250" width="100%" renderer="svg">
      {sceneParts.slice(0, sceneParts.length - guessesLeft).map((part, idx) => (
        <React.Fragment key={idx}>{part}</React.Fragment>
      ))}
    </ReactRough>
  );
};

const LetterButton = ({ className, children, disabled, onClick, hasLetterBeenGuessed }) => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        { 'bg-gray-700 text-gray-200': hasLetterBeenGuessed },
        'rounded-full h-8 w-8 items-center justify-center border border-gray-700 my-1 mx-1 focus:outline-none'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Hangman;
