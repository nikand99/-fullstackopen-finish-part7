// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
// Table,
import { createBlog } from '../reducers/blogReducer'

import  { useField } from '../hooks/index'

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createBlog(blog))  // await createNewBlog(title, author, url)
    resetTitle('')
    resetAuthor('')
    resetUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form  onSubmit={ handleNewBlog }>
        <div>
          <Form.Group>
            <Form.Label>title:</Form.Label>
            <Form.Control {...title} />
            <Form.Label>author:</Form.Label>
            <Form.Control {...author} />
            <Form.Label>url:</Form.Label>
            <Form.Control {...url} />
          </Form.Group>
        </div>
        <Button variant="primary" type='submit' id='createBlog'>create</Button>
      </Form >
    </div>
  )
}

export default BlogForm
