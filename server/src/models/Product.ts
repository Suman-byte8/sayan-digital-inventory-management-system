import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    buyingPrice: number;
    sellingPrice: number;
    category: string;
    inStock: boolean;
    quantity: number;
    imageUrl?: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    quantity: { type: Number, required: true, default: 0 },
    imageUrl: { type: String },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
