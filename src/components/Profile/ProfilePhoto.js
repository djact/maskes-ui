import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FcUpload } from 'react-icons/fc';
import styles from './ProfilePhoto.module.css';
import { Modal } from 'react-bootstrap';
import UploadProfilePhotoForm from './UploadProfilePhotoForm';

export const ProfilePhoto = (props) => {
	const { path, alt, profileId } = props;
	const [show, setShow] = useState(false);

	const [photoPath, setPhotoPath] = useState();

	useEffect(() => {
		if (path) setPhotoPath(path);
	}, [path]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<React.Fragment>
			<div className={styles.layover}>
				<img
					className={styles.profile_photo}
					src={photoPath}
					alt={alt}
					width="150"
				/>
				<div className={styles.profile_upload} onClick={handleShow}>
					<img
						className={styles.profile_photo_upload}
						src={photoPath}
						alt={alt}
						width="150"
					/>
					<FcUpload className={styles.profile_upload_icon} />
				</div>
			</div>
			<UploadProfilePhotoModal
				profileId={profileId}
				show={show}
				handleClose={handleClose}
				photoPath={photoPath}
				setPhotoPath={setPhotoPath}
			/>
		</React.Fragment>
	);
};

ProfilePhoto.propTypes = {
	path: PropTypes.string,
	alt: PropTypes.string,
	profileId: PropTypes.number
};

const UploadProfilePhotoModal = (props) => {
	const { show, handleClose, profileId, setPhotoPath } = props;

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Upload Profile Photo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<UploadProfilePhotoForm
					profileId={profileId}
					handleClose={handleClose}
					setPhotoPath={setPhotoPath}
				/>
			</Modal.Body>
		</Modal>
	);
};

UploadProfilePhotoModal.propTypes = {
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	profileId: PropTypes.number,
	setPhotoPath: PropTypes.func
};
