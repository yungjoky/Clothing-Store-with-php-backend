<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Models\Product;

$products = [
    [
        'name' => 'Hident - Deal The Cards Hoodie',
        'description' => 'A stylish and comfortable hoodie for any occasion',
        'price' => 24.99,
        'image' => 'https://i.imgur.com/ASPb16o.png',
        'categories' => ['shirts', 'featured'],
        'inventory' => 50,
        'created_at' => date('Y-m-d H:i:s')
    ],
    [
        'name' => 'Slim-Fit Jeans',
        'description' => 'Modern slim fit with stretch comfort technology',
        'price' => 59.99,
        'image' => 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
        'categories' => ['pants', 'new'],
        'inventory' => 35,
        'created_at' => date('Y-m-d H:i:s')
    ],
    [
        'name' => 'Leather Bomber Jacket',
        'description' => 'Premium leather with quilted lining for extra warmth',
        'price' => 199.99,
        'image' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
        'categories' => ['outerwear', 'featured'],
        'inventory' => 15,
        'created_at' => date('Y-m-d H:i:s')
    ],
    [
        'name' => 'Wool Beanie',
        'description' => 'Soft knit beanie that keeps you warm in cold weather',
        'price' => 19.99,
        'image' => 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800',
        'categories' => ['accessories', 'new'],
        'inventory' => 100,
        'created_at' => date('Y-m-d H:i:s')
    ],
    [
        'name' => 'Floral Summer Dress',
        'description' => 'Light and airy dress perfect for warm weather',
        'price' => 49.99,
        'image' => 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800',
        'categories' => ['dresses', 'new'],
        'inventory' => 25,
        'created_at' => date('Y-m-d H:i:s')
    ]
];

$product = new Product();
$successCount = 0;
$failCount = 0;

echo "Starting product upload...\n";

foreach ($products as $productData) {
    try {
        $product->create($productData);
        echo "Successfully added: {$productData['name']}\n";
        $successCount++;
    } catch (Exception $e) {
        echo "Failed to add {$productData['name']}: {$e->getMessage()}\n";
        $failCount++;
    }
}

echo "\nUpload complete! $successCount products added, $failCount failed.\n";