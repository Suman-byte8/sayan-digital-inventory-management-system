const API_URL = 'http://localhost:5000/api';

async function testIntegration() {
    try {
        console.log('Testing Auth...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: 'password123'
            })
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful, token received.');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        console.log('Testing Customers...');
        const customerRes = await fetch(`${API_URL}/customers`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                name: 'Test Customer',
                email: 'test@customer.com',
                phone: '1234567890',
                address: '123 Test St'
            })
        });
        if (!customerRes.ok) throw new Error(`Customer creation failed: ${customerRes.statusText}`);
        const customerData = await customerRes.json();
        console.log('Customer created:', customerData._id);

        console.log('Testing Orders...');
        const orderRes = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                customer: customerData._id,
                products: [],
                totalAmount: 100
            })
        });
        if (!orderRes.ok) throw new Error(`Order creation failed: ${orderRes.statusText}`);
        const orderData = await orderRes.json();
        console.log('Order created:', orderData._id);

        console.log('Testing Invoices...');
        const invoiceRes = await fetch(`${API_URL}/invoices`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                order: orderData._id,
                amount: 100,
                dueDate: new Date().toISOString()
            })
        });
        if (!invoiceRes.ok) throw new Error(`Invoice creation failed: ${invoiceRes.statusText}`);
        const invoiceData = await invoiceRes.json();
        console.log('Invoice created:', invoiceData._id);

        console.log('All integration tests passed!');
    } catch (error) {
        console.error('Integration test failed:', error.message);
    }
}

testIntegration();
