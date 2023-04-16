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
      it('user cannot delete another users blogs', function() {
        // Adding second user to db
        const user = {
          name: 'Moko Fukuhara',
          username: 'Chiuahua2',
          password: 'adalovelace'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        // log out and then in on second user
        cy.get('button').contains('Logout').click()
        cy.login({ username: 'Chiuahua2', password: 'adalovelace' })
        // upon opening blog details there should be no delete button
        cy.get('button').contains('View').click()
        cy.get('button').contains('Remove').should('not.exist')
      })
    })
    describe('and multiple blogs exist...', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'first',
          author: 'Cartoon Foxes',
          url: 'poignantguide.com'
        })
        cy.createBlog({
          title: 'second',
          author: 'Blix',
          url: 'poignantguide.com'
        })
        cy.createBlog({
          title: 'third',
          author: 'the elf',
          url: 'poignantguide.com'
        })
        cy.visit('http://localhost:3000')
      })
      it('blogs are ordered by how many likes they have', function() {
        cy.get('.blog').eq(0).should('contain', 'first')
        cy.get('.blog').eq(1).contains('View').click()
        cy.get('.blog').eq(1).contains('Like').as('second-like')
        cy.get('.blog').eq(2).contains('View').click()
        cy.get('.blog').eq(2).contains('Like').as('third-like')
        cy.get('@second-like').click()
        cy.get('.blog').eq(0).find('#like-count').contains('1')
        cy.get('@third-like').click()
        cy.get('.blog').eq(1).find('#like-count').contains('1')
        cy.get('@second-like').click()
        cy.get('.blog').eq(0).should('contain', 'third')
      })
    })
  })
})
