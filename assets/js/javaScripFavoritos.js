// Quando o botão de carregar favoritos for clicado
document.getElementById("btn btn-favoritos").addEventListener("click", function() {
    // Recupera os países favoritos do localStorage
    var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("PaisesFavoritos")) || [];
    
    // Seleciona o elemento onde os países favoritos serão exibidos
    var cardFavoritos = document.getElementById("cardfavoritos");
    
    // Limpa a área onde os cartões de países serão exibidos
    cardFavoritos.innerHTML = "";

    // Itera sobre os países favoritos e cria o HTML para cada um
    arrayPaisesFavoritos.forEach(pais => {
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
                                    <p class="card-capital">Capital: ${pais.capital}</p>
                                    <p class="card-populacao">População: ${pais.population}</p>
                                    <p class="card-continente">Continente: ${pais.region}</p>
                                    <p class="card-linguas">Idiomas: ${languages.length > 1 ? languages.join(', ') : languages[0]}</p>
                                    <button class="btn btn-favoritos" onclick="removerFavoritos('${pais.name.common}')"> Remover dos Favoritos </button>
                                </div>
                            </div>
                        </div>`;
        
        // Adiciona o cartão do país à área de favoritos
        cardFavoritos.innerHTML += cardPais;
    });
});

/*// Função para remover um país dos favoritos
function removerFavoritos(nomePais) {
    // Recupera a lista de países favoritos do localStorage
    var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("PaisesFavoritos")) || [];

    // Filtra o país que o usuário deseja remover
    arrayPaisesFavoritos = arrayPaisesFavoritos.filter(pais => pais.name.common !== nomePais);

    // Atualiza o localStorage com a lista modificada
    localStorage.setItem("PaisesFavoritos", JSON.stringify(arrayPaisesFavoritos));

    // Após remover, atualiza a exibição dos favoritos
    alert(`${nomePais} foi removido dos favoritos.`);
    location.reload();  // Recarrega a página para refletir a remoção
}*/
