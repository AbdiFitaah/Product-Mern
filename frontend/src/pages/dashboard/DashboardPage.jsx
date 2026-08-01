import DashboardHeader from "@components/Dashboard/DashboardHeader";
import ProductForm from "@components/Product/ProductForm";
import ProductList from '@components/Product/ProductList';

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";

import api from "@lib/auth/apiClient";

const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 🛒 Cart State
  const [cartItems, setCartItems] = useState([]);

  // ➕ Function-ka Alaabta Cart-ka ku daraya (Safely Handles IDs & Types)
  const handleAddToCart = (product) => {
    if (!product) return;

    // Hubi ID-ga alaabta (sida _id ama id)
    const pId = product._id || product.id;

    if (!pId) {
      console.error("❌ Product ID is missing:", product);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => (item._id || item.id) === pId);

      if (existingItem) {
        // Haddii ay mar hore ku jirtay, kordhi tirada
        return prevItems.map((item) =>
          (item._id || item.id) === pId
            ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
            : item
        );
      } else {
        // Haddii ay cusub tahay, ku dar
        return [
          ...prevItems,
          {
            _id: pId,
            name: product.name || "Unnamed Product",
            price: Number(product.price) || 0,
            image: product.image || "",
            quantity: 1,
          },
        ];
      }
    });
  };

  // 🗑️ Function-ka Alaabta Cart-ka ka saaraya
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id) !== productId)
    );
  };

  // 🧹 Function-ka Faaruqiya Cart-ka marka Checkout la sameeyo
  const handleClearCart = () => {
    setCartItems([]);
  };

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
      {/* Header - Waxaa loo gudbiyay cartItems, onRemoveCartItem & onClearCart */}
      <DashboardHeader 
        cartItems={cartItems}
        onRemoveCartItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
    
        <ProductList
          products={productsQuery.data || []}
          isLoading={productsQuery.isLoading}
          onEdit={handleEditProduct}
          onStatusChange={handleStatusChange}
          onAddToCart={handleAddToCart}
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

export default DashboardPage;