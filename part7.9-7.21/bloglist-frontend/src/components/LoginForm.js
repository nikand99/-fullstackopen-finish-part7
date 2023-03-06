// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { loginUser } from '../reducers/loginReducer'
import Notification from '../components/Notification'

import  { useField } from '../hooks/index'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    // console.log('innan inloggning', username, password)
    event.preventDefault()
    dispatch(loginUser(username.value, password.value) )
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form  onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control { ...username } />
          <Form.Label>password:</Form.Label>
          <Form.Control { ...password } />
          <Button variant="primary" type='submit' id='login-button'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
