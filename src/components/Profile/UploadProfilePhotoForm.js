import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { setAlert } from '../Alert/store/actions/actions';
import axios from '../../shared/axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UploadProfilePhotoForm = (props) => {
	const { handleClose, profileId, setPhotoPath, setAlert } = props;

	const [profilePhoto, setProfilePhoto] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `/profile/${profileId}/upload_photo/`;

		let form_data = new FormData();
		if (profilePhoto) {
			form_data.append('image', profilePhoto);
		}

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};

		try {
			const response = await axios.post(url, form_data, config);
			setAlert(response.data.message, 'success');
			setPhotoPath(response.data.image);
		} catch (err) {
			setAlert('Failed to upload image', 'danger');
		}

		handleClose();
	};

	const fileChangeHandler = (e) => {
		e.preventDefault();
		setProfilePhoto(e.target.files[0]);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className="my-3">
				<Form.File
					required={true}
					className="mr-5"
					id="image"
					label="Choose Photo"
					custom
					onChange={fileChangeHandler}
					accept="image/png, image/jpeg"
				/>
			</InputGroup>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button type="submit" className="mt-3 mb-3 mr-sm-2">
					Upload
				</Button>
			</Modal.Footer>
		</Form>
	);
};

export default connect(null, { setAlert })(UploadProfilePhotoForm);

UploadProfilePhotoForm.propTypes = {
	handleClose: PropTypes.func,
	profileId: PropTypes.number,
	setPhotoPath: PropTypes.func,
	setAlert: PropTypes.func
};
