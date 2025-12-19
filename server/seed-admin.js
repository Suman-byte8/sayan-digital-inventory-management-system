const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
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
            // Optional: Update password if needed
            // existingUser.password = password;
            // await existingUser.save();
            // console.log('Admin password updated');
        } else {
            await User.create({
                name: 'Admin',
                email,
                password
            });
            console.log('Admin user created successfully');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
