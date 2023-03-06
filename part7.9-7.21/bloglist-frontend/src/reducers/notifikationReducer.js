import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  success: ''
}

const noteficationSlice = createSlice ({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      // console.log('setNotification ', action.payload)
      state = action.payload
      return state
    },
  },
})
export const { setNotification } = noteficationSlice.actions

export const createNotefication = (notefication, timeout) => {
  // console.log('notefication', notefication)
  return (dispatch) => {
    dispatch(setNotification(notefication) )
    setTimeout(() => dispatch(setNotification(null)), (timeout * 1000) )
  }
}

export default noteficationSlice.reducer
