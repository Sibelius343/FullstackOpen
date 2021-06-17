const _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (top, item) => {
        if (item.likes > top.likes) {
            top = item
        }
        return top
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    const counted = _.countBy(blogs, 'author')
    const topAuthor = {
        author: null,
        blogs: 0
    }
    
    _.forIn(counted, (value, key) => {
        if (topAuthor.author === null || topAuthor.blogs < value) {
            topAuthor.author = key
            topAuthor.blogs = value
        }
    })

    return topAuthor
}

const mostLikes = (blogs) => {
    const likes = blogs.reduce((result, item) => {
        if (result[item.author]) result[item.author] += item.likes
        else result[item.author] = item.likes
        return result
    }, {})
    const topAuthor = {
        author: null,
        likes: 0
    }

    _.forIn(likes, (value, key) => {
        if (topAuthor.author === null || topAuthor.likes < value) {
            topAuthor.author = key
            topAuthor.likes = value
        }
    })

    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}