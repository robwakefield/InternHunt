import React from 'react'
import RecruiterDashboard from './page'
import ApplicantList from './page'

describe('<RecruiterDashboard />', () => {
  it('should render and display expected content', () => {
    // Mount the React component for the page
    cy.mount(<RecruiterDashboard />)
 
    // The new page should contain an h4 with "My Listings"
    cy.get('h4').contains('My Listings')
 
    // Validate that a card is present
    cy.get('.card').should('be.visible')
  })

  it('should display listings from DB', () => {
    // Mount the React component for the page
    cy.intercept('GET', '/api/listings', {
      statusCode: 201,
      body: [{
        "id":1,
        "name":"IT Intern",
        "status":"Applications Open",
        "totalPlaces":50,
        "description":"We want an IT Intern!",
        "rating1Text":"Just Mentioning",
        "rating2Text":"Minimal Evidence",
        "rating3Text":"Decent Evidence",
        "rating4Text":"Excellent Evidence",
        "rating5Text":"Perfect Match"
      }]})
    cy.mount(<RecruiterDashboard />)

    // A lising from the db should be displayed
    cy.get('.list-group').contains("IT Intern")

    // A listing not in the db should not be displayed
    cy.get('.list-group').should('not.contain', "Software Engineer")
  })

})
