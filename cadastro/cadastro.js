document.getElementById("formularioCadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const nomeUsuario = document.getElementById("nomeUsuario").value.trim();

    if (email && senha && nomeUsuario) {
        fetch("processa_cadastro.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha, nomeUsuario }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.sucesso) {
                alert("Cadastro realizado com sucesso!");
                document.getElementById("formularioCadastro").reset();
            } else {
                alert("Erro ao cadastrar: " + data.mensagem);
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
