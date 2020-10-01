import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';
import ReimbursementForm from '../../components/Form/ReimbursementForm';
import { requestReimbursement, fetchReimbursement, updateReimbursement, deleteReimbursement, skipReimbursement } from './store/actions/actions';
import DeleteModal from './DeleteModal';
import ReimbursementInfo from '../Reimbursement/ReimbursementInfo';
import ConfirmSkipModal from '../../components/Modal/ConfirmModal/ConfirmModal';
import PropTypes from 'prop-types';
import './Reimbursement.css'


const Reimbursement = (props) => {

    const { requestReimbursement, fetchReimbursement,
        updateReimbursement, deleteReimbursement, skipReimbursement,
        volunteerId, reimbursement_detail, reimbursement, loading,
        reimbursementId, skip, requestId, supporter_name
    } = props;

    const [onEdit, setOnEdit] = useState(false);

    const [createReimbursement, setCreateReimbursement] = useState();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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

    const handleSkip = () => {
        skipReimbursement(true, volunteerId, requestId)
    }

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
                setCreateReimbursement={setCreateReimbursement}
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

    return !skip ? <div>
        <ConfirmSkipModal
            showConfirmModal={showConfirmModal}
            closeModalHandler={() => setShowConfirmModal(false)}
            confirmHandler={handleSkip}
            label={`Skip Reimbursement`}
            message={`Please confirm that you do not need a reimbursement and 
            want to donate your total shopping cost`}
        />
        <DeleteModal
            showDeleteModal={showDeleteModal}
            closeModalHandler={() => setShowDeleteModal(false)}
            deleteHandler={handleDelete} />
        <h5 style={{ fontWeight: 'bold' }}>Reimbursement Infomation</h5>

        {(!reimbursement ? createReimbursement : true) ? display : <Button className='create-reimbursement-button' onClick={() => setCreateReimbursement(true)}>Create Reimbursement</Button>}
        {!reimbursement && <h6>Don't need reimbursement?
            <Button
                variant='link'
                size='sm'
                onClick={() => setShowConfirmModal(true)}
            >Click here to Skip</Button>
        </h6>}
    </div> :
        <div className='thank-you-note'>
            <h5 className='thank-you-note-header'>Thank you for your support {supporter_name}!</h5>
            <p>Because of your generous donation, we will be able to help families overcome their hardship during COVID-19.</p>
            <p>We will send you updates over the next few months so that you know exactly what is happening with your donation, and the impact that we have been able to create together.</p>
            <p>Thank you again for being a part of our Mutual Aid family!</p>
        </div>

};

Reimbursement.propTypes = {
    requestReimbursement: PropTypes.func,
    fetchReimbursement: PropTypes.func,
    updateReimbursement: PropTypes.func,
    deleteReimbursement: PropTypes.func,
    skipReimbursement: PropTypes.func,

    reimbursement_detail: PropTypes.object,
    reimbursement: PropTypes.object,

    loading: PropTypes.bool,
    skip: PropTypes.bool,

    reimbursementId: PropTypes.number,
    requestId: PropTypes.number,
    volunteerId: PropTypes.number,

    supporter_name: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        loading: state.reimbursement.loading,
        reimbursement: state.reimbursement.reimbursement,
        error: state.reimbursement.error,
        supporter_name: state.auth.name,
    }
}

export default connect(mapStateToProps, {
    requestReimbursement, fetchReimbursement,
    updateReimbursement, deleteReimbursement,
    skipReimbursement
})(Reimbursement);