import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import GlobalModals from '../global-modals/GlobalModals';
import { withRouter } from 'react-router';
import * as navManager from '../navbar/nav-manager';

const AppRoot = (props) => {
  const { hasLogin, navId } = props
  const component = navManager.getDisplayComponentForNav(hasLogin, navId)
  return (
    <div>
      <GlobalModals />
      <Navbar />
      <Route path={navId} component={component}></Route>
    </div>
  )

};

const mapStateToProps = (state, props) => {
  const navId = props.match.params.navId;

  return {
    navId: state.nav.navId,
    hasLogin: state.auth.hasLogin
  };
};

export default withRouter(connect(mapStateToProps)(AppRoot));
