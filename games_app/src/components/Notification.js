import { useState } from "react";
import { Link } from "react-router-dom";

const Notification = ({ notification, setNotification }) => {
  const [previousMessage, setPreviousMessage] = useState("Notificacion")
  
  return (
    <div
      className={
        notification.message ? "notification" : "notification inactive"
      }
      id={notification.type}
    >
      {
        notification.url ?
          <Link to={notification.url} onClick={() => {
            setNotification({ ...notification, message: null })
            setPreviousMessage(notification.message)
          }}>{ notification.message ? notification.message : previousMessage }</Link>
        :
          <>
            <p>{ notification.message ? notification.message : previousMessage }</p>
            <button
              onClick={() => {
                setNotification({...notification, message: null})
                setPreviousMessage(notification.message) 
              }}>
              ⨉
            </button>
          </>
      }
    </div>
  )
}

export default Notification