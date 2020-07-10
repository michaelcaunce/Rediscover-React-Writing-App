import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"

import LoadingDotsIcons from "./LoadingDotsIcon"

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  // State to store posts data
  const [posts, setPosts] = useState([])

  // Send request to the backend
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token })
        // Store the value in state
        setPosts(response.data)
        // Set is loading to false to display all posts
        setIsLoading(false)
      } catch (e) {
        console.log("There was an error or the request was cancelled")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading) return <LoadingDotsIcons />
  return (
    <div className="list-group">
      {/* Loop through the array of data */}
      {posts.map(post => {
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> <span className="text-muted small">on {dateFormatted} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
