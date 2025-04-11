let page = 1;
const limit = 3;
const totalPosts = 100; // Sabemos que a API tem 100 posts
    
        const loadMoreButton = document.getElementById('load-more');
        const postsList = document.getElementById('posts-list');
        const loadingMessage = document.getElementById('loading');
        const errorMessage = document.getElementById('error');
    
        // Lógica de carregar os 3 primeiros posts ao abrir a página
        function carregarPosts() {
            const start = (page - 1) * limit;

            loadingMessage.style.display = 'block';
            errorMessage.style.display = 'none';

        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
            const li = document.createElement('li');    
            li.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
            postsList.appendChild(li);
                });
                page++; // avança a página só depois de carregar os posts

                // Oculta o botão se já carregou tudo
                if ((page - 1) * limit >= totalPosts) {
                loadMoreButton.style.display = 'none';
                }
            })
                .catch(error => {
                    console.error('Erro ao carregar posts:', error);
                    errorMessage.style.display = 'block';
                })
                .finally(() => {
                    loadingMessage.style.display = 'none'; // esconde "Carregando..." ao final
                });
            }

        // Carrega os primeiros posts
        carregarPosts();
        loadMoreButton.addEventListener('click', carregarPosts);

        // Botão de Reiniciar Lista
        const resetButton = document.getElementById('reset-list');

        resetButton.addEventListener('click', () => {
            postsList.innerHTML = '';     // limpa a lista
            page = 1;                     // volta para a página 1
            loadMoreButton.style.display = 'block'; // mostra o botão de novo
            
            carregarPosts();             // recarrega os primeiros posts
});
