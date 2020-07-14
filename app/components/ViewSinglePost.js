import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import { useParams, Link, withRouter } from "react-router-dom"
import Axios from "axios"
import ReactMarkdown from "react-markdown"
import ReactTooltip from "react-tooltip"

import LoadingDotsIcons from "./LoadingDotsIcon"
import NotFound from "./NotFound"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ViewSinglePost(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
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
  }, [id])

  if (!isLoading && !post) {
    return (
      <Page title="Not Found">
        <div className="text-center content-container">
          <h2>We cannot find this page</h2>
          <p className="lead text-muted">
            Please return to the <Link to="/">Homepage</Link>
          </p>
        </div>
      </Page>
    )
  }

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcons />
      </Page>
    )

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  // Function to determine if the post matches the author
  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username
    }
    return false
  }

  async function deleteHandler() {
    const areYouSure = window.confirm("Do you really want to delete this post?")
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, { data: { token: appState.user.token } })
        if (response.data == "Success") {
          // 1. display a flash message
          appDispatch({ type: "flashMessage", value: "Post was successfully deleted." })

          // 2. redirect back to the current user's profile
          props.history.push(`/profile/${appState.user.username}`)
        }
      } catch (e) {
        console.log("There was a problem.")
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="content-container">
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          {/* Only show the edit/delete buttons if it matches the author of the post */}
          {isOwner() && (
            <span className="pt-2">
              <Link to={`/post/${post._id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
                <i className="fas fa-edit"></i>
              </Link>
              <ReactTooltip id="edit" className="custom-tooltip" />{" "}
              <a onClick={deleteHandler} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
                <i className="fas fa-trash"></i>
              </a>
              <ReactTooltip id="delete" className="custom-tooltip" />
            </span>
          )}
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

export default withRouter(ViewSinglePost)
