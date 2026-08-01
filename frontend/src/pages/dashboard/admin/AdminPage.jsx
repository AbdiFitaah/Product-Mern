import DashboardWelcome from "..@components/dashboard/DashboardWelcome";
import DashboardHeader from "..@components/dashboard/DashboardHeader";
import ProductForm from "..@components/Product/ProductForm";
import ProductList from '..@components/Product/ProductList';

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";

import api from "../../../lib/auth/apiClient";

const AdminPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Close Form
  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingProduct(null);
  };

  // Open Create Form
  const handleCreateProductClick = () => {
    setShowCreateForm(true);
  };

  // Get Products
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/product");
      return response.data;
    },
    retry: 1,
  });

  // Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowCreateForm(true);
  };

  // Future Update (optional)
  const handleStatusChange = async () => {};

  // Loading
  if (productsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  
  // Error
  if (productsQuery.isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          Error loading products: {productsQuery.error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
       
        <DashboardWelcome 
          onCreateTask={handleCreateProductClick} 
          showCreateForm={showCreateForm}
        />

        <ProductList
          products={productsQuery.data || []}
          isLoading={productsQuery.isLoading}
          onEdit={handleEditProduct}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Create / Update Product */}
      <ProductForm
        product={editingProduct}
        open={showCreateForm || !!editingProduct}
        onOpenChange={handleFormClose}
      />
    </div>
  );
};

export default AdminPage;