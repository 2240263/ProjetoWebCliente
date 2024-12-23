
// Função para validar o formulário
function validateForm() {
    let isValid = true;

    // Validar o nome
    var inputNome = document.getElementById("inputnome");
    if (!inputNome || inputNome.value.trim().length < 3) {// Se o nome não existir ou tiver menos de 3 caracteres
        showError(inputNome, "O nome deve ter pelo menos 3 caracteres.");
        isValid = false;
    } else {
        hideError(inputNome);
    }

    // Validar o email
    var inputEmail = document.getElementById("exampleInputEmail1");
    if (!inputEmail || !validateEmail(inputEmail.value)) {
        showError(inputEmail, "Por favor, insira um email válido.");
        isValid = false;
    } else {
        hideError(inputEmail);
    }

    // Validar o contacto
    var inputNumber = document.querySelector("input[type='number']");
    if (!inputNumber || inputNumber.value.trim() === "" || isNaN(inputNumber.value)) {
        showError(inputNumber, "Por favor, insira um número de contacto válido.");
        isValid = false;
    } else {
        hideError(inputNumber);
    }

    // Validar o comentário ou questão
    var textArea = document.getElementById("floatingTextarea2");
    if (!textArea || textArea.value.trim() === "") {
        showError(textArea, "Por favor, insira um comentário ou questão.");
        isValid = false;
    } else {
        hideError(textArea);
    }
    //validação dos termos e condições
    if (!inputTerms.checked) {
        isValid = false;
        showError("terms", "Aceite os termos e condições!");
    }
    else {
        hideError("terms");
    }

    return isValid;
}

// Função para validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para mostrar erro
function showError(element, message) {
    if (!element) return;
//criar um elemento para mostrar a mensagem de erro
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error-message");
        element.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    element.classList.add("is-invalid");
}

// Função para esconder erro
function hideError(element) {
    if (!element) return;

    const errorElement = element.nextElementSibling; // Elemento que contém a mensagem de erro
    if (errorElement && errorElement.classList.contains("error-message")) {// Se existir um elemento de erro
        errorElement.textContent = "";
        errorElement.remove();
    }
    element.classList.remove("is-invalid");
}

// envio do formulário
document.getElementById("enviar").addEventListener("click", function (event) {
    event.preventDefault(); 
    if (validateForm()) {
        alert("Formulário enviado com sucesso!");
    } else {
        alert("Por favor, corrija os erros antes de enviar.");
    }
});
