describe('Bloglist app',function() {
  // resetting db and creating a user before each test
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Rinn Fukuhara',
      username: 'Chiuahua1',
      password: 'adalovelace'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('main page can be opened', function() {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function() {
    it('is successfull with correct credentials', function() {
      cy.get('#username').type('Chiuahua1')
      cy.get('#password').type('adalovelace')
      cy.get('#login-button').click()

      cy.contains('Rinn Fukuhara is logged in')
    })
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('Chiuahua2')
      cy.get('#password').type('adalovelace')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
    })
  })
  describe('when logged in...', function() {
    beforeEach(function() {
      cy.login({ username: 'Chiuahua1', password: 'adalovelace' })
    })
    it('a new blog can be created', function() {
      cy.get('button').contains('New Blog').click()
      cy.get('#title').type('Tea for dogs')
      cy.get('#author').type('Moko Fukuhara')
      cy.get('#url').type('www.dogblogs.net')
      cy.get('#add-blog-button').click()

      cy.get('.blog').contains('Tea for dogs')
      cy.get('.blog').contains('Moko')
      cy.get('.blog').contains('www.dogblogs.net')
    })
    describe('and a blog exists...', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'planet endertromb',
          author: 'Blix',
          url: 'poignantguide.com'
        })
      })
      it('clicking the like button increases a blogs likes', function() {
        cy.get('button').contains('View').click()
        cy.get('button').contains('Like').click()

        cy.get('#like-count').contains('1')
      })
      it('user can delete their own blog', function() {
        cy.get('button').contains('View').click()
        cy.get('button').contains('Remove').click()

        cy.get('.blog').should('not.exist')
      })
    })
  })
})
