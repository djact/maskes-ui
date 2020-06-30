import React, { Component } from 'react';

import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
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
          size="lg"
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={hideLoginModal}>Close</Button>
          </Modal.Footer>
        </Modal>
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
