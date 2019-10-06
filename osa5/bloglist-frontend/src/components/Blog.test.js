import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Blog } from './Blog'

const blog = {
  id: 1,
  user: {
    id: 2,
    name: 'User Name'
  },
  likes: 3,
  author: 'Blog Author',
  title: 'Blog Title',
  url: 'Blog URL'
}

const mockBlogHandler = jest.fn()
const mockLikeHandler = jest.fn()

afterEach(cleanup)

test('renders title', () => {
  const component = render(<Blog blog={blog} handleBlogClick={mockBlogHandler} handleLikeClick={mockLikeHandler} />)
  expect(component.container).toHaveTextContent(blog.title)
})

test('renders author', () => {
  const component = render(<Blog blog={blog} handleBlogClick={mockBlogHandler} handleLikeClick={mockLikeHandler} />)
  let regex = new RegExp('.*' + blog.author)
  const element = component.getByText(regex)
  expect(element).toBeDefined()
})

test('renders url', () => {
  const component = render(<Blog blog={blog} handleBlogClick={mockBlogHandler} handleLikeClick={mockLikeHandler} />)
  expect(component.container).toHaveTextContent(blog.url)
})

test('renders user name', () => {
  const component = render(<Blog blog={blog} handleBlogClick={mockBlogHandler} handleLikeClick={mockLikeHandler} />)
  expect(component.container).toHaveTextContent('added by ' + blog.user.name)

})

test('show blog details after click', () => {
  const component = render(<Blog blog={blog} handleBlogClick={mockBlogHandler} handleLikeClick={mockLikeHandler} />)
  const divBasic = component.getByText(`${blog.title} ${blog.author}`)
  expect(divBasic).toBeDefined()
  let divStyle = component.container.querySelector('.blogDetails').style
  expect(divStyle).toHaveProperty('display', 'none')
  fireEvent.click(divBasic)
  divStyle = component.container.querySelector('.blogDetails').style
  expect(divStyle).toHaveProperty('display', 'none')
})

test('like button is clicked twice', () => {
  const component = render(<Blog blog={blog} handleBlogClick={mockBlogHandler} handleLikeClick={mockLikeHandler} />)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockLikeHandler.mock.calls.length).toBe(2)
})
