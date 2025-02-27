<?php
ini_set('display_errors', 0);
error_reporting(0);

ob_start();

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$routes = [
    '/products' => 'api/products.php',
    '/orders' => 'api/orders.php'
];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = dirname($_SERVER['SCRIPT_NAME']);

$debug = [
    'originalPath' => $path,
    'basePath' => $basePath,
    'method' => $_SERVER['REQUEST_METHOD']
];
if (strpos($path, $basePath) === 0) {
    $path = substr($path, strlen($basePath));
}
$path = rtrim($path, '/');

$debug['processedPath'] = $path;
if ($path === '') {
    echo json_encode([
        'status' => 'success',
        'message' => 'Clothing Shop API',
        'version' => '1.0.0',
        'endpoints' => array_keys($routes),
        'debug' => $debug
    ]);
    exit;
}

$routeMatched = false;
foreach ($routes as $route => $file) {
    if (strpos($path, $route) === 0) {
        $routeMatched = true;
        $_REQUEST['path_info'] = substr($path, strlen($route));
        if (file_exists(__DIR__ . '/' . $file)) {
            ob_end_clean();
            require_once __DIR__ . '/' . $file;
        } else {
            http_response_code(500);
            echo json_encode([
                'status' => 'error', 
                'message' => "Handler file not found: $file",
                'debug' => $debug
            ]);
        }
        exit;
    }
}
if (!$routeMatched) {
    http_response_code(404);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Not Found', 
        'path' => $path,
        'debug' => $debug
    ]);
}
ob_end_clean();