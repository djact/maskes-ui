import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux'
import axios from '../../shared/axios'
import Profile from '../../components/Profile/Profile'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
const UserProfile = (props) => {
    const { myId } = props
    const history = useHistory()

    const [profile, setProfile] = useState()

    const [error, setError] = useState(null)

    let userId = props.match.params.userId

    if (userId === 'me') {
        userId = myId
    }

    useEffect(() => {
        const url = `/profile/${userId}/`
        axios
            .get(url)
            .then((response) => {
                if (response.data) {
                    const payload = response.data
                    setProfile(payload)
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data.detail)
                }
            })
    }, [userId])

    const nameChangeSubmitHandler = (
        event,
        first_name,
        last_name,
        display_name
    ) => {
        event.preventDefault()
        const url = `/users/me/`

        const body = {
            first_name: first_name,
            last_name: last_name,
            display_name: display_name,
        }

        axios
            .put(url, body)
            .then(() => {
                history.push('/profile')
            })
            .catch((error) => {
                setError(error.response.data.detail)
            })
    }
    const updateProfileHandler = (event, profileData) => {
        event.preventDefault()
        const url = `/profile/${myId}/`

        const body = {
            phone: profileData[0].phone,
            location: profileData[1].location,
            bio: profileData[2].bio,
            facebook: profileData[3].facebook,
            twitter: profileData[4].twitter,
            venmo: profileData[5].venmo,
            user: myId,
        }
        axios
            .put(url, body)
            .then(() => {
                history.push('/profile')
            })
            .catch((error) => {
                setError(error.response.data.detail)
            })
    }

    return (
        <div>
            {error ? history.goBack() : null}
            {profile ? (
                <Profile
                    profile={profile}
                    myId={myId}
                    nameChangeSubmitHandler={nameChangeSubmitHandler}
                    updateProfileHandler={updateProfileHandler}
                />
            ) : (
                <Spinner />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myId: state.auth.user_id,
    }
}

export default connect(mapStateToProps, null)(UserProfile)

UserProfile.propTypes = {
    myId: PropTypes.string,
    match: PropTypes.object,
}
