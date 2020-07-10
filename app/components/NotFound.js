import React from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function NotFound() {
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

export default NotFound
