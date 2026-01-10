import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
    phone?: string;
    address?: string;
    avatar?: string;
    role: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: true },
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
    role: { type: String, default: 'Admin' },
}, { timestamps: true });

UserSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
