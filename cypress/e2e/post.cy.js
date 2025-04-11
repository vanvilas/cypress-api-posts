describe('Lista de Posts', () => {
    it('deve exibir 3 títulos de post da API', () => {
        // Intercepta a chamada da API para garantir que os dados sejam mockados corretamente
        cy.intercept('GET', '**/posts?_limit=3').as('getPosts');

        // Visita a página local onde a API fake está sendo consumida
        cy.visit('http://127.0.0.1:5500/index.html'); 

        // Espera a resposta da API ser recebida
        cy.wait('@getPosts');

        // Verifica se a lista de posts contém 3 itens e que o primeiro não está vazio
        cy.get('#posts-list li')
            .should('have.length', 3) 
            .first()
            .should('not.be.empty');
    });
});
