describe('API: Post', () => {
    it('fetches a post', () => {
        cy.request('/api/post').as('APIRequest');
        cy.get('@APIRequest').then(resp => {
            expect(resp.status).to.eq(200);
            assert.isNotEmpty(resp.body, 'Post API response is good')
        });
    });
  });