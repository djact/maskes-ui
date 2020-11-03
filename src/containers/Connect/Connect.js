import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Comment from '../../components/Comment/Comment';
import Spinner from 'react-bootstrap/Spinner';
import {
	fetchComments,
	createComment,
	updateComment,
	deleteComment
} from './store/actions/actions';

const Connect = (props) => {
	const {
		fetchComments,
		createComment,
		updateComment,
		deleteComment,
		comments,
		loading,
		requestId,
		user_id
	} = props;

	useEffect(() => requestId && fetchComments(requestId), [
		fetchComments,
		requestId
	]);

	const createCommentHandler = (content) => {
		createComment(requestId, content);
	};

	const updateCommentHandler = (commentId, content) => {
		updateComment(requestId, commentId, content);
	};

	const deleteCommentHandler = (commentId) => {
		deleteComment(requestId, commentId);
	};

	return loading ? (
		<Spinner animation="border" />
	) : (
		<Comment
			comments={comments}
			create={createCommentHandler}
			update={updateCommentHandler}
			remove={deleteCommentHandler}
			loading={loading}
			userId={parseInt(user_id)}
			requestId={requestId}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		comments: state.connect.comments,
		error: state.connect.error,
		loading: state.connect.loading,
		user_id: state.auth.user_id
	};
};

export default connect(mapStateToProps, {
	fetchComments,
	createComment,
	updateComment,
	deleteComment
})(Connect);
