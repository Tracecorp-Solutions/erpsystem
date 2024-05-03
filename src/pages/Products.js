import React, { useState, useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    rate: 0,
    accountId: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://54.226.71.2/CreateProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Product created successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          rate: 0,
          accountId: 0,
        });
        fetchProducts();
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred, please try again later");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://54.226.71.2/GetAllProducts");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (action) => {
    if (action === "edit") {
      console.log("Edit action triggered");
    }

    if (action === "delete") {
      console.log("Delete action triggered");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {showForm ? (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-8">
          <h1 className="text-2xl font-bold mb-4">Add New Product/ Service</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <Option value="Service">Service</Option>
                <Option value="Product">Product</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rate"
                className="block text-sm font-medium text-gray-700"
              >
                Rate
              </label>
              <input
                type="number"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountId"
                className="block text-sm font-medium text-gray-700"
              >
                Account ID
              </label>
              <input
                type="number"
                id="accountId"
                name="accountId"
                value={formData.accountId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Product
            </button>
          </form>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Create Product/Service
        </button>
      )}

      {!loading && (
        <div className="mt-8 overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-400 bg-gray-500 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  NAME
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  DESCRIPTION
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  CATEGORY
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  RATE
                </th>
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.rate}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium">
                    <div className="relative">
                      <select
                        className="text-indigo-600 hover:text-indigo-900"
                        onChange={(e) => handleEdit(e.target.value)}
                      >
                        <option value="">Actions</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav
            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing
                <span className="font-medium mx-1">
                  {indexOfFirstItem + 1}
                </span>
                to
                <span className="font-medium mx-1">{indexOfLastItem}</span>
                of
                <span className="font-medium mx-1">{products.length}</span>
                results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Products;
