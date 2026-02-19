import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
    name: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    isActive: boolean;
}

const SupplierSchema: Schema = new Schema({
    name: { type: String, required: true },
    contactPerson: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);
