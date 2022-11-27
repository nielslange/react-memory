/**
 * External dependencies
 */
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Internal dependencies
 */
import { ControlsProps } from '../utils/interfaces';

export const Controls = ( {
	shuffleCards,
	iconPack,
	number,
}: ControlsProps ) => {
	return (
		<>
			<Form>
				<Row>
					<Col>
						<Form.Select
							name="number"
							onChange={ ( event ) =>
								shuffleCards( {
									iconPack,
									number: parseInt( event.target.value ),
								} )
							}
						>
							<option value="6">6 cards</option>
							<option value="12">12 cards</option>
							<option value="24">24 cards</option>
							<option value="100">all cards</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Select
							name="iconPack"
							onChange={ ( event ) =>
								shuffleCards( {
									iconPack: event.target.value,
									number,
								} )
							}
						>
							<option value="aztec">Aztec</option>
							<option value="nautical">Nautical</option>
							<option value="ramadan">Ramadan</option>
							<option value="sea">Sea</option>
						</Form.Select>
					</Col>
				</Row>
			</Form>
		</>
	);
};
