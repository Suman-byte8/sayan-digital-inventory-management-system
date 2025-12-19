const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    imageUrl: { type: String },
});

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    slug: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const Category = mongoose.model('Category', CategorySchema);

const dummyCategories = [
    { name: 'Electronics', description: 'Gadgets and devices', slug: 'electronics' },
    { name: 'Clothing', description: 'Apparel and fashion', slug: 'clothing' },
    { name: 'Books', description: 'Fiction and non-fiction', slug: 'books' },
    { name: 'Home & Garden', description: 'Furniture and tools', slug: 'home-garden' },
];

const dummyProducts = [
    {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones with 20h battery life.',
        buyingPrice: 50,
        sellingPrice: 120,
        category: 'Electronics',
        inStock: true,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
    },
    {
        name: 'Smart Watch',
        description: 'Fitness tracker with heart rate monitor and GPS.',
        buyingPrice: 80,
        sellingPrice: 199,
        category: 'Electronics',
        inStock: true,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Cotton T-Shirt',
        description: '100% organic cotton basic t-shirt in black.',
        buyingPrice: 5,
        sellingPrice: 25,
        category: 'Clothing',
        inStock: true,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww'
    },
    {
        name: 'Denim Jeans',
        description: 'Classic straight fit blue denim jeans.',
        buyingPrice: 15,
        sellingPrice: 60,
        category: 'Clothing',
        inStock: true,
        imageUrl: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'The Great Gatsby',
        description: 'Classic novel by F. Scott Fitzgerald.',
        buyingPrice: 8,
        sellingPrice: 15,
        category: 'Books',
        inStock: false,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2t8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Modern Lamp',
        description: 'Minimalist desk lamp with adjustable brightness.',
        buyingPrice: 20,
        sellingPrice: 45,
        category: 'Home & Garden',
        inStock: true,
        imageUrl: 'https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtcHxlbnwwfHwwfHx8MA%3D%3D'
    }
];

const dummyCustomers = [
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Maple St, Springfield, IL'
    },
    {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Ave, Metropolis, NY'
    },
    {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        phone: '+1 (555) 555-5555',
        address: '789 Pine Ln, Gotham, NJ'
    },
    {
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        phone: '+1 (555) 246-8101',
        address: '321 Cedar Blvd, Star City, CA'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data and indexes
        await Product.collection.dropIndexes();
        await Customer.collection.dropIndexes();
        await Category.collection.dropIndexes();
        console.log('Dropped indexes');

        await Product.deleteMany({});
        await Customer.deleteMany({});
        await Category.deleteMany({});
        console.log('Cleared existing products, customers, and categories');

        // Seed Categories
        try {
            await Category.insertMany(dummyCategories);
            console.log('Seeded categories');
        } catch (err) {
            console.error('Error seeding categories:', err.message);
            if (err.writeErrors) console.error(JSON.stringify(err.writeErrors, null, 2));
        }

        // Seed Products
        try {
            await Product.insertMany(dummyProducts);
            console.log('Seeded products');
        } catch (err) {
            console.error('Error seeding products:', err.message);
            if (err.writeErrors) console.error(JSON.stringify(err.writeErrors, null, 2));
        }

        // Seed Customers
        try {
            await Customer.insertMany(dummyCustomers);
            console.log('Seeded customers');
        } catch (err) {
            console.error('Error seeding customers:', err.message);
            if (err.writeErrors) console.error(JSON.stringify(err.writeErrors, null, 2));
        }

        console.log('Data seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Global error:', error);
        process.exit(1);
    }
};

seedData();
