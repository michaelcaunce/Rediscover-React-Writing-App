import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  // Only render the title once using useEffect. the first arguement is a function, second is a watch list of dependencies to see when they change.
  // In this case, we aren't looking for anything particular. [] tells React to only run this the first time the component is rendered.
  useEffect(() => {
    // Arrow function for the components title
    document.title = `${props.title} | Complex App`
    // Scroll to the top of the page
    window.scrollTo(0, 0)
  }, [props.title])

  return <Container wide={props.wide}>{props.children}</Container>
}

export default Page
