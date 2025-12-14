import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    inStock: boolean;
    buyingPrice: number;
    sellingPrice: number;
    imageUrl?: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    imageUrl: { type: String },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
