import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';
import ReimbursementForm from '../../components/Form/ReimbursementForm';
import { requestReimbursement, fetchReimbursement, updateReimbursement, deleteReimbursement } from './store/actions/actions';
import DeleteModal from './DeleteModal';
import ReimbursementInfo from '../Reimbursement/ReimbursementInfo';
import './Reimbursement.css'


const Reimbursement = (props) => {

    const { requestReimbursement, fetchReimbursement,
        updateReimbursement, deleteReimbursement,
        volunteerId, reimbursement_detail, reimbursement, loading,
        reimbursementId
    } = props;

    const [onEdit, setOnEdit] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [reimbursementFormData, setReimbursementFormData] = useState(reimbursement_detail ? {
        total_cost: reimbursement_detail.total_cost,
        amount: reimbursement_detail.amount,
        note: reimbursement_detail.volunteer_notes,
        receipt: null,
    } : null);


    const handleCreate = (formData) => {
        requestReimbursement(formData, volunteerId);
    };

    const handleUpdate = (formData) => {
        updateReimbursement(formData, volunteerId, reimbursementId);
        setOnEdit(false);
    };

    const handleDelete = () => {
        deleteReimbursement(reimbursementId, volunteerId);
        setShowDeleteModal(false);
    };

    useEffect(() => {
        if (reimbursement_detail) {
            fetchReimbursement(reimbursement_detail.id)
        }
    }, [reimbursement_detail, fetchReimbursement, deleteReimbursement, volunteerId, reimbursementId]);


    let display = <Spinner animation="border" style={{ marginLeft: '40%' }} />

    if (!loading) {
        display = (
            !reimbursement || onEdit ? <ReimbursementForm
                formData={reimbursementFormData}
                setFormData={setReimbursementFormData}
                create={handleCreate}
                update={handleUpdate}
                remove={handleDelete}
                onEdit={onEdit}
                setOnEdit={setOnEdit}
            /> : <div>
                    <ReimbursementInfo
                        publicMode={false}
                        reimbursement={reimbursement}
                    />
                    {reimbursement.status !== 'Completed' &&
                        <div>
                            <Button
                                className='mt-1 mb-3 mr-2 edit-reimbursement-button'
                                onClick={() => setOnEdit(true)}
                            >Edit</Button>
                            <Button
                                className='mt-1 mb-3'
                                variant='outline-danger'
                                onClick={() => {
                                    setShowDeleteModal(true);
                                }}
                            >Cancel</Button>
                        </div>}
                </div>


        )
    }

    return <div>
        <DeleteModal
            showDeleteModal={showDeleteModal}
            closeModalHandler={() => setShowDeleteModal(false)}
            deleteHandler={handleDelete} />
        <h5 style={{ fontWeight: 'bold' }}>Reimbursement Infomation</h5>
        {display}
    </div>

};

const mapStateToProps = (state) => {
    return {
        loading: state.reimbursement.loading,
        reimbursement: state.reimbursement.reimbursement,
        error: state.reimbursement.error,
    }
}

export default connect(mapStateToProps, {
    requestReimbursement, fetchReimbursement,
    updateReimbursement, deleteReimbursement
})(Reimbursement);