
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
    // Permitir apenas números com 9 a 15 dígitos e pode começar com "+"
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

// Função para guardar os dados do formulário
function saveFormData() {
    const formData = {
        name: document.getElementById("inputnome").value,
        email: document.getElementById("exampleInputEmail1").value,
        message: document.getElementById("floatingTextarea2").value,
        phone: document.getElementById("inputnumero").value,
        terms: document.getElementById("terms").checked,  // se o checkbox foi marcado
        file: document.getElementById("formFile").files[0],  // arquivo
    };

    // Exibe os dados no console
    console.log("Dados do formulário salvos:", formData);

    // Exibe a mensagem de sucesso
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    mensagemSucesso.style.display = "block";  // Torna visível a mensagem de sucesso

    // Limpa os dados do formulário 
    document.getElementById("contact-form").reset();
}

//fazer a validação do formulário
document.getElementById("enviar").addEventListener("click", saveFormData);
