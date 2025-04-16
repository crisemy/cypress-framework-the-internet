class HomePage {
    visit() {
        cy.visit('/')
    }

    verifyWelcomeText () {
        cy.contains('Welcome to the-internet').should('be.visible')
    }
}

 export default HomePage