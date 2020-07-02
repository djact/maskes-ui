import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoot from './components/root/AppRoot';
import { connect } from 'react-redux';


const App = (props) => {
  const { navId } = props
  return <AppRoot navId={navId} />
}

const mapStateToProps = state => ({ navId: state.nav.navId })

export default connect(mapStateToProps)(App);
