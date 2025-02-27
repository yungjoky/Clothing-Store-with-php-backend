<?php
header('Content-Type: application/json'); 
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/../vendor/autoload.php'; 
use App\Models\Product;

$product = new Product();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $category = isset($_GET['category']) ? $_GET['category'] : null;

            if (isset($_GET['id'])) {
                $result = $product->getById($_GET['id']);
            } else {
                $result = $product->getAll($category);
            }
            
            echo json_encode(['success' => true, 'data' => $result]);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $product->create($data);
            echo json_encode(['success' => true, 'data' => $result]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            
            if (!$id) {
                throw new Exception('Product ID is required');
            }
            
            $result = $product->update($id, $data);
            echo json_encode(['success' => true, 'data' => $result]);
            break;
            
        case 'DELETE':
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            
            if (!$id) {
                throw new Exception('Product ID is required');
            }
            
            $result = $product->delete($id);
            echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}