const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('Blog tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogObj = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObj.map(blog => blog.save())
        await Promise.all(promiseArray)
    })
    
    test('All blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        // console.log(response);
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('ID check', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        // console.log(blog);
        expect(blog.id).toBeDefined()
    })

    test('POST test', async () => {
        const blog = {
            title: 'POST test',
            author: 'Fred A',
            url: 'www.test.com',
            likes: 7
        }

        const token = await helper.getUserToken()
        console.log('token test', token);
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        const contents = response.map(b => b.title)
        expect(contents).toContain('POST test')
        const blogUser = response[2].user
        const allUsers = await helper.usersInDb()
        const userId = allUsers[0].id
        expect(blogUser.toString()).toEqual(userId.toString())
    })
    
    test('No likes defaults to 0', async () => {
        const blog = {
            title: 'Nobody likes me',
            author: 'Shart McFeely',
            url: 'www.imsosad.com'
        }
    
        const token = await helper.getUserToken()

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        const contents = response.map(b => b.likes)
        expect(contents).toContain(0)
    })
    
    test('No title and author', async () => {
        const blog = {
            url: 'www.imanobody.com',
            likes: 99999
        }

        const token = await helper.getUserToken()
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(400)
    
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length)
    })
    
    test('Delete posted blog', async () => {
        const blog = {
            title: 'POST test',
            author: 'Fred A',
            url: 'www.test.com',
            likes: 7
        }

        const token = await helper.getUserToken()

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(200)

        const blogs = await helper.blogsInDb()
        // console.log(blogs);
        const id = blogs[2].id

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAfter.map(b => b.title)
        expect(titles).not.toContain(blogs[2].title)
    })
    
    test('Update 1st blog', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id
    
        const blog = {
            author: 'Fred Alley',
            likes: 777
        }
    
        await api
            .put(`/api/blogs/${id}`)
            .send(blog)
            .expect('Content-Type', /application\/json/)
    
        const blogsAfter = await helper.blogsInDb()
        const authors = blogsAfter.map(b => b.author)
        expect(authors).toContain(blog.author)
    
        const likes = blogsAfter.map(b => b.likes)
        expect(likes).toContain(blog.likes)
    
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai1',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with short username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ba',
            name: 'test3',
            password: 'lsdjflsdjf'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with short password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'BillB',
            name: 'test4',
            password: 'bo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})