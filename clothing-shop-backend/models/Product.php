<?php

namespace App\Models;

use Appwrite\Client;
use Appwrite\Services\Databases;
use Appwrite\Query;
use Appwrite\ID;
use Exception;

class Product {
    private $client;
    private $databases;
    private $config;
    
    public function __construct() {
        $this->config = require __DIR__ . '/../config/appwrite.php';
        
        $this->client = new Client();
        $this->client
            ->setEndpoint($this->config['endpoint'])
            ->setProject($this->config['project'])
            ->setKey($this->config['api_key'])
            ->setSelfSigned(true);
            
        $this->databases = new Databases($this->client);
    }
    
    public function getAll($category = null) {
        $queries = [];
        
        if ($category && $category !== 'all') {
            $queries[] = Query::search('categories', $category);
        }
        
        try {
            $response = $this->databases->listDocuments(
                $this->config['database_id'],
                $this->config['products_collection_id'],
                $queries
            );
            
            return $response['documents'];
        } catch (Exception $e) {
            throw new Exception('Error fetching products: ' . $e->getMessage());
        }
    }
    
    public function getById($id) {
        try {
            return $this->databases->getDocument(
                $this->config['database_id'],
                $this->config['products_collection_id'],
                $id
            );
        } catch (Exception $e) {
            throw new Exception('Error fetching product: ' . $e->getMessage());
        }
    }
    
    public function create($data) {
        try {
            return $this->databases->createDocument(
                $this->config['database_id'],
                $this->config['products_collection_id'],
                ID::unique(),
                $data
            );
        } catch (Exception $e) {
            throw new Exception('Error creating product: ' . $e->getMessage());
        }
    }
    
    public function update($id, $data) {
        try {
            return $this->databases->updateDocument(
                $this->config['database_id'],
                $this->config['products_collection_id'],
                $id,
                $data
            );
        } catch (Exception $e) {
            throw new Exception('Error updating product: ' . $e->getMessage());
        }
    }
    
    public function delete($id) {
        try {
            return $this->databases->deleteDocument(
                $this->config['database_id'],
                $this->config['products_collection_id'],
                $id
            );
        } catch (Exception $e) {
            throw new Exception('Error deleting product: ' . $e->getMessage());
        }
    }
}