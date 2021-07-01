describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'FredAlley',
      name: 'Fred Alley',
      password: 'French2007'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('FredAlley')
      cy.get('#password').type('French2007')
      cy.contains('login').click()

      cy.contains('Fred Alley logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('FredAlley')
      cy.get('#password').type('failed')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Fred Alley logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'FredAlley', password: 'French2007' })
    })
    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Fred Alley')
      cy.get('#url').type('www.france.com')
      cy.get('#create').click()

      cy.get('.noti').should('contain', 'Test Title by Fred Alley added')

      cy.contains('view').click()

      cy.contains('Test Title')
      cy.contains('Fred Alley')
      cy.contains('www.france.com')
      cy.get('.likes').should('contain', 0)
    })

    describe('and a blog is added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test Title', author: 'Fred Alley', url: 'www.france.com' })
      })

      it('it can be liked', function() {
        cy.get('.likes').should('contain', 0)
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.likes').should('contain', 1)
      })

      it('it can be deleted by the user that added it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'Test Title')
      })

      it('it cannot be deleted by another user', function() {
        const user = {
          username: 'GregL',
          name: 'Greg Lane',
          password: 'gregPass'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')

        cy.contains('logout').click()

        cy.login({ username: 'GregL', password: 'gregPass' })
        cy.contains('view').click()
        cy.get('.removeButton').should('have.css', 'display', 'none')
      })
    })

    describe('and multiple blogs are added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test Title', author: 'Fred Alley', url: 'www.france.com' })
        cy.createBlog({ title: 'Test no 2', author: 'Bill B', url: 'www.12345.com' })
        cy.createBlog({ title: 'This will be the favorite', author: 'Sib', url: 'www.fin.com' })
      })

      it.only('blogs are ordered by likes', function() {
        cy.contains('Test Title').parent().contains('view').click()
        cy.contains('like').as('Like1')
        cy.get('@Like1').click()

        cy.contains('Test no 2').parent().as('Blog2')
        cy.get('@Blog2').contains('view').click()
        cy.get('@Blog2').contains('like').click()
        cy.wait(500)
        cy.get('@Blog2').contains('like').click()

        cy.contains('This will be the favorite').parent().as('Blog3')
        cy.get('@Blog3').contains('view').click()
        cy.get('@Blog3').contains('like').as('Like3')
        for(let i = 0; i < 4; i++) {
          console.log(i)
          cy.get('@Like3').click()
          cy.wait(500)
        }

        cy.get('@Like1').click()
        cy.get('@Like1').click()
        let max
        cy.wait(500)
        cy.get('.likes').each((item, index) => {
          let text = Cypress.$(item).text()
          let num = parseInt(text)
          if(index === 0) {
            max = num
          } else {
            expect(max >= num).to.be.true
            max = num
          }
        })
      })
    })
  })
})