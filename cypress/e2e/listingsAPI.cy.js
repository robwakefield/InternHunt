describe('API: Listings', () => {
  it('fetches listings as an array', () => {
      cy.request('/api/listings').as('APIRequest');
      cy.get('@APIRequest').then(resp => {
          expect(resp.status).to.eq(200);
          assert.isArray(resp.body, 'Listings API response is an array')
      });
  });
});