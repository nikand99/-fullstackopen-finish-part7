// import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLikes, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
//
import  { useField } from '../hooks/index'

import { newComment } from '../reducers/blogReducer'

const Blog = () => {
  const { id } = useParams()

  const blogs = useSelector((state) => state.blog)
  console.log('blogs', blogs)

  const blog = blogs.find((b) => b.id === id)
  // console.log('blog', blog)

  const userLogin = useSelector((state) => state.login)
  // const [comment, setComment]= useState('')
  const { reset: resetComment, ...comment } = useField('text')

  const dispatch = useDispatch()
  const handelLikes = () => {
    // console.log('blog.likes', blog.likes)
    const blogToUpddate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const blogToUpddateUser = {
      ...blog,
      likes: blog.likes + 1,
      user: { id: blog.user.id, name: blog.user.name, username: blog.user.username }
    }
    // console.log('blogToUpddate.likes', blogToUpddate.likes)
    dispatch(updateLikes(blog.id, blogToUpddate, blogToUpddateUser) )
  }

  const handelDeleteBlog = () => {
    if(window.confirm(`remowe blog ${ blog.title } by ${ blog.author }`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const handelAddComment = () => {
    dispatch(newComment(blog.id, comment.value))
    resetComment()
  }

  if (!blog) return null
  if(userLogin === null || userLogin === undefined) {
    return ''
  }

  return (
    <div >
      <h2>blog app</h2>
      <h2>{ blog.title }</h2>
      <div className='url'><a href={ blog.url } target='_blank' rel="noreferrer">{ blog.url }</a></div>
      <div className='likes'>likes: { blog.likes } <Button variant="primary" id='buttonLike' className='buttonLike' onClick={() => handelLikes()} >like</Button></div>
      <div>added by {blog.user.name} </div>
      {blog.user.username === userLogin.username && (
        <div><Button variant="primary" id='removeBlog' onClick={() => handelDeleteBlog()} >remove</Button></div>
      )}
      <h2>comments</h2>
      <div>
        <Form.Control {...comment} />
        {/* <Form.Control
          type='text'
          value={comment}
          name='title'
          id='title'
          onChange={({ target }) => setComment(target.value)}
        /> */}
        <Button variant="primary" onClick={() => handelAddComment()} >add comment</Button>
      </div>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
