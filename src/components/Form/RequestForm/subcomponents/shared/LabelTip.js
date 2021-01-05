import React from 'react';
import Form from 'react-bootstrap/Form';
import { BsInfoCircle } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PropTypes from 'prop-types';

const LabelTip = (props) => {
	const { tip, label, required } = props;
	return (
		<Form.Label>
			<OverlayTrigger
				placement="top"
				overlay={
					tip ? (
						<Popover>
							<Popover.Content>{tip}</Popover.Content>
						</Popover>
					) : (
						() => <div></div>
					)
				}
			>
				<div>
					{label}
					{required && <span className="required">*</span>}
					{tip && (
						<BsInfoCircle
							style={{
								fontSize: '0.8rem',
								marginLeft: 5,
								color: 'orange',
								marginBottom: 2
							}}
						/>
					)}
				</div>
			</OverlayTrigger>
		</Form.Label>
	);
};

LabelTip.propTypes = {
	tip: PropTypes.object,
	label: PropTypes.string,
	required: PropTypes.bool
};

export default LabelTip;
