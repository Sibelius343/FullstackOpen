import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form submits correctly', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm addBlog={createBlog}></BlogForm>
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testTitle' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Fred Alley' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.FredIsInFrance.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('Fred Alley')
  expect(createBlog.mock.calls[0][0].url).toBe('www.FredIsInFrance.com')
})