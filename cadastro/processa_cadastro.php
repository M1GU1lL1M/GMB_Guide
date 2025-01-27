<?php
header("Content-Type: application/json");

$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if (!isset($dadosRecebidos["email"], $dadosRecebidos["senha"], $dadosRecebidos["nomeUsuario"])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos."]);
    exit;
}

$email = $dadosRecebidos["email"];
$senha = password_hash($dadosRecebidos["senha"], PASSWORD_DEFAULT);
$nomeUsuario = $dadosRecebidos["nomeUsuario"];

$servidor = "localhost";
$usuario = "root";
$senhaBD = ""; 
$banco = "sistema_cadastro";

$conn = new mysqli($servidor, $usuario, $senhaBD, $banco);

if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na conexão com o banco: " . $conn->connect_error]);
    exit;
}

$sql = $conn->prepare("INSERT INTO usuarios (email, senha, nome_usuario) VALUES (?, ?, ?)");
$sql->bind_param("sss", $email, $senha, $nomeUsuario);

if ($sql->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar os dados: " . $conn->error]);
}

$conn->close();
?>