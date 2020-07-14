import React, { useEffect, useContext } from "react"
import Page from "./Page"
import { useParams, NavLink, Switch, Route } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"

// components
import ProfilePost from "../components/ProfilePosts"
import ProfileFollowers from "../components/ProfileFollowers"
import ProfileFollowing from "../components/ProfileFollowing"

function Profile() {
  // useParams will return an object
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: "...",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" }
    }
  })

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    // Send a request to the backend
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token })
        setState(draft => {
          draft.profileData = response.data
        })
      } catch (e) {
        console.log("There was an error or the request was cancelled")
      }
    }
    fetchData()
    return () => {
      ourRequest.cancel()
    }
  }, [username])

  // Functionality to start following users
  function startFollowing() {
    setState(draft => {
      draft.startFollowingRequestCount++
    })
  }

  useEffect(() => {
    if (state.startFollowingRequestCount) {
      setState(draft => {
        draft.followActionLoading = true
      })
      const ourRequest = Axios.CancelToken.source()
      // Send a request to the backend
      async function fetchData() {
        try {
          const response = await Axios.post(`/addFollow/${state.profileData.profileUsername}`, { token: appState.user.token }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.profileData.isFollowing = true
            draft.profileData.counts.followerCount++
            draft.followActionLoading = false
          })
        } catch (e) {
          console.log("There was an error or the request was cancelled")
        }
      }
      fetchData()
      return () => {
        ourRequest.cancel()
      }
    }
  }, [state.startFollowingRequestCount])

  // Functionality to stop following users
  function stopFollowing() {
    setState(draft => {
      draft.stopFollowingRequestCount++
    })
  }

  useEffect(() => {
    if (state.stopFollowingRequestCount) {
      setState(draft => {
        draft.followActionLoading = true
      })
      const ourRequest = Axios.CancelToken.source()
      // Send a request to the backend
      async function fetchData() {
        try {
          const response = await Axios.post(`/removeFollow/${state.profileData.profileUsername}`, { token: appState.user.token }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.profileData.isFollowing = false
            draft.profileData.counts.followerCount--
            draft.followActionLoading = false
          })
        } catch (e) {
          console.log("There was an error or the request was cancelled")
        }
      }
      fetchData()
      return () => {
        ourRequest.cancel()
      }
    }
  }, [state.stopFollowingRequestCount])

  return (
    <Page title="Profile Screen">
      <div className="content-container">
        <h2>
          <img className="avatar-small" src={state.profileData.profileAvatar} /> {state.profileData.profileUsername}
          {appState.loggedIn && !state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != "..." && (
            <button onClick={startFollowing} disabled={state.followActionLoading} className="btn btn-primary btn-sm ml-2">
              Follow <i className="fas fa-user-plus"></i>
            </button>
          )}
          {/* Add an unfollow button to any followed user */}
          {appState.loggedIn && state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != "..." && (
            <button onClick={stopFollowing} disabled={state.followActionLoading} className="btn btn-danger btn-sm ml-2">
              Unfollow <i className="fas fa-user-times"></i>
            </button>
          )}
        </h2>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <NavLink exact to={`/profile/${state.profileData.profileUsername}`} className="nav-item nav-link">
            Posts: {state.profileData.counts.postCount}
          </NavLink>
          <NavLink to={`/profile/${state.profileData.profileUsername}/followers`} className="nav-item nav-link">
            Followers: {state.profileData.counts.followerCount}
          </NavLink>
          <NavLink to={`/profile/${state.profileData.profileUsername}/following`} className="nav-item nav-link">
            Following: {state.profileData.counts.followingCount}
          </NavLink>
        </div>
        <Switch>
          <Route exact path="/profile/:username">
            {/* Profile Posts component */}
            <ProfilePost />
          </Route>
          <Route path="/profile/:username/followers">
            {/* User followers component */}
            <ProfileFollowers />
          </Route>
          <Route path="/profile/:username/following">
            {/* User follownig component */}
            <ProfileFollowing />
          </Route>
        </Switch>
      </div>
    </Page>
  )
}

export default Profile
