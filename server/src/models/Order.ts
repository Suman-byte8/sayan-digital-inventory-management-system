import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customer: mongoose.Types.ObjectId;
    products: {
        product?: mongoose.Types.ObjectId;
        name: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled' | 'delivered' | 'hold';
    paymentStatus: 'paid' | 'unpaid' | 'partial';
    notes?: string;
    orderDate: Date;
}

const OrderSchema: Schema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Optional for custom items
        name: { type: String, required: true }, // Required for all items
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled', 'delivered', 'hold'], default: 'pending' },
    paymentStatus: { type: String, enum: ['paid', 'unpaid', 'partial'], default: 'unpaid' },
    notes: { type: String },
    orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
