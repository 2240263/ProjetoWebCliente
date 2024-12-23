
// Recupera os países favoritos do localStorage
var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];

// Seleciona o elemento onde os países favoritos serão exibidos
var cardFavoritos = document.getElementById("cardfavoritos");

// Limpa a área onde os cartões de países serão exibidos
cardFavoritos.innerHTML = "";

arrayPaisesFavoritos.forEach(pais => {
    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/name/' + pais
    }).done(function (dados) {
        
        dados.forEach(pais => {
            var languages = [];  // Array para armazenar as línguas do país

            // Verifica se existem linguagens para o país e adiciona ao array
            if (pais.languages) {
                Object.keys(pais.languages).forEach(key => {
                    languages.push(pais.languages[key]);
                });
            }
            // Cria o cartão de país para cada um dos favoritos
            var cardPais = `<div class="col-md-3">
                            <div class="cardp">
                                <div class="card-header">
                                    <img src="${pais.flags.png}" class="card-imga" alt="Bandeira de ${pais.name.common}">
                                    <h4 class="card-title">${pais.name.common}</h4>
                                    <a href="${pais.maps.googleMaps}" target="_blank">
                                        <img src="assets/img/geo-alt.svg" alt="geo" width="30" title="Ver no Google Maps">
                                    </a>
                                </div>
                                <div class="card-body">
                                    <p class="card-capital"><strong>Capital:</strong> ${pais.capital}</p>
                                    <p class="card-populacao"><strong>População:</strong> ${pais.population} Habitantes</p>
                                    <p class="card-continente"><strong>Continente:</strong>  ${pais.region}</p>
                                    <p class="card-linguas"><strong>Idiomas:</strong> ${languages.length > 1 ? languages.join(', ') : languages[0]}</p>
                                    <button class="btn btn-verdetalhes" onclick="verdetalhes('${pais.name.common}')"> Ver </button></button> 
                                    <button class="btn btn-favoritos" onclick="removerFavoritos('${pais.name.common}')"> Remover dos Favoritos </button>
                                </div>
                            </div>
                        </div>`;

            // Adiciona o cartão do país à área de favoritos
            $('#cardfavoritos').append(cardPais);
        });
    });
});



// Função para remover um país dos favoritos
function removerFavoritos(nomePais) {
    // Recupera a lista de países favoritos do localStorage
    var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];

    // Filtra o país que o usuário deseja remover
    arrayPaisesFavoritos = arrayPaisesFavoritos.filter(pais => pais !== nomePais);
    console.log(arrayPaisesFavoritos);
    // Atualiza o localStorage com a lista modificada
    localStorage.setItem("paisesFavoritos", JSON.stringify(arrayPaisesFavoritos));

    // Após remover, atualiza a exibição dos favoritos
    alert(`${nomePais} foi removido dos favoritos.`);
    location.reload();  // Recarrega a página para refletir a remoção
}

/* Botão ver mais*/
   

function verdetalhes(nomePais) {
    console.log('Nome do País:', nomePais);  // Verifica se o nome do país foi passado corretamente
    window.location.href = 'detalhespaises.html?pais=' + encodeURIComponent(nomePais);
}