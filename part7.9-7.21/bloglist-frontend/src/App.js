import { useSelector, useDispatch } from 'react-redux'
import {  useEffect } from 'react'

import { Routes, Route, Link } from 'react-router-dom'
import {  Button, Navbar, Nav } from 'react-bootstrap'
//Table, Form,
// Börja med blogReducers,
// Notification =  notification och type: error && success
// Titta på - part6.19\redux-anecdotes

import './index.css'

import userService from './services/users'

import { login, logoutUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(login(userFromStorage))
    }
  }, [dispatch])

  useEffect (() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs()
    )
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser() )
  }

  const padding = {
    padding: 5
  }
  const color = {
    color: '#44AA44',
    padding: 10
  }

  return (
    <div className="container">
      {!user && <LoginForm  />}
      {user && <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <label style={color}> {user.name} logged in </label><Button variant="primary" id='logout' onClick={handleLogout}  >logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      }
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users /> } />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App

// CI=true npm test
// npm run cypress:open
