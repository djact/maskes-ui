import React, { Component } from 'react';

import './Navbar.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginModal } from '../global-modals/login/login-modal.actions';
import { getNavId } from '../root/action/';

interface ILoginModalProps {
  hasLogin?: boolean;
  onOpenLoginModal?(): any;
  onGetNavId(arg: string): any;
}

class AppNavbar extends Component<ILoginModalProps> {

  render() {
    const { hasLogin, onOpenLoginModal, onGetNavId } = this.props;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">
          COVID-19 Mutual Aid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!hasLogin && (
              <React.Fragment>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/get-help" onClick={() => onGetNavId("/get-help")}>
                  Get help
                </Nav.Link>
                <Nav.Link as={NavLink} to="/volunteer" onClick={() => onGetNavId("/volunteer")}>
                  Get involved
                </Nav.Link>
              </React.Fragment>
            )}

            {hasLogin && (
              <Nav.Link as={NavLink} to="/my-requests" onClick={() => onGetNavId("/my-requests")}>
                Manage requests
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Form inline>
          {!hasLogin && (
            <Button
              className="LoginButton"
              onClick={onOpenLoginModal}
              variant="outline-secondary"
            >
              Login
            </Button>
          )}

          {hasLogin && <div className="LoginButton">Welcome back!</div>}

          <Button variant="info">Donate</Button>
        </Form>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasLogin: state.auth.hasLogin || false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetNavId: (navId) => dispatch(getNavId(navId)),
    onOpenLoginModal: () => dispatch(openLoginModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
