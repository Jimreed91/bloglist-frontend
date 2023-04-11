describe('Bloglist app', () => {
  it('main page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })
})
