import { useEffect, useState } from 'react';
import { Controls } from './components/Controls';
import { Board } from './components/Board';
import './Game.scss';

// Prepare the individual cards.
const cardImagesHard = [
	{ difficulty: 'hard', src: 'images/aztec-calendar.png', matched: false },
	{ difficulty: 'hard', src: 'images/aztec-eye.png', matched: false },
	{ difficulty: 'hard', src: 'images/aztec-face.png', matched: false },
	{ difficulty: 'hard', src: 'images/dagger-advanced.png', matched: false },
	{ difficulty: 'hard', src: 'images/dagger-simple.png', matched: false },
	{ difficulty: 'hard', src: 'images/gold-ingot.png', matched: false },
	{ difficulty: 'hard', src: 'images/pyramid.png', matched: false },
	{ difficulty: 'hard', src: 'images/snake.png', matched: false },
	{ difficulty: 'hard', src: 'images/temple.png', matched: false },
	{ difficulty: 'hard', src: 'images/totem.png', matched: false },
	{ difficulty: 'hard', src: 'images/tumi.png', matched: false },
	{ difficulty: 'hard', src: 'images/xochitl.png', matched: false },
];

const cardImagesEasy = [
	{ difficulty: 'easy', src: 'images/alpaca.png', matched: false },
	{ difficulty: 'easy', src: 'images/atl.png', matched: false },
	{ difficulty: 'easy', src: 'images/aztec-bird.png', matched: false },
	{ difficulty: 'easy', src: 'images/aztec-wall.png', matched: false },
	{ difficulty: 'easy', src: 'images/bow.png', matched: false },
	{ difficulty: 'easy', src: 'images/calli.png', matched: false },
	{ difficulty: 'easy', src: 'images/cocoa-bean.png', matched: false },
	{ difficulty: 'easy', src: 'images/coins.png', matched: false },
	{ difficulty: 'easy', src: 'images/cuauhtli.png', matched: false },
	{ difficulty: 'easy', src: 'images/drums.png', matched: false },
	{ difficulty: 'easy', src: 'images/fan.png', matched: false },
	{ difficulty: 'easy', src: 'images/gold.png', matched: false },
	{ difficulty: 'easy', src: 'images/macuahuitl.png', matched: false },
	{ difficulty: 'easy', src: 'images/mask-round.png', matched: false },
	{ difficulty: 'easy', src: 'images/mask-square.png', matched: false },
	{ difficulty: 'easy', src: 'images/ozomahtli.png', matched: false },
	{ difficulty: 'easy', src: 'images/quetzalcoatl.png', matched: false },
	{ difficulty: 'easy', src: 'images/quiahuitl.png', matched: false },
	{ difficulty: 'easy', src: 'images/shield.png', matched: false },
	{ difficulty: 'easy', src: 'images/sling.png', matched: false },
	{ difficulty: 'easy', src: 'images/spears.png', matched: false },
	{ difficulty: 'easy', src: 'images/tambourine.png', matched: false },
	{ difficulty: 'easy', src: 'images/teponaztli.png', matched: false },
	{ difficulty: 'easy', src: 'images/tomahawk.png', matched: false },
	{ difficulty: 'easy', src: 'images/tonatiuh.png', matched: false },
	{ difficulty: 'easy', src: 'images/turtle.png', matched: false },
	{ difficulty: 'easy', src: 'images/ullamaliztli.png', matched: false },
	{ difficulty: 'easy', src: 'images/xiuhtecuhtli.png', matched: false },
];

const Game = () => {
	const [ cards, setCards ] = useState( [] );
	const [ turns, setTurns ] = useState();
	const [ choiceOne, setChoiceOne ] = useState( null );
	const [ choiceTwo, setChoiceTwo ] = useState( null );
	const [ disabled, setDisabled ] = useState( false );

	// Compare selected cards.
	useEffect( () => {
		if ( choiceOne && choiceTwo ) {
			setDisabled( true );
			if ( choiceOne.src === choiceTwo.src ) {
				setCards( ( prevCards ) => {
					return prevCards.map( ( card ) => {
						if ( card.src === choiceOne.src ) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					} );
				} );
				resetTurns();
			} else {
				setTimeout( () => resetTurns(), 1000 );
			}
		}
	}, [ choiceOne, choiceTwo ] );

	// Start game automatically.
	useEffect( () => {
		shuffleCards( { number: 6 } );
	}, [] );

	// Shuffle cards.
	const shuffleCards = ( { number, difficulty } ) => {
		if ( difficulty == 'hard' ) {
			const cardImages = cardImagesHard;
		}

		if ( difficulty == 'easy' ) {
			const cardImages = cardImagesEasy;
		}

		const cardImages = cardImagesEasy;
		const slicedCardImages = cardImages.slice( 0, number );
		const shuffledCards = [ ...slicedCardImages, ...slicedCardImages ]
			.sort( () => Math.random() - 0.5 )
			.map( ( card ) => ( { ...card, id: Math.random() } ) );

		setChoiceOne( null );
		setChoiceTwo( null );
		setCards( shuffledCards );
		setTurns( 0 );
	};

	// Handle a choice.
	const handleChoice = ( card ) => {
		choiceOne ? setChoiceTwo( card ) : setChoiceOne( card );
	};

	// Reset choices & increase turn.
	const resetTurns = () => {
		setChoiceOne( null );
		setChoiceTwo( null );
		setDisabled( false );
		setTurns( ( prevTurns ) => prevTurns + 1 );
	};

	// Reset choices & increase turn.
	return (
		<div className="Game">
			<h1>Magic Match</h1>
			<Controls shuffleCards={ shuffleCards } />
			<Board
				cards={ cards }
				choiceOne={ choiceOne }
				choiceTwo={ choiceTwo }
				handleChoice={ handleChoice }
				disabled={ disabled }
			/>
			<div>Turns: { turns } | Timer: 0:00</div>
		</div>
	);
};

export default Game;
