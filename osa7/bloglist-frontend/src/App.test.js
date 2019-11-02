import React from 'react'
//import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
jest.mock('./services/blogs')

afterEach(cleanup)

describe('<App />', () => {
  test('if only login form shown at first', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement( () => component.container.querySelector('.app') )
    // expectations here
    const login = component.container.querySelector('.login-form')
    expect(login).toBeDefined()
    const blogs = component.container.querySelector('.blog-list')
    expect(blogs).toBeNull()
    const create = component.container.querySelector('.blog-create')
    expect(create).toBeNull()
  })

  test('if blogs are show after login', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement( () => component.container.querySelector('.app'))

    const login = component.container.querySelector('.login-form')
    expect(login).toBeNull()

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(blogs[0]).toHaveTextContent('Fun Is Testing')
    expect(blogs[1]).toHaveTextContent('Testing Is Fun')
    expect(blogs[2]).toHaveTextContent('Is Testing Fun')

  })

})
