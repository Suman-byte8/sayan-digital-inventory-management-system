import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
    order: mongoose.Types.ObjectId;
    amount: number;
    status: 'paid' | 'unpaid' | 'overdue';
    dueDate: Date;
    issuedDate: Date;
}

const InvoiceSchema: Schema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' },
    dueDate: { type: Date, required: true },
    issuedDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
