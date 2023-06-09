import React from 'react'
import RecruiterDashboard from './page'

describe('<RecruiterDashboard />', () => {
  it('should render and display expected content', () => {
    // Mount the React component for the page
    cy.mount(<RecruiterDashboard />)
 
    // The new page should contain an h4 with "My Listings"
    cy.get('h4').contains('My Listings')
 
    // Validate that a card is present
    cy.get('.card').should('be.visible')
  })
})
