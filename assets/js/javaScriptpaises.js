
// Função de pesquisa
$('#pesquisarbotao').on('click', function () {
    var termoPesquisa = $('#pesquisartext').val();

    // Limpar os cards antes de adicionar novos
    $('#cardpaises').html('');

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/name/' + termoPesquisa
    }).done(function (dados) {

        dados.forEach(pais => {
            var languages = [];

            Object.keys(pais.languages).forEach(key => { // funcao para conseguir ir buscar as linguas para o array "linguages" - Na linha 29, é validada a condicao = se tiver mais que uma lingua coloca virgula - através de operador ternário (Condicao ? true : false)
                languages.push(pais.languages[key]);
            });
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
                                            <button class="btn btn-favoritos" onclick="adicionarFavoritos('${pais.name.common}')"> Adicionar  Favoritos </button>
                                        </div>
                                    </div>
                                </div>`;
            $('#cardpaises').append(cardPais);
        });
    })
        .fail(function () {
            $('#cardpaises').html('<h3>Nenhum resultado encontrado</h3>');
            console.log("Nenhum resultado encontrado");
        });
});


function adicionarFavoritos(nomePais) {

    var arrayPaisesFavoritos;

    if (localStorage.getItem("paisesFavoritos") === null) {
        //Se não houver países favoritos, cria um array vazio
        arrayPaisesFavoritos = [];
    } else {
        //Carrega os paises favoritos do localStorage
        arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos"));
    }
    // Verifica se o país já está nos favoritos
    if (arrayPaisesFavoritos.includes(nomePais)) {
        alert(`${nomePais} já está nos seus favoritos!`);
        return;
    }
    // Adiciona o país aos favoritos
    arrayPaisesFavoritos.push(nomePais);

    var favoritosStorage = JSON.stringify(arrayPaisesFavoritos)
    localStorage.setItem("paisesFavoritos", favoritosStorage);
    // alerta o país foi adicionado aos favoritos
    alert(`${nomePais} foi inserido nos seus favoritos!`);
}

/* Botão ver mais*/


function verdetalhes(nomePais) {
    console.log('Nome do País:', nomePais);  // Verifica se o nome do país foi passado corretamente
    window.location.href = 'detalhespaises.html?pais=' + encodeURIComponent(nomePais);
}