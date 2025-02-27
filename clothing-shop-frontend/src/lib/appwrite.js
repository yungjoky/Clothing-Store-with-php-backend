import { Client, Databases, Account, Storage, ID, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('test');              // Replace with your project ID

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export { ID, Query };
export const DATABASE_ID = '67c0b459000b4e2902ce'; // Replace with your Database ID
export const PRODUCTS_COLLECTION_ID = 'products'; // Replace with your products table
export const ORDERS_COLLECTION_ID = 'orders';  // Replace with your orders table

// Helper functions
export async function getProducts(category = null) {
  let queries = [];
  
  if (category && category !== 'all') {
    queries.push(Query.search('categories', category));
  }
  
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      queries
    );
    
    return response.documents;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function createOrder(orderData) {
  try {
    // Convert cart items to string for storage
    const orderWithSerializedItems = {
      ...orderData,
      items_json: JSON.stringify(orderData.items),
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    
    // Remove the original items array
    delete orderWithSerializedItems.items;
    
    return await databases.createDocument(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      ID.unique(),
      orderWithSerializedItems
    );
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}