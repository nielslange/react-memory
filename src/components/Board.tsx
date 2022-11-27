/**
 * Internal dependencies
 */
import { BoardProps } from '../utils/interfaces';
import { Card } from './card';

export const Board = ( {
	cards,
	choiceOne,
	choiceTwo,
	disabled,
	handleChoice,
}: BoardProps ) => {
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
