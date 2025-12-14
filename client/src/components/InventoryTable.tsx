import { MdEdit } from 'react-icons/md';

export interface Product {
    _id: string;
    name: string;
    price: number;
    buyingPrice: number;
    sellingPrice: number;
    inStock: boolean;
    imageUrl?: string;
}

interface InventoryTableProps {
    products: Product[];
}

const InventoryTable = ({ products }: InventoryTableProps) => {
    return (
        <div className="flex flex-col flex-1 bg-surface-light rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[80px]">Image</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[300px]">Product Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Cost Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Selling Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Stock Level</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {products.map((product) => (
                            <tr key={product._id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-slate-400">No Img</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                                        <span className="text-xs text-slate-500">ID: {product._id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">Uncategorized</td>
                                <td className="px-6 py-4 text-sm text-slate-600 text-right tabular-nums">${product.buyingPrice?.toFixed(2) ?? '0.00'}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 text-right tabular-nums">${product.sellingPrice?.toFixed(2) ?? '0.00'}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 text-center">N/A</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${product.inStock
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : 'bg-red-100 text-red-700 border-red-200'
                                        }`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded hover:bg-slate-100">
                                        <MdEdit className="text-[20px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination (Static for now as backend doesn't seem to support it yet) */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">{products.length}</span> products</p>
                <div className="flex items-center gap-1">
                    {/* Pagination buttons would go here */}
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;
