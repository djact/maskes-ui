import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../../shared/axios';
import { Form, Button, Input } from 'semantic-ui-react';
import Reply from '../../../components/Comment/Reply/Reply';
import { connect } from 'react-redux';
import moment from 'moment';
import Aux from '../../../hoc/Aux/Aux';

const Replies = (props) => {
	const { userId, loadReplies, commentId } = props;

	const [replies, setReplies] = useState([]);

	const fetchReply = useCallback(
        () =>
			axios
				.post('/connect/replies/view_replies/', {
					commentId: commentId
				})
				.then((res) => {
					setReplies(res.data.results);
				}),
		[commentId]
	);

	const createReply = (content) => {
		const url = '/connect/replies/';

		const body = {
			reply_content: content,
			comment: commentId
		};
		axios
			.post(url, body)
			.then((res) => {
				fetchReply();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateReply = (replyId, content) => {
		const url = `/connect/replies/${replyId}/`;

		const body = {
			reply_content: content,
			comment: commentId
		};
		axios
			.put(url, body)
			.then((res) => fetchReply())
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteReply = (replyId) => {
		const url = `/connect/replies/${replyId}/`;
		axios
			.delete(url)
			.then((res) => fetchReply())
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (loadReplies) {
			fetchReply();
		}
	}, [loadReplies, fetchReply]);

	const RepliesDisplay = () =>
		replies.length > 0
			? replies.map((reply, idx) => (
					<Reply
						key={idx}
						reply={reply}
						userId={parseInt(userId)}
						moment={moment}
						update={updateReply}
						remove={deleteReply}
					/>
			  ))
			: null;

	const [replyContent, setReplyContent] = useState('');
	const onChangeReply = (e) => {
		setReplyContent(e.target.value);
		console.log(replyContent);
	};

	const [showReplyInput, setShowReplyInput] = useState(false);

	return (
		<Aux>
			<RepliesDisplay />
			{!showReplyInput ? (
				<Button
					size="tiny"
					onClick={() => setShowReplyInput(true)}
					color="facebook"
				>
					Reply
				</Button>
			) : (
				<Form
					reply
					onSubmit={(e) => {
						createReply(replyContent);
						setReplyContent('');
					}}
				>
					{replyContent ? (
						<Button type="submit" size="tiny" color="teal">
							Reply
						</Button>
					) : (
						<Button onClick={() => setShowReplyInput(false)} size="tiny">
							Close
						</Button>
					)}

					<Input
						width={10}
						style={{ height: 33, width: '70%', marginRight: 3 }}
						onChange={onChangeReply}
						value={replyContent}
						placeholder="reply to this comment..."
					/>
				</Form>
			)}
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user_id
	};
};

export default connect(mapStateToProps, null)(Replies);
