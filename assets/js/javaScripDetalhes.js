$(document).ready(function () {

    // Obtém o parâmetro 'pais' da URL inserida na pagina com card´s
    var urlParams = new URLSearchParams(window.location.search);
    var nomePais = urlParams.get('pais');  // Captura o nome do país

    if (nomePais) {
        $.ajax({
            url: 'https://restcountries.com/v3.1/name/' + nomePais, // URL da API
            method: 'GET',
            success: function (pais) {
                // Limpa os dados da tabela 
                $('#countrynome').text = ('');
                $('#countrycapital').text = ('');
                $('#countrypopulacao').text = ('');
                $('#countryarea').text = ('');
                $('#countryregiao').text = ('');
                $('#countrysubregiao').text = ('');

                var currencyKey = Object.keys(pais[0].currencies)[0]; // Obtem a chave da moeda
                var languagesKey = Object.keys(pais[0].languages)[0]; // Obtem a chave do idioma

                // Preenche os dados do país na tabela
                $('#countrynome').text(pais[0].name.common); // Nome do país
                $('#countrycapital').text(pais[0].capital?.[0] ? pais[0].capital[0] : 'N/A'); // Capital c/validação
                $('#countrypopulacao').text(pais[0].population); // População
                $('#countryarea').text(pais[0].area); // Área
                $('#countryregiao').text(pais[0].region); // Região
                $('#countrysubregiao').text(pais[0].subregion); // Sub-região
                $('#countryidioma').text(pais[0].languages[languagesKey]); // Idiomas
                $('#countrymoeda').text(pais[0].currencies[currencyKey].name); // Moeda
                $('#countrymaps').html(`<a href="${pais[0].maps.googleMaps}" target="_blank">
                    <img src="assets/img/geo-alt.svg" alt="geo" width="30" title="Ver no Google Maps" class="mapsdetalhes">
                </a>`); // Mapa
                $('#countrycoordenadas').text("Lat: " + 
                    (pais[0].capitalInfo.latlng?.[0] ? pais[0].capitalInfo.latlng[0]:'N/A' ) 
                    + ", Log: " + 
                    (pais[0].capitalInfo.latlng?.[1]? pais[0].capitalInfo.latlng[1]:'N/A')); // Coordenadas c/validação
                $('#countrybandeira').html(`<img src="${pais[0].flags.png}" class="card-imga" alt="Bandeira de ${pais[0].name.common}">`); // Bandeira

            },
            error: function () {
                // Em caso de erro, exibe uma mensagem de alerta
                alert('Erro ao carregar os dados do país.');
            }
        });

    } else {
        // Se não encontrar o parâmetro 'pais' na URL
        alert('Parâmetro "pais" não encontrado na URL.');
    }
});
