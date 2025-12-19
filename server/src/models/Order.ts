import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customer: mongoose.Types.ObjectId;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    orderDate: Date;
}

const OrderSchema: Schema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
