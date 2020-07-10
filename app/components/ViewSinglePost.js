import React, { useEffect, useState } from "react"
import Page from "./Page"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import ReactMarkdown from "react-markdown"

import LoadingDotsIcons from "./LoadingDotsIcon"

function ViewSinglePost() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  // Send request to the backend
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
        // Store the value in state
        setPost(response.data)
        // Set is loading to false to display all posts
        setIsLoading(false)
      } catch (e) {
        console.log("There was an error or the request was cancelled")
      }
    }
    fetchPost()
    // Function to run when this component stops being rendered.
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcons />
      </Page>
    )

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="content-container">
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          <span className="pt-2">
            <a href="#" className="text-primary mr-2" title="Edit">
              <i className="fas fa-edit"></i>
            </a>
            <a className="delete-post-button text-danger" title="Delete">
              <i className="fas fa-trash"></i>
            </a>
          </span>
        </div>

        <p className="text-muted small mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img className="avatar-tiny" src={post.author.avatar} />
          </Link>
          Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
        </p>

        <div className="body-content">
          {/* Add react markdown */}
          <ReactMarkdown source={post.body} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem", "image", "blockquote"]} />
        </div>
      </div>
    </Page>
  )
}

export default ViewSinglePost
