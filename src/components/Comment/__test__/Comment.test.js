import React from 'react';
import { shallow, mount } from 'enzyme';
import Comment from '../Comment';

describe('Comment', () => {
	it('should render comment correctly without props', () => {
		const component = shallow(<Comment />);
		expect(component).toMatchSnapshot();
	});

	it('should render comment correctly with passed in props', () => {
		const comment = {
			id: '1',
			author: '1',
			author_name: 'Duc',
			author_image: 'images/test.jpg',
			comment_content: 'test comment',
			reply_count: 10,
			created_date: new Date().toISOString()
		};
		const commentData = {
			comment: comment,
			update: () => {},
			userId: '1',
			setDeleteCommentId: () => {},
			setShowDeleteModal: () => {}
		};

		const component = shallow(<Comment {...commentData} />);

		expect(component).toMatchSnapshot();
	});
});
