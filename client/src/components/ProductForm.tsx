import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface ProductFormProps {
    initialData?: {
        name: string;
        price: number;
        inStock: boolean;
        buyingPrice: number;
        sellingPrice: number;
    };
    onSubmit: (data: any) => Promise<void>;
    isEdit?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isEdit = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        inStock: true,
        buyingPrice: 0,
        sellingPrice: 0,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            router.push('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-colors hover:border-gray-400";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
            <div>
                <label htmlFor="name" className={labelClasses}>
                    Product Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g., Wireless Headphones"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="buyingPrice" className={labelClasses}>
                        Buying Price ($)
                    </label>
                    <input
                        type="number"
                        name="buyingPrice"
                        id="buyingPrice"
                        required
                        min="0"
                        step="0.01"
                        value={formData.buyingPrice}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="sellingPrice" className={labelClasses}>
                        Selling Price ($)
                    </label>
                    <input
                        type="number"
                        name="sellingPrice"
                        id="sellingPrice"
                        required
                        min="0"
                        step="0.01"
                        value={formData.sellingPrice}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="price" className={labelClasses}>
                        Display Price ($)
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div className="flex items-center h-full pt-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                            {formData.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={loading}
                >
                    {isEdit ? 'Update Product' : 'Add Product'}
                </Button>
            </div>
        </motion.form>
    );
};

export default ProductForm;
