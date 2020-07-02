import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Import components
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"

function Main() {
  return (
    // Wrap the application within a Router component
    <BrowserRouter>
      {/* add the imported components */}
      <Header />

      {/* Switch component */}
      <Switch>
        {/* Home route */}
        <Route path="/" exact>
          <HomeGuest />
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
