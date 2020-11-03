import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Comment as ReplySUI, Form } from 'semantic-ui-react';
import { Button as BSButton, Modal } from 'react-bootstrap';
import { BsXSquare } from 'react-icons/bs';
import './Reply.css';

const Reply = (props) => {
	const { reply, userId, update, remove, moment } = props;
	const isOwner = userId === reply.author;

	const [authorAvatar, setAuthorAvatar] = useState();

	useEffect(() => {
		if (reply) {
			setAuthorAvatar(reply.author_image);
		}
	}, [reply]);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteReplyId, setDeleteReplyId] = useState(null);
	const deleteModal = (
		<Modal
			show={showDeleteModal}
			centered
			onHide={() => setShowDeleteModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Delete Reply</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete reply with content:{' '}
				{reply.reply_content}
			</Modal.Body>
			<Modal.Footer>
				<BSButton variant="secondary" onClick={() => setShowDeleteModal(false)}>
					Close
				</BSButton>
				<BSButton variant="danger" onClick={() => handleDelete()}>
					Yes, Delete
				</BSButton>
			</Modal.Footer>
		</Modal>
	);

	const delete_button = <BsXSquare />;

	const history = useHistory();

	const [replyContent, setReplyContent] = useState(reply.reply_content);
	const onChangeReply = (e) => {
		setReplyContent(e.target.value);
	};

	const [onEdit, setOnEdit] = useState(false);
	const toggleEdit = () => setOnEdit(!onEdit);
	const handleSubmit = () => {
		update(reply.id, replyContent);
		setOnEdit(false);
	};

	const handleDelete = () => {
		remove(deleteReplyId);
		setShowDeleteModal(false);
		setOnEdit(false);
		setReplyContent(reply.reply_content);
	};

	return (
		<ReplySUI>
			{deleteModal}
			<ReplySUI.Avatar className="reply-avatar" as="a" src={authorAvatar} />
			<ReplySUI.Content>
				<ReplySUI.Author
					as="a"
					onClick={() => history.push(`/profile/${reply.author}`)}
				>
					{reply.author_name}
				</ReplySUI.Author>
				<ReplySUI.Metadata>
					<span>{moment(reply.created_date).fromNow()}</span>
					{onEdit ? (
						<ReplySUI.Actions>
							<ReplySUI.Action
								className="delete-btn"
								onClick={() => {
									setShowDeleteModal(true);
									setDeleteReplyId(reply.id);
								}}
							>
								{delete_button}
							</ReplySUI.Action>
						</ReplySUI.Actions>
					) : null}
					{isOwner && !onEdit ? (
						<ReplySUI.Actions>
							<ReplySUI.Metadata
								as="a"
								className="edit-reply-button"
								onClick={toggleEdit}
							>
								Edit
							</ReplySUI.Metadata>
						</ReplySUI.Actions>
					) : null}
				</ReplySUI.Metadata>

				{onEdit ? (
					<Form reply onSubmit={handleSubmit}>
						<Form.Input onChange={onChangeReply} value={replyContent} />
						<BSButton type="submit" size="sm" className="mr-2 update-button">
							Update
						</BSButton>
						<BSButton onClick={toggleEdit} variant="secondary" size="sm">
							Cancel
						</BSButton>
					</Form>
				) : (
					<ReplySUI.Text>{reply.reply_content}</ReplySUI.Text>
				)}
			</ReplySUI.Content>
		</ReplySUI>
	);
};

export default Reply;
