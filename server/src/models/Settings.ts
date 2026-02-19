import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    shopName: string;
    taxId: string;
    address: string;
    email: string;
    phone: string;
    currency: string;
    timezone: string;
    logoUrl: string;
}

const SettingsSchema: Schema = new Schema({
    shopName: { type: String, default: 'Sayan Digital' },
    taxId: { type: String, default: '' },
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    currency: { type: String, default: 'INR' },
    timezone: { type: String, default: 'Asia/Kolkata' },
    logoUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model<ISettings>('Settings', SettingsSchema);
