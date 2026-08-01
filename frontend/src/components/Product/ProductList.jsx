import { Package, Search, ShoppingBag } from "lucide-react";
import React, { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

import ProductCard from "./ProductCard";
import useAuthStore from "../../lib/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products = [], onEdit, onDelete, onAddToCart, onSalesClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAuthStore((state) => state.user);

  const filteredProducts = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const categorizedProducts = {
    all: filteredProducts,
    electronics: filteredProducts.filter(
      (product) => product.category === "electronics"
    ),
    clothes: filteredProducts.filter(
      (product) => product.category === "clothes"
    ),
    shoes: filteredProducts.filter(
      (product) => product.category === "shoes"
    ),
    others: filteredProducts.filter(
      (product) => product.category === "others"
    ),
  };

  const navigate = useNavigate();
  const ProductGrid = ({ products, emptyMessage }) => {
    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 font-semibold">No Products Found</h3>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddToCart={onAddToCart}
            user={user}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {user?.role === "admin" && (
        <div className="bg-card border rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Products</p>
            <h2 className="text-3xl font-bold">{products.length}</h2>
          </div>
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <div className="flex items-center gap-3 w-full max-w-[80%] mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-14 py-7 text-xl rounded-2xl shadow-md focus-visible:ring-2 border-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={( )=> navigate("/dashboard/sales")}
          className="py-7 px-6 text-lg rounded-2xl shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <ShoppingBag className="h-5 w-5" />
          {user?.role === "admin" ? "All Sales" : "My Sales"}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">
            All
            <Badge className="ml-2">{categorizedProducts.all.length}</Badge>
          </TabsTrigger>

          <TabsTrigger value="electronics">
            Electronics
            <Badge className="ml-2">
              {categorizedProducts.electronics.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="clothes">
            Clothes
            <Badge className="ml-2">
              {categorizedProducts.clothes.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="shoes">
            Shoes
            <Badge className="ml-2">
              {categorizedProducts.shoes.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="others">
            Others
            <Badge className="ml-2">
              {categorizedProducts.others.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ProductGrid
            products={categorizedProducts.all}
            emptyMessage="No products found."
          />
        </TabsContent>

        <TabsContent value="electronics">
          <ProductGrid
            products={categorizedProducts.electronics}
            emptyMessage="No electronics found."
          />
        </TabsContent>

        <TabsContent value="clothes">
          <ProductGrid
            products={categorizedProducts.clothes}
            emptyMessage="No clothes found."
          />
        </TabsContent>

        <TabsContent value="shoes">
          <ProductGrid
            products={categorizedProducts.shoes}
            emptyMessage="No shoes found."
          />
        </TabsContent>

        <TabsContent value="others">
          <ProductGrid
            products={categorizedProducts.others}
            emptyMessage=" No products found."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductList;