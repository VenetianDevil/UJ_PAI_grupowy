describe("renders the landing page correctly", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('navbar buttons should change paths', () => {
        cy.contains('Oferty').click()
        cy.url().should('include', '/oferty')
        cy.contains('Firmy').click()
        cy.url().should('include', '/firmy')
        cy.contains('Rejestracja').click()
        cy.url().should('include', '/rejestracja')
        cy.contains('Logowanie').click()
        cy.url().should('include', '/logowanie')
    })

    it('should render main sections on home page', () => {
        cy.get('.my-4').should(($h2) => {
            expect($h2).to.have.length(2)
            expect($h2.first()).to.contain('Najnowsze oferty')
            expect($h2[1]).to.contain('Najbardziej aktywne firmy')
        })
    })

   it('should render offers on home page', () => {
        cy.get('.row').first().find('div').its('length').should('not.eq',0)
    })
    it('should render companies on home page', () => {
        cy.get('.row').eq(1).find('div').its('length').should('not.eq',0)
    })
});