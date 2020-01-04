/* eslint-disable no-undef */
describe('Blogs ', function() {

  // Cleanup database and create user
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'tu',
      password: 'cryptic'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  describe('when logged in', function() {

    // Logout and login
    beforeEach(function() {
      cy.visit('/logout')
      cy.get('h2').contains('blogs')
      cy.get('h3').contains('Log in')
      cy.contains('username')
      cy.contains('password')
      cy.get(':nth-child(1) > input').type('tu')
      cy.get(':nth-child(2) > input').type('cryptic')
      cy.get('.form > .ui').contains('login').click()
    })

    // Test if login worked
    it('User is logged in', function() {
      cy.contains('logout')
      cy.contains('tu logged in')
    })

    // Test that home page was opened after the login
    it('Home page can be opened', function() {
      cy.get('.inverted > :nth-child(1) > a').contains('home')
      cy.get('h2').contains('blogs')
      cy.contains('new blog')
    })

  })
})
