import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import { Table, Image, Popover, OverlayTrigger, Badge } from 'react-bootstrap';

const ReimbursementInfo = (props) => {
    const { reimbursement, publicMode } = props;
    return (
        <Aux>

            <Badge variant={reimbursement.status === 'In Process' ? "warning" : "success"} className='mb-2'>{reimbursement.status}</Badge>

            <Table size="sm" responsive='sm'>
                <tbody>
                    {!publicMode && <tr><td>Reimbursement #</td><td>{reimbursement.id}</td></tr>}
                    <tr><td>Total Cost</td><td>{reimbursement.total_cost}</td></tr>
                    <tr><td>Request Amount</td><td>{reimbursement.amount}</td></tr>
                    {!publicMode && <tr><td>Note</td><td>{reimbursement.volunteer_notes}</td></tr>}
                    {!publicMode && <tr>
                        <OverlayTrigger
                            trigger="click"
                            placement="top"
                            rootClose
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Title as="h3">
                                        <a style={{ display: "table-cell" }}
                                            rel="noopener noreferrer"
                                            href={reimbursement.receipt_photo}
                                            target="_blank">Receipt Photo</a>
                                    </Popover.Title>

                                    <Popover.Content>
                                        <Image src={reimbursement.receipt_photo} thumbnail fluid />
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <td className="receipt-link">Receipt</td>
                        </OverlayTrigger>
                    </tr>}
                </tbody>
            </Table>

        </Aux>
    )
};

export default ReimbursementInfo;