import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const mockBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 7,
    user: {
      username: 'abc123',
      name: 'abc123',
      id: 'abc123'
    }
  }
  const mockBlogs = [mockBlog]
  const mockSet = jest.fn()
  const mockUser = {
    username: 'abc123',
    name: 'abc123',
    id: 'abc123'
  }
  const mockLikeFun = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog passedBlog={mockBlog} blogs={mockBlogs} setBlogs={mockSet} user={mockUser} incLikes={mockLikeFun} ></Blog>
    )
  })

  test('at start, likes and url are not displayed', () => {
    const titleDiv = component.getByText(mockBlog.title)
    const authorDiv = component.getByText(mockBlog.author)
    const urlDiv = component.getByText(mockBlog.url)
    const likesDiv = component.container.querySelector('.likes')

    expect(titleDiv).toBeDefined()
    expect(authorDiv).toBeDefined()
    expect(urlDiv).toHaveStyle('display : none')
    expect(likesDiv).toHaveStyle('display : none')
  })

  test('show button reveals likes and url', () => {
    const button = component.container.querySelector('button')

    fireEvent.click(button)

    const urlDiv = component.getByText(mockBlog.url)
    const likesDiv = component.container.querySelector('.likes')

    expect(urlDiv).not.toHaveStyle('display : none')
    expect(likesDiv).not.toHaveStyle('display : none')
  })

  test('like button is clicked twice', () => {
    const showButton = component.container.querySelector('button')
    const likeButton = component.getByText('like')

    fireEvent.click(showButton)

    // const initialLikes = mockBlog.likes
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeFun.mock.calls).toHaveLength(2)
  })
})