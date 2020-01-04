/* eslint-disable no-undef */
describe('Blogs ', function() {
  beforeEach(function() {
    cy.visit('/logout')
    cy.get('h2').contains('blogs')
    cy.get('h3').contains('Log in')
    cy.contains('username')
    cy.contains('password')
    cy.get(':nth-child(1) > input').type('D')
    cy.get(':nth-child(2) > input').type('iso')
    cy.get('.form > .ui').contains('login').click()
  })

  it('User is logged in', function() {
    cy.contains('logout')
    cy.contains('D logged in')
  })

  it('Home page can be opened', function() {
    cy.get('.inverted > :nth-child(1) > a').contains('home')
    cy.get('h2').contains('blogs')
    cy.contains('new blog')
  })

})
