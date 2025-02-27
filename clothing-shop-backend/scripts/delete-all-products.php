<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Models\Product;

error_reporting(E_ERROR | E_PARSE);

$product = new Product();

$products = $product->getAll();
$totalProducts = count($products);

echo "Starting deletion of all products...\n";
echo "Found $totalProducts products to delete\n";

if ($totalProducts === 0) {
    echo "No products found. Database is already empty.\n";
    exit;
}

echo "WARNING: This will delete ALL products from your database.\n";
echo "Are you sure you want to continue? (y/n): ";
$handle = fopen("php://stdin", "r");
$line = trim(fgets($handle));
if (strtolower($line) !== 'y' && strtolower($line) !== 'yes') {
    echo "Operation cancelled.\n";
    exit;
}

$deleted = 0;
$failed = 0;

foreach ($products as $item) {
    try {
        $product->delete($item['$id']);
        echo "Deleted product: {$item['name']} (ID: {$item['$id']})\n";
        $deleted++;
    } catch (Exception $e) {
        echo "Error deleting {$item['name']} (ID: {$item['$id']}): {$e->getMessage()}\n";
        $failed++;
    }
    
    // Show progress
    $progress = round(($deleted + $failed) / $totalProducts * 100, 1);
    echo "Progress: $progress% completed\n";
}

echo "\nDeletion complete!\n";
echo "Successfully deleted: $deleted products\n";
echo "Failed to delete: $failed products\n";
echo "Remaining products: " . ($totalProducts - $deleted) . "\n";

if ($deleted == $totalProducts) {
    echo "\nAll products have been successfully deleted. You can now add your own products.\n";
    echo "To add products, use the upload-products.php script or create your own products via the API.\n";
}