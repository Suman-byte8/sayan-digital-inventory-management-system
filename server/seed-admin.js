const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save hook to hash password
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

const User = mongoose.model('User', UserSchema);

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            console.error('Admin credentials not found in .env');
            process.exit(1);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Admin user already exists');
            existingUser.isAdmin = true;
            existingUser.password = password; // Use password from env
            await existingUser.save();
            console.log('Admin user updated with isAdmin: true and password updated from env');
        } else {
            await User.create({
                name: 'Admin',
                email,
                password,
                isAdmin: true
            });
            console.log('Admin user created successfully');
        }

        // Create Test Admin
        const testEmail = 'testadmin@example.com';
        const testPassword = 'adminpassword';

        const existingTestUser = await User.findOne({ email: testEmail });
        if (existingTestUser) {
            existingTestUser.password = testPassword;
            existingTestUser.isAdmin = true;
            await existingTestUser.save();
            console.log('Test Admin updated');
        } else {
            await User.create({
                name: 'Test Admin',
                email: testEmail,
                password: testPassword,
                isAdmin: true
            });
            console.log('Test Admin created');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
