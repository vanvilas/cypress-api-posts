describe('Carregar mais posts', () => {
    it('deve carregar mais 3 posts ao clicar no botão "Ver mais posts"', () => {
        //interceptando a requisiçaõ para garantir que a API responde corretamente
        cy.intercept('GET', '**/posts?_start=0&_limit=3').as('getFirstPosts');
        cy.intercept('GET', '**/posts?_start=3&_limit=3').as('getMorePosts');

        cy.visit('http://127.0.0.1:5500/index.html');

        // Espera a primeira requisição e valida
        cy.wait('@getFirstPosts');
        // verifica que a lista de posts tem 3 itens
        cy.get('#posts-list li').should('have.length', 3);

        // Clica e aguarda a próxima requisição
        cy.get('#load-more').click();
        cy.wait('@getMorePosts');
        cy.get('#posts-list li').should('have.length', 6);
        });        
    });

    describe('Tratamento de erro ao carregar posts', () => {
        it('deve exibir mensagem de erro se a API falhar', () => { // simula falha na API
            cy.intercept('GET', '**/posts?_start=0&_limit=3', {
                statusCode: 500,
                body: {}
            }).as('getPostsErro');

            cy.visit('http://127.0.0.1:5500/index.html', {
                oneBeforeLoad(win) {
                    delete win.fetch;
                }
            });

            cy.wait('@getPostsErro');

            cy.get('#error').should('be.visible');
            cy.get('#loading').should('not.be.visible');
            cy.get('#posts-list li').should('have.length', 0); // garante que nenhum post apareceu
        });
    });

    describe('Reiniciar lista de posts', () => {
        it('deve limpar a lista e carregar os primeiros posts novamente', () => {
            cy.intercept('GET', '**/posts?_start=0&_limit=3').as('getFirstPosts');
            cy.intercept('GET', '**/posts?_start=3&_limit=3').as('getMorePosts');

            cy.visit('http://127.0.0.1:5500/index.html');
            cy.wait('@getFirstPosts');
            cy.get('#posts-list li').should('have.length', 3);

            // Clica para carregar mais
            cy.get('#load-more').click();
            cy.wait('@getMorePosts');
            cy.get('#posts-list li').should('have.length', 6);

            // Agora clica em "Reiniciar Lista"
            cy.get('#reset-list').click();
            cy.wait('@getFirstPosts');
            cy.get('#posts-list li').should('have.length', 3);
        });
    });

    describe('Paginação completa', () => {
        it('deve esconder o botão após carregar todos os posts', () => {
            cy.visit('http://127.0.0.1:5500/index.html');

            // carrega os 100 posts (100 / 3 = 34 cliques)
            for (let i = 0; i < 34; i++) {
                cy.get('#load-more').click();
            }

            //verifica se o botão desapareceu
            cy.get('#load-more').should('not.be.visible');
        });
    });
