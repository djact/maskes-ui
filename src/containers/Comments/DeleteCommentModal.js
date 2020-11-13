import React from 'react';
import { Button as BSButton, Modal } from 'react-bootstrap';
import '../../components/Comment/Comment.css';

const DeleteCommentModal = (props) => {
	const {
		showDeleteModal,
		setShowDeleteModal,
		deleteCommentId,
		remove
	} = props;
	return (
		<Modal
			show={showDeleteModal}
			centered
			onHide={() => setShowDeleteModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Delete Comment</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
			<Modal.Footer>
				<BSButton variant="secondary" onClick={() => setShowDeleteModal(false)}>
					Close
				</BSButton>
				<BSButton
					variant="danger"
					onClick={() => {
						remove(deleteCommentId);
						setShowDeleteModal(false);
					}}
				>
					Yes, Delete
				</BSButton>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteCommentModal;
