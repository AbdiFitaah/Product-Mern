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

  // Helper function oo si sax ah u ganta magaca category-ga (ID ama String ama Object)
  const getCategoryIdOrName = (product) => {
    if (!product?.category) return "";
    if (typeof product.category === "object") {
      return (product.category._id || product.category.categoryName || "").toLowerCase();
    }
    return String(product.category).toLowerCase();
  };

  const filteredProducts = products.filter((product) => {
    const categoryValue = getCategoryIdOrName(product);
    return (
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryValue.includes(searchTerm.toLowerCase())
    );
  });

  // Category Filtering Saxan (Wuxuu baadhayaa ID-yada iyo Magacyada iyadoo aan loo eegin xaraf weyn ama yar)
  const categorizedProducts = {
    all: filteredProducts,
    electronics: filteredProducts.filter((p) => {
      const cat = getCategoryIdOrName(p);
      return cat === "electronics" || cat === "6a7032d8f8ea7fbd1a61e159";
    }),
    clothes: filteredProducts.filter((p) => {
      const cat = getCategoryIdOrName(p);
      return cat === "clothes" || cat === "6a703851f8ea7fbd1a61e15f";
    }),
    shoes: filteredProducts.filter((p) => {
      const cat = getCategoryIdOrName(p);
      return cat === "shoes" || cat === "6a70383ff8ea7fbd1a61e15d";
    }),
    others: filteredProducts.filter((p) => {
      const cat = getCategoryIdOrName(p);
      return cat === "others" || cat === "6a70385cf8ea7fbd1a61e161";
    }),
  };

  const navigate = useNavigate();
  const ProductGrid = ({ products, emptyMessage }) => {
    if (products.length === 0) {
      return (
        <div className="text-center py-8 sm:py-12">
          <Package className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
          <h3 className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg">No Products Found</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
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
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-0">
      
      {/* TOTAL PRODUCTS CARD */}
      {user?.role === "admin" && (
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Total Products
                </span>
                <Badge variant="outline" className="text-[10px] sm:text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-2 py-0.5 rounded-full font-normal flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Inventory
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                  {products.length}
                </h2>
                <span className="text-xs text-muted-foreground font-medium">Items in stock</span>
              </div>
            </div>

            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-inner shrink-0">
              <Package className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
          </div>
        </div>
      )}

      {/* Search and Sales Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-full md:max-w-[90%] lg:max-w-[80%] mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 sm:pl-12 py-3 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md focus-visible:ring-2 border-1.5 sm:border-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => navigate("/sales")}
          className="py-3 sm:py-5 md:py-6 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md flex items-center justify-center gap-2 whitespace-nowrap h-auto cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
          {user?.role === "admin" ? "All Sales" : "My Sales"}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="overflow-x-auto pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
          <TabsList className="flex sm:grid sm:grid-cols-5 w-max sm:w-full min-w-full">
            <TabsTrigger value="all" className="flex-1 text-xs sm:text-sm px-3 py-1.5 cursor-pointer">
              <span>All</span>
              <Badge variant="secondary" className="ml-1.5 text-[10px] sm:text-xs px-1.5 py-0">{categorizedProducts.all.length}</Badge>
            </TabsTrigger>

            <TabsTrigger value="electronics" className="flex-1 text-xs sm:text-sm px-3 py-1.5 cursor-pointer">
              <span>Electronics</span>
              <Badge variant="secondary" className="ml-1.5 text-[10px] sm:text-xs px-1.5 py-0">
                {categorizedProducts.electronics.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="clothes" className="flex-1 text-xs sm:text-sm px-3 py-1.5 cursor-pointer">
              <span>Clothes</span>
              <Badge variant="secondary" className="ml-1.5 text-[10px] sm:text-xs px-1.5 py-0">
                {categorizedProducts.clothes.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="shoes" className="flex-1 text-xs sm:text-sm px-3 py-1.5 cursor-pointer">
              <span>Shoes</span>
              <Badge variant="secondary" className="ml-1.5 text-[10px] sm:text-xs px-1.5 py-0">
                {categorizedProducts.shoes.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="others" className="flex-1 text-xs sm:text-sm px-3 py-1.5 cursor-pointer">
              <span>Others</span>
              <Badge variant="secondary" className="ml-1.5 text-[10px] sm:text-xs px-1.5 py-0">
                {categorizedProducts.others.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-4 sm:mt-6">
          <ProductGrid
            products={categorizedProducts.all}
            emptyMessage="No products found."
          />
        </TabsContent>

        <TabsContent value="electronics" className="mt-4 sm:mt-6">
          <ProductGrid
            products={categorizedProducts.electronics}
            emptyMessage="No electronics found."
          />
        </TabsContent>

        <TabsContent value="clothes" className="mt-4 sm:mt-6">
          <ProductGrid
            products={categorizedProducts.clothes}
            emptyMessage="No clothes found."
          />
        </TabsContent>

        <TabsContent value="shoes" className="mt-4 sm:mt-6">
          <ProductGrid
            products={categorizedProducts.shoes}
            emptyMessage="No shoes found."
          />
        </TabsContent>

        <TabsContent value="others" className="mt-4 sm:mt-6">
          <ProductGrid
            products={categorizedProducts.others}
            emptyMessage="No other products found."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductList;