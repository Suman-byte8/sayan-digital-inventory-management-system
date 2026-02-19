import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email?: string;
    phone: string;
    address?: string;
    company?: string;
    status: 'Active' | 'Inactive';
}

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true, index: true },
    address: { type: String },
    company: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
