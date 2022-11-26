import classnames from 'classnames';
import './Card.css';

export const Card = ( { card, handleChoice, flipped, disabled, matched } ) => {
	const handleClick = () => {
		if ( ! disabled ) handleChoice( card );
	};

	console.log( matched );

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
