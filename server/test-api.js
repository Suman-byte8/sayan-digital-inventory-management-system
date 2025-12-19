const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

const log = {
    success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
    info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
    warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`)
};

// Dummy categories
const categories = [
    { name: 'Paper Products', description: 'Various types of printing paper and cardstock' },
    { name: 'Ink & Toner', description: 'Printer ink cartridges and toner supplies' },
    { name: 'Printing Equipment', description: 'Printers, scanners, and related hardware' },
    { name: 'Office Supplies', description: 'General office and printing supplies' }
];

// Dummy products (will be created after categories)
const products = [
    {
        name: 'A4 Premium Paper',
        sku: 'PAPER-A4-001',
        description: 'High-quality A4 size printing paper, 80 GSM',
        price: 5.99,
        cost: 3.50,
        unit: 'pack',
        stockQuantity: 150,
        categoryName: 'Paper Products'
    },
    {
        name: 'A3 Glossy Photo Paper',
        sku: 'PAPER-A3-002',
        description: 'Professional glossy photo paper for high-quality prints',
        price: 12.99,
        cost: 8.00,
        unit: 'pack',
        stockQuantity: 75,
        categoryName: 'Paper Products'
    },
    {
        name: 'Black Ink Cartridge HP 950XL',
        sku: 'INK-HP-950XL',
        description: 'High-capacity black ink cartridge for HP printers',
        price: 45.99,
        cost: 28.00,
        unit: 'pcs',
        stockQuantity: 30,
        categoryName: 'Ink & Toner'
    },
    {
        name: 'Color Ink Set Canon PGI-280',
        sku: 'INK-CANON-280',
        description: 'Complete color ink set for Canon PIXMA printers',
        price: 39.99,
        cost: 24.00,
        unit: 'pcs',
        stockQuantity: 25,
        categoryName: 'Ink & Toner'
    },
    {
        name: 'Epson EcoTank ET-2720',
        sku: 'PRINT-EPSON-2720',
        description: 'All-in-one wireless printer with refillable ink tanks',
        price: 249.99,
        cost: 180.00,
        unit: 'pcs',
        stockQuantity: 5,
        categoryName: 'Printing Equipment'
    },
    {
        name: 'Stapler Heavy Duty',
        sku: 'OFFICE-STAPLER-HD',
        description: 'Heavy-duty stapler for up to 100 sheets',
        price: 15.99,
        cost: 9.00,
        unit: 'pcs',
        stockQuantity: 40,
        categoryName: 'Office Supplies'
    }
];

// Test functions
async function testAPI() {
    console.log('\n' + '='.repeat(60));
    log.info('Starting API Test with Dummy Data');
    console.log('='.repeat(60) + '\n');

    try {
        // Test server connection
        log.info('Testing server connection...');
        await axios.get('http://localhost:5000');
        log.success('Server is running!\n');

        // Create categories
        log.info('Creating categories...');
        const createdCategories = {};

        for (const category of categories) {
            try {
                const response = await axios.post(`${API_URL}/categories`, category);
                createdCategories[category.name] = response.data.data._id;
                log.success(`Created category: ${category.name} (ID: ${response.data.data._id})`);
            } catch (error) {
                if (error.response?.data?.error?.includes('already exists')) {
                    log.warn(`Category already exists: ${category.name}`);
                    // Fetch existing categories to get ID
                    const categoriesResponse = await axios.get(`${API_URL}/categories`);
                    const existing = categoriesResponse.data.data.find(c => c.name === category.name);
                    if (existing) {
                        createdCategories[category.name] = existing._id;
                    }
                } else {
                    log.error(`Failed to create category ${category.name}: ${error.response?.data?.error || error.message}`);
                }
            }
        }

        console.log('');
        log.info('Creating products...');

        for (const product of products) {
            try {
                const formData = new FormData();
                formData.append('name', product.name);
                formData.append('sku', product.sku);
                formData.append('description', product.description);
                formData.append('price', product.price);
                formData.append('cost', product.cost);
                formData.append('unit', product.unit);
                formData.append('stockQuantity', product.stockQuantity);
                formData.append('category', createdCategories[product.categoryName]);

                // Create a simple placeholder image (optional)
                // For now, we'll skip the image to keep it simple
                // You can add actual images later

                const response = await axios.post(`${API_URL}/products`, formData, {
                    headers: formData.getHeaders()
                });

                log.success(`Created product: ${product.name} (SKU: ${product.sku})`);
            } catch (error) {
                if (error.response?.data?.error?.includes('SKU already exists')) {
                    log.warn(`Product already exists: ${product.name}`);
                } else {
                    log.error(`Failed to create product ${product.name}: ${error.response?.data?.error || error.message}`);
                }
            }
        }

        // Fetch and display summary
        console.log('\n' + '='.repeat(60));
        log.info('Fetching data summary...');
        console.log('='.repeat(60) + '\n');

        const categoriesResponse = await axios.get(`${API_URL}/categories`);
        const productsResponse = await axios.get(`${API_URL}/products`);

        log.success(`Total Categories: ${categoriesResponse.data.count}`);
        log.success(`Total Products: ${productsResponse.data.total || productsResponse.data.count}`);

        console.log('\n' + '='.repeat(60));
        log.success('API Test Completed Successfully!');
        console.log('='.repeat(60) + '\n');

        log.info('You can now view the data at:');
        console.log(`  - Frontend: ${colors.blue}http://localhost:3000/inventory${colors.reset}`);
        console.log(`  - Categories API: ${colors.blue}${API_URL}/categories${colors.reset}`);
        console.log(`  - Products API: ${colors.blue}${API_URL}/products${colors.reset}\n`);

        return true;

    } catch (error) {
        console.log('\n' + '='.repeat(60));
        log.error('API Test Failed!');
        console.log('='.repeat(60) + '\n');
        log.error(`Error: ${error.message}`);

        if (error.code === 'ECONNREFUSED') {
            log.warn('Make sure the backend server is running on http://localhost:5000');
            log.info('Run: cd server && npm run dev');
        }

        return false;
    }
}

// Run the test
testAPI().then(success => {
    process.exit(success ? 0 : 1);
});
