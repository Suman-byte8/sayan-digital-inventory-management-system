import axios from 'axios';
import { Product } from '../components/InventoryTable';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const createProduct = async (product: FormData | Omit<Product, '_id'>): Promise<Product> => {
    try {
        const response = await axios.post(`${API_URL}/products`, product, {
            headers: {
                'Content-Type': product instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
