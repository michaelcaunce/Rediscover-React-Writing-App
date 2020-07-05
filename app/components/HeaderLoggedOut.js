import React, { useState, useEffect, useContext } from "react"
import Axios from "axios"
import ExampleContext from "../ExampleContext"

function HeaderLoggedOut(props) {
  const { setLoggedIn } = useContext(ExampleContext)
  // Set up state to store the username
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    // Axios request
    try {
      // Send login request
      const response = await Axios.post("/login", { username, password })
      if (response.data) {
        // Save values in local storage
        localStorage.setItem("complexappToken", response.data.token)
        localStorage.setItem("complexappUsername", response.data.username)
        localStorage.setItem("complexappAvatar", response.data.avatar)
        // Update the state of setLoggedIn (header.js) using props
        setLoggedIn(true)
      } else {
        console.log("incorrect username or password")
      }
    } catch (e) {
      console.log("There was a problem")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          {/* Add onChange event handlers */}
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          {/* Add onChange event handlers */}
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
