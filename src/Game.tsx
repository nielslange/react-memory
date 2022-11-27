/**
 * External dependencies
 */
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

/**
 * Internal dependencies
 */
import { Board } from './components/board';
import { ButtonProps, ImageProps } from './utils/interfaces';
import { Controls } from './components/controls';
import './game.scss';

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
	const [ turns, setTurns ] = useState( 0 );
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
		shuffleCards( { number: 6, difficulty: 'easy' } );
	}, [] );

	// Shuffle cards.
	const shuffleCards = ( { number, difficulty }: ButtonProps ): void => {
		let cardImages: ImageProps[];

		console.log( number );

		switch ( difficulty ) {
			case 'easy':
				cardImages = cardImagesEasy;
				break;
			case 'hard':
				cardImages = cardImagesHard;
				break;
			default:
				cardImages = cardImagesEasy.concat( cardImagesHard );
		}

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
	const handleChoice = ( card: ImageProps ) => {
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
		<>
			<Navbar bg="light" expand="xxl">
				<Container>
					<Navbar.Brand>Memory Game</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Form>
							<Row>
								<Col>
									<Controls shuffleCards={ shuffleCards } />
								</Col>
							</Row>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<main className="flex-shrink-0">
				<Container>
					<div className="Game">
						<Board
							cards={ cards }
							choiceOne={ choiceOne }
							choiceTwo={ choiceTwo }
							handleChoice={ handleChoice }
							disabled={ disabled }
						/>
					</div>
				</Container>
			</main>

			<footer className="footer mt-auto py-3 bg-light">
				<Container>
					<div>Turns: { turns } | Timer: 0:00</div>
				</Container>
			</footer>
		</>
	);
};

export default Game;
