import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import userService from '../services/users'
import { createNotefication } from './notifikationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: [],
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    }
  }
})

export const { login, logout } = loginSlice.actions

export const logoutUser = () => {
  // console.log('handleLogout')
  return async (dispatch) => {
    dispatch(logout(null))
    userService.clearUser()
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    // console.log('innan inloggning', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(login(user))
      // console.log('loginUser', user)
      userService.setUser(user)
      dispatch( createNotefication({ message: `user ${user.username} login`, success: 'true' }, 5) )
    } catch (exception) {
      dispatch( createNotefication({ message: 'wrong usernamne or password', success: 'false' }, 5) )
    }
  }
}

export default loginSlice.reducer
