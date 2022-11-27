/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { CardProps } from '../utils/interfaces';
import './card.scss';

export const Card = ( {
	card,
	disabled,
	flipped,
	handleChoice,
	matched,
}: CardProps ) => {
	const handleClick = () => {
		if ( ! disabled ) handleChoice( card );
	};

	return (
		<div className="card">
			<div className={ flipped ? 'flipped' : '' }>
				<img
					src={ card.src }
					alt="card front"
					className={ classnames( 'front', { matched } ) }
				/>
				<img
					src="images/pattern.png"
					alt="card back"
					className="back"
					onClick={ handleClick }
				/>
			</div>
		</div>
	);
};
