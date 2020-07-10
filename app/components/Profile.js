import React, { useEffect, useContext, useState } from "react"
import Page from "./Page"
import { useParams } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"

// components
import ProfilePost from "../components/ProfilePosts"

function Profile() {
  // useParams will return an object
  const { username } = useParams()
  const appState = useContext(StateContext)
  // Set placeholder values
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" }
  })

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    // Send a request to the backend
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token })
        setProfileData(response.data)
      } catch (e) {
        console.log("There was an error or the request was cancelled")
      }
    }
    fetchData()
    return () => {
      ourRequest.cancel()
    }
  }, [])
  return (
    <Page title="Profile Screen">
      <div className="content-container">
        <h2>
          <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
          <button className="btn btn-primary btn-sm ml-2">
            Follow <i className="fas fa-user-plus"></i>
          </button>
        </h2>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <a href="#" className="active nav-item nav-link">
            Posts: {profileData.counts.postCount}
          </a>
          <a href="#" className="nav-item nav-link">
            Followers: {profileData.counts.followerCount}
          </a>
          <a href="#" className="nav-item nav-link">
            Following: {profileData.counts.followingCount}
          </a>
        </div>
        {/* Profile Posts component */}
        <ProfilePost />
      </div>
    </Page>
  )
}

export default Profile
