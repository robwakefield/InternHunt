import React from 'react'
import studentDashboard from './page'

describe('<studentDashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<studentDashboard />)
  })
})