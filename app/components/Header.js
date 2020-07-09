import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import logo from "../../img/logo.png"
import StateContext from "../StateContext"

// Import components
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLoggedIn from "./HeaderLoggedIn"

// Pass in props to access the loggedIn state (Main.js)
function Header(props) {
  const appState = useContext(StateContext)
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            <img src={logo} className="logo" />
          </Link>
        </h4>
        {/* Expression */}
        {/* If loggedIn state is true, display the loggedIn header component, if it is false, display the loggedOut component */}
        {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
  )
}

export default Header
