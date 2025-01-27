<?php
header("Content-Type: application/json");

$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if (!isset($dadosRecebidos["email"], $dadosRecebidos["senha"], $dadosRecebidos["nomeUsuario"])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos."]);
    exit;
}

$email = $dadosRecebidos["email"];
$senha = $dadosRecebidos["senha"];
$nomeUsuario = $dadosRecebidos["nomeUsuario"];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["sucesso" => false, "mensagem" => "E-mail inválido."]);
    exit;
}

$senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);

$servidor = "localhost";
$usuario = "root";
$senhaBD = "";
$banco = "sistema_cadastro";

$conn = new mysqli($servidor, $usuario, $senhaBD, $banco);

if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na conexão com o banco: " . $conn->connect_error]);
    exit;
}

$sqlCheck = $conn->prepare("SELECT id FROM usuarios WHERE email = ? OR nome_usuario = ?");
$sqlCheck->bind_param("ss", $email, $nomeUsuario);
$sqlCheck->execute();
$resultadoCheck = $sqlCheck->get_result();

if ($resultadoCheck->num_rows > 0) {
    echo json_encode(["sucesso" => false, "mensagem" => "E-mail ou nome de usuário já cadastrado."]);
    exit;
}

$sql = $conn->prepare("INSERT INTO usuarios (email, senha, nome_usuario) VALUES (?, ?, ?)");
$sql->bind_param("sss", $email, $senhaCriptografada, $nomeUsuario);

if ($sql->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar os dados: " . $conn->error]);
}

$conn->close();
?>