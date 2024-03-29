import './App.css'
import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import Logout from './components/Auth/Logout'

import Home from './containers/Home/Home'
import GetHelp from './containers/GetHelp/GetHelp'
import GetInvolved from './containers/GetInvolved/GetInvolved'

import ResetPassword from './containers/Password/ResetPassword'
import ConfirmPassword from './containers/Password/ConfirmPassword'
import ResetEmail from './containers/Email/ResetEmail'
import ConfirmEmail from './containers/Email/ConfirmEmail'

import UserProfile from './containers/UserProfile/UserProfile'

import RequestSupport from './components/Request/CreateRequest/RequestSupport'
import RequestDetail from './containers/Requests/RequestDetail/RequestDetail'
import RequestList from './containers/Requests/RequestList/RequestList'

import VolunteerList from './containers/Volunteer/VolunteerList/VolunteerList'
import VolunteerDetail from './containers/Volunteer/VolunteerDetail/VolunteerDetail'
import MyVolunteerList from './containers/Volunteer/MyVolunteer/MyVolunteerList'
import MyVolunteerDetail from './containers/Volunteer/MyVolunteer/MyVolunteerDetail'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { withRouter } from 'react-router'
import { authCheckLoginState } from './components/Auth/store/actions/actions'
import Faq from './containers/FAQ/Faq'
import DonationSuccess from './containers/Donation/DonationSuccess'

const App = ({
    isAuthenticated,
    authCheckLoginState,
    is_requester,
    is_volunteer,
}) => {
    const token = localStorage.getItem('access')

    useEffect(() => {
        authCheckLoginState()
    }, [token, authCheckLoginState])

    const requester_routes = (
        <Switch>
            <ProtectedRoute exact path="/my-requests" component={RequestList} />
            <ProtectedRoute
                exact
                path="/my-requests/create-request"
                component={RequestSupport}
            />
            <ProtectedRoute
                exact
                path="/my-requests/:requestId"
                component={RequestDetail}
            />
        </Switch>
    )
    const volunteer_routes = (
        <Switch>
            <ProtectedRoute exact path="/volunteer" component={VolunteerList} />
            <ProtectedRoute
                exact
                path="/volunteer/my-support"
                component={MyVolunteerList}
            />
            <ProtectedRoute
                exact
                path="/volunteer/my-support/:volunteerId"
                component={MyVolunteerDetail}
            />
            <Redirect from="/volunteer/signup" to="/volunteer" />
            <ProtectedRoute
                exact
                path="/volunteer/:requestId"
                component={VolunteerDetail}
            />
            <Redirect exact from="/profile" to="/profile/me/" />
            <Route exact path="/profile/:userId/" component={UserProfile} />
        </Switch>
    )
    const public_routes = (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/get-help" component={GetHelp} />
            <Route path="/get-involved" component={GetInvolved} />
            <Route exact path="/faq" component={Faq} />
            <Redirect from="/admin" to="/admin/" />
            <Route path="/donation/success" component={DonationSuccess} />
        </Switch>
    )

    return (
        <Layout>
            {public_routes}
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/password-reset" component={ResetPassword} />
            <Route
                exact
                path="/password-reset-confirm/:uid/:token"
                component={ConfirmPassword}
            ></Route>
            <Route exact path="/email-reset" component={ResetEmail} />
            <Route
                exact
                path="/email-reset-confirm/:uid/:token"
                component={ConfirmEmail}
            ></Route>
            {is_requester && isAuthenticated ? requester_routes : null}
            {is_volunteer && isAuthenticated ? volunteer_routes : null}
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.access !== null,
        is_requester: state.auth.is_requester,
        is_volunteer: state.auth.is_volunteer,
    }
}

export default withRouter(
    connect(mapStateToProps, { authCheckLoginState })(App)
)
