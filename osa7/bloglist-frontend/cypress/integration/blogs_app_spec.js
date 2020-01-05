//let userId = null

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
    const response = cy.request('POST', 'http://localhost:3003/api/users/', user)
    //userId = response.body.id
    console.log('response:',response)
  })

  describe('when logged in', function() {
    // Logout and login
    beforeEach(function() {
      cy.visit('/login')
      cy.get('h2').contains('blogs')
      cy.get('h3').contains('Log in')
      cy.contains('username')
      cy.contains('password')
      cy.get(':nth-child(1) > input').type('tu')
      cy.get(':nth-child(2) > input').type('cryptic')
      cy.get('.form > .ui').contains('login').click()
      cy.get('.right > .link').contains('tu logged in').click()
      cy.contains('Test User')
      cy.reload(true)
      cy.contains('added blogs')
    })

    // Test if logout link is active
    it('Logout link is present', function() {
      cy.contains('logout')
    })

    // Test that home page was opened after the login
    it('Home page can be opened', function() {
      cy.get('.inverted > :nth-child(1) > a').contains('home').click()
      cy.get('h2').contains('blogs')
      cy.contains('new blog')
    })

    // Test blog is created from home page
    it('New blog can be created on home page', function() {
      cy.get('.inverted > :nth-child(1) > a').contains('home').click()
      cy.contains('new blog').click()
      cy.get(':nth-child(1) > input').type('Le Tit')
      cy.get(':nth-child(2) > input').type('Au Thor')
      cy.get(':nth-child(3) > input').type('https://www.partio.fi/partiomedia/nain-teet-leirinkestavat-letit/')
      cy.get('.form > .ui').click()
      cy.contains('blog saved')
    })

    describe('and a blog is created on blogs page', function () {
      // Create a blog
      beforeEach(function() {
        cy.get(':nth-child(2) > a').contains('blogs').click()
        cy.contains('new blog').click()
        cy.get(':nth-child(1) > input').type('Le Mans')
        cy.get(':nth-child(2) > input').type('Au Er')
        cy.get(':nth-child(3) > input').type('https://fi.wikipedia.org/wiki/Le_Mans')
        cy.get('.form > .ui').click()
        cy.contains('blog saved')
      })

      // Test blog can be liked
      it('a blog has like button', function() {
        cy.get(':nth-child(2) > :nth-child(1) > .content > .right > .left').contains('0')
        cy.get(':nth-child(2) > :nth-child(1) > .content > .right > .left').click()
        cy.get(':nth-child(2) > :nth-child(1) > .content > .right > .left').contains('1')
      })

    })
  })
})
