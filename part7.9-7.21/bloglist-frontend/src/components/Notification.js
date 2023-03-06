import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification =  useSelector((state) => state.notifikation)

  if (notification === null || notification === undefined) {
    return null
  }
  if(notification.message === '') {
    return null
  }
  if (notification.success === 'true') {
    return (
      <Alert variant='success' id='success' >
        { notification.message }
      </Alert>
    )
  }
  else {
    return (
      <Alert variant='danger' id='danger' >
        { notification.message }
      </Alert>
    )
  }
}

export default Notification
