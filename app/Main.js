import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Import components
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import Home from "./components/Home"
import About from "./components/About"
import Terms from "./components/Terms"

function Main() {
  // Track the logged in state
  // If complexappToken exists in local storage, set the value to true
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  return (
    // Wrap the application within a Router component
    <BrowserRouter>
      {/* add the imported components */}
      {/* Pass in the loggedIn state */}
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      {/* Switch component */}
      <Switch>
        {/* Home route */}
        <Route path="/" exact>
          {/* Terninary operator - If loggedIn, display the home component, else, display homeguest component*/}
          {loggedIn ? <Home /> : <HomeGuest />}
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
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
