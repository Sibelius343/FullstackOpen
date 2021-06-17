const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    
    const user = request.user
    if (user) {
        let likesNum = 0
        if (body.likes) likesNum = body.likes

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likesNum,
            user: user
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    }
    else {
        response.status(401).json({
            error: 'Unauthorized user'
        })
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id

    const user = request.user
    const blog = await Blog.findById(id)

    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({
            error: 'Unauthorized user'
        })
    }
    
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

    const opts = {
        new: true,
        runValidators: true
    }

    const updated = await Blog.findByIdAndUpdate(id, body, opts)
    response.json(updated.toJSON())
})

module.exports = blogsRouter