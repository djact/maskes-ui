import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import GlobalModals from '../global-modals/GlobalModals';
import { withRouter } from 'react-router';
import * as navManager from '../navbar/nav-manager';

const AppRoot = (props) => {
  const { hasLogin, navId, subNavId } = props
  const component = navManager.getDisplayComponentForNav(hasLogin, navId, subNavId)
  return (
    <div>
      <GlobalModals />
      <Navbar />
      {/* TODO: hide breadcrumbs for protected route */}
      <Breadcrumbs />
      <Route path={navId + subNavId} component={component}></Route>
    </div>
  )
};


const mapStateToProps = (state) => {
  return {
    navId: state.nav.navId,
    subNavId: state.nav.subNavId,
    hasLogin: state.auth.hasLogin
  };
};

export default withRouter(connect(mapStateToProps)(AppRoot));
