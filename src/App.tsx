import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoot from './components/root/AppRoot';
import NotFound from './components/NotFound/NotFound';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';

const App = (props) => {
  const { navId } = props
  return <AppRoot navId={navId} />
}

const mapStateToProps = state => ({ navId: state.nav.navId })

export default connect(mapStateToProps)(App);
