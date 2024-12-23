$(document).ready(function () {

    // Obtém o parâmetro 'pais' da URL inserida na pagina com card´s
    var urlParams = new URLSearchParams(window.location.search);
    var nomePais = urlParams.get('pais');  // Captura o nome do país

    if (nomePais) {
        console.log('País:', nomePais);  // Verifique se o nome do país foi capturado corretamente

        $.ajax({
            url: 'https://restcountries.com/v3.1/all', // URL da API
            method: 'GET',
            success: function (countries) {

                // Limpar a tabela antes de adicionar os dados
                $('#countryTable tbody').empty();

                var country = countries[0];

                // Preenche os dados do país na tabela
                $('#countrynome').text(country.name.common); // Nome do país
                $('#countrycapital').text(country.capital ? country.capital[0] : 'N/A'); // Capital
                $('#countrypopulacao').text(country.population ? country.population.toLocaleString() : 'N/A'); // População
                $('#countryarea').text(country.area ? country.area.toLocaleString() : 'N/A'); // Área
                $('#countryregiao').text(country.region); // Região
                $('#countrysubregiao').text(country.subregion); // Sub-região
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
