//import React from 'react'
import {  useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs =  useSelector((state) => state.blog)
  console.log('blogs', blogs)
  const user = useSelector((state) => state.login)
  console.log('user', user)

  if(blogs === undefined) {
    return ''
  }

  if(user === null || user === undefined) {
    return ''
  }
  else {
    return (
      <div>
        <h2>blog app</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef} >
          <BlogForm togglableRef={blogFormRef}/>
        </Togglable>
        <Table striped>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default BlogList
