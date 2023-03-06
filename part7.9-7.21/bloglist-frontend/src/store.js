import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import notifikationReducer from './reducers/notifikationReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notifikation: notifikationReducer,
    user: userReducer,
    login: loginReducer
  }
})

export default store
