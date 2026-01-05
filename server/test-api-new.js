const API_URL = 'http://localhost:5001/api';
let token;
let productId;
let supplierId;

const login = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testadmin@example.com',
                password: 'adminpassword'
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        token = data.token;
        console.log('Login successful');
    } catch (error) {
        console.error('Login failed:', error.message);
        process.exit(1);
    }
};

const testSuppliers = async () => {
    try {
        // Create
        const createRes = await fetch(`${API_URL}/suppliers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Test Supplier',
                contactPerson: 'John Doe',
                email: 'supplier@test.com'
            })
        });
        const createData = await createRes.json();
        if (!createRes.ok) throw new Error(createData.message || 'Create Supplier failed');
        supplierId = createData._id;
        console.log('Create Supplier: PASS');

        // Get All
        const getRes = await fetch(`${API_URL}/suppliers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!getRes.ok) throw new Error('Get Suppliers failed');
        console.log('Get Suppliers: PASS');

        // Update
        const updateRes = await fetch(`${API_URL}/suppliers/${supplierId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ contactPerson: 'Jane Doe' })
        });
        if (!updateRes.ok) throw new Error('Update Supplier failed');
        console.log('Update Supplier: PASS');

        // Delete
        const deleteRes = await fetch(`${API_URL}/suppliers/${supplierId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!deleteRes.ok) throw new Error('Delete Supplier failed');
        console.log('Delete Supplier: PASS');
    } catch (error) {
        console.error('Supplier Test Failed:', error.message);
    }
};

const testStockMovement = async () => {
    try {
        // Create Product
        const productRes = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Test Product',
                buyingPrice: 10,
                sellingPrice: 20,
                category: 'Test',
                inStock: true
            })
        });
        const productData = await productRes.json();
        if (!productRes.ok) throw new Error(productData.message || 'Create Product failed');
        productId = productData._id;
        console.log('Create Product: PASS');

        // Stock IN
        const inRes = await fetch(`${API_URL}/stock-movements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product: productId,
                type: 'IN',
                quantity: 10,
                reason: 'Initial Stock'
            })
        });
        if (!inRes.ok) throw new Error('Stock IN failed');
        console.log('Stock IN: PASS');

        // Verify Quantity
        const p1Res = await fetch(`${API_URL}/products/${productId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const p1Data = await p1Res.json();
        if (p1Data.quantity !== 10) throw new Error(`Stock IN verification failed. Expected 10, got ${p1Data.quantity}`);
        console.log('Verify Stock IN: PASS');

        // Stock OUT
        const outRes = await fetch(`${API_URL}/stock-movements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product: productId,
                type: 'OUT',
                quantity: 5,
                reason: 'Sale'
            })
        });
        if (!outRes.ok) throw new Error('Stock OUT failed');
        console.log('Stock OUT: PASS');

        // Verify Quantity
        const p2Res = await fetch(`${API_URL}/products/${productId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const p2Data = await p2Res.json();
        if (p2Data.quantity !== 5) throw new Error(`Stock OUT verification failed. Expected 5, got ${p2Data.quantity}`);
        console.log('Verify Stock OUT: PASS');

    } catch (error) {
        console.error('Stock Movement Test Failed:', error.message);
    }
};

const testReports = async () => {
    try {
        const dashRes = await fetch(`${API_URL}/reports/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!dashRes.ok) throw new Error('Dashboard Stats failed');
        console.log('Dashboard Stats: PASS');

        const invRes = await fetch(`${API_URL}/reports/inventory`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!invRes.ok) throw new Error('Inventory Report failed');
        console.log('Inventory Report: PASS');
    } catch (error) {
        console.error('Reports Test Failed:', error.message);
    }
};

const runTests = async () => {
    await login();
    await testSuppliers();
    await testStockMovement();
    await testReports();
};

runTests();
