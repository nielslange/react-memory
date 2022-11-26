import { Card } from './Card';

export const Board = ( {
	cards,
	choiceOne,
	choiceTwo,
	handleChoice,
	disabled,
} ) => {
	return (
		<div className="card-grid">
			{ cards.map( ( card ) => {
				return (
					<Card
						card={ card }
						key={ card.id }
						matched={ card.matched }
						handleChoice={ handleChoice }
						flipped={
							card === choiceOne ||
							card === choiceTwo ||
							card.matched
						}
						disabled={ disabled }
					/>
				);
			} ) }
		</div>
	);
};
