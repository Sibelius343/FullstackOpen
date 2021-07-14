import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.data.text
  console.log(notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(props);
  console.log(props.text);
  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    data: { ...state.notifications, text: state.notifications.text }
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification