/**
 * External dependencies
 */
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/**
 * Internal dependencies
 */
import { Board } from './components/board';
import { ButtonProps, ImageProps } from './utils/interfaces';
import { Controls } from './components/controls';
import { aztec, nautical, ramadan, sea } from './icons';

import './game.scss';

const Game = () => {
	const [ cards, setCards ] = useState( [] );
	const [ turns, setTurns ] = useState( 0 );
	const [ choiceOne, setChoiceOne ] = useState( null );
	const [ choiceTwo, setChoiceTwo ] = useState( null );
	const [ disabled, setDisabled ] = useState( false );
	const [ number, setNumber ] = useState( 6 );
	const [ iconPack, setIconPack ] = useState( 'aztec' );

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
		shuffleCards( { number, iconPack } );
	}, [] );

	// Shuffle cards.
	const shuffleCards = ( { number, iconPack }: ButtonProps ): void => {
		let cardImages: any = [];

		switch ( iconPack ) {
			case 'nautical':
				cardImages = nautical;
				break;
			case 'ramadan':
				cardImages = ramadan;
				break;
			case 'sea':
				cardImages = sea;
				break;
			default:
				cardImages = aztec;
		}

		const slicedCardImages = cardImages.slice( 0, number );
		const shuffledCards = [ ...slicedCardImages, ...slicedCardImages ]
			.sort( () => Math.random() - 0.5 )
			.map( ( card ) => ( { ...card, id: Math.random() } ) );

		setNumber( number );
		setIconPack( iconPack );
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
			<Navbar bg="light" expand="sm">
				<Container>
					<Navbar.Brand>Memory Game</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Controls
							shuffleCards={ shuffleCards }
							number={ number }
							iconPack={ iconPack }
						/>
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
