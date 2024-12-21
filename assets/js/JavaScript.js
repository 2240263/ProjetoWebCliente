//pesquisa de países

$(document).ready(function() {
    $("#pesquisarbotao").on("click", function() {
        var inputValue = $("#pesquisartext").val();
        fetchPaises(inputValue);
    });
});

// Função para buscar países
function fetchPaises(inputValue) {
    const api_url = "https://restcountries.com/v3.1/name/" + inputValue;

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
                    <a href="https://restcountries.com/v3.1/name/{name}" target="_blank" class="btn btn-primary d-block mt-4">Mais informações</a>
                </div>
            </div>
        </div>`;

        paisList.append(cardPais);
    });
}


//HOMEPAGE

$(document).ready(function () {
    // Função para carregar países aleatórios
    function carregarPaises() {
      // URL da API para carregar os países
      $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all', // API para obter os países
        success: function (dados) {
          // Embaralha o array de países e seleciona 3 países aleatórios
          var paisesAleatorios = shuffleArray(dados).slice(0, 3);
  
          // Preenche os dados dos três primeiros países nos cards existentes
          $('#f1').attr('src', paisesAleatorios[0].flags.png); // Bandeira do Card 1
          $('#title1').text(paisesAleatorios[0].name.common); // Nome do Card 1
  
          $('#f2').attr('src', paisesAleatorios[1].flags.png); // Bandeira do Card 2
          $('#title2').text(paisesAleatorios[1].name.common); // Nome do Card 2
  
          $('#f3').attr('src', paisesAleatorios[2].flags.png); // Bandeira do Card 3
          $('#title3').text(paisesAleatorios[2].name.common); // Nome do Card 3
        },
        error: function () {
          alert('Erro ao carregar os países.');
        }
      });
    }
  
    // Função para embaralhar o array de países
    function shuffleArray(array) {
      var shuffledArray = array.slice();
      for (var i = shuffledArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
  
    // Chama a função para carregar os países aleatórios ao carregar a página
    carregarPaises();
  });
  

