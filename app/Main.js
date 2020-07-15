import React, { useState, useReducer, useContext, useEffect } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
import { CSSTransition } from "react-transition-group"
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
import Profile from "./components/Profile"
import EditPost from "./components/EditPost"
import NotFound from "./components/NotFound"
import Search from "./components/Search"
import Chat from "./components/Chat"

// Import contexts
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

function Main() {
  // object
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    // Object to pull data from local storage
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")
    },
    isSearchOpen: false,
    isChatOpen: false
  }
  // Whatever is included in dispatch parentheses (when called) is passed as 'action'
  function ourReducer(draft, action) {
    switch (action.type) {
      // Outline the differect cases dependent on the value of action.value
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "openSearch":
        draft.isSearchOpen = true
        return
      case "closeSearch":
        draft.isSearchOpen = false
        return
      case "toggleChat":
        draft.isChatOpen = !draft.isChatOpen
        return
      case "closeChat":
        draft.isChatOpen = false
        return
    }
  }
  // useImmerReducer, return a piece of state and something to use to call
  // call useImmerReducer function and set the value of state
  // When we call it, we give it it's initial state, then a function
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      // Save values in local storage
      localStorage.setItem("complexappToken", state.user.token)
      localStorage.setItem("complexappUsername", state.user.username)
      localStorage.setItem("complexappAvatar", state.user.avatar)
    } else {
      // Remove values in local storage
      localStorage.removeItem("complexappToken")
      localStorage.removeItem("complexappUsername")
      localStorage.removeItem("complexappAvatar")
    }
  }, [state.loggedIn])

  return (
    // useReducer combined with context
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {/* Wrap the application within a Router component */}
        <BrowserRouter>
          {/* Render the flash messges component with the passed in state from the about function */}
          <FlashMessages messages={state.flashMessages} />
          {/* add the imported components */}
          <Header />

          {/* Switch component */}
          <Switch>
            {/* Home route */}
            <Route path="/" exact>
              {/* Terninary operator - If loggedIn, display the home component, else, display homeguest component*/}
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            {/* Create Single Post route */}
            <Route path="/post/:id" exact>
              <ViewSinglePost />
            </Route>
            {/* Edit Single Post route */}
            <Route path="/post/:id/edit" exact>
              <EditPost />
            </Route>
            {/* Create Post route */}
            <Route path="/create-post">
              <CreatePost />
            </Route>
            {/* User Profile Route*/}
            <Route path="/profile/:username">
              <Profile />
            </Route>
            {/* About route */}
            <Route path="/about-us">
              <About />
            </Route>
            {/* Terms route */}
            <Route path="/terms">
              <Terms />
            </Route>
            {/* Error Page route */}
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit>
            <Search />
          </CSSTransition>
          <Chat />
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
