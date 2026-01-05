import mongoose, { Schema, Document } from 'mongoose';

export interface IStockMovement extends Document {
    product: mongoose.Types.ObjectId;
    type: 'IN' | 'OUT';
    quantity: number;
    reason: string;
    reference?: string; // Order ID or Invoice ID
    date: Date;
}

const StockMovementSchema: Schema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['IN', 'OUT'], required: true },
    quantity: { type: Number, required: true },
    reason: { type: String, required: true },
    reference: { type: String },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IStockMovement>('StockMovement', StockMovementSchema);
