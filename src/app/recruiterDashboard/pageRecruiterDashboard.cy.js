import React from 'react'
import RecruiterDashboard from './page'

describe('<RecruiterDashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RecruiterDashboard />)
  })
})