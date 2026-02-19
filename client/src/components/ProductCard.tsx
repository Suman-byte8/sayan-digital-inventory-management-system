import React from 'react';
import { FaEdit, FaTrash, FaTag, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface ProductProps {
    _id: string;
    name: string;
    price: number;
    inStock: boolean;
    buyingPrice: number;
    sellingPrice: number;
    onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductProps> = ({ _id, name, price, inStock, buyingPrice, sellingPrice, onDelete }) => {
    const profit = (sellingPrice || 0) - (buyingPrice || 0);
    const profitMargin = buyingPrice && buyingPrice > 0 ? ((profit / buyingPrice) * 100).toFixed(1) : '0';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
                        <p className="text-xs text-gray-400 font-mono mt-1">ID: {_id.slice(-6)}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${inStock
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                        {inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                            <FaTag /> Selling Price
                        </div>
                        <p className="text-lg font-bold text-gray-900">${(sellingPrice || 0).toFixed(2)}</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-indigo-600 text-xs mb-1">
                            <FaChartLine /> Profit
                        </div>
                        <p className="text-lg font-bold text-indigo-700">
                            ${(profit || 0).toFixed(2)}
                            <span className="text-xs font-normal ml-1 text-indigo-500">({profitMargin}%)</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                    <div>
                        <span className="block text-xs">Buying Price</span>
                        <span className="font-medium text-gray-700">${(buyingPrice || 0).toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-right">Display Price</span>
                        <span className="font-medium text-gray-700">${(price || 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-100">
                <Link href={`/edit/${_id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                        <FaEdit className="mr-2" /> Edit
                    </Button>
                </Link>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(_id)}
                    className="flex-1 bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 shadow-none"
                >
                    <FaTrash className="mr-2" /> Delete
                </Button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
