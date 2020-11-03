import React from 'react';
import { connect } from 'react-redux';
import Comments from '../Comments/Comments';

const Connect = (props) => {
	const { requestId } = props;

	return <Comments requestId={requestId} />;
};

export default Connect;
