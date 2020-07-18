import React, { useEffect } from "react"

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {/* Loop through the array of incoming messages */}
      {props.messages.map((msg, index) => {
        return (
          // <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
          //   {msg}
          // </div>
          <div key={index} className={"alert text-center floating-alert shadow-sm alert-" + (Boolean(msg.template) ? msg.template : "success")}>
            {msg.message}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
