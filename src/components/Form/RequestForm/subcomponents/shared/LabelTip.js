import React from 'react';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const LabelTip = (props) => {
    const { tip, label, required } = props;
    return (
        <Form.Label>
            <OverlayTrigger
                placement='top'
                overlay={
                    tip ? <Popover>
                        <Popover.Content>
                            {tip}
                        </Popover.Content>
                    </Popover> : () => <div></div>
                }
            >
                <div>
                    {label}
                    {required && <span className='required'>*</span>}
                </div>
            </OverlayTrigger>
        </Form.Label>
    )
};

export default LabelTip;