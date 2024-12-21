//PAG PAÍSES

$(document).ready(function() {
    // Função para carregar os países da API
    function carregarPaises() {
        $.ajax({
            method: 'GET',
            url: 'https://restcountries.com/v3.1/all', // API para obter os países
            success: function (dados) {
                var paisesAleatorios = shuffleArray(dados).slice(0, 6); // Carregar 6 países aleatórios

                // Limpar os cards antes de adicionar novos
                $('#cardpaises').html('');

                // Adicionar os países aos cards
                paisesAleatorios.forEach(function(pais, index) {
                    var card = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${pais.flags.png}" class="card-img" alt="Bandeira de ${pais.name.common}">
                            <div class="card-body">
                                <h4 class="card-title">${pais.name.common}</h4>
                                <button class="btn-favoritos" onclick="adicionarFavoritos('${pais.name.common}', '${pais.flags.png}')">Adicionar aos Favoritos</button>
                            </div>
                        </div>
                    </div>`;
                    $('#cardpaises').append(card);
                });
            },
            error: function () {
                alert('Erro ao carregar os países.');
            }
        });
    }

    // Função para embaralhar os países
    function shuffleArray(array) {
        var shuffledArray = array.slice();
        for (var i = shuffledArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // Função para adicionar aos favoritos
window.adicionarFavoritos = function(nome, bandeira) {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Verifica se o país já está nos favoritos
    var favoritoExistente = favoritos.find(fav => fav.nome === nome);
    
    if (favoritoExistente) {
        // Se já estiver nos favoritos, remove
        favoritos = favoritos.filter(fav => fav.nome !== nome);
        alert(`${nome} removido dos favoritos.`);
    } else {
        // Se não estiver nos favoritos, adiciona
        favoritos.push({ nome: nome, bandeira: bandeira });
        alert(`${nome} adicionado aos favoritos.`);
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    // Alterna a classe de favorito no ícone
    var button = document.querySelector(`button[data-pais="${nome}"]`);
    button.classList.toggle('favorito');
}

// Função para atualizar a aparência dos favoritos
function atualizarFavoritos() {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    favoritos.forEach(function(favorito) {
        var button = document.querySelector(`button[data-pais="${favorito.nome}"]`);
        if (button) {
            button.classList.add('favorito');
        }
    });
}

// Chama a função para atualizar os favoritos quando a página for carregada
atualizarFavoritos();

    }

    // Função para mostrar favoritos no modal
    $('#btn-favoritos').on('click', function() {
        var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        var listaFavoritos = '';
        favoritos.forEach(function(favorito) {
            listaFavoritos += `
            <div class="card mb-2">
                <img src="${favorito.bandeira}" class="card-img-top" alt="Bandeira de ${favorito.nome}">
                <div class="card-body">
                    <h5 class="card-title">${favorito.nome}</h5>
                </div>
            </div>`;
        });
        $('#lista-favoritos').html(listaFavoritos);
    });

    // Função de pesquisa
    $('#btn-search').on('click', function() {
        var termoPesquisa = $('#titulo').val().toLowerCase();

        $.ajax({
            method: 'GET',
            url: 'https://restcountries.com/v3.1/all',
            success: function(dados) {
                var paisesFiltrados = dados.filter(function(pais) {
                    return pais.name.common.toLowerCase().includes(termoPesquisa);
                });

                $('#cardpaises').html('');
                paisesFiltrados.forEach(function(pais) {
                    var card = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${pais.flags.png}" class="card-img" alt="Bandeira de ${pais.name.common}">
                            <div class="card-body">
                                <h4 class="card-title">${pais.name.common}</h4>
                                <button class="btn-favoritos" onclick="adicionarFavoritos('${pais.name.common}', '${pais.flags.png}')">Adicionar aos Favoritos</button>
                            </div>
                        </div>
                    </div>`;
                    $('#cardpaises').append(card);
                });
            }
        });
    });

    // Carregar países ao carregar a página
    carregarPaises();
});