$(document).ready(function() {
    $("#pesquisarbotao").on("click", function() {
        var inputValue = $("#pesquisartext").val();
        fetchPaises(inputValue);
    });
});

// Função para buscar países
function fetchPaises(inputValue) {
    const api_url = "https://restcountries.herokuapp.com/api/v1" + inputValue;

    $.ajax({
        url: api_url,
        method: "GET",
        success: function(data) {
            console.log(data);
            displayPaises(data);
        },
        error: function(error) {
            alert("Erro na pesquisa do país");
        }
    });
}

// Função para exibir os países
function displayPaises(arrayPaises) {
    var paisList = $("#listapaises");
    paisList.empty();

    arrayPaises.forEach(pais => {
        var cardPais =
        ` <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="" class="card-img-top" alt="Bandeira de ">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">Capital:</p>
                    <p class="card-text">Região: </p>
                    <a href="https://restcountries.herokuapp.com/api/v1" target="_blank" class="btn btn-primary d-block mt-4">Mais informações</a>
                </div>
            </div>
        </div>`;

        paisList.append(cardPais);
    });
}

