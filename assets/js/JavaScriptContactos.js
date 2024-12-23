function validateForm() {
    let isValid = true;

    var inputNome = document.getElementById("inputnome");
    if (!inputNome || inputNome.value.trim().length < 3) {
        showError("name", "O nome deve ter pelo menos 3 caracteres.");
        isValid = false;
    } else {
        hideError("name");
    }

    var inputEmail = document.getElementById("exampleInputEmail1");
    if (!inputEmail || !validateEmail(inputEmail.value)) {
        showError("email", "Por favor, insira um email válido.");
        isValid = false;
    } else {
        hideError("email");
    }

    var inputNumber = document.getElementById("inputnumero");
    if (!inputNumber || !validatenumero(inputNumber.value.trim())) {
        showError("numero", "Por favor, insira um número de telefone válido (9 a 15 dígitos).");
        isValid = false;
    } else {
        hideError("numero");
    }

    var textArea = document.getElementById("floatingTextarea2");
    if (!textArea || textArea.value.trim() === "") {
        showError("message", "Por favor, insira um comentário ou questão.");
        isValid = false;
    } else {
        hideError("message");
    }

    var inputTerms = document.getElementById("terms");
    if (!inputTerms.checked) {
        showError("terms", "Aceite os termos e condições!");
        isValid = false;
    } else {
        hideError("terms");
    }

    return isValid;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatenumero(numero) {
    const regex = /^\+?[0-9]{9,15}$/;
    return regex.test(numero);
}

function showError(fieldId, message) {
    var divError = document.getElementById(`${fieldId}-error`);
    if (divError) {
        divError.textContent = message;
        divError.style.display = "block";
    }
}

function hideError(fieldId) {
    var divError = document.getElementById(`${fieldId}-error`);
    if (divError) {
        divError.style.display = "none";
        divError.textContent = "";
    }
}

// Função para exibir mensagem de sucesso
function showSuccessMessage() {
    var successMessage = document.getElementById("mensagemSucesso");
    successMessage.style.display = "block"; // Exibe a mensagem de sucesso
    setTimeout(function () {
        successMessage.style.display = "none"; // Oculta a mensagem após 5 segundos
    }, 5000);
}

document.getElementById("enviar").addEventListener("click", function (event) {
    event.preventDefault(); // Previne o envio do formulário real
    if (validateForm()) {
        showSuccessMessage(); // Exibe a mensagem de sucesso
        saveFormData(); // Função para salvar os dados do formulário
    } else {
        alert("Por favor, corrija os erros antes de enviar.");
    }
});

// Função para guardar dados do formulário
function saveFormData() {
    var formData = {
        name: document.getElementById("inputnome").value,
        email: document.getElementById("exampleInputEmail1").value,
        message: document.getElementById("floatingTextarea2").value,
        phone: document.getElementById("inputnumero").value,
    };
    console.log("Dados do formulário salvos:", formData);
}