describe("check login action", () => {
    beforeEach(() => {
        cy.visit('/logowanie')
    })
    it('should login and logout correctly as user', () => {
        cy.get('input').first().type('wmaterna')
        cy.get('input').eq(1).type('1234')
        cy.get('form').submit()
        cy.url().should('not.include', '/logowanie')
        cy.contains('Wyloguj').click()
        cy.url().should('include', '/')
        cy.contains('Do widzenia')
    })

    it('should login and logout correctly as user as company', () => {
        cy.get('input').first().type('company')
        cy.get('input').eq(1).type('1234')
        cy.get('form').submit()
        cy.url().should('not.include', '/logowanie')
        cy.contains('Wyloguj').click()
        cy.url().should('include', '/')
        cy.contains('Do widzenia')
    })
});