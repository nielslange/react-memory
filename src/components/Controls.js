export const Controls = ( { shuffleCards } ) => {
	return (
		<>
			<button
				onClick={ () =>
					shuffleCards( { number: 6, difficulty: 'easy' } )
				}
			>
				6 cards <strong>easy</strong>
			</button>
			<button
				onClick={ () =>
					shuffleCards( { number: 6, difficulty: 'hard' } )
				}
			>
				6 cards <strong>hard</strong>
			</button>
			<button
				onClick={ () =>
					shuffleCards( { number: 12, difficulty: 'easy' } )
				}
			>
				12 cards <strong>easy</strong>
			</button>
			<button
				onClick={ () =>
					shuffleCards( { number: 12, difficulty: 'hard' } )
				}
			>
				12 cards <strong>hard</strong>
			</button>
			<button onClick={ () => shuffleCards( { number: 24 } ) }>
				24 cards
			</button>
			<button onClick={ () => shuffleCards( { number: 36 } ) }>
				36 cards
			</button>
		</>
	);
};
