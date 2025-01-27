document.getElementById("formularioLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeUsuario = document.getElementById("nomeUsuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (nomeUsuario && senha) {
        console.log("Enviando dados para o servidor...");
        fetch("processa_login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nomeUsuario, senha }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro de conexão com o servidor.");
            }
            console.log("Resposta do servidor recebida.");
            return response.json();
        })
        .then((data) => {
            console.log("Dados recebidos do servidor:", data);
            if (data.sucesso) {
                alert(data.mensagem);
                window.location.href = "index.html"; 
            } else {
                alert("Erro: " + data.mensagem);
            }
        })
        .catch((erro) => {
            console.error("Erro ao enviar os dados:", erro);
            alert("Erro de conexão com o servidor.");
        });
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});
