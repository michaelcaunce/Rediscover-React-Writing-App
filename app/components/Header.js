import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../img/logo.png"

// Import components
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLoggedIn from "./HeaderLoggedIn"

function Header() {
  // Track the logged in state
  const [loggedIn, setLoggedIn] = useState()
  return (
    <header className="header header-bar bg-primary mb-3">
      <div className="header-container">
        <div className=" container d-flex flex-column flex-md-row align-items-center p-3">
          <div className="my-0 mr-md-auto">
            <Link to="/" className="text-white">
              <img src={logo} className="logo" />
            </Link>
          </div>
          {/* Expression */}
          {/* If loggedIn state is true, display the loggedIn header component, if it is false, display the loggedOut component */}
          {loggedIn ? <HeaderLoggedIn setLoggedIn={setLoggedIn} /> : <HeaderLoggedOut setLoggedIn={setLoggedIn} />}
        </div>
      </div>
    </header>
  )
}

export default Header
