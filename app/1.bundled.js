(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./app/components/Profile.js":
/*!***********************************!*\
  !*** ./app/components/Profile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page */ \"./app/components/Page.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../StateContext */ \"./app/StateContext.js\");\n/* harmony import */ var use_immer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! use-immer */ \"./node_modules/use-immer/dist/use-immer.module.js\");\n/* harmony import */ var _components_ProfilePosts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ProfilePosts */ \"./app/components/ProfilePosts.js\");\n/* harmony import */ var _components_ProfileFollowers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ProfileFollowers */ \"./app/components/ProfileFollowers.js\");\n/* harmony import */ var _components_ProfileFollowing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ProfileFollowing */ \"./app/components/ProfileFollowing.js\");\n/* harmony import */ var _components_NotFound__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/NotFound */ \"./app/components/NotFound.js\");\n\n\n\n\n\n // components\n\n\n\n\n\n\nfunction Profile() {\n  // useParams will return an object\n  const {\n    username\n  } = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useParams\"])();\n  const appState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_StateContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n  const [state, setState] = Object(use_immer__WEBPACK_IMPORTED_MODULE_5__[\"useImmer\"])({\n    followActionLoading: false,\n    startFollowingRequestCount: 0,\n    stopFollowingRequestCount: 0,\n    profileData: {\n      profileUsername: \"...\",\n      profileAvatar: \"https://gravatar.com/avatar/placeholder?s=128\",\n      isFollowing: false,\n      counts: {\n        postCount: \"\",\n        followerCount: \"\",\n        followingCount: \"\"\n      }\n    },\n    notFound: false\n  });\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const ourRequest = axios__WEBPACK_IMPORTED_MODULE_3___default.a.CancelToken.source();\n\n    async function fetchData() {\n      try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`/profile/${username}`, {\n          token: appState.user.token\n        }, {\n          cancelToken: ourRequest.token\n        });\n        setState(draft => {\n          if (response.data) {\n            draft.profileData = response.data;\n          } else {\n            draft.notFound = true;\n          }\n        });\n      } catch (e) {\n        console.log(\"There was a problem.\");\n      }\n    }\n\n    fetchData();\n    return () => {\n      ourRequest.cancel();\n    };\n  }, [username]); // Functionality to start following users\n\n  function startFollowing() {\n    setState(draft => {\n      draft.startFollowingRequestCount++;\n    });\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (state.startFollowingRequestCount) {\n      setState(draft => {\n        draft.followActionLoading = true;\n      });\n      const ourRequest = axios__WEBPACK_IMPORTED_MODULE_3___default.a.CancelToken.source(); // Send a request to the backend\n\n      async function fetchData() {\n        try {\n          const response = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`/addFollow/${state.profileData.profileUsername}`, {\n            token: appState.user.token\n          }, {\n            cancelToken: ourRequest.token\n          });\n          setState(draft => {\n            draft.profileData.isFollowing = true;\n            draft.profileData.counts.followerCount++;\n            draft.followActionLoading = false;\n          });\n        } catch (e) {\n          console.log(\"There was an error or the request was cancelled\");\n        }\n      }\n\n      fetchData();\n      return () => {\n        ourRequest.cancel();\n      };\n    }\n  }, [state.startFollowingRequestCount]); // Functionality to stop following users\n\n  function stopFollowing() {\n    setState(draft => {\n      draft.stopFollowingRequestCount++;\n    });\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (state.stopFollowingRequestCount) {\n      setState(draft => {\n        draft.followActionLoading = true;\n      });\n      const ourRequest = axios__WEBPACK_IMPORTED_MODULE_3___default.a.CancelToken.source(); // Send a request to the backend\n\n      async function fetchData() {\n        try {\n          const response = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`/removeFollow/${state.profileData.profileUsername}`, {\n            token: appState.user.token\n          }, {\n            cancelToken: ourRequest.token\n          });\n          setState(draft => {\n            draft.profileData.isFollowing = false;\n            draft.profileData.counts.followerCount--;\n            draft.followActionLoading = false;\n          });\n        } catch (e) {\n          console.log(\"There was an error or the request was cancelled\");\n        }\n      }\n\n      fetchData();\n      return () => {\n        ourRequest.cancel();\n      };\n    }\n  }, [state.stopFollowingRequestCount]);\n  if (state.notFound) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Page__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    title: \"Profile not found!\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotFound__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Page__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    title: `${username}'s Profile`\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"content-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"avatar-small\",\n    src: state.profileData.profileAvatar\n  }), \" \", state.profileData.profileUsername, appState.loggedIn && !state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != \"...\" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: startFollowing,\n    disabled: state.followActionLoading,\n    className: \"btn btn-primary btn-sm ml-2\"\n  }, \"Follow \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-user-plus\"\n  })), appState.loggedIn && state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != \"...\" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: stopFollowing,\n    disabled: state.followActionLoading,\n    className: \"btn btn-danger btn-sm ml-2\"\n  }, \"Unfollow \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"fas fa-user-times\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"profile-nav nav nav-tabs pt-2 mb-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"], {\n    exact: true,\n    to: `/profile/${state.profileData.profileUsername}`,\n    className: \"nav-item nav-link\"\n  }, \"Posts: \", state.profileData.counts.postCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"], {\n    to: `/profile/${state.profileData.profileUsername}/followers`,\n    className: \"nav-item nav-link\"\n  }, \"Followers: \", state.profileData.counts.followerCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"], {\n    to: `/profile/${state.profileData.profileUsername}/following`,\n    className: \"nav-item nav-link\"\n  }, \"Following: \", state.profileData.counts.followingCount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    exact: true,\n    path: \"/profile/:username\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ProfilePosts__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    path: \"/profile/:username/followers\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ProfileFollowers__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    path: \"/profile/:username/following\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ProfileFollowing__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null)))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\n//# sourceURL=webpack:///./app/components/Profile.js?");

/***/ }),

/***/ "./app/components/ProfileFollowers.js":
/*!********************************************!*\
  !*** ./app/components/ProfileFollowers.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadingDotsIcon */ \"./app/components/LoadingDotsIcon.js\");\n/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../StateContext */ \"./app/StateContext.js\");\n\n\n\n\n\n\nfunction ProfileFollowers(props) {\n  const appState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_StateContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n  const {\n    username\n  } = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useParams\"])();\n  const [isLoading, setIsLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true);\n  const [posts, setPosts] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const ourRequest = axios__WEBPACK_IMPORTED_MODULE_1___default.a.CancelToken.source();\n\n    async function fetchPosts() {\n      try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`/profile/${username}/followers`, {\n          cancelToken: ourRequest.token\n        });\n        setPosts(response.data);\n        setIsLoading(false);\n      } catch (e) {\n        console.log(\"There was a problem.\");\n      }\n    }\n\n    fetchPosts();\n    return () => {\n      ourRequest.cancel();\n    };\n  }, [username]);\n  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"list-group\"\n  }, posts.length > 0 && posts.map((follower, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n      key: index,\n      to: `/profile/${follower.username}`,\n      className: \"list-group-item list-group-item-action\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"avatar-tiny\",\n      src: follower.avatar\n    }), \" \", follower.username);\n  }), posts.length == 0 && appState.user.username == username && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: \"lead text-muted text-center\"\n  }, \"You don\\u2019t have any followers yet.\"), posts.length == 0 && appState.user.username != username && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: \"lead text-muted text-center\"\n  }, username, \" doesn\\u2019t have any followers yet.\", appState.loggedIn && \" Be the first to follow them!\", !appState.loggedIn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \" \", \"If you want to follow them you need to \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n    to: \"/\"\n  }, \"sign up\"), \" for an account first.\", \" \")));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProfileFollowers);\n\n//# sourceURL=webpack:///./app/components/ProfileFollowers.js?");

/***/ }),

/***/ "./app/components/ProfileFollowing.js":
/*!********************************************!*\
  !*** ./app/components/ProfileFollowing.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadingDotsIcon */ \"./app/components/LoadingDotsIcon.js\");\n/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../StateContext */ \"./app/StateContext.js\");\n\n\n\n\n\n\nfunction ProfileFollowing(props) {\n  const appState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_StateContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n  const {\n    username\n  } = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useParams\"])();\n  const [isLoading, setIsLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true);\n  const [posts, setPosts] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const ourRequest = axios__WEBPACK_IMPORTED_MODULE_1___default.a.CancelToken.source();\n\n    async function fetchPosts() {\n      try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`/profile/${username}/following`, {\n          cancelToken: ourRequest.token\n        });\n        setPosts(response.data);\n        setIsLoading(false);\n      } catch (e) {\n        console.log(\"There was a problem.\");\n      }\n    }\n\n    fetchPosts();\n    return () => {\n      ourRequest.cancel();\n    };\n  }, [username]);\n  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"list-group\"\n  }, posts.length > 0 && posts.map((follower, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n      key: index,\n      to: `/profile/${follower.username}`,\n      className: \"list-group-item list-group-item-action\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"avatar-tiny\",\n      src: follower.avatar\n    }), \" \", follower.username);\n  }), posts.length == 0 && appState.user.username == username && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: \"lead text-muted text-center\"\n  }, \"You aren\\u2019t following anyone yet.\"), posts.length == 0 && appState.user.username != username && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: \"lead text-muted text-center\"\n  }, username, \" isn\\u2019t following anyone yet.\"));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProfileFollowing);\n\n//# sourceURL=webpack:///./app/components/ProfileFollowing.js?");

/***/ }),

/***/ "./app/components/ProfilePosts.js":
/*!****************************************!*\
  !*** ./app/components/ProfilePosts.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadingDotsIcon */ \"./app/components/LoadingDotsIcon.js\");\n/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Post */ \"./app/components/Post.js\");\n\n\n\n\n\n\nfunction ProfilePosts() {\n  const {\n    username\n  } = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useParams\"])();\n  const [isLoading, setIsLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true); // State to store posts data\n\n  const [posts, setPosts] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]); // Send request to the backend\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const ourRequest = axios__WEBPACK_IMPORTED_MODULE_1___default.a.CancelToken.source();\n\n    async function fetchPosts() {\n      try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`/profile/${username}/posts`, {\n          cancelToken: ourRequest.token\n        }); // Store the value in state\n\n        setPosts(response.data); // Set is loading to false to display all posts\n\n        setIsLoading(false);\n      } catch (e) {\n        console.log(\"There was an error or the request was cancelled\");\n      }\n    }\n\n    fetchPosts();\n    return () => {\n      ourRequest.cancel();\n    };\n  }, [username]);\n  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"list-group\"\n  }, posts.length && posts.map(post => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Post__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      noAuthor: true,\n      post: post,\n      key: post._id\n    });\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProfilePosts);\n\n//# sourceURL=webpack:///./app/components/ProfilePosts.js?");

/***/ })

}]);