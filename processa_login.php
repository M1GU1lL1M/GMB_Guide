<?php
header("Content-Type: application/json");

$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if (!isset($dadosRecebidos["nomeUsuario"], $dadosRecebidos["senha"])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos."]);
    exit;
}

$nomeUsuario = $dadosRecebidos["nomeUsuario"];
$senha = $dadosRecebidos["senha"];

$servidor = "localhost";
$usuario = "root";
$senhaBD = ""; 
$banco = "sistema_cadastro";

$conn = new mysqli($servidor, $usuario, $senhaBD, $banco);

if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na conexão com o banco: " . $conn->connect_error]);
    exit;
}

$sql = $conn->prepare("SELECT senha FROM usuarios WHERE nome_usuario = ?");
$sql->bind_param("s", $nomeUsuario);
$sql->execute();
$resultado = $sql->get_result();

if ($resultado->num_rows > 0) {
    $linha = $resultado->fetch_assoc();
    if (password_verify($senha, $linha["senha"])) {
        echo json_encode(["sucesso" => true, "mensagem" => "Login realizado com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Senha incorreta."]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Usuário não encontrado."]);
}

$conn->close();
?>
