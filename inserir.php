<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

require_once "conectar.php";

$data = file_get_contents("php://input");  
$input = json_decode($data, true);
$nome = $input["nome"] ?? "";
$cpf = $input["cpf"] ?? "";
$renda = $input["renda"] ?? "";
$tipoConta = $input["tipoConta"] ?? "";

if (!$nome || !$cpf || !$renda || !$tipoConta) {
    echo json_encode(["sucesso" => false, "mensagem" => "Campos obrigatórios faltando"]);
    exit;
}

$sql = $con->prepare("INSERT INTO clientes (nome, cpf, renda, tipoConta) VALUES (?, ?, ?, ?)");
$ok = $sql->execute([$nome, $cpf, $renda, $tipoConta]);

if ($ok) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}
?>
