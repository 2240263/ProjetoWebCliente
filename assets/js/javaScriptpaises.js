
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
                                        <p class="card-capital">Capital: ${pais.capital}</p>
                                        <p class="card-populacao">População: ${pais.population}</p>
                                        <p class="card-continente">Continente: ${pais.region} </p>
                                        <p class="card-linguas">Idiomas: ${languages.length > 1 ? languages.join(', ') : languages[0]}</p>  
                                        <button class="btn btn-favoritos" onclick="adicionarFavoritos('${pais.name.common}', '${pais.flags.png}')"> Adicionar aos Favoritos
                                        </button>
                                    </div>
                                </div>
                            </div>`;
            $('#cardpaises').append(cardPais);

        });
    });
});


function adicionarFavoritos(nomePais, bandeiraPais) {
    console.log("Adicionado aos favoritos: " + nomePais);
    // Altere a classe do ícone de coração para preenchido quando favoritado
    document.querySelector('.bi-heart').classList.toggle('bi-heart-fill');
}