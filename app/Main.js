import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
// set the default url for all axios requests
Axios.defaults.baseURL = "http://localhost:8080"

// Import components
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import Home from "./components/Home"
import About from "./components/About"
import Terms from "./components/Terms"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"

import ExampleContext from "./ExampleContext"

function Main() {
  // Track the logged in state
  // If complexappToken exists in local storage, set the value to true
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  const [flashMessages, setFlashMessages] = useState([])

  // Function to pass into create post component
  function addFlashMessage(msg) {
    // Function in the parameter to work with previous values
    setFlashMessages(prev => prev.concat(msg))
  }
  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      {/* Wrap the application within a Router component */}
      <BrowserRouter>
        {/* Render the flash messges component with the passed in state from the about function */}
        <FlashMessages messages={flashMessages} />
        {/* add the imported components */}
        {/* Pass in the loggedIn state */}
        <Header loggedIn={loggedIn} />

        {/* Switch component */}
        <Switch>
          {/* Home route */}
          <Route path="/" exact>
            {/* Terninary operator - If loggedIn, display the home component, else, display homeguest component*/}
            {loggedIn ? <Home /> : <HomeGuest />}
          </Route>
          {/* Create Single Post route */}
          <Route path="/post/:id">
            <ViewSinglePost />
          </Route>
          {/* Create Post route */}
          <Route path="/create-post">
            <CreatePost />
          </Route>
          {/* About route */}
          <Route path="/about-us">
            <About />
          </Route>
          {/* Terms route */}
          <Route path="/terms">
            <Terms />
          </Route>
        </Switch>

        {/* add the imported components */}
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
