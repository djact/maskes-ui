import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../shared/axios';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Comment from '../../components/Comment/Comment';
import moment from 'moment';
import { Tabs, Tab } from 'react-bootstrap';
import { Button, Comment as CommentSUI, Form } from 'semantic-ui-react';
import DeleteCommentModal from './DeleteCommentModal';
import './Comments.css';

const Comments = (props) => {
	const { userId, requestId } = props;

	const [comments, setComments] = useState([]);

	const fetchComment = useCallback(() => {
		const url = '/connect/comments/view_comments/';

		const body = {
			requestId: requestId
		};
		axios.post(url, body).then((res) => {
			setComments(res.data.results);
		});
	}, [requestId]);

	const createComment = (content) => {
		const url = '/connect/comments/';

		const body = {
			comment_content: content,
			request: requestId
		};
		axios
			.post(url, body)
			.then((res) => {
				fetchComment();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateComment = (commentId, content) => {
		const url = `/connect/comments/${commentId}/`;

		const body = {
			comment_content: content,
			request: requestId
		};
		axios
			.put(url, body)
			.then((res) => fetchComment())
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteComment = (commentId) => {
		const url = `/connect/comments/${commentId}/`;

		axios
			.delete(url)
			.then((res) => fetchComment())
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchComment();
	}, [fetchComment]);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteCommentId, setDeleteCommentId] = useState(null);

	const CommentsDisplay = () => {
		return (
			<Aux>
				<DeleteCommentModal
					remove={deleteComment}
					showDeleteModal={showDeleteModal}
					setShowDeleteModal={setShowDeleteModal}
					deleteCommentId={deleteCommentId}
				/>
				<ul>
					{comments.map((comment, idx) => (
						<Comment
							key={idx}
							comment={comment}
							userId={parseInt(userId)}
							moment={moment}
							create={createComment}
							update={updateComment}
							remove={deleteComment}
							setShowDeleteModal={setShowDeleteModal}
							setDeleteCommentId={setDeleteCommentId}
						/>
					))}
				</ul>
			</Aux>
		);
	};

	const [key, setKey] = useState('Comment');
	const [commentContent, setCommentContent] = useState('');

	//Create Comment Form
	const onChange = (e) => {
		setCommentContent(e.target.value);
	};

	return (
		<Aux>
			{/* {deleteModal} */}
			<Tabs
				id="controlled-tab-example"
				className="mb-3"
				activeKey={key}
				onSelect={(k) => setKey(k)}
			>
				<Tab eventKey="Comment" title="Comment">
					<CommentSUI.Group>
						<CommentsDisplay />
					</CommentSUI.Group>
				</Tab>
				<Tab eventKey="Add Comment" title="Add Comment">
					<Form
						reply
						onSubmit={() => {
							createComment(commentContent);
							setCommentContent('');
							setKey('Comment');
						}}
					>
						<Form.TextArea onChange={onChange} value={commentContent} />
						<Button
							className="add-comment-button"
							type="submit"
							content="Add Comment"
							labelPosition="left"
							icon="edit"
							primary
						/>
					</Form>
				</Tab>
			</Tabs>
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user_id
	};
};

export default connect(mapStateToProps, null)(Comments);
