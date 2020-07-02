import React from 'react';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../root/action';


const RequestTableList = ({ onGetNavId, onGetSubNavId, history }) => {

  const setRedirectPathHandler = (navId, subNavId) => {
    onGetNavId(navId);
    onGetSubNavId(subNavId);
    return history.push(navId + subNavId)
  }

  return (
    <Jumbotron>
      <h1>Hello!</h1>
      <p>We are here to support you!</p>
      <p>
        <Button
          onClick={() => setRedirectPathHandler('/my-requests', '/create-request')}
          variant="primary"
        >
          Submit a request
        </Button>
      </p>
    </Jumbotron>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetNavId: (navId) => dispatch(actions.getNavId(navId)),
    onGetSubNavId: (subNavId) => dispatch(actions.getSubNavId(subNavId)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(RequestTableList));
