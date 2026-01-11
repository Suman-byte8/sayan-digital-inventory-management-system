import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description?: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true,
            maxlength: [100, 'Category name cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

// Indexes for optimal query performance
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ isActive: 1, name: 1 }); // Compound index for filtered queries
CategorySchema.index({ createdAt: -1 }); // For sorting by recent

// Pre-save hook to auto-generate slug from name
CategorySchema.pre<ICategory>('save', function (this: ICategory) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
