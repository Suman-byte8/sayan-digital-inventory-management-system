import { MdEdit, MdClose } from 'react-icons/md';

export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    buyingPrice: number;
    sellingPrice: number;
    inStock: boolean;
    quantity: number;
    imageUrl?: string;
}

interface InventoryTableProps {
    products: Product[];
    onEdit?: (product: Product) => void;
    onDelete?: (productId: string) => void;
}

const InventoryTable = ({ products, onEdit, onDelete }: InventoryTableProps) => {
    return (
        <div className="flex flex-col flex-1 bg-surface-light rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider w-[60px]">Image</th>
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider w-[250px]">Product Name</th>
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Price</th>
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center">Stock Level</th>
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                            <th className="px-4 py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {products.map((product) => (
                            <tr key={product._id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-2.5">
                                    <div className="size-8 rounded bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[9px] text-slate-400">No Img</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-2.5">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-slate-900">{product.name}</span>
                                        <span className="text-[10px] text-slate-500">ID: {product._id}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2.5 text-xs text-slate-600">{product.category}</td>
                                <td className="px-4 py-2.5 text-xs font-medium text-slate-900 text-right tabular-nums">${product.sellingPrice?.toFixed(2) ?? '0.00'}</td>
                                <td className="px-4 py-2.5 text-xs text-slate-600 text-center">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                                <td className="px-4 py-2.5 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${product.quantity < 10
                                            ? 'bg-red-100 text-red-700 border-red-200'
                                            : product.quantity < 20
                                                ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                : 'bg-green-100 text-green-700 border-green-200'
                                            }`}>
                                            {product.quantity}
                                        </span>
                                        <span className={`text-[9px] font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-2.5 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            onClick={() => onEdit?.(product)}
                                            className="text-slate-400 hover:text-primary transition-colors p-1 rounded hover:bg-slate-100"
                                            title="Edit Product"
                                        >
                                            <MdEdit className="text-[16px]" />
                                        </button>
                                        <button
                                            onClick={() => onDelete?.(product._id)}
                                            className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-slate-100"
                                            title="Delete Product"
                                        >
                                            <MdClose className="text-[16px]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-xs text-slate-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination (Static for now as backend doesn't seem to support it yet) */}
            <div className="px-4 py-2.5 border-t border-slate-200 flex items-center justify-between">
                <p className="text-xs text-slate-500">Showing <span className="font-medium text-slate-900">{products.length}</span> products</p>
                <div className="flex items-center gap-1">
                    {/* Pagination buttons would go here */}
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;
