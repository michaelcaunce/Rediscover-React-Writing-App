import React, { useState, useEffect, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import DispatchContext from "../DispatchContext"

function CreatePost(props) {
  // Set the state
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const appDispatch = useContext(DispatchContext)
  // Handle submit function
  async function handleSubmit(e) {
    e.preventDefault()
    // Use axios to create a request to send to the back end for creating a post
    try {
      const response = await Axios.post("/create-post", { title, body, token: localStorage.getItem("complexappToken") })
      appDispatch({ type: "flashMessage", value: "Post successfully created!" })
      // Redirect to new post url
      props.history.push(`/post/${response.data}`)
      console.log("success")
    } catch (e) {
      console.log("Error")
    }
  }
  return (
    <Page title="Create New Post">
      <div className="content-container">
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-title" className="text-muted mb-1">
              <small>Title</small>
            </label>
            {/* onchange event handler */}
            <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="post-body" className="text-muted mb-1 d-block">
              <small>Body Content</small>
            </label>
            {/* onchange event handler */}
            <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
          </div>

          <button className="btn btn-primary">Save New Post</button>
        </form>
      </div>
    </Page>
  )
}

export default withRouter(CreatePost)
