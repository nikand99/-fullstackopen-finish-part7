const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const config = require('../utils/config')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  }
  catch (error) {
    response.status(404).end()
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  const blogTmp = {
    author: 'afdsfads',
    url: 'asdffasd',
    title: 'asdffdas',
    comments: 'fasdafdsfsd'
  }
  console.log('blogTmp', blogTmp)
  const { comment } = request.body
  // console.log('comment post: ', [comment])
  let blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  // console.log('blog.comments[1]: ', blog.title, blog.comments )
  blog.comments = blog.comments.concat([comment])
  // console.log('blog: ', blog)
  // console.log('blog.comments[2]: ', blog.comments )
  // console.log('blog: ', blog)
  try {
    const updatedBlog = await blog.save()
    // console.log('updatedBlog: ', updatedBlog)
    response.status(201).json(updatedBlog.toJSON() )
  }
  catch (error) {
    // console.log('updatedBlog: 404')
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user   // const user = await User.findById(decodedToken.id)
    const token = request.token

    // console.log('token', token)
    if(token === null || token === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    const blog = await new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    }).populate('user', {username: 1, name: 1})

    try {
      const savedBlog = await blog.save()
      
      // går att använda både savedBlog.id savedBlog._id
      user.blogs = user.blogs.concat(savedBlog._id)
      // logger.info('savedBlog._id', savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    }
    catch (error) {
      next(error)
      // logger.info('savedBlog 400', blog)
      response.status(400).end()
    }
  } catch (error) {
    next(error)
    // return response.status(401).json({ error: 'token invalid' })
  }
})
  
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user // const user = await User.findById(decodedToken.id)

    const decodedToken = jwt.verify(request.token, config.SECRET)
    // logger.info('decodedToken: ', decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    // logger.info('if blog user id', blog.user.id.toString(), user.id.toString())
    if(blog === undefined || blog === null) {
      return response.status(401).json({ error: 'blogen finns inte' })
    }
    if ( blog.user.id.toString() === user.id.toString() ) {
      return response.status(401).json({ error: 'Du har inte behörighet att radera blogen' })
    }
    
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    catch (error) {
      next(error)
      response.status(404).end()
    }

  } catch (error) {
    next(error)
    // return response.status(401).json({ error: 'token invalid' })
  }
})
  
blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, body)
    response.status(200).json(updatedBlog.toJSON())
  }
  catch (error) {
    next(error)
    response.status(404).end()
  }
})
  
module.exports = blogRouter
