import React, { Component } from 'react';

import './Login.css';

import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { hideLoginModal } from './login-modal.actions';

interface ILoginModalProps {
  show?: boolean;
  hideLoginModal?(): any;
}

class LoginModal extends Component<ILoginModalProps> {
  render() {
    if (this.props.show) {
      const { show, hideLoginModal } = this.props;
      return (
        <Modal
          show={show}
          onHide={hideLoginModal}
          dialogClassName="modal-50w"
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Log in with your Username
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={hideLoginModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => console.log('logging in')}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
        // TODO: implement register-new-account form
        // TODO: implement UI when the user is already login
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    show: state.globalModals.show,
  };
};

export default connect(mapStateToProps, {
  hideLoginModal,
})(LoginModal);
