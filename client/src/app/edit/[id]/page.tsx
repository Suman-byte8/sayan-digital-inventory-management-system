'use client';

import { useEffect, useState } from 'react';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (data: any) => {
        await axios.put(`http://localhost:5000/api/products/${id}`, data);
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-10">Product not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
            <ProductForm initialData={product} onSubmit={handleSubmit} isEdit />
        </div>
    );
}
