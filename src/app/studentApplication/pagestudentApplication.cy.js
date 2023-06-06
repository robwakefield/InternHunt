import React from 'react'
import studentApplication from './page'

describe('<studentApplication />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<studentApplication />)
  })
})