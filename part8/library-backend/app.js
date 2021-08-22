require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      name: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author!
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const count = await Book.estimatedDocumentCount()
      return count
    },
    authorCount: async () => {
      const count = await Author.estimatedDocumentCount()
      return count
    },
    allBooks: async (root, args) => {
      let query = {}
      if (args.name && args.genre) {
        query = { name: args.name, genre: args.genre }
      } else if (args.name) {
        query = { name: args.name }
      } else if (args.genre) {
        query = { genres: args.genre }
      }
      const books = await Book.find(query).populate('author')
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let id
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log(args)
        const newAuthor = new Author({ name: args.author, bookCount: 0 })
        try {
          const savedAuthor = await newAuthor.save()
          id = savedAuthor._id
        } catch (exception) {
          throw new UserInputError(exception.message, {
            invalidArgs: args
          })
        }
      } else {
        id = author._id
      }
      const newBook = new Book({ ...args, author: id })
      
      try {
        await newBook.save()
      } catch (exception) {
        throw new UserInputError(exception.message, {
          invalidArgs: args
        })
      }

      const opts = {
        new: true,
        runValidators: true
      }

      await Author.findByIdAndUpdate(id, { $inc: { bookCount: 1 }}, opts)
      const populatedBook = await newBook.populate('author').execPopulate()
      pubsub.publish('bookAdded', { bookAdded: populatedBook })
      
      return newBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (exception) {
        throw new UserInputError(exception.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.name,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['bookAdded'])
    }
  },
  Author: {
    bookCount: async (root) => {
      const count = await Author.findById(root._id, 'bookCount')
      return count.bookCount
    }
  }
}

const startServer = async (typeDefs, resolvers) => {
  const app = express()
  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })
  await server.start()

  server.applyMiddleware({
    app,
    path: '/'
  })

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/subscriptions'}
  )

  const PORT = 4000
  httpServer.listen(PORT, () => 
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

startServer(typeDefs, resolvers)