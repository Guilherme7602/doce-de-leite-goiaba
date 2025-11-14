<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
$host = "localhost";
$banco = "bankspace";
$usuario = "root";
$senha = "";
try {
    $con = new PDO("mysql:host=$host;dbname=$banco;charset=utf8", $usuario, $senha);
} catch (PDOException $erro) {
    echo json_encode(["erro" => "Falha na conexão: " . $erro->getMessage()]);
    exit;
}
?>
