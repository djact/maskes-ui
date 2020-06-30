import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './navbar/Navbar';
import Home from './home/Home';
import GetHelp from './get-help/GetHelp';
import Volunteer from './volunteer/Volunteer';
import GlobalModals from './global-modals/GlobalModals';
import Account from './account/Account';
import { withRouter } from 'react-router';

const AppRoot = ({ hasLogin }) => (
  <div>
    <GlobalModals />
    <Navbar />
    <Switch>
      <Route path="/get-help" component={GetHelp}></Route>
      <Route path="/volunteer" component={Volunteer}></Route>
      <PrivateRoute hasLogin={hasLogin} path="/my-account">
        <Account />
      </PrivateRoute>
      <Route path="/" component={Home}></Route>
    </Switch>
  </div>
);

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.hasLogin || false,
  };
};

export default withRouter(connect(mapStateToProps)(AppRoot));

function PrivateRoute({ children, hasLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
