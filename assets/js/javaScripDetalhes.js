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

                var countriesData = countries;// variavel para armazenar os dados dos países

                // Limpar a tabela antes de adicionar os dados
                $('#countryTable tbody').empty();

                $.each(countriesData, function (index, country) { /* Iterar sobre os dados e adicionar as linhas na tabela */
                    // criacao da tabela com os dados
                    var row = `<tr>
                        <td>${country.name.common}</td>
                        <td>${country.capital ? country.capital[0] : 'N/A'}</td>
                        <td>${country.population}</td>
                        <td>${country.area}</td>
                        <td>${country.region}</td>
                        <td>${country.subregion}</td>
                    </tr>`;

                    // Adicionar a linha na tabela
                    $('#countryTable tbody').append(row);
                }),
                    
            }
        });
    }
    else {
        function () {
            alert('Erro ao carregar os dados dos países');
        }
    }
});