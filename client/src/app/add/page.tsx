'use client';

import ProductForm from '@/components/ProductForm';
import axios from 'axios';

export default function AddProduct() {
    const handleSubmit = async (data: any) => {
        await axios.post('http://localhost:5000/api/products', data);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}
