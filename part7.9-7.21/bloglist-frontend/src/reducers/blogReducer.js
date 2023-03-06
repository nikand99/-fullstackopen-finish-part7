import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { createNotefication } from './notifikationReducer'

const blogSlice = createSlice ({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlogLikes(state, action) {
      const blogToUpddate = action.payload
      // console.log('updateBlogLikes blogToUpddate ', blogToUpddate)
      return state.map((blog) => blog.id !== blogToUpddate.id ? blog : blogToUpddate)
    },
    deleteOneBlog (state, action) {
      const blogId = action.payload
      return state.filter((blog) => blog.id !== blogId )
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      // console.log('action.payload ', action.payload)
      return action.payload
    },
    updateCommentBlog(state, action) {
      const blogToUpddate = action.payload
      // console.log('updateBlogLikes blogToUpddate ', blogToUpddate)
      return state.map((blog) => blog.id !== blogToUpddate.id ? blog : blogToUpddate)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    // console.log('blogs', blogs)
    dispatch(setBlog(blogs))
  }
}

export const updateLikes = (id, blogToUpddate, blogToUpddateUser) => {
  return async (dispatch) => {
    try {
      await blogService.update(id, blogToUpddate)
      // console.log('updateLikes', blog)
      dispatch(updateBlogLikes(blogToUpddateUser) )
      dispatch(createNotefication({ message: `you updated blog likes ${blogToUpddate.title} by ${blogToUpddate.author}`, success: 'true' }, 5) )
    }
    catch(exception) {
      dispatch( createNotefication({ message: 'Wrong updateLikes', success: 'false' }, 5) )
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteOneBlog(blog.id) )
      dispatch(createNotefication({ message: `you delete blog likes ${blog.title} `, success: 'true' }, 5) )
    }
    catch(exception) {
      dispatch( createNotefication({ message: 'Wrong deleteBlog', success: 'false' }, 5) )
    }
  }
}

export const createBlog = (blog) => {
  // console.log('createBlog', blog)
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      // console.log('newBlog', newBlog)
      dispatch(addBlog(newBlog))
      dispatch(createNotefication({ message: `you created blog ${newBlog.title} by ${newBlog.author}`, success: 'true' }, 5) )
    }
    catch(exception) {
      dispatch( createNotefication({ message: 'Wrong createBlog', success: 'false' }, 5) )
    }
  }
}

export const newComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updateBlog = await blogService.addComment(id, comment)
      dispatch(updateCommentBlog(updateBlog))
      dispatch(createNotefication({ message: `you created comment ${comment}`, success: 'true' }, 5) )
    }
    catch(exception) {
      dispatch( createNotefication({ message: 'Wrong created comment', success: 'false' }, 5) )
    }
  }
}

export const { addBlog, updateBlogLikes, deleteOneBlog, setBlog, updateCommentBlog } = blogSlice.actions
export default blogSlice.reducer
