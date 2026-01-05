import axios from 'axios';
import { Product } from '../components/InventoryTable';

const API_URL = 'http://localhost:5000/api';

// Add interceptor to handle 401 errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export interface Category {
    _id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        // Handle paginated response
        if (response.data.products && Array.isArray(response.data.products)) {
            return response.data.products;
        }
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const createProduct = async (product: FormData | Omit<Product, '_id'>): Promise<Product> => {
    try {
        const response = await axios.post(`${API_URL}/products`, product, {
            headers: {
                ...(product instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
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


export const updateProduct = async (id: string, product: FormData | Partial<Product>): Promise<Product> => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, product, {
            headers: {
                ...(product instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
    try {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
    try {
        const response = await axios.put(`${API_URL}/categories/${id}`, category);
        return response.data.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/categories/${id}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

export const login = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const fetchCustomers = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/customers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
};

export const fetchCustomerById = async (id: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customer:', error);
        throw error;
    }
};

export const searchCustomerByPhone = async (phone: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/customers/search/phone?phone=${phone}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching customer by phone:', error);
        throw error;
    }
};

export const createCustomer = async (customer: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/customers`, customer, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const updateCustomer = async (id: string, customer: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/customers/${id}`, customer, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

export const deleteCustomer = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
};

export const fetchOrders = async (params: any = {}): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const queryString = new URLSearchParams(params).toString();
        const response = await axios.get(`${API_URL}/orders?${queryString}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { orders: [], total: 0, page: 1, pages: 1 };
    }
};

export const createOrder = async (order: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/orders`, order, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const updateOrder = async (id: string, order: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/orders/${id}`, order, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

export const deleteOrder = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};

export const fetchInvoices = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/invoices`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return [];
    }
};

export const createInvoice = async (invoice: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/invoices`, invoice, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};

// Suppliers
export const fetchSuppliers = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/suppliers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return [];
    }
};

export const createSupplier = async (supplier: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/suppliers`, supplier, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating supplier:', error);
        throw error;
    }
};

export const updateSupplier = async (id: string, supplier: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/suppliers/${id}`, supplier, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating supplier:', error);
        throw error;
    }
};

export const deleteSupplier = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/suppliers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        throw error;
    }
};

// Stock Movements
export const fetchStockMovements = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/stock-movements`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching stock movements:', error);
        return [];
    }
};

export const createStockMovement = async (movement: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/stock-movements`, movement, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating stock movement:', error);
        throw error;
    }
};

// Reports
export const fetchDashboardStats = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/reports/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { totalRevenue: 0, pendingOrders: 0, lowStockProducts: 0, totalProducts: 0 };
    }
};

export const fetchSalesReport = async (startDate?: string, endDate?: string): Promise<any[]> => {
    try {
        const token = localStorage.getItem('token');
        let query = '';
        if (startDate && endDate) {
            query = `?startDate=${startDate}&endDate=${endDate}`;
        }
        const response = await axios.get(`${API_URL}/reports/sales${query}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales report:', error);
        return [];
    }
};

export const fetchInventoryReport = async (): Promise<any[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/reports/inventory`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory report:', error);
        return [];
    }
};
