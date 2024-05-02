import React, { useState, useEffect } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        rate: 0,
        accountId: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://54.226.71.2/CreateProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Product created successfully!');
                // Reset form after successful submission
                setFormData({
                    name: '',
                    description: '',
                    category: '',
                    rate: 0,
                    accountId: 0
                });
                // Fetch updated list of products
                fetchProducts();
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('An error occurred, please try again later');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://54.226.71.2/GetAllProducts');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-8">
                <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate</label>
                        <input type="number" id="rate" name="rate" value={formData.rate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="accountId" className="block text-sm font-medium text-gray-700">Account ID</label>
                        <input type="number" id="accountId" name="accountId" value={formData.accountId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Product</button>
                </form>
            </div>
            <div className="max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">All Products</h1>
                <ul>
                    {products.map(product => (
                        <li key={product.id} className="mb-2">
                            <span className="font-bold">{product.name}</span> - {product.description} - {product.category} - {product.rate} - {product.accountId}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;
