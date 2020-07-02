import React, { useEffect } from "react"

// Pass in the props parameter
function Container(props) {
  // Use a ternary operator to determine the width of the container
  // Conditional logic is in the () after the +
  // if props.wide is true, do nothing. If false, output the narrow class. HomeGuest is set to true in the component file.
  return <div className={"container py-md-5" + (props.wide ? "" : "container--narrow")}>{props.children}</div>
}

export default Container
