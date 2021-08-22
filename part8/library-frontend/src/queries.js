import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    name
    born
  }
  published
  genres
}
`
export const ALL_BOOKS = gql`
query getBooks($name: String, $genre: String) {
  allBooks(
    name: $name
    genre: $genre
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
}
${BOOK_DETAILS}
`
export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
    bookCount
  }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`
export const USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`
export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`