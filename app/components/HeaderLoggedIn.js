import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ExampleContext from "../ExampleContext"

function HeaderLoggedIn(props) {
  const { setLoggedIn } = useContext(ExampleContext)
  function handleLogout() {
    setLoggedIn(false)
    // remove properties from local storage
    localStorage.removeItem("complexappToken")
    localStorage.removeItem("complexappUsername")
    localStorage.removeItem("complexappAvatar")
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge"> </span>
      </span>
      <a href="#" className="mr-2">
        <img className="small-header-avatar" src={localStorage.getItem("complexappAvatar")} />
      </a>
      <Link to="/create-post" className="btn btn-sm btn-success mr-2">
        Create Post
      </Link>
      {/* Update the state setLoggedIn to false using props */}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn
