const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const initialBlogs = [
        {
            title: 'testTitle1',
            author: 'testAuthor1',
            url: 'http://testURL1',
            likes: 7,
        },
        {
            title: 'helloIsAnyoneThere',
            author: 'isThisThingOn',
            url: 'http://iNeedABiggerGun',
            likes: 343,
        }
]

const nonExistingID = async () => {
    const blog = new Blog({
        title: 'temp',
        author: 'remove',
        url: 'remove',
        likes: 0
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getUserToken = async () => {
    const users = await User.find({})
    if (users.length) {
        const userForToken = {
            username: users[0].username,
            id: users[0]._id
        }
        return jwt.sign(userForToken, process.env.SECRET)
    }
    const passwordHash = await bcrypt.hash('sekret', 10)
    const newUser = new User({
        username: 'root',
        name: 'Superuser',
        passwordHash
    })
    const savedUser = await newUser.save()
    const userForToken = {
        username: savedUser.username,
        id: savedUser._id
    }
    return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
    initialBlogs,
    nonExistingID,
    blogsInDb,
    usersInDb,
    getUserToken
}