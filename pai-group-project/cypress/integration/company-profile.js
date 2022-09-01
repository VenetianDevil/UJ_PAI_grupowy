describe("adding new offer", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.visit('/')
        cy.contains('Logowanie').click()
        cy.url().should('include', '/logowanie')
        cy.get('input').first().type('company')
        cy.get('input').eq(1).type('1234')
        cy.get('form').submit()
    })
    it('should add offer correctly', () => {
        cy.url().should('not.include', '/logowanie')
        cy.contains('Konto').click()
        cy.contains('Konto company').should('be.visible')
        cy.contains('Dodaj nową ofertę').click()
        cy.get('.modal-dialog').should('be.visible')
        cy.get('input[id=title]').type('Testowa oferta2')
        cy.get('input[id=address]').type('Test offer address')
        cy.get('input[id=offerURL]').type('https://www.google.com/')
        cy.get('form').eq(1).submit()
    })

    it('should cancel add info form', () => {
        cy.contains('Konto').click()
        cy.contains('Zapisz').should('not.exist')
        cy.contains('Anuluj').should('not.exist')
        cy.contains('Edytuj').click()
        cy.contains('Anuluj').click()
        cy.contains('Zapisz').should('not.exist')
    })

    it('should add company info', () => {
        cy.contains('Konto').click()
        cy.contains('Edytuj').click()
        cy.get('[id=companyName]').type('Test company name')
        cy.get('[id=email]').type('company@company.com')
        cy.get('[id=HQLocation]').type('Test location')
        cy.get('[id=imageURL]').type('https://www.google.com/')
        cy.get('[id=info]').type('Some test info')
        cy.get('form').first().submit()
    })

    it('change recruiters stage', () => {
        cy.contains('Konto').click()
        cy.get('[id=recruitmentTable]').click()
        cy.get('.modal-dialog').should('be.visible')
        cy.get('select').first().select('3')
        cy.contains('Zapisz zmiany').click()
        cy.get('.modal-dialog').should('not.exist')
        cy.get('.message').should('exist')
    })

    it('change recruiters status', () => {
        cy.contains('Konto').click()
        cy.get('[id=recruitmentTable]').click()
        cy.get('.modal-dialog').should('be.visible')
        cy.get('select').eq(1).select('2')
        cy.contains('Zapisz zmiany').click()
        cy.get('.modal-dialog').should('not.exist')
        cy.get('.message').should('exist')
    })
});