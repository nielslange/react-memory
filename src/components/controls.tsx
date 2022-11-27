/**
 * External dependencies
 */
import Form from 'react-bootstrap/Form';

/**
 * Internal dependencies
 */
import { ControlsProps } from '../utils/interfaces';

export const Controls = ( { shuffleCards }: ControlsProps ) => {
	return (
		<Form.Select
			onChange={ ( event ) =>
				shuffleCards( {
					number: parseInt( event.target.value ),
				} )
			}
		>
			<option>Select number of cards</option>
			<option value="6">6 cards</option>
			<option value="12">12 cards</option>
			<option value="24">24 cards</option>
			<option value="36">36 cards</option>
		</Form.Select>
	);
};
