<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Models\Product;

// Suppress deprecation warnings
error_reporting(E_ERROR | E_PARSE);

$product = new Product();
$products = $product->getAll();
$uniqueProducts = [];
$toDelete = [];

echo "Starting cleanup of duplicate products...\n";
echo "Found " . count($products) . " total products\n";

foreach ($products as $item) {
    $name = $item['name'];
    if (!isset($uniqueProducts[$name])) {
        $uniqueProducts[$name] = $item;
    } else {
        $existingTimestamp = strtotime($uniqueProducts[$name]['$createdAt']);
        $currentTimestamp = strtotime($item['$createdAt']);
        
        if ($currentTimestamp > $existingTimestamp) {
            $toDelete[] = $item;
        } else {
            $toDelete[] = $uniqueProducts[$name];
            $uniqueProducts[$name] = $item;
        }
    }
}

echo "Found " . count($toDelete) . " duplicates to remove\n";

$deleted = 0;
$failed = 0;

foreach ($toDelete as $item) {
    try {
        $product->delete($item['$id']);
        echo "Deleted duplicate: {$item['name']} (ID: {$item['$id']})\n";
        $deleted++;
    } catch (Exception $e) {
        echo "Error deleting {$item['name']} (ID: {$item['$id']}): {$e->getMessage()}\n";
        $failed++;
    }
}

echo "\nCleanup complete! Deleted $deleted duplicates, $failed failed.\n";
echo "Remaining products: " . (count($products) - $deleted) . "\n";